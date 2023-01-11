// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');
let score = 0;
const words = new Set()
// on dodument ready hide board
$(document).ready(function() {
    $(".board").hide();
    $(".guess").attr("disabled", true);
    $(".guess-btn").attr("disabled", true);
    $(".submit").hide()
    
})
// on document ready start the timer
$(".start").on("click", function() {
    // start the game with a count down and a board
    countDown();
    $(".guess").attr("disabled", false);
    $(".guess-btn").attr("disabled", false);
    $(".start").attr("disabled", true);
    $(".start").text("Restart");
    $(".guess").focus();
    displayBoard();
    // dont show the board and form until the start button is clicked 
})

// if button is restart post the scores display message of a json response of the scores from the session then reload the page 

// if button is restart make reload the page


// make an end game function that post the score to the databsase and gets the high score 

// display to the message to the user that the game is over

function countDown(){
    
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
        postScore()
        // get the high score from the database
        getScore()
    }
}

// hide the board and form until the start button is clicked
function displayBoard() {
    if ($(".board").is(":hidden")) {
        $(".board").show();
    }
}

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

function checkDuplicateWords(word) {
    const words = new Set()
    if (words.has(word)) {
        displayMessage(`Duplicate word: ${word}`, "err")
    } else {
        words.add(word)
    }
    return words
}

// TODO implement a post request route in the app.py
async function postScore() {
    const score = $(".points").text()
    const response = await axios.post("/scores", {score: score})
    console.log(response.data.data)
    // send the score in json

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

function checkDuplicateWords(word) {
    const words = new Set()
    if (words.has(word)) {
        displayMessage(`Duplicate word: ${word}`, "err")
    } else {
        words.add(word)
    }
    return word
}