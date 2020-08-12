var gameState = "play"
var score = 0
var highScore = 0
function preload() {
  running = 
    loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundI = 
    loadImage("ground2.png")
  cloud = 
    loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  restart2 = loadImage("restart.png")
  gameOver2 = loadImage("gameOver.png")
  Dead = loadAnimation("trex_collided.png")
  
}


function setup() {
  createCanvas(500,200)
  trex = createSprite(200,150,10,10)
  trex.addAnimation("running", running)
  trex.addAnimation("Dead", Dead)
  trex.scale = 0.37
  ground = createSprite(100, 150, 10, 10)
  ground.addAnimation("ground", groundI)
   ground.x = ground.width/2
  
  invisiGround = createSprite(100,155,400,10)
  invisiGround.visible = false
  restart = createSprite(-300,140,10,10)
  gameOver = createSprite(-300,90,10,10)
  cloudsGroup = new Group()
  obstacleGroup = new Group()
  
}

function draw() {
  background(0)
  fill("yellow")
  text("Score: " + score, 425, 30)
  text("High Score: " + highScore, 320, 30)
  
  if (gameState === "play"){
    score = score + Math.round(getFrameRate()/60)
    ground.velocityX = -5
    if (ground.x < 0) {
     ground.x = ground.width/2
    }

   if (keyDown("space") && trex.y >= 126.5) {
    trex.velocityY = -10
   }
    if (obstacleGroup.isTouching(trex)){
       gameState = "end"
   }
    trex.velocityY = trex.velocityY + 0.75

    spawnClouds()
    spawnObstacles()
 }
  if (gameState === "end") {
    trex.velocityY = 0
    ground.velocityX = 0
    obstacleGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    obstacleGroup.setVelocityEach(0,0)
    cloudsGroup.setVelocityEach(0,0)
    trex.changeAnimation("Dead", Dead)
    restart.x = 250
    restart.addAnimation("restart", restart2)
    gameOver.x = 250
    gameOver.addAnimation("gameOver", gameOver2)
    restart.scale = 0.5
    restart.depth = trex.depth + 1
    if (highScore < score) {
     highScore = score
    }
    console.log(restart.depth)
    console.log(trex.depth)
    
  }
  drawSprites();
  trex.collide(invisiGround)
  if(mousePressedOver(restart)) {
    reset();
}

  function reset(){
    gameState = "play"
    gameOver.x = -500
    restart.x = -300
    obstacleGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running", running)
    score = 0
  }
  function spawnClouds(){
  if (frameCount % 60 === 0) {
   var clouds = createSprite(500,random(50,100) ,10,10)
    clouds.addImage("clouds", cloud)
    clouds.velocityX = -6
    clouds.scale = 0.5
    clouds.lifetime = 200
    trex.depth = clouds.depth + 1
    cloudsGroup.add(clouds)
}
}
  
  function spawnObstacles(){
  if (frameCount % 60 === 0) {
    var obstacles = createSprite(500,133,10,10)
    obstacles.velocityX = -6
    obstacles.scale = 0.5
    var num = Math.round(random(1,6))
    
    if (num === 1) {
    obstacles.addImage(obstacle1)
    } else if (num === 2) {
    obstacles.addImage(obstacle2)
    } else if (num === 3) {
    obstacles.addImage(obstacle3)
    } else if (num === 4) {
    obstacles.addImage(obstacle4)
    } else if (num === 5) {
    obstacles.addImage(obstacle5)
    } else if (num === 6) {
    obstacles.addImage(obstacle6)
    }
    gameOver.depth = obstacles.depth + 1
    restart.depth = obstacles.depth + 1   
    obstacles.lifetime = 200
    obstacleGroup.add(obstacles)
  }
  }
}