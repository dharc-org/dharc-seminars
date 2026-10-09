import { useEffect, useRef, useState } from 'react'
import { currentEdition } from '../config/edition.js'
import { pastEditions } from '../config/editions.js'

const ANCHORS = [
  { href: '#program', label: 'Program' },
  { href: '#about', label: 'About' },
  { href: '#committee', label: 'Scientific Committee' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const hasPastEditions = pastEditions.length > 0

  // Close the desktop dropdown on outside click / Escape.
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white">
      <nav className="flex h-16 w-[100%] items-center justify-between px-[10%]">
        {/* Brand — scrolls to top */}
        <a
          href="#hero"
          onClick={closeAll}
          className="font-body text-xl text-text-base transition-colors hover:text-accent font-medium"
        >
          {currentEdition.seriesName}
        </a>
        
        <p className="hidden md:block text-accent">[II edition]</p>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {ANCHORS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-md text-text-base transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}

          {hasPastEditions && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-1 font-body text-md text-text-base transition-colors hover:text-accent"
              >
                Previous Editions
                <span aria-hidden="true" className="text-xs">
                  {dropdownOpen ? '−' : '+'}
                </span>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-3 w-72 border border-border bg-white py-2">
                  {pastEditions.map((edition) => (
                    <li key={edition.slug}>
                      <a
                        href={edition.url}
                        onClick={closeAll}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 font-body text-sm text-text-base transition-colors hover:text-accent"
                      >
                        <span className="italic" >{edition.name}</span>
                        <span className="text-text-muted"> — {edition.year}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-text-base transition-transform ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span className={`block h-px w-6 bg-text-base transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`block h-px w-6 bg-text-base transition-transform ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <ul className="px-[10%] py-4">
            {ANCHORS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeAll}
                  className="block py-3 font-body text-sm text-text-base transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}

            {hasPastEditions && (
              <li className="border-t border-border pt-3">
                <p className="py-1 font-body text-xs uppercase tracking-widest text-text-muted">
                  Previous Editions
                </p>
                {pastEditions.map((edition) => (
                  <a
                    key={edition.slug}
                    href={edition.url}
                    onClick={closeAll}
                    className="block py-2 font-body text-sm text-text-base transition-colors hover:text-accent"
                  >
                    <span className="italic">{edition.name}</span>
                    <span className="text-text-muted"> — {edition.year}</span>
                  </a>
                ))}
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
