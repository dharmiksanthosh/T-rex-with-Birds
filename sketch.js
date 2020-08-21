//This code was created using p5.js


//Create trex
var trex;
var trex_running;
var trex_ducking;

//create ground and invinsible ground
var ground,groundimage;
var invisible_ground;

//create clouds and obstacles
var clouds;
var cloud_image;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6;

//create bird
var bird;
var bird_fly;

//score
var count = 0;

//gamestate
var play = 1;
var end = 2;
var gamestate = play;

//make groups
var cloudGroup;
var obGroup;
var birdGroup;

//make gameovertext and restart button 
var gameover_img;
var gameover;
var restart;
var restart_img;

function preload(){
  
  //loading trex running animation
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collide = loadImage("trex_collided.png");
  trex_ducking = loadAnimation("dinoduck1.png","dinoduck2.png");
  
  //loading obstacle images
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  //loading ground and cloud images 
  groundimage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  
  //loading restart button images
  restart_img = loadImage("restart0.png");
  gameover_img = loadImage("gameOver.png");
  
  //loading bird images
  bird_collided = loadImage("bird1.png");
  bird_fly = loadAnimation("bird1.png","bird2.png");
}

function setup(){
  createCanvas(600, 200);
  
  //creating sprites for trex and grounds
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,65,75);
  
  invisible_ground = createSprite(300, 195, 600, 1);
  invisible_ground.visible = false;
  
  ground = createSprite(300, 190, 600, 1);
  ground.addImage("ground", groundimage);
  
  //making groups
   obGroup = new Group();
   cloudGroup = new Group();
   birdGroup = new Group();
  
  //making sprites for gameOver text and restart button
  gameover = createSprite(300,100,300,30);
  restart = createSprite(300,150,30,50);
  gameover.addImage("over", gameover_img);
  restart.addImage("button", restart_img);
  restart.scale = 0.5;
  gameover.scale = 0.7;
}

function draw(){
  
  //filling the background with white color
  background("white")
  
  //changing background colors 
  if (count>0&&count<500){
  
   background(rgb(47, 91, 204))
   fill(255);
  } else if(count>500){
  
  background("white");
  fill(0);
  }
  
  if (gamestate===play){
  
    //making trex jump when "space" key is pressed
  if (keyDown("space")&&trex.y>158) 
  {
    trex.velocityY = -12;
  }
    //making trex duck when "down arrow" is Pressed 
  if (keyWentDown("down")){
  
    trex.addAnimation("trex_duck",trex_ducking);
    trex.changeAnimation("trex_duck");
    trex.setCollider("rectangle",0,0,65,50);
  }
    //making the trex get back to normal position when the "down arrow" is released 
  if (keyWentUp("down")){
  
    trex.changeAnimation("running");
    trex.setCollider("rectangle",0,0,65,75);
  }
    
    //adding gravity to the trex
   trex.velocityY = trex.velocityY+1;
    
    //moving the ground
   ground.velocityX = -4; 
    
    //replacing the ground to back position to create illusion of infinite ground
    if (ground.x<0){
    ground.x = ground.width/2;
  }
  
    //calling functios of clouds,cactus and birds
  spawnclouds();
  spawncactus();
  spawnbird();
  
   //increase the score
   count = Math.round(World.frameRate/30)+count;
    
    //switching the gamestate to end when the trex is touching cactus or birds
  if(obGroup.isTouching(trex)||birdGroup.isTouching(trex)){
  
  gamestate = end;
  }
    
    //making the restart button invisible
  gameover.visible = false;
  restart.visible = false;
  }
  
  if (gamestate===end){
  
    ground.velocityX = 0;
    obGroup.setVelocityEach(0,0);
    cloudGroup.setVelocityEach(0,0);
    trex.addImage("stop",trex_collide);
    trex.changeImage("stop");
    trex.setVelocity(0,0);
    birdGroup.setVelocityEach(0,0);
    bird.addAnimation("bird_coll",bird_collided)
    bird.changeAnimation("bird_coll");
    birdGroup.setLifetimeEach(-1);
    
    obGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    gameover.visible = true;
    restart.visible = true;
    
    //making the game restart when the mouseis pressed over restart button
    if (mousePressedOver(restart)) {
    
     reset();
    }
  }
  
  //set text
  textSize(18);
  textFont("Georgia");
  
  //scoring
  text("Score: "+ count, 450, 50);
  
  //making the trex collide with the ground
   trex.collide(invisible_ground);
  
  //drawing the sprites
    drawSprites();
}
function spawnclouds(){

  if (frameCount %60 === 0){
    
    clouds = createSprite(610, 100, 10, 10);
    clouds.velocityX = -4;
    clouds.addImage("cloud",cloud_image)
    clouds.scale = 0.75;
    clouds.y = random(50,120);
    trex.depth = clouds.depth+1;
    
    cloudGroup.add(clouds);
  }
}
function spawncactus() {
  
  if (frameCount %120 ===0 &&count<700) {
    
    
    var cactus = createSprite(610,180, 10, 40);
    var r = Math.round(random(1,6));
    switch(r){
    
      case 1:cactus.addImage(ob1);
      break;
      case 2:cactus.addImage(ob2);
      break;
      case 3:cactus.addImage(ob3);
      break;
      case 4:cactus.addImage(ob4);
      break;
      case 5:cactus.addImage(ob5);
      break;
      case 6:cactus.addImage(ob6);
      break;
      default:break;
    }
    cactus.velocityX = -4;
    cactus.scale = 0.5;
    cactus.lifetime = 50;
    
    obGroup.add(cactus);
  }
}

function spawnbird(){

 if (count>700&&frameCount %180===0){
  bird = createSprite(610,140,30,20);
  bird.addAnimation("birdflying",bird_fly);
  bird.velocityX = ground.velocityX;
  bird.lifetime = 220
  bird.scale = 0.5;
  birdGroup.add(bird);
 }
}

function reset(){

   gamestate = play;
   obGroup.destroyEach();
   cloudGroup.destroyEach();
   birdGroup.destroyEach();
   trex.changeAnimation("running", trex_running);
   count = 0;
}




