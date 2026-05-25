# 🚀 Sakr Makes — Portfolio Website

> **Mohamed Sakr** | Founder of Sakr Makes · AI & ML Engineer · Computer Engineering Student

[![Live Demo](https://img.shields.io/badge/Live-Demo-edbc87?style=for-the-badge&logo=github)](https://github.com/M0hamedSakr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mohamed_Sakr-0077b5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mohamed-sakr-15b674279/)
[![GitHub](https://img.shields.io/badge/GitHub-M0hamedSakr-24292e?style=for-the-badge&logo=github)](https://github.com/M0hamedSakr)
[![YouTube](https://img.shields.io/badge/YouTube-SAKRMAKES-ff0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/@SAKRMAKES)

---

## 📖 Overview

A **cinematic, fully animated personal portfolio** for **Mohamed Sakr** — Founder of *Sakr Makes*, a creative maker brand at the intersection of Artificial Intelligence, 3D printing, and smart hardware prototyping.

The site is built with **pure HTML, CSS & JavaScript** (no frameworks), featuring a premium dark-mode design with interactive particle canvas, holographic HUD animations, a cinematic intro screen, and a fully dynamic data-driven architecture powered by `data.json`.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Cinematic Intro** | Full-screen logo animation with orbiting micro-particles and glow rings |
| 🌌 **Particle Canvas** | Interactive WebGL-style particle network that reacts to mouse movement |
| 🌙 **Dark / Light Theme** | Smooth toggle with localStorage persistence |
| ⌨️ **Typing Animation** | Auto-cycling role titles with blinking cursor effect |
| 🖼️ **HUD Profile Ring** | Concentric holographic rings with radar sweep around the profile photo |
| 📱 **Fully Responsive** | Mobile-first design with hamburger navigation |
| 🔍 **Project Filter** | Category-based filtering (Robotics, AI & Software, Web Dev) |
| 📊 **Data-Driven** | All content loaded dynamically from `data.json` with offline fallback |
| 🎯 **SEO Optimized** | Open Graph, Twitter Cards, JSON-LD Schema.org structured data |
| ✨ **Micro-Animations** | Hover effects, scroll-reveal animations, 3D tilt on profile photo |

---

## 🗂️ Project Structure

```
Sakr makes/
│
├── index.html          # Main HTML — structure, SEO meta, JSON-LD schema
├── style.css           # Complete design system — variables, animations, components
├── script.js           # All interactivity — canvas, intro, theme, data rendering
├── data.json           # Single source of truth for all dynamic content
│
├── Logo.jpeg           # Sakr Makes brand logo
├── Mohamed Sakr.png    # Profile photo (hero section)
│
└── *.jfif              # Project photos (Cleaner Robot, Mobile Car, Smart Wheelchair…)
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure, accessibility, SEO metadata
- **CSS3** — Custom design system with CSS variables, glassmorphism, keyframe animations
- **Vanilla JavaScript (ES6+)** — DOM manipulation, Canvas API, Fetch API
- **Font Awesome 6** — Icon library
- **Google Fonts** — Inter, Outfit, Fira Code

> ⚡ Zero dependencies. No frameworks. No build step required.

---

## 📂 Sections

### 🏠 Hero
Full-screen landing with animated brand showcase card, typing effect, interactive HUD profile ring, and social bar links.

### 💼 Experience
Professional timeline including:
- **Founder** — Sakr Makes *(Content Creation & Engineering, Dec 2025 – Present)*
- **Vice Chair** — IEEE MET CSC *(Part-time, Sep 2025 – Present)*
- **IT Support Specialist** — Let's Know Training Center *(Internship, Jan–Jun 2025)*

### 🧪 Projects
Filterable showcase of 6 projects across 3 categories:

| Project | Category | Key Tech |
|---|---|---|
| 🤖 Cleaner Robot | Robotics & Hardware | Arduino, ESP32-CAM, Fusion 360 |
| 📱 Generate QRCode | AI & Software | Python, Tkinter, Pandas |
| 🚗 Mobile Car | Robotics & Hardware | Arduino, Fusion 360, C++ |
| 💊 My Health | AI & Software | Python, Twilio API, Tkinter |
| 🛒 TRIAGO | Web Dev | HTML5, CSS3, JavaScript |
| ♿ Smart Wheelchair | Robotics & Hardware | Arduino, Sensors, IMU |

### 🏆 Certifications
8 professional certifications from HUAWEI, NVIDIA, ICPC Foundation, Sprint, MakerTech, Programming Hero, and Creative.

### 🔗 Links Hub
Centralized directory of all official profiles: LinkedIn, GitHub, Facebook, Instagram, YouTube, TikTok, MakerWorld, Email, WhatsApp.

### 👤 About & Leadership
Deep-dive cards for Sakr Makes brand, IEEE MET CSC leadership, and skills overview (AI/ML, Languages, Core Strengths).

---

## 🚀 Getting Started

No build tools or installation required. Simply open the file in a browser:

```bash
# Option 1 — Direct open
# Double-click index.html

# Option 2 — Local server (recommended to avoid CORS on data.json)
npx serve .
# or
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

---

## 🎨 Design System

The project uses a CSS custom property token system defined in `:root` and `[data-theme="light"]`:

```css
--accent-color: #edbc87;      /* Warm gold — primary accent */
--font-heading: 'Outfit';     /* Display / headings */
--font-body:   'Inter';       /* Body copy */
--glass-bg:    rgba(15,14,13,0.78); /* Glassmorphism background */
```

---

## 📡 Content Management

All dynamic content is managed through [`data.json`](./data.json). To update your portfolio without touching HTML or JS, simply edit the JSON file:

```json
{
  "profile":        { ... },   // Name, bio, title, avatar
  "socials":        [ ... ],   // Hero social bar links
  "links":          [ ... ],   // Links Hub section
  "experience":     [ ... ],   // Professional timeline
  "certifications": [ ... ],   // Certifications grid
  "projects":       [ ... ]    // Projects showcase
}
```

---

## 🔗 Connect with Mohamed Sakr

| Platform | Link |
|---|---|
| 🌐 GitHub | [github.com/M0hamedSakr](https://github.com/M0hamedSakr) |
| 💼 LinkedIn | [linkedin.com/in/mohamed-sakr-15b674279](https://www.linkedin.com/in/mohamed-sakr-15b674279/) |
| 📸 Instagram (Personal) | [@mohamed_sakre_______](https://www.instagram.com/mohamed_sakre_______/) |
| 📸 Instagram (Brand) | [@sakr.makes](https://www.instagram.com/sakr.makes/) |
| 📘 Facebook (Brand) | [facebook.com/sakr.makes](https://www.facebook.com/sakr.makes) |
| 🎥 YouTube | [@SAKRMAKES](https://www.youtube.com/@SAKRMAKES) |
| 🎵 TikTok | [@sakr_makes](https://www.tiktok.com/@sakr_makes) |
| 🖨️ MakerWorld | [makerworld.com/@saKR](https://makerworld.com/en/@saKR) |
| 📧 Email | [mo.sakr1400@gmail.com](mailto:mo.sakr1400@gmail.com) |

---

## 📄 License

© 2025 **Sakr Makes** by Mohamed Sakr. All rights reserved.

> *"Engineering ideas into reality."*
