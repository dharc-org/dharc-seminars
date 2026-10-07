import { useEffect, useState } from 'react'

// The schedule is the ONLY runtime data. Everything else on the page is hardcoded.
// Fetch with a RELATIVE path so it resolves correctly when the build is served
// from inside /archive/<edition-slug>/ as well as from the domain root.
export default function Program() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'success'

  useEffect(() => {
    let active = true

    fetch('./data/program.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!active) return
        setData(json)
        setStatus('success')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section id="program" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-8 py-20 md:py-24">
        <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Program</h2>
        <p className="mb-16 max-w-3xl font-body text-lg text-text-muted">
          The seminar unfolds over two days and follows three movements of learning, sharing
          and doing. On the first day <span className="italic text-accent font-medium">invited experts</span> open the conversation and <span className="italic text-accent font-medium">researchers from Bologna and Copenhagen</span> share concrete use cases from their work. The second day turns
          those exchanges into practice with a <span className="italic text-accent font-medium">hackathon</span> devoted to building efficient and
          creative AI pipelines.
        </p>

        {status === 'loading' && (
          <p className="font-body text-sm text-text-muted" role="status" aria-live="polite">
            Loading program…
          </p>
        )}

        {status === 'error' && (
          <p className="font-body text-sm text-accent" role="alert">
            The program could not be loaded. Please refresh the page or try again later.
          </p>
        )}

        {status === 'success' && (
          <div>
            {data.days.map((day) => <Day key={day.id} day={day} />)}
          </div>
        )}
      </div>
    </section>
  )
}

function Day({ day }) {
  return (
    <div className="py-12 first:pt-0">
      <h3 className="mb-10 font-heading text-3xl italic font-semibold">{day.date}</h3>

      {/* Sessions are stacked one below the other (full width) for readability. */}
      <div className="space-y-14">
        {day.sessions.map((session) => (
          <Session key={session.id} session={session} />
        ))}
      </div>
    </div>
  )
}

function Session({ session }) {
  return (
    <div>
      <p className="font-heading text-2xl italic font-medium">{session.label}</p>
      <p className="mb-5 mt-1 font-body text-sm font-bold uppercase tracking-widest text-accent">
        {session.theme}
      </p>

      <dl className="border-t border-border">
        {session.slots.map((slot) => (
          <Slot key={slot.id} slot={slot} />
        ))}
      </dl>
    </div>
  )
}

function Slot({ slot }) {
  const isKeynote = slot.type === 'keynote'
  const isBreak = slot.type === 'break'

  return (
    <div
      className={`border-b border-border py-4 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-x-8 ${
        isKeynote ? 'border-l-2 border-l-accent pl-4 sm:pl-6' : ''
      }`}
    >
      <dt className="mb-1 font-body text-sm tabular-nums text-text-muted sm:mb-0 sm:pt-0.5">
        {slot.time}
      </dt>

      <dd className="max-w-2xl">
        {isBreak ? (
          <span className="font-body text-sm uppercase tracking-wide text-text-muted">
            {slot.title}
          </span>
        ) : (
          <>
            <span className="block font-body text-lg leading-snug text-text-base font-medium">
              {slot.speaker}
            </span>
            <span className="mt-0.5 block font-body text-lg italic leading-snug text-text-muted">
              {slot.title}
            </span>
          </>
        )}
      </dd>
    </div>
  )
}
