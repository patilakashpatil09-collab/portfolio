# Personal Portfolio — Static Template

This is a static, responsive personal portfolio template built with plain HTML, CSS, and JavaScript. It includes animated UI elements and sections for:

- About
- Professional Summary
- Skills (animated progress bars)
- Experience (timeline)
- Contact form (Formspree fallback to mailto)
- Resume download

## How to use

1. Clone or copy the files into a folder.
2. Replace `assets/avatar.jpg` with your photo.
3. Replace `assets/resume.pdf` with your resume PDF.
4. Edit the copy (name, summary, skills, experiences) in `index.html`.
5. Optional: swap the Formspree `action` in the contact form with your Formspree endpoint or remove it to use the mailto fallback.

## Files

- `index.html` — main page
- `styles.css` — styling and animations
- `script.js` — interactivity (typing, reveal, skill animation, form handling)
- `assets/` — put avatar.jpg, resume.pdf, favicon.png here

## Customize tips

- Change colors in `:root` variables in `styles.css`.
- Add more skills by copying the `.skill` block in `index.html`.
- Replace icons with your social links (Font Awesome is used via CDN).

## Deployment

This is a static site — you can deploy it to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Accessibility & Performance

- Uses semantic tags and progressive enhancement.
- Animations are subtle and reduced motion respectful by default; consider adding prefers-reduced-motion checks for further accessibility.

Enjoy — and let me know if you want this converted to a React + TypeScript project, or if you want additional animated components (projects gallery, filterable portfolio, dark/light theme toggle, or deployment workflow).