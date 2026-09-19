You are modifying the EXISTING prototype of the project:

**AI-Powered Football Tactical Intelligence Platform**

Do NOT rebuild the project from scratch.

Keep the existing React/Vite/TypeScript architecture, existing navigation, existing pages, styling system, reusable components, and current functionality unless a change is required for the improvements below.

The current prototype already contains:
- Match Overview
- Tactical Analysis
- Evidence Review
- Team Shape
- Player Analysis
- Physical Performance
- Data Quality
- Match Acquisition
- Interactive football pitch
- Match timeline
- Tactical events
- AI Tactical Insights
- Mock tracking/EPTS data

The prototype is visually good, but two critical aspects of the actual project are currently missing:

1. The team's tactical shape and player positions do not meaningfully change throughout the 90-minute match.
2. The prototype does not clearly demonstrate the CORE AI IDEA:
   **the system estimates what tactical state is expected in a given context, compares it with what actually happened, identifies deviations, and explains them using measurable evidence.**

These are now the highest-priority changes.

---

# PART 1 — MAKE THE MATCH DYNAMIC THROUGHOUT THE 90 MINUTES

## Current problem

The football pitch currently shows almost the same player positions regardless of where the match timeline is.

This must change.

The match should behave like a real simulated tactical match.

The selected timestamp must determine:
- Player positions
- Team shape
- Team width
- Team depth
- Compactness
- Line spacing
- Player movement
- Tactical phase
- Tactical event
- Expected tactical state
- Actual tactical state

The pitch must visibly change when the user moves the timeline.

---

# 1. Create a deterministic match-state simulation engine

Do NOT simply randomly move players.

Create a deterministic time-based simulation with tactical states and keyframes.

Create a data structure similar to:

```ts
interface MatchState {
  timestamp: number;
  phase:
    | "build_up"
    | "attacking"
    | "defensive"
    | "defensive_transition"
    | "attacking_transition"
    | "pressing";

  playerPositions: PlayerPosition[];
  teamWidth: number;
  teamDepth: number;
  compactness: number;
  lineSpacing: number;

  expectedWidth: number;
  expectedDepth: number;
  expectedCompactness: number;
  expectedLineSpacing: number;

  deviationScore: number;

  tacticalEvents: TacticalEvent[];

  confidence: number;
  dataQuality: number;
}
```

Use the current player IDs and current match data structures where possible.

---

# 2. Add multiple tactical keyframes across the 90 minutes

Create at least 10–12 meaningful match states.

For example:

### 00:00
Kickoff / Initial Organization

### 08:30
Build-Up

### 16:20
Attacking Possession

### 23:14
Defensive Transition / Loss of Compactness

### 31:42
Goal / Reset

### 40:00
Controlled Possession

### 48:07
Pressing Structure

### 54:31
Attacking Width Increase

### 60:00
Midfield Control

### 67:31
Defensive Line Separation

### 76:40
Late-Game Defensive Phase

### 84:20
High Press

### 90:00
Final Shape

These timestamps are examples and can be adjusted.

The important requirement is that each keyframe has a noticeably different football shape.

---

# 3. The player's positions must change by tactical phase

Do not only change team-level numbers.

Actually move the player coordinates.

For example:

## Build-Up

Defenders spread horizontally.

Fullbacks move wider.

Midfielders create passing lanes.

Center-backs move deeper.

## Attacking Phase

Team becomes wider.

Fullbacks push forward.

Midfielders move higher.

Striker occupies advanced position.

## Defensive Phase

Team becomes narrower.

Lines move closer together.

Players shift toward the ball.

## Defensive Transition

Temporarily larger spacing may appear.

Some players recover backward.

The distance between defensive and midfield lines may increase.

This state should visually correspond to the "Loss of Compactness" event.

## Pressing

Front players move toward opponents.

Defensive line moves higher.

Distance between team lines changes.

This state should correspond to "Pressing Structure".

---

# 4. Interpolate between tactical keyframes

Do not instantly teleport players from one shape to another.

When the timeline moves between keyframes, interpolate player positions smoothly.

For example:

```text
Keyframe A
      ↓
Smooth interpolation
      ↓
Keyframe B
```

So moving from 22:00 to 23:30 should visually show the team expanding.

The movement should be smooth enough that the prototype feels like the match is evolving.

---

# 5. Make tactical events actually change the visual state

This is extremely important.

Events must NOT just be markers on a timeline.

The event should have a visible effect on the pitch.

For example:

### 23:14 — Loss of Compactness

Before:
- Compactness = 220 m²
- Width = 35 m
- Depth = 28 m

After:
- Compactness = 342 m²
- Width = 42 m
- Depth = 36 m

The players should visually spread out.

---

### 48:07 — Pressing Structure

Before:
- Defensive line = 31 m
- Team depth = 35 m

During pressing:
- Defensive line pushes higher
- Front players move forward
- Team becomes vertically compressed

---

### 54:31 — Attacking Width

Before:
- Width = 34 m

After:
- Width = 48 m

The players should visibly spread laterally.

---

### 67:31 — Line Separation

The defensive and midfield lines should visually separate.

The UI should make this immediately obvious.

---

# PART 2 — ADD THE ACTUAL AI IDEA: EXPECTED VS ACTUAL

This is the most important modification.

The platform should no longer behave as if it only asks:

> "What happened?"

It should also ask:

> "Given the current football context, what tactical state was expected?"

Then:

> "What actually happened?"

Then:

> "How large is the deviation?"

Then:

> "What measurable evidence explains the deviation?"

---

# 6. Create an "Expected Tactical State" model

Add a prototype model that predicts the expected tactical configuration based on contextual information.

Context can include:

- Tactical phase
- Possession state
- Ball zone
- Opponent shape
- Team formation
- Match minute
- Current team state
- Score
- Current movement trend

For the prototype, this can use deterministic/mock inference rather than a real trained ML model.

IMPORTANT:

Do NOT present the prototype as if an actual trained model is currently running.

Label it:

**Tactical State Model — Prototype**

or

**Expected State Inference — Prototype**

The architecture should however make it obvious that this component can later be replaced by a real ML model.

---

# 7. Expected vs Actual visualization

Create a major section in the Tactical Analysis page:

# Expected vs Actual Tactical State

Display two football pitches side by side.

### LEFT

**Expected State**

### RIGHT

**Actual State**

At the selected timestamp.

Both pitches should use the SAME player identities.

The expected pitch represents where the model expects players/team structure to be.

The actual pitch represents the observed reconstructed tracking state.

This comparison is one of the most important visual elements in the entire prototype.

---

# 8. Show the difference between Expected and Actual

Draw visual connections between expected and actual player positions.

For example:

```text
Expected Player Position
          ↓
       deviation
          ↓
Actual Player Position
```

Use arrows/vectors.

Large deviations should be visually obvious.

Also show aggregate deviations:

- Width deviation
- Depth deviation
- Compactness deviation
- Line spacing deviation
- Centroid displacement

Example:

```text
Expected Width       38.4 m
Actual Width         46.9 m
Deviation             +8.5 m
```

---

# 9. Add a Tactical Alignment Score

Create a high-level score representing how closely the actual tactical state matches the expected state.

Example:

**Tactical Alignment**
72%

Break it into:

Width Alignment
81%

Depth Alignment
68%

Compactness Alignment
59%

Line Coordination
74%

Do NOT describe this as objective "correctness".

Use terminology such as:

- Aligned
- Moderate Deviation
- Significant Deviation

The system is detecting deviation from an expected state under the defined tactical model, not declaring universal football truth.

---

# PART 3 — FEATURE REDUCTION / FEATURE FUSION

Another major idea that must become visible.

Currently the prototype exposes many independent football metrics.

That makes the system look like:

```text
Width
Depth
Compactness
Spacing
Centroid
Velocity
Acceleration
Zone Occupancy
etc.
```

Instead, introduce an explicit:

# Feature Fusion Layer

The purpose is to combine correlated/raw features into a smaller number of higher-level tactical representations.

---

# 10. Create a compact tactical feature vector

Instead of feeding every raw metric independently into the tactical reasoning layer, simulate a feature-fusion stage.

For example:

### Raw Features

- Player X/Y positions
- Velocity
- Acceleration
- Width
- Depth
- Convex Hull Area
- Pairwise Distance
- Line Distance
- Centroid
- Zone Occupancy
- Ball Position

↓

### Feature Fusion

↓

### Compact Tactical Representation

Use approximately 5–7 high-level dimensions:

```text
Tactical State Vector

Spatial Width
Spatial Depth
Compactness
Line Coordination
Pressing Intensity
Team Synchronization
Transition Stability
```

The exact names can be adjusted, but the concept must remain.

---

# 11. Show the feature reduction visually

Create a small visualization:

```text
24 Raw Features
        ↓
Feature Fusion
        ↓
7 Tactical Features
        ↓
Expected State Model
        ↓
Actual vs Expected
        ↓
Deviation
```

This is important because it communicates the ML architecture to supervisors/examiners.

Make this look like a real ML pipeline rather than a decorative diagram.

---

# 12. Do not display every raw feature everywhere

The dashboard should prioritize the compact tactical representation.

For example:

### Spatial Organization
81%

### Compactness
62%

### Line Coordination
74%

### Pressing Structure
88%

### Transition Stability
55%

Then allow:

**"View underlying metrics"**

which opens the lower-level measurements.

This keeps the system understandable and prevents metric overload.

---

# PART 4 — AI EXPLANATION

The explanation panel must now be based on Expected vs Actual.

Instead of:

> "Team compactness decreased."

Use:

### Tactical Deviation Detected

**23:14 – 23:20**

**Pattern: Loss of Defensive Compactness**

The Tactical State Model expected a compact defensive structure after possession loss.

### Expected
Compactness:
221 m²

### Actual
Compactness:
347 m²

### Deviation
+126 m²

### Interpretation

The team's spatial organization became significantly more dispersed than the expected defensive-transition state.

### Supporting Evidence

- Team width: 35.2 m → 42.8 m
- Team depth: 27.9 m → 35.8 m
- Average inter-player distance increased
- Defensive–midfield line separation increased

### Confidence
91%

### Data Quality
94%

Buttons:

**View Evidence**

**Compare Expected / Actual**

**View Underlying Metrics**

---

# 13. Create different types of explanations

Examples:

## Aligned State

**Tactical State Aligned**

The observed team structure closely matches the expected state.

Expected Width:
39.2 m

Actual Width:
40.1 m

Deviation:
+0.9 m

---

## Moderate Deviation

**Moderate Tactical Deviation**

The team is wider than expected during the defensive phase.

Expected:
31.4 m

Actual:
38.7 m

Deviation:
+7.3 m

---

## Significant Deviation

**Significant Tactical Deviation**

The observed defensive structure differs substantially from the expected state.

Expected Compactness:
214 m²

Actual Compactness:
358 m²

Deviation:
+144 m²

---

# PART 5 — UPDATE THE TIMELINE

The timeline should now represent more than generic events.

Add layers:

### Match Events
Goals, cards, substitutions

### Tactical Events
Loss of Compactness, Pressing Structure, etc.

### Model Deviations
Expected vs Actual mismatches

Use different visual marker types.

Example:

```text
00 ─────── 23:14 ─────── 48:07 ─────── 67:31 ─────── 90
          ↓                ↓                ↓
     Deviation         Pressing        Deviation
```

Clicking a deviation should automatically open:

**Expected State vs Actual State**

for that exact timestamp.

---

# PART 6 — UPDATE THE MAIN DASHBOARD

The Match Overview should now contain a prominent card:

# Tactical Intelligence

**Current State**

Defensive Transition

**Model Assessment**

Significant Deviation

**Tactical Alignment**

68%

**Expected vs Actual**

Compactness:
214 → 351 m²

Width:
34 → 43 m

Line Separation:
8 → 15 m

Button:

**Inspect Deviation**

---

# PART 7 — UPDATE THE FOOTBALL PITCH

The pitch should support these visualization modes:

1. Current Position
2. Team Shape
3. Heatmap
4. Compactness
5. Width & Depth
6. Movement Vectors
7. Expected State
8. Actual vs Expected

For:

**Actual vs Expected**

display:

- Expected player positions
- Actual player positions
- Deviation vectors
- Team centroid comparison
- Expected compactness boundary
- Actual compactness boundary

This should be one of the strongest screens in the prototype.

---

# PART 8 — TEAM SHAPE PAGE

The Team Shape page should no longer just show four static screenshots.

Add a time-based "Match Evolution" view.

Display a sequence:

```text
00:00
Kickoff

08:30
Build-Up

16:20
Attack

23:14
Defensive Transition

48:07
Pressing

54:31
Wide Attack

67:31
Line Separation

84:20
High Press

90:00
Final Shape
```

Allow the user to click any state.

The main pitch should update to that exact shape.

---

# PART 9 — ARCHITECTURE VIEW

Add a small "How AI Works" expandable section or page.

Show:

```text
MATCH INPUT
    ↓
Detection / Tracking
    ↓
Pitch Calibration
    ↓
Game State Reconstruction
    ↓
Raw Features
    ↓
Feature Fusion / Reduction
    ↓
Compact Tactical State
    ↓
Expected Tactical State Model
    ↓
Actual vs Expected Comparison
    ↓
Deviation Detection
    ↓
Evidence Linking
    ↓
Explainable Tactical Insight
```

This is critical for the graduation-project demonstration.

---

# PART 10 — DATA MODEL

Create mock data structures that support the above architecture.

For example:

```ts
interface TacticalState {
  width: number;
  depth: number;
  compactness: number;
  lineSpacing: number;
  pressingIntensity: number;
  synchronization: number;
  transitionStability: number;
}

interface ExpectedState {
  tacticalState: TacticalState;
  confidence: number;
  reasoningContext: {
    phase: string;
    possession: string;
    ballZone: string;
  };
}

interface ActualState {
  tacticalState: TacticalState;
  playerPositions: PlayerPosition[];
}

interface TacticalDeviation {
  metric: string;
  expected: number;
  actual: number;
  deviation: number;
  severity: "aligned" | "moderate" | "significant";
}
```

Use these structures throughout the prototype.

---

# PART 11 — IMPORTANT ML ARCHITECTURE PRINCIPLE

Do NOT make the system look like:

```text
Player positions
→ Random thresholds
→ Tactical insight
```

Instead visually communicate:

```text
Player + Team + Context
        ↓
Game State
        ↓
Feature Fusion
        ↓
Compact Representation
        ↓
Expected Tactical State
        +
Observed Tactical State
        ↓
Comparison
        ↓
Deviation
        ↓
Evidence
        ↓
Explanation
```

This should be the conceptual heart of the prototype.

---

# PART 12 — DO NOT OVERCLAIM

The prototype is a simulated research/product prototype.

Do NOT write claims such as:

- "The AI knows the correct tactic."
- "The AI understands football perfectly."
- "The model determines whether the coach was right."
- "The system objectively detects mistakes."

Instead use:

- "Expected Tactical State"
- "Model-Inferred State"
- "Observed State"
- "Deviation from Expected State"
- "Tactical Alignment"
- "Evidence-backed interpretation"

This distinction is important scientifically.

---

# PART 13 — UX REQUIREMENTS

The prototype should make this story understandable within 30 seconds:

### 1.
The match is happening.

### 2.
Player positions continuously change.

### 3.
The system reconstructs the actual tactical state.

### 4.
The model estimates the expected tactical state.

### 5.
The system compares expected vs actual.

### 6.
It detects deviations.

### 7.
It explains the deviation using measurable features.

### 8.
It provides visual/video evidence.

This should be immediately understandable without reading documentation.

---

# PART 14 — IMPLEMENTATION REQUIREMENTS

Modify the existing files/components wherever possible.

Likely relevant files include:

- `PitchCanvas.tsx`
- `PitchTimeline.tsx`
- `TacticalInsightsPanel.tsx`
- `DashboardOverview.tsx`
- `TacticalAnalysis.tsx`
- `TeamShapePage.tsx`
- `tactical.ts`
- `matchData.ts`
- `tacticalEvents.ts`

Create additional reusable components where necessary, such as:

- `ExpectedActualPitch.tsx`
- `TacticalStateCard.tsx`
- `DeviationCard.tsx`
- `FeatureFusionPanel.tsx`
- `TacticalStateComparison.tsx`
- `MatchStateEngine.ts`

Keep the implementation modular.

---

# PART 15 — ACCEPTANCE CRITERIA

The modifications are complete only when ALL of the following work:

### Match Dynamics
- Moving the timeline changes player positions.
- Multiple meaningful tactical shapes exist throughout the 90 minutes.
- Key tactical events produce visible changes in team shape.
- Player movement between states is interpolated smoothly.

### AI Intelligence
- The UI clearly displays Expected State.
- The UI clearly displays Actual State.
- The prototype calculates a deviation between them.
- The deviation is visualized.
- Tactical explanations reference the deviation and supporting metrics.

### Feature Fusion
- The prototype visibly demonstrates reduction/fusion of raw football features.
- The intelligence layer uses a smaller tactical representation.
- Underlying metrics remain inspectable.

### Evidence
- Clicking a tactical deviation opens synchronized evidence.
- Pitch state, timeline, and numerical evidence correspond to the same timestamp.

### UX
- No screen should feel like a collection of unrelated charts.
- The main narrative must be:
  **Observe → Represent → Predict Expected State → Compare → Detect Deviation → Explain → Show Evidence**

### Technical
- Do not break existing routes/pages.
- Do not remove existing useful functionality.
- Do not introduce unnecessary dependencies.
- Keep all mock data deterministic.
- Ensure `npm run build` succeeds with zero TypeScript errors.

Before finishing, run the production build and fix all TypeScript/runtime issues.