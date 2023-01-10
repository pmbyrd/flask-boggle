from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify

# set up environment
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

boggle_game = Boggle()

# make routes 
# get route for home page
@app.route('/')
def show_boggle_board():
    """Home route for boggle game"""
    
    board = boggle_game.make_board()
    # *since the board will be used in other routes we need to store it in the session
    session['board'] = board
    print(board)
    # import pdb; pdb.set_trace()
    
    return render_template('boggle.html', board=board)
    
# post route for game board and checking words
# *this is the route that the front end will make it's request to
@app.route('/check-valid-word')
def check_valid_word():
    """Check the word submission against the board. Renders the results in json format for the front end to use"""
    
    # get the word from the form
    words = request.args["word"]
    board = session['board']
    response = boggle_game.check_valid_word(board, words)
    # use the result of the class method on the boggle game object for the JSON response
    return jsonify({'result': response})
    
    

# post route for results to the server after a game has completed
# @app.route('/scores', methods=["POST"] )
# def handle_scores():
# # instead of retrieving the results from the server, we will store them in the session

# # access the results in the session for comparison and feedback to the user
#     return pass
