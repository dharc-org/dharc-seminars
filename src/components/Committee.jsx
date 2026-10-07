// Hardcoded content — placeholder centres and committee members.
const centres = [
  {
    name: '/DH.arc — Digital Humanities Advanced Research Centre',
    note: 'University of Bologna · host of the seminar series',
    url: 'https://centri.unibo.it/dharc/en',
  },
  {
    name: 'CDCH — Centre for Digital and Computational Humanities',
    note: 'University of Copenhagen · partner research centre',
    url: 'https://cdch.ku.dk/'
  },
]

const members = [
  { name: 'Prof. Francesca Tomasi', affiliation: 'University of Bologna - M-STO/08' },
  { name: 'Prof. Giovanni Colavizza', affiliation: 'University of Bologna - INF/01' },
  { name: 'Gianmarco Spinaci', affiliation: 'PhD candidate, University of Bologna - INF/01' },
  { name: 'Erica Andreose', affiliation: 'PhD candidate, University of Bologna - M-STO/08' },
  { name: 'Matteo Guenci', affiliation: 'PhD candidate, University of Bologna - INF/01' },
  { name: 'Enrica Bruno', affiliation: 'PhD candidate, University of Bologna - M-STO/08' },
  { name: 'Remo Grillo', affiliation: 'PhD candidate, University of Bologna - INF/01' },
  { name: 'Tommaso Battisti', affiliation: 'PhD candidate, University of Bologna - M-STO/08' },
  { name: 'Andrea Schimmenti', affiliation: 'Teaching tutor, University of Bologna - INF/01' },
  { name: 'Members of the CDCH, Copenhagen', affiliation: 'Partner research centre' },
  { name: 'Tiago Filipe Nunes Ribeiro', affiliation: 'CDCH, University of Copenhagen' },
  { name: 'Selda Eren', affiliation: 'CDCH, University of Copenhagen' },
  { name: 'Yevhenii Osadchuk', affiliation: 'CDCH, University of Copenhagen' },
]

export default function Committee() {
  return (
    <section id="committee" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
          {/* Involved Centres */}
          <div>
            <h2 className="mb-8 font-heading text-2xl font-bold md:text-3xl">
              Involved Centres
            </h2>
            <ul className="space-y-6">
              {centres.map((centre) => (
                <li key={centre.name}>
                  {centre.url ? (
                    <a
                      href={centre.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-lg text-text-base transition-colors hover:text-accent"
                    >
                      {centre.name}
                    </a>
                  ) : (
                    <p className="font-body text-lg text-text-base">{centre.name}</p>
                  )}
                  <p className="mt-1 font-body text-sm text-text-muted">{centre.note}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Scientific Committee */}
          <div>
            <h2 className="mb-8 font-heading text-2xl font-bold md:text-3xl">
              Scientific Committee
            </h2>
            <ul className="space-y-4">
              {members.map((member) => (
                <li key={member.name} className="flex flex-col">
                  <span className="font-body text-lg text-text-base">{member.name}</span>
                  <span className="font-body text-sm italic text-text-muted">
                    {member.affiliation}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-text-muted">
              The composition of the committee reflects the <span className="italic text-accent font-medium">interdisciplinary nature of the
              seminar</span>, spanning the different areas and including representatives of the partner
              research centre to ensure scientific coordination between the two institutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
