# Entangled Ecosphere

**Interactive p5.js artwork | COMP1720 / 6720 Major Project**  
*Theme 2024: “Entangled Realities”*&#8203;:contentReference[oaicite:0]{index=0}

> *“Step into a living network of creatures, hazards and fragile connections.  
>  Your every key‑press tilts the balance between harmony and collapse.”*

---

## Table of Contents
1. [Concept](#concept)
2. [Scenes & Mechanics](#scenes--mechanics)
3. [Controls](#controls)
4. [Running the Sketch](#running-the-sketch)
5. [Repo Structure](#repo-structure)
6. [Development Notes](#development-notes)
7. [Credits & References](#credits--references)
8. [License](#license)

---

## Concept

**Entangled Ecosphere** is an interactive, three‑scene browser artwork inspired by the emergent food‑chain chaos of the indie classic *Rain World*&#8203;:contentReference[oaicite:1]{index=1}.  
You embody a lone *slug‑cat*: a nimble yet vulnerable creature trying to survive inside a closed digital ecosystem.  
Each entity—leeches, ghosts, bullets, even gravity—acts as a thread in a wider web; tug one thread (move, dodge, hesitate) and every other thread ripples in response, foregrounding the course theme of **entanglement**.

---

## Scenes & Mechanics

| Scene | Environment | What happens? |
|-------|-------------|---------------|
| **1 – Drain‑Pit** | Damp, green drainage shaft | Leeches track your x‑&‑y position, latching on when close. Escape through the **dark‑green exit bar** before you’re overwhelmed. |
| **2 – Open Chamber** | Crumbling platforms | A larger arena introduces roaming predators (*black circles*) that flock and avoid each other. Spatial awareness is vital. |
| **3 – Spirit Gauntlet** | Storm‑blue skybridge | Ghosts pursue in packs and periodically **shoot homing bullets**. Each hit slows you, making entanglement literal as speed → survivability. |

Interaction lasts ~3 minutes—the brief’s suggested gallery dwell time—yet no two runs are identical thanks to simple autonomous behaviours.

---

## Controls

| Key | Action |
|-----|--------|
| **W / A / S / D** | Move slug‑cat *(S also forces an instant drop)* |
| *(auto)* | Slug‑cat drifts downward after 3 s of no input |
| **Spacebar** | Save a screenshot (`thumbnail.png`) locally |
| **Enter** | Advance from start screen (if implemented) |

The work is **keyboard‑only** to keep interaction explicit and accessible in a gallery setting.

---

## Running the Sketch

### 1 · Quick play (GitHub Pages)

1. Fork or clone this repo.  
2. In repo settings → **Pages**, select the `main` branch and `/ (root)` folder.  
3. Wait ~1 min, then visit `https://<your‑username>.github.io/entangled-ecosphere/`.

*(A live demo link will appear here once deployed.)*

### 2 · Local host

```bash
git clone https://github.com/Jugraj1/entangled-ecosphere.git
cd entangled-ecosphere
python -m http.server          # or use VS Code “Live Server”
# open http://localhost:8000 in your browser
