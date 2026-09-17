# System Requirements Specification: Retro 3D Corridor Shooter

## 1. Product Concept & Vision

* **Genre:** Fast-paced, first-person retro shooter inspired by classic early-90s maze crawlers.
* **Delivery Form:** Self-contained, zero-dependency browser game. Must launch and run entirely out of a single delivered file without remote asset fetching or external network dependencies.
* **Core Loop:** High-tempo navigation through connected corridors and rooms, clearing enemy waves, managing resources, defeating a climactic anchor threat, and reaching an exit within 4 minutes.
* **Tone & Feel:** Chaotic, responsive, and arcade-like, prioritizing punchy feedback and forward momentum over slow tactical simulation.

---

## 2. Session Design & Pacing (Under 4 Minutes)

The encounter design must ensure a definitive win/loss state within a 3.5 to 4-minute window without soft-locking or pacing plateaus:

```
[0:00 - 0:45] Phase 1: Contact
├── Low-threat combat introducing core movement and primary weapon.
└── First resource caches and crowd-control weapon unlocked.

[0:45 - 2:15] Phase 2: Escalating Chaos
├── High-density encounters in wider choke points.
├── High enemy counts requiring target prioritization and kiting.
└── Key objective or gate unlocking the final chamber.

[2:15 - 3:30] Phase 3: The Anchor Encounter
├── High-durability boss or mini-boss supported by aggressive minions.
└── Heavy weapon access or explosive hazards to exploit.

[3:30 - 4:00] Phase 4: Extraction / Resolution
└── Final sprint to the exit with persistent pressure or countdown to victory.

```

---

## 3. Difficulty Modes & Balance Specifications

Both modes must be beatable, with tuning validated against distinct playstyles:

| Dimension | Normal Mode (Casual) | Hard Mode (Requires Practice) |
| --- | --- | --- |
| **Player Durability** | Forgiving; mistakes can be absorbed without immediate death. | Low safety margin; 3–4 clean hits without healing is fatal. |
| **Enemy Engagement** | Noticeable delay between spotting player and opening fire; wider attack spread. | Sharp reaction windows; enemies flank, lead shots, or fire with high accuracy. |
| **Resource Economy** | Ample ammunition and frequent health drops sustain aggressive forward play. | Scarcity forces weapon switching, deliberate aim, and resource rationing. |
| **Aggro Propagation** | Enemies remain mostly localized to their designated rooms or direct sightlines. | Gunfire draws nearby rooms; enemies pursue persistently around corners. |
| **Clear Benchmark** | First or second attempt clearable by a casual player. | Demands map familiarity, enemy priority knowledge, and efficient movement. |

---

## 4. Gameplay & Mechanical Requirements

### Movement & Perspective

* **Viewpoint:** First-person 3D perspective with horizontal aiming and mouse-lock engagement.
* **Controls:** Standard omnidirectional navigation (forward, back, strafe) with responsive movement and no sluggish acceleration curves.

### Arsenal & Combat Dynamics

Three mechanically distinct weapons to encourage situational switching:

1. **Precision Baseline:** Moderate fire rate, reliable single-target elimination, pinpoint accuracy (e.g., sidearm).
2. **Crowd Suppressor:** High fire rate, wider spread, high close-range damage output for clearing groups (e.g., rapid-fire gun).
3. **High-Impact Heavy:** Limited ammunition, slow fire rate, massive single-target impact or area-of-effect capability for heavy threats.

### Enemy Roster & Behaviors

* **Fodder:** Fast, low health, spawned in packs to drive panic and ammo expenditure.
* **Sustained Threat:** Medium health, fires bursts or spread shots that force the player to seek cover or strafe.
* **Apex / Boss Threat:** High durability, multi-phase or multi-attack capability, telegraphs dangerous attacks that require active repositioning.

---

## 5. Visual & Auditory Requirements

* **Visual Identity:** Cohesive retro aesthetic (e.g., flat ceiling/floor colors, patterned walls, billboarded 2D sprites or low-poly 3D models).
* **Self-Generated Assets:** All textures, sprites/models, weapon views, and UI icons must be procedurally generated or drawn mathematically at runtime.
* **Feedback Cues:** Immediate visual cues for damage taken, distinct hit-markers or enemy flash states confirming damage dealt, and clear defeat animations.
* **Sound Design:** Real-time synthesized or generated audio for weapon discharges, impacts, enemy alert yells, hurt grunts, and pickup chimes without external audio dependencies.
* **HUD & Interface:** Persistent visibility of health, current weapon, ammo reserves, crosshair, and remaining session time or objective progress.

---

## 6. Testing & Validation Requirements

### Visual & Aesthetic Validation (Screen Capture Mandate)

* **Runtime Launch & Capture:** The build must be launched in an automated browser environment (e.g., Playwright, Puppeteer, or browser runner) to capture screenshots across distinct gameplay states:
1. **Title / Start Screen:** Validate clear difficulty selection buttons and entry prompts.
2. **Active Gameplay (Corridor & Room):** Validate perspective rendering, wall texture alignment, and billboard sprite orientation without depth sorting artifacts.
3. **Combat Engagement:** Capture a firing frame with active muzzle flash/projectile trail and enemy damage flash to verify visual punch.
4. **HUD & Status Elements:** Validate that health, ammo, timer, and crosshair are legible, scale appropriately to viewport dimensions, and do not occlude central combat vision.
5. **Terminal State:** Capture Game Over and Victory screens to verify readable score/status readouts and clean restart triggers.


* **Inspection Criteria:** Screenshots must confirm consistent pixel scaling/filtering, absence of missing asset placeholders, and absence of visual tearing or canvas boundary overflow.

### Level Solvability & Navigation Validation

* **Path Reachability:** Validate programmatically that a viable, unobstructed path exists from the player spawn point through every required key/objective to the extraction trigger.
* **Collision Boundary Stress:** Validate that moving at maximum diagonal speed while hugging wall seams and corners never results in clipping through geometry or escaping map bounds.
* **Entity Separation:** Validate that enemy entities cannot push the player through solid walls or occupy the exact same coordinate inside solid obstacles.

### Resource & Economy Math Validation

* **Normal Mode Buffer:** Total potential player recovery (starting HP + all health drops/medkits) must equal at least **2.5x** the total unavoidable damage output of the level under casual play. Total ammo spawned must exceed the total enemy HP pool by at least **70%**.
* **Hard Mode Buffer:** Total ammo spawned must exceed total enemy HP by only **20% to 30%**, requiring positive hit accuracy and weapon switching.

### State Machine & Loop Integrity

* **PointerLock & Pause Recovery:** Test toggling mouse look via `Escape` and re-engaging via click. The game state, camera rotation, and firing state must resume without input drift, stuck keys, or firing loop bugs.
* **Tab Visibility & Frame Throttling:** Validate that switching browser tabs or minimizing the window (`visibilitychange` / `blur`) pauses the game loop or caps delta time (`dt`) so that upon returning, the player does not experience physics explosions or instant death from accumulated ticks.
* **Audio Context Lifecycle:** Verify that browser auto-play policies do not block audio or throw unhandled exceptions. Audio context must initialize cleanly on the first user interaction.

### Performance & Memory Standards

* **Sustained Frame Rate:** Game must sustain a locked 60 FPS during peak combat density (10+ active entities, firing particles, and screen shake active simultaneously).
* **Garbage Collection Stability:** Avoid heavy object allocation within the main render/update loop to prevent recurring garbage-collection frame drops.

---

## 7. Agent Execution Directives

1. **Autonomous Architecture Selection:** Select the most appropriate rendering approach (e.g., raycasting, WebGL, 2D canvas transformation) based on performance, responsiveness, and file-size constraints.
2. **Zero Setup Overhead:** Deliver a single, runnable file that opens directly in any standard desktop browser with no server, bundler, or build step required.
3. **Execution & Screen Capture Execution:** Launch the delivered file in a browser runtime, capture the required screenshots outlined in Section 6, and review the visual artifacts against the aesthetic and UI criteria prior to final completion.
4. **Self-Contained Diagnostics:** Expose basic debug flags or diagnostics (e.g., invulnerability toggle, map overlay, or stage skip via console/keyboard shortcuts) to facilitate rapid validation of later phases and boss mechanics.
