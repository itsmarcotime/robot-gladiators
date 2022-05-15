var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["EVIL CHI", "Chichibot", "Chirouble"];
var enemyHealth = 50;
var enemyAttack = 12;



var fight = function(enemyName) {

    //repeat and execute as long as enemy is alive
    while (playerHealth > 0 && enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");


            //if yes (true), leave fight
            if (confirmSkip) {

                window.alert(playerName + " has decided to quit this fight. Goodbye!");

                //subtract playerMoney for skipping
                playerMoney = playerMoney - 10;

                console.log("playerMoney", playerMoney)

                break;
            }

        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;

        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0) {

            window.alert(enemyName + " has died!");

            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;

        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + "health remaining."
        );


        // check players health
        if (playerHealth <= 0) {

            window.alert(playerName + " has died!");

            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

    }

};

var startGame = function() {

    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {

        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            // reset enemyHealth before starting new round
            enemyHealth = 50;
    
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    
    }

    endGame();

};

//function to end the entire game
var endGame = function() {
    window.alert("the game has now ened. Lets see how you did!");

    //if player is still alive
    if (playerHealth > 0) {

        window.alert("Great Job! you've survived the game! you now have a score of " + playerMoney + ".");

    } else {
        window.alert("You've lost your robot in battle!");
    }

    var playAgainConfirm = window.confirm("Wouls you like to play again?");


    if (playAgainConfirm) {
        //resart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
    
};

startGame();





