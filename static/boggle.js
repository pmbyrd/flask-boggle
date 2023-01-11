// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful

// Todo initialize the variables needed for the game and the necessary elements from the page

const form = document.querySelector('form');
const $start = $(".start");
let score = 0;
const words = new Set()

// the user input is submitted and at the end of the game the score is posted to the server
form.addEventListener("submit", async function(e){
    e.preventDefault();
   console.log("form submitted");
   let word = $(".guess").val()
//    don't double check a word
    if (words.has(word)) {
        displayMessage(`Duplicate word: ${word}`, "err")
        return
    }
   const response = await axios.get("/check-valid-word", {params: {word: word}})
    console.log(response.data.result)
    // clear the input
    $(".guess").val("")
    // set the conditional logic for if a word is valid or not
    if (response.data.result === "not-word") {
        displayMessage(`${word} is not a word`, "err")
    } else if (response.data.result === "not-on-board") {
        displayMessage(`${word} is not on the board`, "err")
        // if word okay add to score and append word
    } else { 
        displayMessage(`Good job! ${word} added`, "ok")
        // *remember when updating code to pay attn to the order of execution
        words.add(word)
        displayWord(word)
        score += word.length
        displayScore()
    }
})

// on dodument ready hide board
$(document).ready(function() {
    $(".board").hide();
    $(".guess").attr("disabled", true);
    $(".guess-btn").attr("disabled", true);
    $(".submit").hide()
    
})

// *Don't show the board until the start button is clicked
$start.on("click", function() {
    // start the game with a count down and a board
    countDown();
    $(".guess").attr("disabled", false);
    $(".guess-btn").attr("disabled", false);
    $(".start").attr("disabled", true);
    $(".start").text("Restart");
    $(".guess").focus();
    displayBoard();
    reload();
})

// if button is restart make reload the page
function reload() {
    if ($(".start").text() === "Restart") {
        $start.on("click", function() {
            location.reload();
        })
}}

// hide the board and form until the start button is clicked
function displayBoard() {
    if ($(".board").is(":hidden")) {
        $(".board").show();
    }
}

    // todo displayWord(word)
function displayWord(word) {
    let $ul = $(".words");
    let $li = $("<li>").text(word);
    $ul.append($li);
}
    
    // Todo displayScore()
function displayScore() {
    let $score = $(".points");
    $score.text(score);
}   
    // todo displayMessage(msg, cls) displayes the JSON response
function displayMessage(msg, cls) {
    let $msg = $(".msg");
    $msg.text(msg).removeClass().addClass(`msg ${cls}`);
}

// Todo countDown() function to start the timer when the start button is clicked
async function countDown() {
    let $timer = $(".timer");
    let timer = 60;
    $timer.text(timer);
    let interval = setInterval(function() {
        timer--;
        $timer.text(timer);
        if (timer === 0) {
            clearInterval(interval);
            // disable the input and button
            $(".guess").attr("disabled", true);
            $(".submit").show()
            // enable the start button
            $(".start").attr("disabled", false);
        }
    }, 1000);
    if (timer === 0) {
        // post the score to the database
        await postScore()
        // get the high score from the database
        await getScore()
    }
}

// display to the message to the user that the game is over
function gameOver() {
    $(".game-status").text("Game Over")
}

// TODO implement a post request route in the app.py
async function postScore() {
    const score = $(".points").text()
    const response = await axios.post("/scores", {score: score})
    console.log(response.data)
}

//  Todo score result functions
async function getScore() {
    if (timer === 0) {
        const response = await axios.get("/scores")
        if (responce.data.newHigh) {
            displayMessage(`New high score: ${response.data.score}`, "ok")
        }
    }
}
