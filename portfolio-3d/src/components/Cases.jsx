import { motion } from 'motion/react'
import { rise } from '../anim.js'
import { Facts, Callout, SectionHead, H3, PipelineFlow } from './Blocks.jsx'
import Stats, { Count } from './Stats.jsx'
import { RiaMock, TripMock, CrossSellMock } from './Mock.jsx'
import GateRail from './GateRail.jsx'

export function CaseRia() {
  return (
    <section id="ria">
      <div className="wrap">
        <SectionHead
          label="Case Study 01"
          title="Ria: AI underwriting for health insurance"
          sub="Turning a 3 hour manual review into a governed AI decision, without ever putting trust on credit."
        />

        <H3 n="1.1">The problem, why, who, and validation</H3>
        <div className="duo">
          <Facts
            items={[
              { dt: 'The problem', dd: "About 45 percent of ICICI Lombard's monthly health insurance proposals were non standard cases that could not pass straight through, every one needed manual underwriting review." },
              { dt: 'Why it hurt', dd: "Each review took about 3 hours of an underwriter's time, which meant nearly half of all incoming volume was routed through the slowest path in the funnel." },
              { dt: 'Why now', dd: 'Fixing it had become a CXO level strategic priority, with the work cutting across 8 teams and 5 integrated platforms.' },
              { dt: 'Who for', dd: 'The underwriters carrying the manual load, and every customer whose proposal sat waiting on a 3 hour review.' },
              { dt: 'Validation', dd: 'I was the sole individual contributor PM on the initiative, and took it from problem definition to a working pilot in 2 months.' },
            ]}
          />
          <RiaMock />
        </div>

        <H3 n="1.2">What we shipped, and what it moved</H3>
        <Stats
          items={[
            { num: <>3 hrs <span>&rarr;</span> mins</>, label: 'Per case underwriting effort' },
            { num: <>3s <span>&rarr;</span> 1s</>, label: 'Inference latency' },
            { num: <><Count value={95} /><span>%</span></>, label: 'Agreement between the AI and human underwriters' },
            { num: <>~<Count value={90} /><span>%</span></>, label: 'Per insured accuracy' },
            { num: <>&#8377;20 to <Count value={30} /> cr</>, label: 'Projected annual savings at full rollout' },
          ]}
        />

        <H3 n="1.3">How we earned the right to automate</H3>
        <motion.p {...rise()}>
          This is the part of the story I am most careful about, because it is easy to overclaim. In 2026, saying you shipped an LLM feature is table stakes. The differentiating work is the governance wrapped around it. Ria is not full automation with a safety net hidden somewhere. It is a phased rollout behind human in the loop review gates, where review coverage only decreases after specific trust metrics clear their bar.
        </motion.p>

        <GateRail />

        <Callout lead="The broader frame:">
          this rollout sits inside a governance framework spanning 7 domains: decision integrity, data protection and privacy, consent integrity, human oversight and accountability, security and abuse resistance, duty of care and interaction safety, and third party and vendor risk. Some of it is live, some of it is a target we are building toward, and the roadmap is honest about which is which. Naming an AI pattern is easy. Operating a framework like this in a regulated industry, where speed can never come at the cost of trust or data integrity, is the discipline I bring to whatever I ship next.
        </Callout>
      </div>
    </section>
  )
}

export function CaseTripSecure() {
  return (
    <section id="tripsecure">
      <div className="wrap">
        <SectionHead
          label="Case Study 02"
          title="TripSecure+: rebuilding travel insurance from scratch"
          sub="A ground up replacement for a decade old product, owned from discovery through launch."
        />

        <H3 n="2.1">The problem, and why now</H3>
        <div className="duo">
          <div>
            <motion.p {...rise()}>
              ICICI Lombard's travel insurance product was about 10 years old and had become weak in ways customers could feel. Coverage terms were broken and rigid. Pricing was fixed and outdated, unresponsive to how people actually travel. Distribution was limited, awareness was low, there was no availability through brokers or partners, and the claims experience was broken. TripSecure+ was built from scratch to replace it, not patched on top of it.
            </motion.p>
            <Facts
              items={[
                { dt: 'Why now, one', dd: 'The post pandemic travel rebound reopened the market opportunity.' },
                { dt: 'Why now, two', dd: 'Competitive and market research surfaced exactly how structurally behind the old product was.' },
                { dt: 'Who for', dd: 'Direct retail travelers and broker or partner channel customers, targeted together from the start rather than sequentially.' },
                { dt: 'Validation', dd: 'Over 100 generative customer interviews shaped the rebuild.' },
              ]}
            />
          </div>
          <TripMock />
        </div>

        <H3 n="2.2">What we built, and what it did</H3>
        <Stats
          items={[
            { num: <>&#8377;100 <span>&rarr;</span> <Count value={300} /> cr</>, label: 'Revenue growth in 18 months' },
            { num: <><Count value={6} /> <span>mo</span></>, label: 'To profitability' },
            { num: <><Count value={23} /><span>%</span></>, label: 'Of portfolio from the broker channel, powered by a dynamic pricing engine' },
            { num: <><Count value={100} /><span>+</span></>, label: 'Destinations covered, built from scratch' },
          ]}
        />
        <motion.p {...rise()}>
          The launch included an international partner debut in Dubai. I directed a 10 person cross functional team spanning engineering, design, UX research, and underwriting, from discovery through launch. The claims experience, named above as one of the old product's failures, was rebuilt as part of the ground up effort.
        </motion.p>

        <Callout lead="The transferable pattern:">
          TripSecure+'s purchase journey is discovering coverage, configuring it, and paying for it. Owning a transactional flow end to end, from first intent to completed payment, is work I have already done once, and the shape of work I want to keep doing at bigger scale.
        </Callout>
      </div>
    </section>
  )
}

export function CaseElevate() {
  return (
    <section id="elevate">
      <div className="wrap">
        <SectionHead
          label="Case Study 03"
          title="Elevate and the recommendation engine"
          sub="A market share strategy on a 1,500 crore rupee portfolio, and the ML engine that turned it into a decision for every customer."
        />

        <H3 n="3.1">The problem, why, who, and validation</H3>
        <div className="duo">
          <div>
            <motion.p {...rise()}>
              In FY24-25 I owned Elevate, the growth strategy for a retail health insurance portfolio of about 1,500 crore rupees holding 2.3 percent market share. Two levers had real headroom. The first was competitive positioning, where an assessment of the landscape surfaced gaps the portfolio could credibly close. The second was the existing customer base, where cross sell offers were accepted just 1.5 percent of the time and there was no systematic way to decide which customer should get which action next.
            </motion.p>
            <Facts
              items={[
                { dt: 'The problem', dd: 'A 1,500 crore portfolio at 2.3 percent share, with growth gated on positioning gaps and an untapped existing customer base.' },
                { dt: 'Why it hurt', dd: 'A 1.5 percent cross sell acceptance baseline meant nearly every offer shown to an existing customer was the wrong offer, wasted attention on both sides.' },
                { dt: 'Why now', dd: 'The competitive assessment made the positioning gaps concrete, and FY24-25 was the cycle to close them before competitors did.' },
                { dt: 'Who for', dd: 'Existing policyholders who deserved a relevant next offer instead of a generic one, and the customer segments addressed by new coverage architecture and pricing.' },
                { dt: 'Validation', dd: 'I authored the detailed product requirements documents defining coverage architecture and pricing across customer segments, and mentored one Associate PM to independent product ownership along the way.' },
              ]}
            />
          </div>
          <CrossSellMock />
        </div>

        <H3 n="3.2">What we built, and what it moved</H3>
        <Stats
          items={[
            { num: <>2.3 <span>&rarr;</span> <Count value={3.1} decimals={1} />%</>, label: 'Market share, a 35 percent relative gain' },
            { num: <Count value={0.82} decimals={2} />, label: 'AUC-ROC in production' },
            { num: <>+<Count value={2.5} decimals={1} /><span>%</span></>, label: 'Retention lift' },
            { num: <>1.5 <span>&rarr;</span> <Count value={8} />%</>, label: 'Cross sell offer acceptance, a 5.3x increase' },
            { num: <><Count value={18} /><span>%</span></>, label: 'CTR on the 1 click cross sell surface in checkout' },
            { num: <>+<Count value={10} /><span>%</span></>, label: 'Lift in average revenue per user' },
          ]}
        />

        <PipelineFlow />

        <motion.p {...rise()}>
          The engine behind these numbers is a production ML recommendation system I shipped in partnership with an applied science team, working together on feature engineering, evaluation metrics, and production guardrails. One model run answers both questions that matter for an existing customer: are they at risk of leaving, and what should we offer them next.
        </motion.p>
        <motion.p {...rise()}>
          Scores do not sit in a dashboard waiting for someone to act. They feed the 1 click cross sell surface inside the checkout flow, which carried a hard design constraint from day one: zero cannibalization of the core purchase journey. It cleared that bar while delivering an 18 percent click through rate and a 10 percent lift in average revenue per user.
        </motion.p>

        <Callout lead="The transferable pattern:">
          most personalization problems are next best action problems underneath. Propensity modeling, cohort targeting, and attach economics inside a checkout flow that must never degrade the core journey. That discipline travels to any product where a recommendation meets a transaction.
        </Callout>
      </div>
    </section>
  )
}
