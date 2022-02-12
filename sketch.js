var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
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
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  invisibleBlockGroup=new Group();
  doorsGroup=new Group();
  climbersGroup=new Group();
}

function draw() {
  background(200);
  if(gameState==="play")
  {
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("Left_arrow")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("Right_arrow")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY=-5;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    spawnDoors();
    drawSprites(); 
  }
  if(gameState==="end")
  {
    stroke("yellow");
    fill ("yellow");
    textSize(30);  
    text("Game Over",230,250);
  }

}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    invisibleBlock=createSprite(200,50);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400));
    ghost.depth=door.depth;
    ghost.depth+=1;
    door.velocityY = 1;
    climber.x=door.x;
    climber.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    climber.lifetime=800;
    door.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}