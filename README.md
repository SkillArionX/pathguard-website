# 𝑵𝑨𝑽𝑰𝑿 Website (HTML · CSS · JavaScript)

A plain static website — no React, no Node.js, no build step.

## Run it
Double-click `index.html`, or serve the folder with any static server
(for example `python3 -m http.server` and open http://localhost:8000).
An internet connection is needed for the Inter font (Google Fonts) and the
Unsplash photos in the Use Cases and Features cards.

## Files
```
index.html          all page content (header, hero, sections, footer)
css/styles.css      all styling (responsive breakpoints at 1320 / 1180 / 1100 / 760 px)
js/script.js        mobile menu · scroll-reveal · use-case carousel · product gallery · demo form
images/             logo, hero image, product gallery images (+ small -thumb versions)
```

## Common edits
- **Logo** — `images/pathguard-logo.png` is the full-size transparent logo; `images/pathguard-logo-sm.png`
  is the pre-sized version used in the header/footer (shown on a white badge so the navy artwork stays clear).
  Replace both if the logo changes.
- **Hero callouts** — text lives in `index.html` (`.callout` blocks). Their positions are percentages of the
  hero image (`.c-camera`, `.c-cpu`, … in `css/styles.css`); the leader lines are the `<polyline>` points in the
  hero `<svg>` in `index.html`.
- **Use-case cards** — text/images are in the `scenarios` array at the top of the carousel section of
  `js/script.js` (the first four are also written in `index.html`, so keep them in sync).
- **Product gallery** — the `productViews` array in `js/script.js`, plus the matching `-thumb.jpg` files.
  `native: true` shows a small source photo at close to its real size; remove it once you have a
  1200px+ original.
- **Contact form** — demo only: nothing is sent anywhere. Connect it to a backend/email service
  to enable delivery.
