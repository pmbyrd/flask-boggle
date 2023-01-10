// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');
let score = 0;

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

    // Todo displayTimer()
function displayTimer() {
    let $timer = $(".timer");
    let timer = 60;
    $timer.text(timer);
}

// Todo make countdown()
// function countdown() {
//     let timer = setInterval(function() {
//         time--;
//         $(".timer").text(time);
//         if (time === 0) {
//             clearInterval(timer);
//             // Todo change this to a gameover() function for posting to the backend
//             $(".guess").attr("disabled", true);
//             $(".guess-btn").attr("disabled", true);
//         }
//     }
// }


    // *this will be called every second to update the timer
    // will need to be async , when the timer reaches 0, it will need to make a request to the server to get the score
    // todo postScore()

    // todo getHighScore()


