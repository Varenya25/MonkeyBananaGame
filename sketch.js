var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

//creating monkey
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

//creating ground
  ground=createSprite(400,350,900,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);

//create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
}

function draw() {
background("lightYellow");

  //displaying score
  text("survivalTime: "+ survivalTime, 100,50);
  
//jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
    }
  
//add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  //spawn the banana
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
  
  survivalTime = Math.ceil(frameCount/frameRate());
    
  drawSprites();
}
  
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
   //add each obstacle to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
   obstacle.addImage(obstacleImage);
    
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}