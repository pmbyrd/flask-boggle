// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');
let score = 0;
// on dodument ready hide board
$(document).ready(function() {
    $(".board").hide();
    $(".guess").attr("disabled", true);
    $(".guess-btn").attr("disabled", true);
    
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
            $(".guess").attr("disabled", true);
            $(".guess-btn").attr("disabled", true);
            // enable the start button
            $(".start").attr("disabled", false);
        }
    }, 1000);
    if (timer === 0) {
        // post the score to the database
        postScore()
        // get the high score from the database
        getScore
    }
}

// hide the board and form until the start button is clicked
function displayBoard() {
    if ($(".board").is(":hidden")) {
        $(".board").show();
    }
}

// make a post request to the server of the highscore
function post

// get high score 
async function getScore() {
    const response = await axios.get("/scores")
    console.log(response.data)
    displayMessage(response.data, "ok")
}
// TODO implement a post request route in the app.py

form.addEventListener("submit", async function(e){
    e.preventDefault();
   console.log("form submitted");
   let word = $(".guess").val()
   console.log(word)
   const response = await axios.get("/check-valid-word", {params: {word: word}})
    console.log(response.data.result)
    

    // clear the input
    $(".guess").val("")
    if(response.data.result === "ok"){
        displayWord(word)
        score += word.length
        displayScore(score)
        displayMessage(`Added: ${word}`, "ok")
    } else if (response.data.result === "not-on-board") {
        displayMessage(`Not a valid word: ${word}`, "err")
    }
    
    // start the timer
  
    
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


    // todo postScore()

    // todo getHighScore()


