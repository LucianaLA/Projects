const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameRunning = true;
let score = 0;
let lastSpawnTime = 0;  // Track the time of the last enemy spawn
const spawnCooldown = (Math.random() * (1 - 0.5) + 0.6) * 1000;  // Cooldown time in milliseconds (1 second)

// Define player properties
let player = {
  x: 375,
  y: 500,
  width: 50,
  height: 50,
  speed: 5,
  jumping: false,
  yVelocity: 0,
  jumpCount: 0,  // Track the number of jumps
  maxJumps: 2,   // Allow double jump (2 jumps)
  spriteIndex: 0, // Index for the sprit e animation
  spriteFrameCount: 1  // Frame counter for controlling animation speed
};

// Load sprite image
const spriteImage = new Image();
spriteImage.src = "assets/ajaw-sprites.png";

// Define enemy properties
let enemies = [];

// Add new enemy to the array with a cooldown
function spawnEnemy() {
  const currentTime = Date.now();
  
  if (currentTime - lastSpawnTime > spawnCooldown) {  // Only spawn if cooldown has passed
    const enemyHeight = Math.random() < 0.5 ? 50 : 20;  // Some enemies are tall, some are small
    const enemyY = enemyHeight === 50 ? 500 : 450;  // Tall ones are on the ground, small ones fly higher
    enemies.push({
      x: canvas.width,
      y: enemyY,
      width: 50,
      height: enemyHeight,
      speed: 3,
    });

    lastSpawnTime = currentTime;  // Update the time of the last spawn
  }
}

// Draw the player on the canvas
function drawPlayer() {
    const spriteWidth = 71; // Width of each sprite
    const spriteHeight = 64; // Height of each sprite
  
    // Determine which sprites to use based on jumping status
    let spriteX;
  
    // Loop through first 3 sprites for jumping, and last 3 for standing
    if (player.jumping) {
      spriteX = player.spriteIndex * spriteWidth; // Use first 3 sprites for jumping
    } else {
      spriteX = (3 + player.spriteIndex) * spriteWidth; // Use last 3 sprites for standing
    }
  
    ctx.drawImage(spriteImage, spriteX, 0, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);
  }
  

// Move the player (jumping only)
function movePlayer() {
  // Jump logic
  if (jumpPressed && player.jumpCount < player.maxJumps) {
    player.jumping = true;
    player.yVelocity = -player.speed * 2;
    player.jumpCount++;  // Increase jump count for each jump
    jumpPressed = false;  // Prevent continuous jump by holding the key
  }

  if (player.jumping) {
    player.yVelocity += 0.2;  // Simulate gravity
    player.y += player.yVelocity;

    // Check if player has landed on the ground (platform[0] is the ground)
    if (player.y > canvas.height - player.height - platforms[0].height) {
      player.jumping = false;
      player.y = canvas.height - player.height - platforms[0].height;
      player.yVelocity = 0;
      player.jumpCount = 0;  // Reset jump count when player lands
    }
  }
}

// Draw enemies on the canvas
function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

// Move enemies across the screen
function moveEnemies() {
  enemies.forEach((enemy) => {
    enemy.x -= enemy.speed;
  });

  // Remove enemies that are off-screen
  enemies = enemies.filter(enemy => enemy.x + enemy.width > 0);
}

// Check collision between the player and an enemy
function checkEnemyCollision(player, enemy) {
  let bottom = player.y + player.height >= enemy.y;
  let top = player.y <= enemy.y + enemy.height;
  let right = player.x + player.width >= enemy.x;
  let left = player.x <= enemy.x + enemy.width;

  return bottom && top && right && left;
}

// Handle collisions between the player and enemies
function handleEnemyCollision() {
  enemies.forEach((enemy) => {
    if (checkEnemyCollision(player, enemy)) {
      // Game over
      console.log("Game over");
      gameOver();
    }
  });
}

// Ground platform definition
let platforms = [
  {
    x: 0,
    y: 550,  // Ground level
    width: 800,
    height: 50,
  },
];

// Draw platforms on the canvas
function drawPlatforms() {
  ctx.fillStyle = "green";
  platforms.forEach((platform) => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

let jumpPressed = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jumpPressed = true;  // Allow jump on space key press
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    jumpPressed = false;  // Prevent continuous jumping
  }
});

// Game over screen
function gameOver() {
  cancelAnimationFrame(animationId);
  gameRunning = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

  // Display restart button
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 60);

  // Add click event listener for restarting the game
  canvas.addEventListener("click", restartGame);
}

// Restart the game
function restartGame() {
  // Reset game state
  player.y = 500;
  player.jumping = false;
  player.yVelocity = 0;
  player.jumpCount = 0;
  enemies = [];
  score = 0;
  gameRunning = true;

  // Remove the event listener to avoid multiple restarts
  canvas.removeEventListener("click", restartGame);

  // Start the game loop again
  animationId = requestAnimationFrame(gameLoop);
}

// Main game loop
function gameLoop() {
  if (!gameRunning) return;  // Stop game loop if game is over

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update sprite animation
  player.spriteFrameCount++;
  if (player.spriteFrameCount >= 10) { // Control the speed of sprite animation
    player.spriteIndex = (player.spriteIndex + 1) % 3; // Loop through the first three sprites
    player.spriteFrameCount = 0; // Reset frame count
  }

  // Draw player and move them (jump logic)
  drawPlayer();
  movePlayer();

  // Draw and move platforms
  drawPlatforms();

  // Move and draw enemies
  moveEnemies();
  drawEnemies();

  // Handle collisions with enemies
  handleEnemyCollision();

  // Randomly spawn new enemies with cooldown
  spawnEnemy();

  // Check if the player is off-screen
  if (player.y > canvas.height) {
    gameOver();
    return;
  }

  // Continue the game loop
  animationId = requestAnimationFrame(gameLoop);
}

// Start the game loop
let animationId = requestAnimationFrame(gameLoop);
