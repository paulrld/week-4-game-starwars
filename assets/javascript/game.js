
//  This code will run as soon as the page loads.
window.onload = function() {
  //  Click events are done for us:

  //button listener for selecting characters for both player and enemy
  $(".characterContainer").click(game.buttontest);

  //attack button listener
  $("#attackButton").click(game.battling);

};

//object for the game!
var game = {
  //declare 4 characters to choose from
  characters: {
    char1: {
      name: "Obi-Wan Kenobi",
      healthPoints: 120,
      attackPower: 11,
      counterAttackPower: 8,
      imagePath:"assets/images/obi-wan-kenobi.jpg"
    },
    char2: {
      name: "Luke Skywalker",
      healthPoints: 100,
      attackPower: 10,
      counterAttackPower: 10,
      imagePath:"assets/images/luke-skywalker.jpg"
    },
    char3: {
      name: "Darth Sidious",
      healthPoints: 150,
      attackPower: 8,
      counterAttackPower: 20,
      imagePath:"assets/images/darth-sidius.jpg"
    },
    char4: {
      name: "Darth Maul",
      healthPoints: 180,
      attackPower: 4,
      counterAttackPower: 25,
      imagePath:"assets/images/darth-maul.jpg"

    }
  },
  //declare variables used 
  characterSelected: 0,//boolen for checking if a player selected a character
  enemySelected: 0,//boolen for checking if a player selected an enemy
  win: 0,
  lose: 0,
  characterChosen: [],//array for storing selected character info. this could have been avoided but i didnt want to rewrite the code
  enemyChosen: [],//array for storing selected enemy. this could have been avoided but i didnt want to rewrite the code
  attackCounter:0,//counter for multiplying base attack power for character
  enemiesDefeatedCounter:0,//counter for checking the total numbers defeated//
  battling:0,//boolen for checking if an enemy is in the Defender arena

  //create characters and their stats
  createAttributes: function () {
    for (var i = 0; i < Object.keys(game.characters).length; i++) {

    // For each iteration, we will create players using the chars defined earlier

    //create div for holding displaying character info: char name, char iamge, char HP
    var divContainer = $("<div>");
    //character iamge
    var character = $("<img>");
    //div for character HP
    var caption = $("<div class='caption'>");
    //div for character Name
    var title = $("<div class='caption'>");

    //get character information
    var getCharacterKey = game.characters[Object.keys(game.characters)[i]];

    //add class for .css stlying ex.(float left)
    divContainer.addClass("characterContainer");
    
    //set innerhtml for character name
    title.html(getCharacterKey.name)
    //center the character name
    title.addClass("text-center")

    //set inner html for character health
    caption.html(getCharacterKey.healthPoints)
    //center character health
    caption.addClass("text-center")

    // Each character will be given a src link to a respective character image
    character.attr("src", getCharacterKey.imagePath);
    character.addClass("center-block")

    // Each imageCrystal will be given attributes: name, healthpoints, attackpower, counterattackpower
    divContainer.attr("data-name", getCharacterKey.name);
    divContainer.attr("data-healthpoints", getCharacterKey.healthPoints);
    divContainer.attr("data-attackpower", getCharacterKey.attackPower);
    divContainer.attr("data-counterattackpower", getCharacterKey.counterAttackPower);

    // Lastly, each character (with all it classes and attributes) will get added to the page.

    //add character name to div container
    divContainer.append(title)
    //add character image to div container
    divContainer.append(character)
    //add character health to div container
    divContainer.append(caption)

    //add the div container holding (name,image,and health html stuff into div with id image-section)
    var stringID = "#image-section";
    $(stringID).append(divContainer);

    //style the characters with borders and color
    $(".characterContainer").css("padding","5px");
    $(".characterContainer").css("margin","1px");
    $(".characterContainer").css("background-color","white");
    $(".characterContainer").css("border-style","solid");
    $(".characterContainer").css("border-color","green");

  }
},
//resets the game by reseting the inital values to 0 and empty and clearing any html elements
resetGame: function() {
  //clear the div with id image-section (this div holds any characters to select)
  $("#your-character").html("")
  $("#image-section").html("")
  //clear the div with id enmies-to-attack(this div holds the characters available to attack)
  $("#enemies-to-attack").html("")
  //clear the div with id enemy-in-battle(this div holds the enemy currently in battle)
  $("#enemy-in-battle").html("")
  //clear the div that holds the dynamically created reset button and info about battle and win/lose
  $("#resetButton").html("")

  //recreate the character stats (resets it back to normal)
  game.createAttributes() 
  //reset all the bool values to 0 and empty any arrays holding character data
  game.characterSelected = 0;
  game.enemySelected = 0;
  game.win = 0;
  game.lose = 0;
  game.characterChosen = [];
  game.enemyChosen = [];
  game.attackCounter=0;
  game.enemiesDefeatedCounter = 0;
  game.battling=0;

  //renable character selection listener
  $(".characterContainer").click(game.buttontest);
  //renable attack button listener
/*  $("#attackButton").click(game.battling);
*/
},

grabCharacter:0,//variable to hold the character object that was selected (on click)
grabBattling:0,//variable to hold the enemy in battle object that was selected (on click)

//FUNCTION QUICK SUMMARY
//function that determines what happens when characters are clicked on
//1. grab information of selected character
//2. user selectes their character?
//    a. move user character to your character section
//    b. move enemies to enemies to attack section
//3. user selects the enemy to fight?
//    a. move enemy to battle arena

buttontest: function () {

  //grab information of selected character: name, healthpoints,attackpower,and counterattackpower
  var charName=($(this).attr("data-name"))
  var charHealthPoints=($(this).attr("data-healthpoints"));
  var charAttackPower=($(this).attr("data-attackpower"));
  var charCounterAttackPower=($(this).attr("data-counterattackpower"));
  
  //grab the character object (i got tired of typing "$(this))""
  var getThisCharacter=$(this)

  //when your character is selected do this stuff
  if (game.characterSelected===0) 
  {
    //clear resetButton html stuff
    $("#resetButton").html("")

    //disable selecting this character again
    $(this).off('click');

    //grab selected character object that the character will play
    game.grabCharacter=this;
    game.characterSelected = 1;//player selected a character so set bool value to 1
    console.log("selected character")

    //store selected character information in an array used for later
    game.characterChosen.push(charName,charHealthPoints,charAttackPower,charCounterAttackPower)

    //move user character to div with id "your-character"
    getThisCharacter.appendTo("#your-character")

    console.log("moving enemies for selection")
    
    //add enemy class for remaining characters for css styling
    $("#image-section").children().addClass("enemy")
    //move each enemy to the div with id "enemies-to-attack"
    $("#image-section").children().appendTo("#enemies-to-attack")

    //after moving the enemies to the enemies area style them with a red backround and black border
    $(".enemy").css("background-color","red");
    $(".enemy").css("border-color","black");
  }
  //only select an enemy when the player has selected a character 
  else if (game.enemySelected===0 && game.characterSelected === 1) 
  {
    //disable selecting this character again
    $(this).off('click');
    //grab the character object sent to the battle arena
    game.grabBattling=this;

    game.enemySelected = 1;//enemy selected so set bool value to 1
    
    game.battling = 1;//enemy selected so set bool value to 1
    //store selected enemy information in an array used for later
    game.enemyChosen.push(charName,charHealthPoints,charAttackPower,charCounterAttackPower)

    console.log("moving enemy to battle")
    //move selected enemy to battle arena
    getThisCharacter.appendTo("#enemy-in-battle")
    //create class battling for this character used for css styling
    getThisCharacter.addClass("battling")
    //create class for the respective enemy in battle name and hp used for css styling
    $($(getThisCharacter).children()[0]).addClass("battling-text")
    $($(getThisCharacter).children()[2]).addClass("battling-text")

    //style the enemy in battle with a black background, green border, and white text
    $(".battling").css("background-color","black");
    $(".battling").css("border-color","green");
    $(".battling-text").css("color","white");

    //clear information of any enemy damage,
    $("#resetButton").html("")
  }
  },
  //resetButton created dynamically for resetting the game
  resetButton: function () {
    var reset= $('<button id="restartButton">Restart</button>');
    $("#resetButton").prepend(reset);
    $("#restartButton").click(game.resetGame);//enable restartButton

  },

  //FUNCTION QUICK SUMMARY
  //function that determines what happens when the attack button is clicked
  //when attack button is clicked...
  //1. check if user selected character
  //2. check if user selected enemy
  //3. check if enemy is in battle arena
  //4. when enemy isin battle arena
  //   a. character health drops to 0 
  //        1.end game
  //   b. health of enemy drops to 0
  //         1.choose next enemy
  //         2.all enemies defeated
  //           a. end game
  battling: function () 
  {
    //fix for attack running after win.
    //only attack when user has not win or lost
  if(game.win===0 && game.lose===0) {
    //attack button pressed but no character is selected
    if (game.characterSelected===0){
      console.log("No character selected")
      //display to user that no character is selected
      $("#resetButton").html("No character selected.")

    }
    //character selected but no enemy is selected
    else if (game.enemySelected===0 && game.characterSelected === 1) {
      console.log("No enemy selected")
      //display to user that no enemy is selected
      $("#resetButton").html("No enemy here.")
    }
    // attack is clicked, there is an enemy in the battle arena
    else if (game.battling===1) 
    {
      //increment attackCounter for multiplying base character attack
      game.attackCounter++;
      //get information on the selected character 
      var charHealthPoints = game.characterChosen[1]
      var enemyHealthPoints = game.enemyChosen[1]
      var characterAttackPower = game.characterChosen[2]*game.attackCounter
      var enemyCounterAttackPower = game.enemyChosen[3]

      //decrease enemy health using characters attack power
      game.enemyChosen[1]=enemyHealthPoints-characterAttackPower
      console.log(game.characterChosen)
      console.log(game.enemyChosen)

      //update the hp of the enemy in the battle arena
      $($(game.grabBattling).children()[2]).html(game.enemyChosen[1])
      
      //character health drops to 0 or less end the game
      if(game.characterChosen[1]<=0)
      {
        console.log("no more hp!")
        game.battling=0;//no character in arena (they were defeated by player)

        $("#resetButton").html("<div>You been defeated...GAME OVER!!!!</div>");
        game.lose=1;
        game.resetButton();//create resetButton dynamically after lose
        return//exist this function (ignore the reset of the code in the function)
      }

      //if health points of enemy drops down to 0
      if(game.enemyChosen[1]<=0) 
      {
        game.enemySelected = 0;
        console.log("choose next enemy")
        game.enemyChosen = [];//clear enemy data because they died
        $("#enemy-in-battle").html("")//clear the enemy on the page because they died
        game.enemiesDefeatedCounter++//increase the number enemies defeated

        //total number of enemies have been defeated end the game
        if(game.enemiesDefeatedCounter>=Object.keys(game.characters).length-1) 
        {
          $("#resetButton").html("<div>You Won!!!! GAME OVER!!!</div>");
          game.win=1;
          game.resetButton();//create resetButton dynamically after win
        }
        //there are still enemies remaining inform user to select another enemy
        else 
        {
          //the array for enemyBattling gets cleared when enemy is defeated 
          //so had to use this method to get name. Could have gotten all the 
          //enemy information using this method instead of storing it in array  
          var enemyName=$(game.grabBattling).attr("data-name")
          $("#resetButton").html("You have defeated " + enemyName + ", you can choose to fight another enemy.");
        }
      }

      else 
      {//health of enemy not yet zero counter attack
        game.characterChosen[1]=charHealthPoints-enemyCounterAttackPower
        $($(game.grabCharacter).children()[2]).html(game.characterChosen[1])// update char hp

        if(game.characterChosen[1]<=0)
        {
          console.log("no more hp!")
          game.battling=0;//no character in arena (they were defeated by player)

          $("#resetButton").html("<div>You been defeated...GAME OVER!!!!</div>");
          game.lose=1;
          game.resetButton();//create resetButton dynamically after lose
          return//exist this function (ignore the reset of the code in the function)
        }
        $("#resetButton").html("You attacked " + game.enemyChosen[0] + " for " +characterAttackPower + " damage<br>" + game.enemyChosen[0] + " attacked you back for " + enemyCounterAttackPower + " damage.</br>");
      }
    }
   }  
  }
}
game.createAttributes()//start the game





