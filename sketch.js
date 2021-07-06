var dog, sadDog, happyDogImg, foodS, foodStock;
var database;
var feed;
var addFood;
var fedTime, lastFed;

function preload()
{
sadDog = loadImage("images/dogImg.png");
happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);  


  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
 
  dog = createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  
  

  
}

function draw() { 
  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

    
  
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Fed: "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Fed: 12 AM ",350,30);
}else{
  text("Last Fed: "+ lastFed + "AM ",350,30);
}
  
drawSprites();
}

function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }

  function feedDog(){
    dog.addImage(happyDogImg);

    if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }
    else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

