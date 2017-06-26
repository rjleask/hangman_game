var guessRemainingMessage = document.querySelector(".problem");
var resetButton = document.querySelector("#clear_btn");
var button = document.querySelector("#submit_btn");
var userGuess = document.querySelector(".guess_input");
var message = document.querySelector("#message");
var guesses = document.querySelector(".your_guess");
var trackedGuesses = document.querySelector(".tracked_guesses");
var randomWordForDisplaySpan = document.querySelector(".stripe_span");
var hardModeButton = document.querySelector("#hard");
var easyModeButton = document.querySelector("#easy");
var newGameButton = document.querySelector(".new_game");
var conditionMessage = document.querySelector(".lose_message");
var randomWordForDisplay = "";
var guessesSoFar = [];
var messageList = ["heck you're as dull as dishwater.", " I reckon your family tree was a shrub.", "I bet you don't know dung from wild honey.", "I bet you couldn't track an elephant in snow."];
var list = ["bingo", "lugubrious", "ginger", "liquid", "standoff", "duel", "saloon", "bourbon"];
var randomWord = list[Math.floor(Math.random() * list.length)];
var guessRemaining = 10;
var rightGuessArray = [];
var pageHeader = document.querySelector("#page_header_id");
var wins = 0;
var losses = 0;
console.log(randomWord);
gameStart();


// document.onkeyup = function(event) {
//     userGuess.value = event.key;
//     // if (event.keyCode === 13) {
//     //     correctGuess(event.key);
//     //     guessesSoFar.push(event.key);
//     //     trackedGuesses.textContent = guessesSoFar;
//     //     guessRemainingMessage.textContent = "Limbs Left: " + guessRemaining;
//     //     // replaces the underscores with userGuess from randomWordForDisplay. 
//     //     for (var i = 0; i < randomWord.length; i++) {
//     //         if (randomWord[i] === event.key) {
//     //             // var x = "Hello world"
//     //             randomWordForDisplay = randomWordForDisplay.substring(0, i) + event.key + randomWordForDisplay.substring(i + 1);
//     //             randomWordForDisplaySpan.textContent = randomWordForDisplay;
//     //         }
//     //     }

//     // }

// }


// input box looks for enter key, then runs submit when enter is pressed.
userGuess.addEventListener("keypress", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        button.click();

    } else {
        userGuess.value = event.key;
    }
});

newGameButton.addEventListener("click", function() {
    this.style.display = "none";
    reset();
    gameStart();


});


hardModeButton.addEventListener("click", function() {
    this.classList.add("highlighted");
    easyModeButton.classList.remove("highlighted");
    guessRemaining = 6;
    guessRemainingMessage.textContent = "Guesses:" + guessRemaining;
});

easyModeButton.addEventListener("click", function() {
    this.classList.add("highlighted");
    hardModeButton.classList.remove("highlighted");
    guessRemaining = 10;
    guessRemainingMessage.textContent = "Guesses:" + guessRemaining;

});
// clears guesses and message, does not reset
resetButton.addEventListener("click", function() {
    location.reload();
});

// submit button
button.addEventListener("click", function() {
    engine(userGuess.value, guessesSoFar);


});

function gameStart() {
    randomWord = randomWordFunction();
    // This section iterates through randomWord and if i == a space it replaces it with
    // it adds a space randomWordForDisplay, otherwise it adds an underscore
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === " ") {
            randomWordForDisplay = randomWordForDisplay + "  ";
        } else {
            randomWordForDisplay = randomWordForDisplay + "_";
        }
    }
    // displays the random word on the page in the header
    randomWordForDisplaySpan.textContent = randomWordForDisplay;
    // displays guesses remaining
    guessRemainingMessage.textContent = "Guesses:" + guessRemaining;
    // on page load, give easy button
    easyModeButton.classList.add("highlighted");

}

function reset() {
    message.style.display = "inline-block";
    guessRemaining = 10;
    randomWordForDisplaySpan.style.display = "inline-block";
    guessesSoFar = [];
    trackedGuesses.textContent = guessesSoFar;
    message.textContent = "";
    conditionMessage.textContent = "";
    rightGuessArray = [];
    newGameButton.classList.remove("correct_color");
    conditionMessage.classList.remove("correct_color");
    pageHeader.classList.remove("winning_color");
    pageHeader.classList.remove("losing_color");
    pageHeader.classList.remove("losing_message");

}
// if no chrs in word value is 0 else its in the word splits amount of times
function correctGuess(chr) {
    var splits = randomWord.split(chr).length - 1;
    if (splits === 0) {
        guessRemaining--;
        if (guessRemaining < 1) {
            youLose();
        }
        console.log(guessRemaining);
        return "There are no " + chr + "'s " + "-- " +
            randomMessage();

    } else {
        if (splits === 1) {
            rightGuessArray.push(chr);
            if (rightGuessArray.length === randomWord.length) {
                youWin();
            }
        } else if (splits === 2) {
            rightGuessArray.push(chr, chr);
            if (rightGuessArray.length === randomWord.length) {
                youWin();
            }
        } else if (splits === 3) {
            rightGuessArray.push(chr, chr, chr);
            if (rightGuessArray.length === randomWord.length) {
                youWin();
            }
        }
        return "There are " + splits + " " + chr + "'s";
    }

}

function clearContent() {
    document.querySelector(".guess_input").value = "";

}

function youLose() {
    var loseMsg = "You play the same way a hog smells after eatin...real bad! hahaha!";
    pageHeader.classList.add("losing_message");
    losses++;
    message.style.display = "none";
    randomWordForDisplay = "";
    randomWordForDisplaySpan.style.display = "none";
    newGameButton.style.display = "inline-block";
    conditionMessage.textContent = loseMsg;
}

function youWin() {
    var winMsg = "Correct! the word was " + randomWord + "---" + "Hmphh! You got lucky! Try Hard Mode if you're not too yella! hahaha!";
    newGameButton.classList.add("correct_color");
    pageHeader.classList.add("winning_color");
    conditionMessage.classList.add("correct_color");
    wins++;
    message.style.display = "none";
    randomWordForDisplaySpan.style.display = "none";
    randomWordForDisplay = "";
    newGameButton.style.display = "inline-block";
    conditionMessage.textContent = winMsg;


}

function randomWordFunction() {
    return list[Math.floor(Math.random() * list.length)];
}

function randomMessage() {
    return messageList[Math.floor(Math.random() * messageList.length)];
}

function engine(user, arr) {
    // wrapping if statement checks if user guess is in existing guesses array
    if (arr.indexOf(user) === -1) {
        // replaces the underscores with userGuess from randomWordForDisplay. 
        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === userGuess.value) {
                randomWordForDisplay = randomWordForDisplay.substring(0, i) + userGuess.value + randomWordForDisplay.substring(i + 1);
                randomWordForDisplaySpan.textContent = randomWordForDisplay;
            }
        }
        guessesSoFar.push(userGuess.value);
        // correctGuess(userGuess.value);
        trackedGuesses.textContent = guessesSoFar;
        // displays guesses remaining
        message.textContent = correctGuess(userGuess.value);
        guessRemainingMessage.textContent = "Guesses:" + guessRemaining;
        trackedGuesses.textContent = guessesSoFar;
        clearContent();
    } else {
        console.log("Already guessed that");
    }
}
