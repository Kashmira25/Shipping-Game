var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;
var hx=0;


function preload()
{
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadAnimation("ship.png","ship2.png","ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water 
 water = createSprite(200,300,800,500);
 water.addImage(waterbg);

  //creating ship
 ship = createSprite(200,250,20,20);
 ship.addAnimation("shipimg",shipimg);
 ship.scale = 0.3;
  
  //creating helicopter group
  helicopterGroup = new Group();
  helicopter = createSprite(500,100,70,70);
  helicopter.addImage(helicopterimg);
  helicopter.velocityX=-3;
  helicopter.scale=0.5;  
 


  //creating bomb group
  bombGroup = new Group();
    

  //ship.debug = "true";

}

function draw() {
  background(skybg);
  text("hello how r u",200,200);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    ship.x= World.mouseX;
    //edges = createEdgeSprites();
    edges = createEdgeSprites();
    ship.bounceoff = edges;
    helicopter.bounceoff=edges;
    score = score + Math.round(frameCount/300);

    
    //Call user defined function
    spawnHelicopter();
    
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",restartimg)
   //water velocity becomes zero
    water.velocityX =0;
    helicopter.destroy();
    bomb.destroy();
   //destroy Helicopter group

   //destroy bomb group
    
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    hx=helicopter.x;
    text(hx,200,200);
    helicopterGroup.add(helicopter);
    spawnBomb();
    
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
    var randomx = Math.floor((Math.random() * 500)+100);
    bomb = createSprite(randomx,100,40,40);
    bomb.addImage(bombimg);
    bomb.velocityY = 3;
  //bomb.velocityX = -3;
    bomb.scale =0.2;
    bombGroup.add(bomb);
  
}




