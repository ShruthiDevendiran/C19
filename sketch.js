var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var spookySound;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  spookySound.loop()

  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
   background(200);

   if(gameState == "play"){
  
    if(tower.y > 400){
      tower.y = 300
      }

    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3
    }

    if(keyDown("SPACE")){
      ghost.velocityY=-5
    }

    ghost.velocityY=ghost.velocityY+0.6

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost) || (ghost.y>600)){
      ghost.destroy();
      gameState = "End";
    }

    spawnDoors()
    
    drawSprites()
  }
  if(gameState == "End"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",200,300);
  }
}

function spawnDoors(){
  if(frameCount % 250 === 0){

    door = createSprite(200, -50);
    door.addImage("door", doorImg);
  
    climber = createSprite(200,10);
    climber.addImage("climber", climberImg);

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;

    door.velocityY = 1;
    climber.velocityY=1;
    invisibleBlock.velocityY = 1;
    
    door.x = Math.round(random(120,400))
    climber.x = door.x;
    invisibleBlock.x = climber.x;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door)
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1

  }
}