// Hardcoded content. The intro plus a narrative description of each day/session,
// mirroring the "About" of the previous edition's site.
const blocks = [
  {
    eyebrow: 'Day 1 - Morning <LEARNING>',
    title: 'Expert Dialogues',
    body: <>
    The “Learning” session opens with an <span className="italic text-accent font-medium">introductory talk</span> by Professors Francesca Tomasi and
    Giovanni Colavizza, framing the intersection of AI and DH. <span className="italic text-accent font-medium">Three “Expert Dialogues”</span> follow with the
    invited experts. Each is built around a presentation of the guest’s work followed by an active
    discussion led by a PhD student acting as discussant. The discussant acts as a Chair, formulating critical questions and facilitating
    the exchange with the audience. The format stages a <span className="italic text-accent font-medium">structured dialogue</span> between an <span className="italic text-accent font-medium">established
    expert</span> and an <span className="italic text-accent font-medium">early-career researcher</span>.
    </>,
  },
  {
    eyebrow: 'Day 1 - Afternoon <SHARING>',
    title: 'Use-case Presentations',
    body: <>
    The second session, “Sharing”, is dedicated to <span className="italic text-accent font-medium">real use cases</span> from the two centres. It
    is organised in blocks: in each, a researcher from the partner centre and a /DH.arc PhD student
    present their respective projects, comparing tools, workflows, and open problems, followed by a
    <span className="italic text-accent font-medium"> round of critical feedback</span>. The aim is to surface what is being done, how, and
    where there is <span className="italic text-accent font-medium">room for collaboration</span>, while preparing participants for a moment of critical
    feedback on the research.
    </>,
  },
  {
    eyebrow: 'Day 2 - <DOING>',
    title: 'Workshop - Forge Your Personal AI Stack',
    body: <>
      This <span className="italic text-accent font-medium">hands-on workshop</span> explores how to design, deploy, and evaluate an advanced <span className="italic text-accent font-medium">Retrieval-Augmented Generation pipeline</span> using self-hosted language models. Participants will move beyond the basic RAG workflow to examine how evidence is retrieved, ranked, attributed, and used in generation, as well as how each component can be evaluated independently.
      By working directly with models, hardware constraints, and infrastructure choices, participants will gain a practical understanding of <span className="italic text-accent font-medium">self-hosted AI</span> and its potential value for <span className="italic text-accent font-medium">cultural heritage institutions</span>, including greater control over data, systems, and costs. 
      The workshop will conclude with a concrete case study of Relay, presented by the CDCH team, offering insight into its architecture, operation, and relevance to Digital Humanities research.
    </>,
  },
]

export default function About() {
  return (
    <section id="about" className="border-t border-border bg-[var(--color-surface)]">
      <div className="mx-auto max-w-5xl px-8 py-20 md:py-24">
        <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">About</h2>
        <div className="mb-16 flex flex-col gap-2">
          <p className="max-w-3xl font-body text-lg leading-relaxed text-text-muted">
            The <span className="italic text-accent font-medium">/DH.arc seminars</span> are a recurring format convened by the
            /DH.arc (Digital Humanities Advanced Research Centre) at the University of Bologna. This year's
            edition,{' '} <span className="italic text-accent font-medium">From thought to practice</span>, explores how digital methods and artificial
            intelligence reshape the questions, sources, and practices of the humanities, across two days that move from expert
            dialogues to the discussion of use cases and hands-on workshops.
          </p>
          <p className="max-w-3xl font-body text-lg leading-relaxed text-text-muted">To get in touch, please <span className="italic text-accent font-medium">contact</span> us at <a className="font-medium" href="mailto:aidhdialogue2026@gmail.com">aidhdialogue2026@gmail.com</a>.</p>
        </div>
        <div className="space-y-14">
          {blocks.map((block) => (
            <div key={block.title} className="grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-[16rem_1fr]">
              <div>
                <p className="font-body text-xs font-bold uppercase tracking-widest text-accent">
                  {block.eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">{block.title}</h3>
              </div>
              <p className="max-w-2xl font-body text-lg leading-relaxed text-text-muted">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
