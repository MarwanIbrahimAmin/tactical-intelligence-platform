# AI-Powered Football Tactical Intelligence Platform ⚽🤖

> **Graduation Project & Startup Prototype** — Transforming raw football tracking data into explainable, evidence-linked tactical intelligence for coaches, analysts, and academies.

[![Platform Stage](https://img.shields.io/badge/Stage-Fully%20Working%20Prototype-1F9D55?style=for-the-badge)](https://github.com/MarwanIbrahimAmin/tactical-intelligence-platform)
[![Built with React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 1. The Problem

Modern football analytics relies heavily on Electronic Performance and Tracking Systems (EPTS) and Computer Vision to capture high-frequency spatial tracking data (25+ frames per second for 22 players and the ball). Despite this abundance of data, football coaches, performance analysts, and academies face four critical bottlenecks:

1. **Information Overload & Raw Data Complexity**: Raw tracking coordinates, speed logs, and static heatmaps overwhelm analysts without providing immediate tactical meaning. Technical staff spend hours manually annotating match footage.
2. **The "Black-Box" AI Problem**: Conventional sports analytics platforms output arbitrary ratings or assertions (e.g., *"defensive block collapsed"*) without explaining **why**, **when**, or offering verifiable telemetry evidence. Coaches cannot trust recommendations they cannot inspect.
3. **Static Averages vs. Dynamic Match Context**: Standard dashboards aggregate metrics over an entire 90 minutes. They ignore phase shifts (*Build-Up*, *High Press*, *Defensive Transition*) and miss instantaneous structural breakdowns between tactical plans and on-pitch reality.
4. **Gap Between Tactical Intent and Pitch Reality**: Coaches set tactical game plans, but current tools cannot automatically measure the exact discrepancy between what a team *should* be doing versus what *actually* happened on the pitch.

---

## 💡 2. The Solution & Core AI Idea

The **AI-Powered Football Tactical Intelligence Platform** bridges raw spatial tracking data and actionable coaching decisions by deploying an automated, context-aware, and explainable Expected vs. Actual intelligence engine.

### Core Concept: Expected vs. Actual Tactical Intelligence

Instead of calculating static match averages, the platform dynamically computes the **Expected Tactical State** for any given game phase and context, comparing it directly against the **Actual Tactical State** measured on the pitch.

```
       ┌─────────────────────────────────────────┐
       │   Match Video / EPTS Coordinate Feed    │
       └────────────────────┬────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────┐
       │   Pitch-Normalized Spatial Coordinates  │
       │        (22 Players + Ball: x, y)        │
       └────────────────────┬────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────┐
       │         Feature Fusion Vector           │
       │    (24 Raw Spatial → 7 Tactical Dims)   │
       └──────────┬───────────────────┬──────────┘
                  │                   │
                  ▼                   ▼
       ┌─────────────────────┐ ┌─────────────────────┐
       │   Expected State    │ │    Actual State     │
       │  (Context Ideal)    │ │   (Pitch Reality)   │
       └──────────┬──────────┘ └──────────┬──────────┘
                  │                       │
                  └───────────┬───────────┘
                              │
                              ▼
       ┌─────────────────────────────────────────┐
       │       Tactical Deviation Engine         │
       │   (Width, Depth, Compactness, Lines)    │
       └────────────────────┬────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────┐
       │   Explainable Evidence & Decision Hub   │
       │  (Pitch Keyframe, Video Proof, Metrics) │
       └─────────────────────────────────────────┘
```

---

## 🔥 3. Key Differentiator: Explainable AI (XAI)

Every insight generated adheres to strict explainability guidelines. The system **never** makes an unbacked assertion:

* **Tactical Context**: Exact match timestamp, active phase (*Defensive Transition*, *Pressing*, *Build-Up*), and ball location.
* **Quantified Deviation**: Measured metrics (Team Width, Depth, Compactness Area $m^2$, Line Spacing) contrasted against contextual benchmarks with severity grading (*Aligned*, *Moderate*, *Significant*).
* **Confidence & Data Quality**: Clear confidence ratings paired with tracking sensor health metrics (pitch calibration error, track continuity).
* **Visual Evidence**: Synchronized 2D pitch keyframes featuring player velocity vectors, centroids, defensive line depths, and time-series metric graphs.

---

## ✨ 4. Platform Modules & Coach Navigation

The platform provides a streamlined, coach-centric workflow organized into four primary views and dedicated intelligence drawers:

### 1. 📊 Match Summary ("What happened?")
* High-level match outcomes, score dynamics, and key performance indicators.
* Real-time tactical metrics cards (Width, Depth, Compactness, Defensive Line Height, High-Intensity Distance).
* Executive timeline of critical match moments and tactical shifts.

### 2. 🧠 Tactical Analysis ("How did the team play?")
* **Interactive 2D Pitch Canvas**: Real-time rendering of player coordinates, speed vectors, centroids, and hull compactness polygons.
* **Expected State Overlay**: Toggleable visual overlay showing where players were expected to be positioned vs. where they actually were.
* **90-Minute Simulation Scrubber**: Interactive timeline slider allowing instant replay and inspection of any match second.
* **Tactical Deviation Cards**: Real-time alerts highlighting structural vulnerabilities and line separation.

### 3. 👥 Player Analysis ("Who needs attention?")
* Detailed player roster with position-specific physical and tactical workload telemetry.
* High-intensity running distance ($km$), top speeds, sprint counts, accelerations, and decelerations.
* Player zone occupancy percentages and spatial heatmaps.

### 4. 📁 Evidence & Insights ("Proof & metrics")
* 3-panel synchronized evidence verification: match scenario details, video clip placeholders, and numerical trend graphs.
* Direct correlation between tactical breakdown statements and empirical tracking data.

### ⚙️ Dedicated Intelligence Modals
* **How AI Works (ML Pipeline)**: 10-step visual pipeline explaining how raw broadcast/EPTS data transforms into evidence-linked intelligence.
* **Platform Settings**: Configurable tactical deviation thresholds (Compactness, Width, Line Spacing) and model inference modes.
* **Matches Archive & Benchmarking**: Historical performance comparisons across multiple matches.
* **Import & Process Match Data**: Data acquisition pipeline for uploading new match video and sensor streams.
* **Sensor Quality & Telemetry Assurance**: Monitoring tracking continuity, identity switches, missing frames, and pitch calibration error.

---

## 🛠️ 5. Technology Stack

* **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite 5](https://vitejs.dev/)
* **Styling & Design System**: [TailwindCSS 3.4](https://tailwindcss.com/) (Athletic Emerald `#1F9D55` & Clean Slate Design System)
* **Data Visualization**: [Recharts](https://recharts.org/) & Custom HTML5 Canvas / SVG Pitch Rendering
* **Icons**: [Lucide React](https://lucide.dev/)
* **Business Model**: Comprehensive Business Model Canvas included ([Football_Tactical_Intelligence_BMC.pdf](file:///media/amin/data/CIS/Graduation%20Project/Prototype/Football_Tactical_Intelligence_BMC.pdf))

---

## 🚀 6. Getting Started

### Prerequisites

Ensure Node.js (v18 or higher) and npm are installed:
```bash
node -v
npm -v
```

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MarwanIbrahimAmin/tactical-intelligence-platform.git
   cd tactical-intelligence-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 7. Project Structure

```
├── src/
│   ├── components/
│   │   ├── common/        # Header, Sidebar, MetricCard
│   │   ├── evidence/      # Synchronized video/pitch player
│   │   ├── insights/      # Tactical insights cards
│   │   ├── pitch/         # PitchCanvas, ExpectedActualPitch, Timeline, Controls
│   │   └── tactical/      # FeatureFusionPanel, TacticalIntelligenceCard
│   ├── data/              # Mock match, player, and tactical events data
│   ├── pages/             # DashboardOverview, TacticalAnalysis, PlayerAnalysis, etc.
│   ├── services/          # 90-min Deterministic Match Simulation Engine
│   ├── types/             # TypeScript domain models (tactical.ts)
│   ├── App.tsx            # Main application shell & intelligence modals
│   └── main.tsx           # Application entry point
├── Football_Tactical_Intelligence_BMC.pdf # Business Model Canvas
├── index.html             # HTML entry document
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS theme configuration
└── vite.config.ts         # Vite build configuration
```

---

## 📝 8. Team & License

* **Project**: AI-Powered Football Tactical Intelligence Platform
* **Team**: **VisionTactics AI**
* Developed as a Graduation Project & Pre-Seed Startup Prototype.
