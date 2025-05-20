# Spot the Difference Game

A simple "Spot the Difference" game built with React-Vite. The game loads configuration from a JSON file, allowing for easy customization of images and differences.

## How to Play

1. Look at the two images displayed side by side
2. Find the differences between the images by clicking on them
3. Each found difference will be highlighted on both images
4. Try to find all differences as quickly as possible
5. When all differences are found, a success message will be displayed

## Features

- JSON-based configuration for easy customization
- Score tracking
- Timer to track how long it takes to find all differences
- Responsive design for mobile and desktop
- Visual feedback when differences are found

## How to Run

1. Clone this repository
2. Open `index.html` in your web browser
3. Start playing!

Alternatively, you can host the files on any web server.

## How the Game Uses JSON

The game loads its configuration from a `game-config.json` file, which contains:

- Game title
- Paths to the two images
- Coordinates and dimensions for each difference

Example JSON structure:

```json
{
    "gameTitle": "Spot the Difference - Animals",
    "images": {
        "image1": "images/image1.jpg",
        "image2": "images/image2.jpg"
    },
    "differences": [
        { "x": 100, "y": 200, "width": 50, "height": 50 },
        { "x": 300, "y": 150, "width": 40, "height": 40 },
        { "x": 500, "y": 300, "width": 30, "height": 30 }
    ]
}
```

To change the game:
1. Replace the image paths with your own images
2. Update the differences array with the coordinates of differences in your images
3. The game will automatically load your configuration when refreshed
