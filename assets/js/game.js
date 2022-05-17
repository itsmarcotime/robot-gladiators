//function to generate random numeric value
var randomNumber = function(min, max) {

    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robots name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 moneys");
        this.health += 20;
        this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgraded player's attack by 6 for 7 moneys");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
        
    }
};

var enemyInfo = [
    {
        name: "Evil Chi",
        attack: randomNumber(10,14)
    },
    {
        name: "ChiBot",
        attack: randomNumber(10,14)
    },
    {
        name: "Chi-minator",
        attack: randomNumber(10,14)
    }
];

var fightOrSkip = function() {

    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "Skip" to choose.');

    //conditional recursive function call
    if (!promptFight) {

        window.alert("You need to provide a valid answer! Please try again.");

        return fightOrSkip();

    }

    promptFight = promptFight.toLowerCase();

    //if the player picks "skip" confirm and then stop loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes, leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

            //subtract yo money playa, but dont let it go negative
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            //return true if player wants to leave
            return true;
            
        }
    }
    
    return false;
};


var fight = function (enemy) {

    //keep track of who goes first
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {

        isPlayerTurn = false;

    }

    //repeat and execute as long as enemy is alive
    while (playerInfo.health > 0 && enemy.health > 0) {

        if (isPlayerTurn) {

             //ask player if theyd like to fight or skip using fighorskip function
        if (fightOrSkip()) {
            //if true leave fight by breaking loop
            break;
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        //generate random damage value based on players attack
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enemy's health
        if (enemy.health <= 0) {

            window.alert(enemy.name + " has died!");

            //award player money for winning
            playerInfo.money = playerInfo.money + 20;

            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        
        //player gets attacked first
        } else {

            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            //remove players health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            //check players health
            if (playerInfo.health <= 0) {

                window.alert(playerInfo.name + " has died!");
                //leave while loop if player is dead
                break;

            } else {

                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }

        }

        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;

    }

};


var startGame = function () {

    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new round
            pickedEnemyObj.health = randomNumber(40,60);

            // pass the pickedenemy.name variables value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if the player is alive & we're not the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask the player to enter shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes go to store
                if (storeConfirm) {

                    shop();

                }

            }

        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }

    }

    endGame();

};

//function to end the entire game
var endGame = function () {
    window.alert("the game has now ened. Lets see how you did!");

    //if player is still alive
    if (playerInfo.health > 0) {

        window.alert("Great Job! you've survived the game! you now have a score of " + playerInfo.money + ".");

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

var shop = function () {
    //ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt)

    //using switch to carry out action
    switch (shopOptionPrompt) {

        case 1:

            playerInfo.refillHealth();
            break;

        case 2:

            playerInfo.upgradeAttack();
            break;

        case 3:

            window.alert("Leaving the store.");

            //do nothing leave
            break;

        default:
            
            window.alert("You did not pick a valid option. Try again");

            //call shop() again to force player to pick vaild option
            shop();
            break;
    }

};

startGame();





