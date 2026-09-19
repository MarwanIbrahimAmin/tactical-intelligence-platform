Build a high-fidelity interactive prototype for a graduation project called:

**AI-Powered Football Tactical Intelligence Platform**

## 1. Product Vision

Create a modern football analysis platform that transforms football match data into understandable tactical intelligence for coaches, analysts, academies, and semi-professional teams.

The platform should visually demonstrate this workflow:

**Raw Match Data → Player Tracking → Pitch-Normalized Game State → Tactical Metrics → Tactical Pattern Detection → Evidence → Analyst Dashboard**

The prototype does NOT need to implement real computer vision, machine learning, or live tracking. Instead, use realistic mock data to simulate the complete experience.

The prototype should make the user feel that an actual football analytics engine is operating behind the interface.

The key product differentiator is:

**Every tactical insight must be explainable and evidence-linked.**

An insight should never simply say that something happened. It should show:
- What happened
- When it happened
- Which metric supports it
- Confidence
- Data quality
- Supporting pitch visualization and/or video clip placeholder

---

# 2. Target Users

Design primarily for:

1. Football coaches
2. Performance analysts
3. Football academies
4. Semi-professional clubs
5. Player-development staff

The interface should be professional enough to resemble a serious sports-performance platform, not a generic BI dashboard.

---

# 3. Main Application Structure

Create a responsive web application with a dark, professional sports-analytics design.

Use a left sidebar navigation and a main content area.

Sidebar:

- Overview
- Matches
- Tactical Analysis
- Players
- Team Shape
- Physical Performance
- Evidence Review
- Data Quality
- Settings

At the top of the application provide:

- Club/team name
- Current selected match
- Competition
- Date
- Data-source status
- User/profile icon

Use realistic football terminology throughout the application.

---

# 4. Dashboard / Overview Page

Create a professional Match Overview dashboard.

Header:

**Al Ahly Academy vs Zamalek Academy**

Subtitle:

**U19 League — Match Analysis**

Show match score:

**2 — 1**

Add match date and duration.

Below the header, display KPI cards:

- Team Width
- Team Depth
- Compactness
- Avg. Defensive Line
- High-Intensity Distance
- Tactical Events
- Data Quality

Use realistic values such as:

Width: 41.8 m  
Depth: 32.6 m  
Compactness: 285 m²  
Defensive Line: 27.4 m  
High-Intensity Distance: 1.84 km  
Tactical Events: 17  
Data Quality: 94%

Show trend indicators where appropriate.

---

# 5. Main Pitch Visualization

The most important element of the dashboard should be a large interactive football pitch.

Display:

- 11 players for the selected team
- Opponent players
- Player positions
- Team centroid
- Defensive line
- Attacking line
- Passing/spacing relationships
- Optional movement trails

Use a realistic football pitch.

Allow the user to switch between:

- Current Position
- Team Shape
- Heatmap
- Movement
- Compactness
- Width & Depth

When selecting a player, highlight that player and display a small information card.

Example:

**Player #8 — Ahmed**

Position:
Central Midfielder

Current Speed:
6.8 km/h

Distance:
8.7 km

High-Intensity:
1.2 km

Zone:
Central Midfield

---

# 6. Tactical Timeline

Below the pitch create a horizontal match timeline.

The timeline should contain:

- Match time
- Important events
- Tactical events
- Possession changes
- Goals
- Cards
- Tactical pattern markers

Example markers:

**23:14 — Loss of Compactness**

**31:42 — Increased Attacking Width**

**48:07 — Pressing Structure**

**67:31 — Defensive Line Separation**

Clicking an event should update the pitch visualization and evidence panel.

---

# 7. Tactical Insights Panel

Create a panel titled:

**AI Tactical Insights**

Display several insight cards.

Example:

### Loss of Defensive Compactness

**Time:** 23:14 – 23:20

**Confidence:** 91%

**Evidence:**
Team compactness increased from 218 m² to 347 m².

**Interpretation:**
The team became significantly more horizontally and vertically dispersed immediately after losing possession.

Include:

- Confidence indicator
- Metric
- Timestamp
- "View Evidence" button

Another example:

### Increased Attacking Width

**Time:** 54:31 – 54:48

**Confidence:** 87%

**Evidence:**
Team width increased from 34.2 m to 47.8 m.

**Interpretation:**
The attacking structure expanded across the pitch during the possession phase.

Do NOT generate unsupported tactical claims.

The AI should only verbalize information supported by measurable data.

---

# 8. Evidence Review

Create a dedicated Evidence Review page.

When the user opens an insight, show:

### Tactical Event

**Loss of Defensive Compactness**

**23:14 – 23:20**

Display three synchronized panels:

### A. Video Evidence

Create a large video-player placeholder.

It should look like an actual football video player.

Overlay:

- Timestamp
- Tracking boxes
- Player IDs
- Tactical annotations

Include playback controls.

The video itself can be simulated using a placeholder image or dark video frame.

### B. Pitch Evidence

Display the football pitch with player positions during the selected interval.

Show:

- Team positions
- Opponent positions
- Team centroid
- Compactness boundary
- Movement arrows

### C. Numerical Evidence

Display a small chart showing:

Time → Compactness

Example:

23:10 → 221 m²  
23:12 → 236 m²  
23:14 → 281 m²  
23:16 → 312 m²  
23:18 → 347 m²  
23:20 → 338 m²

Clearly show the moment when the tactical event was detected.

---

# 9. Tactical Analysis Page

Create a detailed tactical-analysis page.

Sections:

### Team Structure

Display:

- Width
- Depth
- Compactness
- Line spacing
- Centroid
- Zone occupancy

### Tactical Patterns

Display:

- Loss of Compactness
- Attacking Width Change
- Defensive Line Separation
- Pressing Structure
- Coordinated Off-Ball Movement

Each tactical pattern should have:

- Number of occurrences
- Average duration
- Confidence
- Match comparison

Create charts for these metrics.

---

# 10. Team Shape Page

Create a dedicated Team Shape analysis page.

Show several pitch snapshots:

**Build Up**

**Attacking Phase**

**Defensive Phase**

**Defensive Transition**

Each snapshot should visualize the team's spatial organization.

Include metrics:

Width  
Depth  
Compactness  
Average Inter-player Distance  
Line Separation

Allow the user to move through time using a slider.

The pitch should update as the timeline changes.

---

# 11. Player Analysis Page

Create a player comparison interface.

Left side:

Player list.

Right side:

Selected player's analysis.

Display:

- Position
- Minutes Played
- Distance Covered
- Average Speed
- Maximum Speed
- High-Intensity Distance
- Sprint Count
- Heatmap
- Zone Occupancy
- Movement Profile

Add a comparison mode where two or three players can be compared.

Example:

**Player 8 vs Player 6**

Use charts rather than excessive text.

---

# 12. Physical Performance Page

Create a physical-performance dashboard.

Show:

- Total Distance
- High-Speed Running
- Sprint Distance
- Accelerations
- Decelerations
- Maximum Speed
- Workload

Use charts over match time.

Include a pitch heatmap.

Make it clear that these metrics may come from sensor/EPTS data when available.

Do not imply that they are always available from video.

---

# 13. Data Quality Page

This is an important part of the project.

Create a page showing the reliability of the underlying data.

Display:

Tracking Quality: 93%

Identity Consistency: 96%

Missing Data: 2.7%

ID Switches: 14

Track Continuity: 94%

Pitch Calibration Error: 0.43 m

Processing Status:

Detection ✓  
Tracking ✓  
Pitch Calibration ✓  
Synchronization ✓  
Tactical Detection ✓

Show warnings where necessary.

Example:

**Warning**

17 seconds of tracking data contain reduced confidence due to player occlusion.

The interface should communicate that the system does not blindly trust its own output.

---

# 14. Match Comparison

Create a page where analysts can compare matches.

Example:

Match 1 vs Match 2 vs Match 3

Compare:

- Average Width
- Average Depth
- Compactness
- Tactical Events
- Pressing Events
- Defensive Transitions
- Physical Load

Allow filtering by:

- Match
- Phase
- Player
- Tactical Event

Use clean comparison charts.

---

# 15. Data Acquisition Screen

Create an initial workflow page showing how a new match enters the platform.

Title:

**Create New Match Analysis**

Provide three acquisition modes:

### Video Analysis

Upload Match Video

Supported formats:
MP4, MOV

### Tracking Data

Upload Tracking Dataset

Supported formats:
CSV, JSON

### Hybrid Analysis

Upload synchronized:

Video + Tracking Data

Show the workflow:

Upload → Validate → Calibrate → Track → Synchronize → Analyze

This is important because the project's architecture supports video, sensor/tracking, or synchronized multimodal inputs.

---

# 16. Processing Screen

After uploading a match, simulate an AI processing workflow.

Show a step-by-step progress interface:

1. Video ingestion
2. Player detection
3. Player tracking
4. Team identification
5. Pitch calibration
6. Coordinate transformation
7. Game-state reconstruction
8. Tactical pattern detection
9. Evidence generation
10. Report generation

Each stage should show:

- Status
- Progress
- Processing time

Example:

**Player Tracking**

Completed

Processing time:
02:14

Tracking confidence:
95.8%

---

# 17. Evidence-Based Insight Architecture

Internally model every insight as:

```text
Insight
├── Statement
├── Tactical Pattern
├── Start Time
├── End Time
├── Metric
├── Metric Value
├── Confidence
├── Data Quality
├── Evidence Reference
└── Visualization
```

The UI should reflect this structure.

For example:

**Insight: Loss of Compactness**

Pattern:
Defensive Transition

Interval:
23:14 – 23:20

Metric:
Convex Hull Area

Value:
218 → 347 m²

Confidence:
91%

Data Quality:
94%

Evidence:
Video + Pitch Plot

---

# 18. Important Product Philosophy

The platform must NOT behave like a generic chatbot.

Avoid excessive natural-language AI summaries.

The core product is:

**Measurement + Detection + Evidence + Visualization**

not:

**Chatbot + Generic Football Advice**

AI-generated text should only explain validated measurements.

For example:

GOOD:

"Team width increased by 13.6 m between 54:31 and 54:48."

BAD:

"The team played very intelligently during this period."

The second statement is subjective and unsupported.

---

# 19. Design Language

Create a premium sports-technology visual style.

Design characteristics:

- Dark theme
- Professional football analytics aesthetic
- Clean cards
- High information density
- Strong hierarchy
- Modern typography
- Subtle borders
- Minimal rounded corners
- Professional charts
- Large football-pitch visualizations
- Tactical green/pitch elements
- Neutral dark backgrounds
- Accent color for AI/tactical insights

Do NOT make it look like a cryptocurrency dashboard, generic SaaS dashboard, or gaming website.

It should feel closer to:

**Professional Football Analytics + Modern Sports Science Platform**

---

# 20. Interaction Requirements

The prototype should be genuinely interactive.

At minimum:

- Sidebar navigation works
- Match selector works
- Timeline changes selected moment
- Tactical event cards open evidence
- Player selection updates player information
- Pitch visualization changes with selected event
- Filters work
- Tabs work
- Charts update when appropriate
- Evidence review opens from insight cards
- Match comparison works
- Processing workflow can be demonstrated

Use realistic mock data throughout the application.

---

# 21. Prototype Data

Create realistic sample data for:

Teams:
- Al Ahly Academy
- Zamalek Academy

Players:
- 11 players per team

Match:
Al Ahly Academy 2 – 1 Zamalek Academy

Duration:
90 minutes

Generate realistic player coordinates, speeds, team-shape metrics, tactical events, confidence values, and timestamps.

The mock data must be internally consistent.

For example, if compactness increases, the pitch visualization should visually show players becoming more compact.

If width increases, player positions should spread laterally.

---

# 22. Technical Expectations

Build the prototype using a modern frontend architecture.

Preferred:

- React
- TypeScript
- Tailwind CSS
- Component-based architecture
- Recharts or equivalent chart library
- Responsive layout
- Mock JSON data

Separate:

- UI components
- Mock data
- Tactical metrics
- Pages
- State management

Create reusable components for:

- MetricCard
- FootballPitch
- TacticalEventCard
- Timeline
- PlayerCard
- InsightCard
- EvidencePanel
- Chart
- DataQualityIndicator

Do not implement actual ML inference unless necessary for the prototype.

The architecture should make it easy to replace mock data later with real APIs/models.

---

# 23. Most Important Prototype Screens

Prioritize these screens above everything else:

1. Match Overview
2. Tactical Analysis
3. Evidence Review
4. Team Shape
5. Player Analysis
6. Data Quality
7. Match Processing

The prototype should be usable as a graduation-project demonstration.

The evaluator should immediately understand:

**Input → Tracking → Game State → Tactical Intelligence → Evidence → Decision Support**

---

# 24. Final Requirement

Make the prototype look like a real product that could eventually be deployed to football academies and semi-professional clubs.

Do not exaggerate the capabilities.

Do not claim that the system replaces coaches.

Do not invent unsupported AI capabilities.

Emphasize:

**Affordable**
**Explainable**
**Evidence-linked**
**Data-driven**
**Modality-independent**
**Research-transparent**

The final prototype should communicate that this is not simply a football dashboard.

It is an **AI-powered tactical intelligence pipeline with explainable, evidence-linked outputs.**