# js13k2025-midnight-journey
Game submitted for JS13K 2025 contest

# ☁ Midnight's Journey ☁

A minimalist, 3D Sokoban-inspired puzzle game where you guide a magical black cat through a series of floating worlds. Your mission is to collect scattered stars in each level by pushing glowing 
star boxes onto the targets. As you travel deeper into the night sky, the puzzles become more challenging, testing both your strategy and patience!

## ✨ Features

- **16 Challenging Levels** across 4 themed worlds
- **Custom 3D Engine** with WebGL rendering
- **Intelligent Hint System** using advanced pathfinding
- **Multiple World Themes** with unique color palettes
- **Star Rating System** based on performance
- **Mouse Controls** for camera interaction

## 🎮 How to Play

### Objective
Guide the black cat to push all the glowing star boxes onto the targets. Once all targets are covered, the level is complete!

### Game Elements
- **Black Cat** - Main character
- **Star Boxes** - Push these onto targets
- **Targets** - Where boxes need to go

### Rules
- You can only **push** boxes, not pull them
- Only one box can be pushed at a time
- Boxes cannot be pushed through walls or other boxes
- Plan your moves carefully - some positions are irreversible!

## 🎯 Controls

### Movement
- **WASD** or **Arrow Keys** - Move the cat
- **Mouse** - Rotate camera view
- **Mouse Wheel** - Zoom in/out
- **Right-click + Drag** - Pan camera

### Game Controls
- **Hint Button** - Get the next optimal move (3 hints per level)
- **Reset Button** - Restart current level

## ⭐ Scoring System

Each level awards 1-3 stars based on your performance:

- **⭐ 1 Star** - Level completed (used hints)
- **⭐⭐ 2 Stars** - Good performance (moves ≤ 125% of par)
- **⭐⭐⭐ 3 Stars** - Perfect performance (moves ≤ par score)

**Par Score** = max(6, number_of_targets × 5)

## 🚀 Getting Started

### Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. Start playing immediately!

### Requirements
- Modern web browser with WebGL support
- JavaScript enabled
- No external dependencies or build process needed!

## 🛠️ Technical Details

### Architecture
- **Custom 3D Engine (M3D)** - Lightweight WebGL renderer
- **Vanilla JavaScript** - No external libraries or frameworks

### Key Systems
- **Pathfinding AI** - Breadth-first search for optimal hint generation
- **Animation System** - Smooth interpolation for character movement
- **3D Scene Graph** - Hierarchical object management
- **Audio System** - Web Audio API for sound effects
- **State Management** - Clean game state handling

## 🎨 Customization

### Adding New Levels
Levels are defined in the `WORLDS` array using simple string maps:

```javascript
{
    name: "My World",
    levels: [
        { map: [
            "11111",
            "14321", 
            "11111"
        ]}
    ]
}
```

**Map Legend:**
- `0` - Empty walkable path
- `1` - Grass  
- `2` - Target location
- `3` - Box
- `4` - Cat starting position
- `5` - Box on target

### Color Themes
Each world uses a color palette defined in the `PALETTES` array:

```javascript
{
    grass: "4B7B68|365C4F",     // Primary|Edge colors
    path: "E2EAD9|C0C7B9",
    box: "9BB589|7D9170",
    target: "F2E38F|D5C86F",
    // ... more colors
}
```

## 📝Credits
Sokoban puzzles adapted from the Microban puzzle set by David W. Skinner,
available at: http://sneezingtiger.com/sokoban/levels.html
