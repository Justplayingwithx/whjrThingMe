  const Bodies = Matter.Bodies;
  const Engine = Matter.Engine;
  const World = Matter.World;
  const Body = Matter.Body;

  var myEngine;
  var myWorld;

  var playerStill;
  var movingPlayer_1, movingPlayer_2;
  var player;
  var pointer;
  var playerAnimation;
  var normalPlace;
  var normalPlaceCounter, normalPlaceTimeOut;
  var bushImage;
  var bushObj;
  var score;
  var wall1, wall2;
  var mineFieldAheadImage;
  var mineFieldAheadImage2;
  var dangerSprite;
  var dangerSprite2;
  var dangerSpriteGroup;
  var startBuffer;
  var obstacleGroup;
  var mine;
  var mine1Image, mine2Image;
  var randomNumber;
  var coinRandomNumber;
  var coinImage;
  var coinSprite;
  var coinGroup;
  var bufferScore;
  var coinIndex;
  var coinNumber;
  var destroyGroup;
  var playButton;
  var playButtonImage;
  var titleImage;
  var title;


  var state;
  var otherBufferThing = false;
  var haha = false;
  var v = false;
  var database;
  var fifthGlobalScore;
  var fifthScore;
  var place = 0;
  var immunityBottle;
  var immunityBottleImage;
  var immunityGroup;
  var haha2 = false;
  var immune = false;
  var startScore;
  var endingScore;
  var coinPresent = false;
  var immunityPresent = false;





  function preload() {
    playerStill = loadImage("../images/character_still.png");
    movingPlayer_1 = loadImage("../images/walking_1.png");
    movingPlayer_2 = loadImage("../images/walking_2.png");
    bushImage = loadImage("../images/bush.jpg")
    mineFieldAheadImage = loadImage("../images/starterTextMinefield.png");
    mineFieldAheadImage2 = loadImage("../images/starterTextMinefield.png");
    mine1Image = loadImage("../images/mine1.png");
    mine2Image = loadImage("../images/mine2.png");
    coinImage = loadImage("../images/coin.png");
    playButtonImage = loadImage("../images/playButtonImage.png")
    titleImage = loadImage("../images/titleImage.png")
    immunityBottleImage = loadImage("../images/immunityBottleImage.png")
  }


  function setup() {

    database = firebase.database();

    startBuffer = false;

    score = 0;

    bufferScore = 0;

    coinIndex = []

    destroyGroup = new Group();

    pointer = createSprite(1000, 800, 3, 3)
    pointer.visible = false;




    obstacleGroup = new Group();

    coinGroup = new Group();

    immunityGroup = new Group();





    dangerSpriteGroup = new Group();

    title = createSprite(450, 130)
    title.addImage(titleImage)

    myEngine = Engine.create();

    myWorld = myEngine.world;





    createCanvas(displayWidth - displayWidth / 2 - 20 - 40, 900)




    console.log(height)
    playButton = createSprite(width / 2, height / 2, 50, 50)
    playButton.addImage(playButtonImage)











  }

  function draw() {
    Engine.update(myEngine)
    background("white")
    pointer.position.x = mouseX;
    pointer.position.y = mouseY;

    drawSprites()
    if (mouseIsPressed) {
      if (pointer.isTouching(playButton)) {
        oSetup()
        playButton.remove()
        title.visible = false;


      }
    }



    if (v === true) {
      if (state === "play") {

        if (score < 1) {
          bufferScore++
        }
        if (bufferScore >= 400) {
          score++
        }



        player.collide(wall1)
        player.collide(wall2)

        

        if (startBuffer = true && frameCount % 50 === 0 && dangerSprite2.y < height / 2) {
          randomNumber = Math.round(random(1, 2))
          coinRandomNumber = Math.round(random(1, 13))
          switch (randomNumber) {
            case 1:
              mine = createSprite(Math.round(random(100, width - 100)), height, 20, 20);
              mine.velocityY = -3;
              obstacleGroup.add(mine)
              mine.addImage(mine1Image);
              mine.setCollider('rectangle', 0, 0, mine.width - 10, mine.height)
              //mine.debug = true;
              mine.lifetime = 900 / 3

              switch (coinRandomNumber) {
                case 1:
                  break;
                case 2:
                  break;
                case 3:
                  break;
                case 4:
                if(coinPresent === false){
                  if (mine.x - 100 <= wall1.x) {
                    coinSprite = createSprite(mine.x - 100, mine.y, 20, 20)
                    coinSprite.addImage(coinImage);
                    coinSprite.velocityY = -3;
                    destroyGroup.add(coinSprite);
                    haha = true;
                    coinPresent = true;
                  } else {
                    coinSprite = createSprite(mine.x + 100, mine.y, 20, 20)
                    coinSprite.addImage(coinImage);
                    coinSprite.velocityY = -3;
                    destroyGroup.add(coinSprite);
                    haha = true
                    coinPresent = true;
                  }

                }
                 



                  break;
                case 10:
                  if(immune === false){
                    if(mine.x + 100 <= wall1.x){
                      immunityBottle = createSprite(mine.x-100, mine.y, 20,20);
                      }else if(mine.x + 100>wall1.x){
                        immunityBottle = createSprite(mine.x+100, mine.y, 20,20)
                      }
                    
                      immunityBottle.addImage(immunityBottleImage);
                      immunityBottle.velocityY = mine.velocityY;
                      immunityBottle.lifeTime = 900/3;
                      immunityPresent = true;
                      destroyGroup.add(immunityBottle);
                      haha2 = true;
                  }else if(immune === true){

                    if (mine.x - 100 <= wall1.x) {
                      coinSprite = createSprite(mine.x - 100, mine.y, 20, 20)
                      coinSprite.addImage(coinImage);
                      coinSprite.velocityY = -3;
                      destroyGroup.add(coinSprite);
                      haha = true;
                    } else {
                      coinSprite = createSprite(mine.x + 100, mine.y, 20, 20)
                      coinSprite.addImage(coinImage);
                      coinSprite.velocityY = -3;
                      destroyGroup.add(coinSprite);
                      haha = true
                    }
                  }
            

                default:
                  break;
              }


              break;

            case 2:

              mine = createSprite(Math.round(random(100, width - 100)), height, 20, 20);
              mine.velocityY = -3;
              obstacleGroup.add(mine);
              mine.addImage(mine2Image);
              mine.setCollider('rectangle', 0, 0, mine.width - 10, mine.height)
              // mine.debug = true;
              mine.lifetime = 900 / 3

              switch (coinRandomNumber) {
                case 1:
                  break;
                case 2:

                  if (mine.x + 100 >= wall2.x) {

                    console.log("uWu shut up")

                    coinSprite = createSprite(mine.x - 100, mine.y, 20, 20)


                  } else if (mine.x - 100 < wall2.x) {
                    coinSprite = createSprite(mine.x + 100, mine.y, 20, 20)
                  }

                  coinSprite.addImage(coinImage);
                  coinSprite.velocityY = -3;
                  coinSprite.lifetime = 900 / 3;
                  coinPresent = true;
                  destroyGroup.add(coinSprite)
                  haha = true;
              }

              break;
            case 3:
              break;
            case 4:
              break;

            case 10:
              if(immunityPresent === false){
                if(immune === false){
                  if(mine.x + 100 >= wall2.x){
                    immunityBottle = createSprite(mine.x-100, mine.y, 20,20);
                    }else if(mine.x + 100<wall2.x){
                      immunityBottle = createSprite(mine.x+100, mine.y, 20,20)
                    }
                  
                    immunityBottle.addImage(immunityBottleImage);
                    immunityBottle.velocityY = mine.velocityY;
                    immunityBottle.lifeTime = 900/3;
                    immunityPresent = true;
                    destroyGroup.add(immunityBottle);
                    haha2 = true;
  
                }else if(immune === true){
  
                  if (mine.x + 100 >= wall2.x) {
  
                    console.log("uWu shut up")
  
                    coinSprite = createSprite(mine.x - 100, mine.y, 20, 20)
  
  
                  } else if (mine.x - 100 < wall2.x) {
                    coinSprite = createSprite(mine.x + 100, mine.y, 20, 20)
                  }
  
                  coinSprite.addImage(coinImage);
                  coinSprite.velocityY = -3;
                  coinSprite.lifetime = 900 / 3;
                  coinPresent = true;
                  destroyGroup.add(coinSprite)
                  haha = true;
              }
              }
              

              
            
              
            default:
              break;
          }


        }



        if (frameCount % 50 === 0 && haha === true) {

          if (coinSprite.y <= height / 3) {
            coinGroup.add(coinSprite);
            haha = false;
          }
         
        }

        if(frameCount % 50 === 0 && haha2 === true){
          if(immunityBottle.y<=height/3){
            immunityGroup.add(immunityBottle);
          }
        }

        if (haha === false) {
          if (player.isTouching(coinGroup)) {
            coinGroup.destroyEach();
            score = score + 500;
          }
        }

        if(coinPresent === true){
          if(coinSprite.x<5){
            coinPresent = false;
          }
        }

        if(immunityPresent === true){
          if(immunityBottle.x<5){
            immunityPresent = false;
          }
        }

        if (bushObj.y <= 1) {
          console.log("danger sign reached")



          dangerSprite.visible = true;
          dangerSprite.velocityY = -3;
          dangerSprite2.visible = true;
          dangerSprite2.velocityY = -3;
          if (dangerSprite.y === 0 || dangerSprite2.y === 0) {
            dangerSpriteGroup.destroyEach();
            startBuffer = true;
          }

          if (player.isTouching(obstacleGroup)) {
            console.log("touch")
            if(immune === false){
              state = "end";
              console.log(state)
              player.visible = false;
              obstacleGroup.destroyEach();

            }else if(immune === true){
            obstacleGroup.destroyEach();
            destroyGroup.destroyEach();
            }
    



          }

          if(immune === true){
            if(score === endingScore){
              immune = false;
            }
          }

          if(player.isTouching(immunityGroup)){
            immune = true;
            endingScore = score + 1000;
            immunityGroup.destroyEach();

          }

        }
        keyDownCheck();
        drawSprites();

        stroke("blue")
        textSize(20)
        text("Score: " + score, width - 200, 30)

      }




      else if (state === "end") {
        console.log("hi")
        textSize(20)
        coinGroup.destroyEach();
        destroyGroup.destroyEach();

        text("Game Over! Your final score was: " + score + ". Press space to try again, or ", width / 2 - 300, height / 2)
        text(" L to submit your score to the leaderboard.", width / 2 - 200, height / 2 + 50)

        if (keyDown("space")) {
          state = "play";
          player.visible = true;
          score = 0;
          otherBufferThing = true;

          player.x = width - width / 2;
          oSetup();
        }
        if (keyDown("L") || keyDown("l")) {
          var path = database.ref("/5/score")
          path.once("value", (snapshot) => {
            fifthScore = snapshot.val();
            console.log(fifthScore)
            if (score > fifthScore) {
              var otherPath1 = database.ref("/4/score");
              otherPath1.once("value", (snapshot) => {
                var fourthScore = snapshot.val()
                if (score > fourthScore) {
                  var otherPath2 = database.ref("3/score");
                  otherPath2.once("value", (snapshot) => {
                    var thirdScore = snapshot.val();
                    if (score > thirdScore) {
                      var otherPath3 = database.ref("2/score");
                      otherPath3.once("value", (snapshot) => {
                        var secondScore = snapshot.val();
                        if (score > secondScore) {
                          var otherPath4 = database.ref("1/score");
                          otherPath4.once("value", (snapshot) => {
                            var firstScore = snapshot.val();
                            if (score > firstScore) {
                              database.ref("1/score").set({
                                score:score
                              })
                              database.ref("2/score").set({
                                score:firstScore
                              })
                              database.ref("3/score").set({
                                score:secondScore
                              })
                              database.ref("4/score").set({
                                score:thirdScore
                              })
                              database.ref("5/score").set({
                                score:fourthScore
                              })
                              state = "leaderBoardConfirm"
                              place = "1";
                              

                            } else {
                              database.ref("2/score").set({
                                score:score
                              })
                              database.ref("3/score").set({
                                score:secondScore
                              })
                              database.ref("4/score").set({
                                score:thirdScore
                              })
                              database.ref("5/score").set({
                                score:fourthScore
                              })
                            }
                          })
                          state = "leaderBoardConfirm"
                          place = "2";
                        
                        } else {
                          database.ref("3/score").set({
                            score:score
                          })
                          database.ref("4/score").set({
                            score:thirdScore
                          })
                          database.ref("5/score").set({
                            score:fourthScore
                          })
                        }
                      })
                      state = "leaderBoardConfirm"
                      place = "3";
                      
                    } else {
                      database.ref("4/score").set({
                        score:score
                      })
                      database.ref("5/score").set({
                        score:fourthScore
                      })
                    }
                  })
                  state = "leaderBoardConfirm"
                  place = "4";
                  

                } else {
                  database.ref("5/score").set({
                    score:score
                  })
                  state = "leaderBoardConfirm"
                  place = "5";
                
                }

              })



            } else {
              state = "leaderBoardConfirm"
              
              
              
              
            }
          })

        }





      }else if(state === "leaderBoardConfirm"){
        console.log(fifthScore)
        if(score<fifthScore.score){
          console.log("hahahai")
          textSize(20)
          text("Sorry, your score wasn't high enough. Try to get a higher score next time! Press space to start again.",width / 2-450, height / 2)
          
        }
        if(score>fifthScore.score){
          console.log("hahahao")
          textSize(20);
          text("You made it to "+place+"th place! Congratulations!",width/2,height/2);
        }
      }
    }


























    function oSetup() {
      state = "play";





      if (otherBufferThing === false) {
        player = createSprite(width - width / 2, height - height + 70, 20, 20)

        player.addAnimation("main", movingPlayer_1, movingPlayer_2);


        player.scale = 0.7
      }


      for (var i = 20; i < height; i = i + 100) {
        console.log("hi")
        bushObj = createSprite(30, i, 20, 20)
        bushObj.velocityY = -3;
        bushObj.addImage(bushImage)
        bushObj.scale = 0.07

        console.log("hi")
        bushObj = createSprite(width - 30, i, 20, 20)
        bushObj.velocityY = -3;
        bushObj.addImage(bushImage)
        bushObj.scale = 0.07
      }

      wall1 = createSprite(80, 10, 2, height)

      wall1.visible = false;

      wall2 = createSprite(width - 80, 10, 2, height)

      wall2.visible = false;

      dangerSprite = createSprite(20, height / 2, 20, 20);
      dangerSprite.addImage(mineFieldAheadImage);
      dangerSprite.visible = false;

      dangerSprite.depth = player.depth - 1;

      dangerSpriteGroup.add(dangerSprite);

      dangerSprite2 = createSprite(width - 20, height / 2, 20, 20);
      dangerSprite2.addImage(mineFieldAheadImage2);
      dangerSprite2.visible = false;

      dangerSprite2.depth = player.depth - 1;

      dangerSpriteGroup.add(dangerSprite2);

      v = true;
    }

    function keyDownCheck() {
      if (keyDown(RIGHT_ARROW)) {
        player.x += 5
      }
      if (keyDown(LEFT_ARROW)) {
        player.x -= 5
      }

    }














  }
