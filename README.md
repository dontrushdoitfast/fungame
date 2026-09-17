# Retro 3D Corridor Shooter

A fast-paced, first-person retro shooter inspired by classic early-90s maze crawlers. It is delivered as a self-contained, zero-dependency browser game in a single HTML file.

## Features

- Zero-dependency: Run directly in a web browser without requiring a server or bundler.
- Procedural Generation: All textures and sounds are procedurally generated in JavaScript using standard Web API techniques (Canvas 2D and Web Audio API).
- Raycasting Engine: Built from scratch, using DDA algorithm for wall rendering and billboard rendering for sprites.
- Difficulty Modes: Normal (casual) and Hard (punishing).
- Enemies & Boss: Features swarms, threatening shooters, and an anchor boss.

## How to Play

Open `index.html` in a web browser.

### Controls

- **WASD**: Move (Forward, Left, Back, Right)
- **Mouse**: Aim
- **Left Click**: Shoot
- **1**: Select Baseline Weapon (Infinite Ammo, Precision)
- **2**: Select Crowd Suppressor (High fire rate)
- **3**: Select High-Impact Heavy (Massive damage)
- **ESC**: Pause Game (Releases pointer lock)

Survive, defeat the boss, and touch the blue exit portal before the 4-minute timer runs out!