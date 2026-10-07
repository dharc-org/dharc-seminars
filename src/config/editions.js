// Past editions for the "Previous Editions" nav dropdown.
//
// Normally you add one entry here each time an edition is archived, pointing at
// its in-repo URL: https://<org>.github.io/dharc-seminars/archive/<slug>/
//
// The 2025 edition is a SPECIAL hardcoded case: it lived in a separate repo and
// is already published at its own GitHub Pages URL, so we link to it directly
// rather than to an /archive/ folder in this repo. This coexists fine with the
// normal flow — future editions are archived into this repo's /archive/ and added
// below with their in-repo URLs, newest-first.
//
// If this array is empty, the dropdown is hidden entirely.
export const pastEditions = [
  {
    name: "Building Knowledge Landscapes Across the Digital Humanities",
    slug: "dharc-x-dhlab-seminars",
    year: 2025,
    url: "https://dharc-org.github.io/dharc-x-dhlab-seminars/",
  },
];
