var trex;
var trex_running;
var ground,groundimage;
var invisible_ground;
var clouds;
var cloud_image;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6;

var bird;

var trex_ducking;
var bird_fly;

//score
var count = 0;

//gamestate
var play = 1;
var end = 2;
var gamestate = play;

var cloudGroup;
var obGroup;
var birdGroup;

var gameover_img;
var gameover;
var restart;
var restart_img;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  groundimage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  trex_collide = loadImage("trex_collided.png");
  restart_img = loadImage("restart0.png");
  gameover_img = loadImage("gameOver.png");
  bird_collided = loadImage("bird1.png");
  trex_ducking = loadAnimation("dinoduck1.png","dinoduck2.png");
  bird_fly = loadAnimation("bird1.png","bird2.png");
}



function setup(){
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,65,75);
  invisible_ground = createSprite(300, 195, 600, 1);
  invisible_ground.visible = false;
  ground = createSprite(300, 190, 600, 1);
  ground.addImage("ground", groundimage);
   obGroup = new Group();
   cloudGroup = new Group();
   birdGroup = new Group();
  gameover = createSprite(300,100,300,30);
  restart = createSprite(300,150,30,50);
  gameover.addImage("over", gameover_img);
  restart.addImage("button", restart_img);
  restart.scale = 0.5;
  gameover.scale = 0.7;
}

function draw(){
  background("white")
  
  if (count>0&&count<500){
  
   background(rgb(47, 91, 204))
   fill(255);
  } else if(count>500){
  
  background("white");
  fill(0);
  }
  
  if (gamestate===play){
  
  if (keyDown("space")&&trex.y>158) 
  {
    trex.velocityY = -12;
  }
  if (keyWentDown("down")){
  
    trex.addAnimation("trex_duck",trex_ducking);
    trex.changeAnimation("trex_duck");
    trex.setCollider("rectangle",0,0,65,50);
  }
  if (keyWentUp("down")){
  
    trex.changeAnimation("running");
    trex.setCollider("rectangle",0,0,65,75);
  }
    
   trex.velocityY = trex.velocityY+1;
    
   ground.velocityX = -4; 
    
    if (ground.x<0){
    ground.x = ground.width/2;
  }
  
  spawnclouds();
  spawncactus();
  spawnbird();
  
   //increase the score
   count = Math.round(World.frameRate/30)+count;
    
  if(obGroup.isTouching(trex)||birdGroup.isTouching(trex)){
  
  gamestate = end;
  }
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
    
    if (mousePressedOver(restart)) {
    
     reset();
    }
  }
  
  //set text
  textSize(18);
  textFont("Georgia");
  
  //scoring
  text("Score: "+ count, 450, 50);
  
   trex.collide(invisible_ground);
  
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




