var sky,airballoon,coin1,coin2,obstacle;
var skyImg,airballoonImg,coin1Img,coin2Img,obstacleImg;
var coins = 0;
var coin1G,coin2G,obstacleG;
var gameOverImg;

var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
    skyImg = loadImage("sky.jpg");
    airballoonImg = loadImage("airballoon.jpg");
    coin1Img = loadImage("coin1.png");
    coin2Img = loadImage("coin2.png");
    obstacleImg = loadImage("obstacle.png");
   
    gameOverImg = loadImage("gameOver.png");
}

function setup()
{
    createCanvas(400,600);
      
    sky=createSprite(200,200);
    sky.addImage(skyImg);
    sky.velocityY = 3;
    
    
    //creating boy running
    airballoon = createSprite(70,420,20,20);
    airballoon.addImage(airballoonImg);
    airballoon.scale=0.15;
      
    
    coin1G = new Group();
    coin2G = new Group();
    obstacleG = new Group();
}

function draw()
{
    if(gameState===PLAY){
        background(0);
        airballoon.x = World.mouseX;
        
        edges = createEdgeSprites();
        airballoon.collide(edges);
        
        //code to reset the background
        if(sky.y > 400 ){
          sky.y = height/2;
        }
        
          createCoin1();
          createCoin2();
          createObstacle();
      
          if (coin1G.isTouching(airballoon))
           {
            coin1G.destroyEach();
            coins=coins+10;
           }

          else if (coin2G.isTouching(airballoon))
           {
            coin2G.destroyEach();
            coins=coins+50;
           }
            
          else{
            if(obstacleG.isTouching(airballoon)) {
              gameState=END;
             
              
              coin1G.destroyEach();
              coin2G.destroyEach();
              obstacleG.destroyEach();
                         
              coin1G.setVelocityYEach(0);
              coin2G.setVelocityYEach(0);
              obstacleG.setVelocityYEach(0);
      
               //create a sprite
               gameOver = createSprite(190,300);
               gameOver.addImage(gameOverImg);
               gameOver.scale = 0.5;
             
            }
        }
        
               drawSprites();
               textSize(20);
               fill(255);
               text("Coins: "+ coins,10,30);
        }
}

function createCoin1()
 {
  if (World.frameCount % 200 == 0)
  {
   coin1 = createSprite(Math.round(random(50, 350),40, 10, 10));
   coin1.addImage(coin1Img);
   coin1.scale=0.05;
   coin1.velocityY = 3;
   coin1.lifetime = 150;
   coin1G.add(coin1);
  }
}

function createCoin2()
{
  if (World.frameCount % 320 == 0)
 {
   coin2 = createSprite(Math.round(random(50, 350),40, 10, 10));
   coin2.addImage(coin2Img);
   coin2.scale=0.03;
   coin2.velocityY = 3;
   coin2.lifetime = 150;
   coin2G.add(coin2);
 }
}

function createObstacle()
{
  if (World.frameCount % 530 == 0)
 {
   obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
   obstacle.addImage(obstacleImg);
   obstacle.scale=1.0;
   obstacle.velocityY = 3;
   obstacle.lifetime = 200;
   obstacleG.add(obstacle);
  }
}