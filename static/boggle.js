// *remember when using jquery, you need to use $() to select the element, and working with classes is helpful
const form = document.querySelector('form');
let word = $();

// Todo make a class for the game
class BoggleGame{
    constructor(boardID, secs=60) {
        // the items need to make a game and handle the rules secs, score, timer, showTimer, 
        this.board = $("#" + boardID);
        this.secs = secs;
        this.score = 0;
        this.timer = setInterval(this.tick, 1000);
        this.words = new Set();

    }

    // todo displayWord(word)
    displayWord(word){
        $(".word-bank", this.board).append(`<li>${word}</li>`);
    }

    // Todo displayScore()
    displayScore(){
        $(".score", this.board).text(this.score);
    }
    // todo displayMessage(msg, cls) displayes the JSON response
    // *this will be flashed to the page so that it changes after each word is submitted
    displayMessage(msg, cls){
        $(".msg", this.board).text(msg).removeClass().addClass(`msg ${cls}`);
    }

    // todo move the logic for the form into a function
    // *will handle the conditional logic for functions related to handling a word
    async handleForm(e) {
        e.prev
    }
    
    // form.addEventListener("submit", async function(e){
    // e.preventDefault();
    // console.log("form-submitted") //todo remove this line

    // word = $(".guess").val();
    // console.log(word); //todo remove this line
    // // make a request to the server to check if the word is valid
    // const response = await axios.get("/check-valid-word", {params: {word: word}})
    // console.log(response.data)
    // // if the word is valid, add it to the list of words
    // if (response.data.result === "ok"){
    //     $(".words").append(`<li>${word}</li>`)
    // }
    
    // after a word is submitted clear the input field
    // $(".guess").val("");
}

    // Todo displayTimer()

    // Todo make countdown()
    // *this will be called every second to update the timer
    // will need to be async , when the timer reaches 0, it will need to make a request to the server to get the score
    // todo postScore()

    // todo getHighScore()


