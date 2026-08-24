# SUMIT KUMAR SUMAN — Professional Business Analytics Portfolio

A modern, high-performance, consulting-grade personal portfolio website tailored for **MBA Business Analytics placements** and **Business Analyst / Data Analyst / Business Intelligence** roles.

---

## 🌟 Key Features

- **Warm Editorial Magazine Palette**: Tailored creative executive design with palette `#F9F5EC` (Warm Ivory), `#40241A` (Deep Chocolate Brown), `#FCD06E` (Mustard Yellow), `#568099` (Dusty Blue), and `#E9DEC7` (Soft Beige).
- **Pure Native Stack**: Zero external UI framework bloat (No React, No Bootstrap, No Tailwind). 100% responsive Vanilla HTML5, CSS3, and ES6+ JavaScript.
- **Dynamic Modular Architecture**: 
  - `js/data.js`: Centralized data store. Update project info, metrics, skills, or links in one place.
  - `js/components.js`: Reusable UI render functions generating clean semantic markup.
  - `js/app.js`: Interactive features, counter animations, carousel navigation, modals, and event handlers.
  - `css/styles.css`: High-polish responsive styling with custom scrollbars, animations, and transitions.
- **Executive Profile Visual**: Monogram badge with floating technology indicators (Power BI, SQL, Python, Excel).
- **Interactive Project Carousel**: Touch-swipe enabled, keyboard accessible (`←` / `→`), with dynamic pagination dots and bounds handling.
- **Animated Metric Counters**: Intersection-observer driven metric counters for leads audited, projects, and leadership milestones.
- **Credential & Certificate Modals**: Interactive popup preview for the Zorgers Home Healthcare internship and technical certifications.
- **Working Contact System**: Direct mailto integration with field validation and toast notifications.

---

## 📁 Project Structure

```
Sumit_Portfolio/
│
├── index.html                  # Main entry point & semantic markup structure
│
├── css/
│   └── styles.css              # Custom consulting styling, variables & media queries
│
├── js/
│   ├── data.js                 # Central portfolio content data store
│   ├── components.js           # HTML generator components & SVG icons
│   └── app.js                  # Interactions, animations, carousel & event handlers
│
├── assets/
│   ├── certificates/           # Certificate PDFs and images
│   ├── resume/                 # Resume PDF files
│   └── zorgers_logo.png        # Company logo
│
└── README.md                   # Documentation & guide
```

---

## 🚀 How to Run Locally

You can run the portfolio using any static file server:

### Option 1: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 2: Node.js `npx serve` or `http-server`
```bash
# In the project root directory:
npx serve .
# or
npx http-server -p 8080
```

### Option 3: Python Built-in Server
```bash
# In the project root directory:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## ✏️ How to Edit Content Later

All content is cleanly organized in **`js/data.js`**. You can update any text without touching the HTML markup:

1. **Personal Information & Links**: Edit `portfolioData.personal` (email, LinkedIn, GitHub, resume link).
2. **About Me & Skills**: Edit `portfolioData.about` and `portfolioData.skills`.
3. **Education**: Add or update entries in `portfolioData.education`.
4. **Experience & KPIs**: Modify `portfolioData.experience`.
5. **Projects**: Update or add projects in `portfolioData.internshipProjects` and `portfolioData.featuredProjects`.
6. **Certifications**: Add new IBM or industry credentials in `portfolioData.certifications`.
7. **Leadership**: Edit `portfolioData.activities`.

---

## 📱 Responsive Breakpoints Tested
- **Desktop**: 1440px / 1200px
- **Tablet**: 768px / 992px
- **Mobile**: 480px / 375px
