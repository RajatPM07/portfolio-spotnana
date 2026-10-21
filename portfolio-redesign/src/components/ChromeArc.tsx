import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'

// One brushed chrome ribbon, drawn with plain WebGL (no library, no postprocessing).
// The caller owns the fallback: onFail fires when WebGL is missing, a shader fails
// to compile, or the context is lost.

type Props = {
  x: MotionValue<number>
  y: MotionValue<number>
  reduced: boolean
  onFail: () => void
}

const ARC_SEGMENTS = 160
const SECTION_SEGMENTS = 28
const ARC_START = 1.02 * Math.PI
const ARC_END = 2.02 * Math.PI
const RADIUS = 1.1
const SECTION_N = 6
const TWIST = 1.7 * Math.PI
const TWIST_AT = 0.46
const CAMERA_Z = 4.4

const BASE_YAW = -0.28
const BASE_PITCH = 0.36
const BASE_ROLL = -0.3
const ENTRANCE_MS = 900
const ENTRANCE_YAW = 1.15

type Mat = Float32Array

const identity = (): Mat => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
function mul(a: Mat, b: Mat): Mat {
  const o = new Float32Array(16)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]
    o[c * 4 + r] = s
  }
  return o
}
function rotX(a: number): Mat {
  const m = identity(), c = Math.cos(a), s = Math.sin(a)
  m[5] = c; m[6] = s; m[9] = -s; m[10] = c
  return m
}
function rotY(a: number): Mat {
  const m = identity(), c = Math.cos(a), s = Math.sin(a)
  m[0] = c; m[2] = -s; m[8] = s; m[10] = c
  return m
}
function rotZ(a: number): Mat {
  const m = identity(), c = Math.cos(a), s = Math.sin(a)
  m[0] = c; m[1] = s; m[4] = -s; m[5] = c
  return m
}
function scaleM(k: number): Mat {
  const m = identity()
  m[0] = k; m[5] = k; m[10] = k
  return m
}
function perspective(fov: number, aspect: number, near: number, far: number): Mat {
  const f = 1 / Math.tan(fov / 2), m = new Float32Array(16)
  m[0] = f / aspect; m[5] = f
  m[10] = (far + near) / (near - far); m[11] = -1
  m[14] = (2 * far * near) / (near - far)
  return m
}
function translateZ(z: number): Mat {
  const m = identity()
  m[14] = z
  return m
}

const translate = (x: number, y: number): Mat => {
  const m = identity()
  m[12] = x; m[13] = y
  return m
}

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function buildGeometry() {
  const verts: number[] = []
  const idx: number[] = []
  for (let i = 0; i <= ARC_SEGMENTS; i++) {
    const u = i / ARC_SEGMENTS
    const th = ARC_START + (ARC_END - ARC_START) * u
    const ends = smooth(0, 0.12, u) * smooth(1, 0.88, u)
    const a = 0.27 * (0.8 + 0.2 * ends) // half width, along the axis
    const b = 0.024 // half thickness, radial
    const twist = TWIST * (u - TWIST_AT) // rotates the band about its own length
    const ct = Math.cos(twist), st = Math.sin(twist)
    const rx = Math.cos(th), ry = Math.sin(th)
    for (let j = 0; j <= SECTION_SEGMENTS; j++) {
      const v = j / SECTION_SEGMENTS
      const phi = v * Math.PI * 2
      const cs = Math.cos(phi), sn = Math.sin(phi)
      const e = 2 / SECTION_N
      const sx = Math.sign(cs) * Math.pow(Math.abs(cs), e) // across the width
      const sy = Math.sign(sn) * Math.pow(Math.abs(sn), e) // through the thickness
      const zc = a * sx
      const rc = b * sy
      // Outward normal of the superellipse, in (width, thickness) space.
      let nz = Math.sign(sx) * Math.pow(Math.abs(sx), SECTION_N - 1) / a
      let nr = Math.sign(sy) * Math.pow(Math.abs(sy), SECTION_N - 1) / b
      const nl = Math.hypot(nz, nr) || 1
      nz /= nl; nr /= nl
      const zr = zc * ct - rc * st
      const rr = zc * st + rc * ct
      const nzr = nz * ct - nr * st
      const nrr = nz * st + nr * ct
      const px = rx * (RADIUS + rr), py = ry * (RADIUS + rr), pz = zr
      const nx = rx * nrr, ny = ry * nrr, nzz = nzr
      const tx = -ry, ty = rx
      verts.push(px, py, pz, nx, ny, nzz, tx, ty, 0, u, v)
    }
  }
  const row = SECTION_SEGMENTS + 1
  for (let i = 0; i < ARC_SEGMENTS; i++) for (let j = 0; j < SECTION_SEGMENTS; j++) {
    const p = i * row + j
    idx.push(p, p + row, p + 1, p + 1, p + row, p + row + 1)
  }
  return { verts: new Float32Array(verts), idx: new Uint16Array(idx) }
}

const VERT = `
attribute vec3 aPos; attribute vec3 aNormal; attribute vec3 aTan; attribute vec2 aUV;
uniform mat4 uModel; uniform mat4 uViewProj;
varying vec3 vP; varying vec3 vN; varying vec3 vT; varying vec2 vUV;
void main() {
  vec4 w = uModel * vec4(aPos, 1.0);
  vP = w.xyz;
  vN = mat3(uModel) * aNormal;
  vT = mat3(uModel) * aTan;
  vUV = aUV;
  gl_Position = uViewProj * w;
}`

const FRAG = `
precision mediump float;
varying vec3 vP; varying vec3 vN; varying vec3 vT; varying vec2 vUV;
uniform vec3 uCam;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
// A dark studio: a broad overhead softbox, one long cool strip, a faint horizon band.
vec3 env(vec3 r) {
  float top = smoothstep(0.25, 0.7, r.y);
  float strip = smoothstep(0.2, 0.42, r.x) * (1.0 - smoothstep(0.5, 0.72, r.x)) * smoothstep(-0.7, 0.1, r.y);
  float rim = smoothstep(0.5, 0.75, -r.x) * smoothstep(-0.4, 0.4, r.y);
  float band = exp(-pow((r.y + 0.1) * 6.0, 2.0));
  float floorGlow = smoothstep(-0.1, -0.95, r.y);
  vec3 c = vec3(0.04, 0.05, 0.06) + vec3(0.16, 0.18, 0.2) * smoothstep(-1.0, 1.0, r.y);
  c += vec3(0.9, 0.93, 0.97) * top * 0.85;
  c += vec3(0.25, 0.8, 0.98) * strip * 0.95;
  c += vec3(0.8, 0.85, 0.92) * rim * 0.55;
  c += vec3(0.6, 0.65, 0.72) * band * 0.4;
  c += vec3(0.03, 0.12, 0.15) * floorGlow;
  // A broad frontal softbox and two soft diagonal bands, so a ribbon facing the camera still reads as metal.
  c += vec3(0.5, 0.58, 0.66) * smoothstep(0.35, 0.95, r.z) * 0.55;
  c += vec3(0.7, 0.78, 0.86) * pow(max(0.0, sin((r.x * 1.4 + r.y * 1.0) * 3.2 + 0.6)), 5.0) * 0.75;
  return c;
}
void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(uCam - vP);
  if (dot(N, V) < 0.0) N = -N;
  vec3 T = normalize(vT);
  // Brushed grain: fine streaks across the width, slow variation along the arc.
  float streak = vnoise(vec2(vUV.x * 9.0, vUV.y * 140.0)) - 0.5;
  float coarse = vnoise(vec2(vUV.x * 3.0, vUV.y * 18.0)) - 0.5;
  vec3 R = reflect(-V, N);
  R = normalize(R + T * (streak * 0.2 + coarse * 0.1));
  vec3 base = vec3(0.78, 0.81, 0.85);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  vec3 col = env(R) * mix(base, vec3(1.0), fres);
  col += vec3(0.0, 0.05, 0.07) * fres;
  col += streak * 0.035;
  col = col / (1.0 + col * 0.6);
  col = pow(col, vec3(0.95));
  // The ends of the ribbon dissolve instead of ending in a tip.
  float edge = smoothstep(0.0, 0.16, vUV.x) * smoothstep(1.0, 0.84, vUV.x);
  gl_FragColor = vec4(col * edge, edge);
}`

export default function ChromeArc({ x, y, reduced, onFail }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedRef = useRef(reduced)
  const kickRef = useRef<() => void>(() => {})

  useEffect(() => {
    reducedRef.current = reduced
    kickRef.current()
  }, [reduced])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' })
    if (!gl) {
      if (import.meta.env.DEV) console.warn('ChromeArc: WebGL unavailable')
      onFail()
      return
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s
      if (import.meta.env.DEV) console.warn('ChromeArc shader error:', gl.getShaderInfoLog(s))
      return null
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()!
    if (!vs || !fs) {
      onFail()
      return
    }
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      if (import.meta.env.DEV) console.warn('ChromeArc link error:', gl.getProgramInfoLog(prog))
      onFail()
      return
    }
    gl.useProgram(prog)

    const geo = buildGeometry()
    const vbo = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, geo.verts, gl.STATIC_DRAW)
    const ibo = gl.createBuffer()!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.idx, gl.STATIC_DRAW)
    const stride = 11 * 4
    const attr = (name: string, size: number, offset: number) => {
      const loc = gl.getAttribLocation(prog, name)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset * 4)
    }
    attr('aPos', 3, 0); attr('aNormal', 3, 3); attr('aTan', 3, 6); attr('aUV', 2, 9)

    const uModel = gl.getUniformLocation(prog, 'uModel')
    const uViewProj = gl.getUniformLocation(prog, 'uViewProj')
    const uCam = gl.getUniformLocation(prog, 'uCam')
    gl.uniform3f(uCam, 0, 0, CAMERA_Z)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    let w = 1, h = 1
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width * dpr))
      h = Math.max(1, Math.round(r.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, w, h)
    }

    let yaw = 0, pitch = 0
    let last = performance.now()
    const start = last
    let raf = 0
    let onScreen = true
    let docVisible = !document.hidden

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const isReduced = reducedRef.current
      const ent = isReduced ? 1 : Math.min(1, (now - start) / ENTRANCE_MS)
      const ease = 1 - Math.pow(1 - ent, 3)
      const k = 1 - Math.exp(-dt * 5)
      const tx = isReduced ? 0 : x.get() * 0.34
      const ty = isReduced ? 0 : y.get() * 0.2
      yaw += (tx - yaw) * k
      pitch += (ty - pitch) * k
      const drift = isReduced ? 0 : Math.sin((now - start) / 1000 * 0.32) * 0.03

      const aspect = w / h
      const fit = aspect < 1.1 ? 0.78 : 1 // a narrower, simpler sculpture on small screens
      const offset = translate(aspect < 1.1 ? 0.05 : -0.16, aspect < 1.1 ? 0.3 : 0.12)
      const model = mul(
        offset,
        mul(rotZ(BASE_ROLL),
        mul(rotX(BASE_PITCH - pitch), mul(rotY(BASE_YAW + (1 - ease) * ENTRANCE_YAW + yaw + drift), scaleM((0.94 + 0.06 * ease) * fit)))),
      )
      const viewProj = mul(perspective(0.62, aspect, 0.1, 20), translateZ(-CAMERA_Z))
      gl.uniformMatrix4fv(uModel, false, model)
      gl.uniformMatrix4fv(uViewProj, false, viewProj)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, geo.idx.length, gl.UNSIGNED_SHORT, 0)
    }

    const needsLoop = () => !reducedRef.current && onScreen && docVisible
    const loop = (now: number) => {
      raf = 0
      draw(now)
      if (needsLoop()) raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      cancelAnimationFrame(raf)
      raf = 0
      last = performance.now()
      if (needsLoop()) raf = requestAnimationFrame(loop)
      else draw(performance.now())
    }
    kickRef.current = kick

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      kick()
    })
    io.observe(canvas)
    const onVis = () => {
      docVisible = !document.hidden
      kick()
    }
    document.addEventListener('visibilitychange', onVis)
    const onLost = (e: Event) => {
      e.preventDefault()
      onFail()
    }
    canvas.addEventListener('webglcontextlost', onLost)

    resize()
    kick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('webglcontextlost', onLost)
      kickRef.current = () => {}
      gl.deleteBuffer(vbo)
      gl.deleteBuffer(ibo)
      gl.deleteProgram(prog)
    }
  }, [x, y, onFail])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
