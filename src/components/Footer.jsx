// Hardcoded. The footer is the ONLY section with a dark background.
// Colors come from theme.css variables (no hardcoded hex): the dark surface is
// --color-text and the light text/boxes are --color-bg / --color-text-muted.
// Logos are loaded with RELATIVE paths so they resolve from /archive/<slug>/ too.
const logos = [
  {
    src: './logos/unibo_inv.png',
    alt: 'University of Bologna logo',
    href: 'https://www.unibo.it/en',
  },
  {
    src: './logos/boldh.svg',
    alt: 'BoLDH logo',
    href: 'https://dharc-org.github.io/boldh/',
  },
  {
    src: './logos/aiucd.svg',
    alt: 'AIUCD logo',
    href: 'https://www.aiucd.it/',
  },
/*   {
    src: './logos/dharc.svg',
    alt: '/DH.arc logo',
    href: 'https://centri.unibo.it/dharc/en',
  },
  {
    src: './logos/cdch.svg',
    alt: 'CDCH logo',
    href: 'https://cdch.ku.dk/'
  } */
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-[var(--color-bg)]">
      <div className="mx-auto max-w-5xl px-8 py-16">
        {/* Partner / institution logos */}
        <p className="mb-8 font-body text-xs uppercase tracking-[0.15em] text-[var(--color-bg)]">
          With the support of
        </p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <a
              key={logo.href}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-opacity hover:opacity-70"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto rounded-none object-contain md:h-14"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-14 border-t border-[var(--color-text-muted)]/40 pt-8 font-body text-sm text-[var(--color-bg)]">
          © 2026 /DH.arc seminars — University of Bologna
        </p>
      </div>
    </footer>
  )
}
