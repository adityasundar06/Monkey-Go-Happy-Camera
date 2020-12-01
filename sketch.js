var monkey, monkey_running;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground;
var gameState = "play";

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_stop = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);
  //console.log(displayWidth +","+displayHeight)
  monkey = createSprite(80,320,12,1);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("monkey stop", monkey_stop);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.shapeColor = "gray";
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("cornflowerblue");
  stroke("black");
  textSize(20);
  fill("black");
  text("Score = " + score,120,50);
  
  if (gameState == "play"){
    if(keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    banana();
    obstacle();
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score += 1;
    }
    camera.position.x = monkey.x + 130;
    camera.position.y = displayHeight / 6;
    if(obstacleGroup.isTouching(monkey)){
      gameState = "end";
    }
  }
  else if (gameState == "end"){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.collide(ground);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("monkey stop",monkey_stop);
    
    stroke("red");
    textSize(20);
    text("GAME OVER",120,150)
  }
  drawSprites();
}
function banana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,270,10,40);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.09;
    //obstacle.debug = true;
    banana.velocityX = -6;
    
    banana.y = random(200,240);
  
    banana.lifetime = 300;
    banana.setCollider("circle",0,0,200);
    
    foodGroup.add(banana);
  
  }
}
function obstacle() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(400,327,10,40);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.09;
    //obstacle.debug = true;
    obstacle.velocityX = -6;
      
    obstacle.lifetime = 300;
  
    obstacleGroup.add(obstacle);
  }
}






