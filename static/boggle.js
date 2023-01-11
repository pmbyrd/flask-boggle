// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');
let score = 0;
// on document ready start the timer
$(".start").on("click", function() {
    startCountDown(60);
    $(".guess").attr("disabled", false);
    $(".guess-btn").attr("disabled", false);
    $(".start").attr("disabled", true);
    $(".start").text("Restart");
    $(".guess").focus();
})

// make an end game function that post the score to the database

function startCountDown(timer){
    
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
        }
    }, 1000);
}

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


