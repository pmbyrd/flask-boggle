// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');

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
    } 
})

    // todo displayWord(word)
function displayWord(word) {
    let $ul = $(".words");
    let $li = $("<li>").text(word);
    $ul.append($li);
}
    

    // Todo displayScore()
function displayScore(word) {
    let $score = $(".points");
    let score = word.length;
    $score.text(score);
}
   
    
    // todo displayMessage(msg, cls) displayes the JSON response
    

    // Todo displayTimer()

    // Todo make countdown()
    // *this will be called every second to update the timer
    // will need to be async , when the timer reaches 0, it will need to make a request to the server to get the score
    // todo postScore()

    // todo getHighScore()


