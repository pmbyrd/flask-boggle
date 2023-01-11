from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    """Test Flask routes"""
    # TODO -- write tests for every view function / feature!
    # set up the test client
    def setUp(self):
        """Set up the test client"""
        self.client = app.test_client()
        app.config['TESTING'] = True
    
    # test the home route 
    # *it is important to test the session variables since it is the main way we will be storing the data
    def test_home_route(self):
        """Test the home route"""
        with self.client as c:
            response = c.get('/')
            html = response.get_data(as_text=True)
            
            self.assertEqual(response.status_code, 200)
            self.assertIn(f"""<button class="start">Start Game</button>""", html)
        
            self.assertIn('board', session)  
            #  test the session variables 
            self.assertIsNone(session.get('highscore'))  
            self.assertIsNone(session.get('play_count'))   
            self.assertIsNone(session.get('scores'))  
            # test the response data
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Time:', response.data)        
            
    # test the check word route
    def test_check_valid_word(self):
        """Test the check word route and if the word is valid"""
        
        # this needs to check the session transaction beceause the board is stored in the session
        with self.client as c:
            with c.session_transaction() as s:
                s["board"] = [["A", "T", "E","S", "T"],
                              ["A", "T", "E","S", "T"],
                              ["A", "T", "E","S", "T"],
                              ["A", "T", "E","S", "T"],
                              ["A", "T", "E","S", "T"]]
        res = c.get('/check-valid-word?word=ate')
                # test the response in json format
        self.assertEqual(res.json['result'], 'ok')
        
        res = c.get('/check-valid-word?word=invalid')
        self.assertEqual(res.json['result'], 'not-on-board')
        
        res = c.get('/check-valid-word?word=mistke')
        self.assertEqual(res.json['result'], 'not-word')
        
    # test the score route
    def test_score_route(self):
        """Test the post route for if scores are stored in the session"""
        
        with self.client as c:
            with c.session_transaction() as s:
                s["highscore"] = 100
                s["play_count"] = 3
                s["score"] = ['100', '50', '10']
                
            res = c.post('/scores', json={"score": 200})
            self.assertIn('score', session)
            self.assertEqual(session['highscore'], 200)
            self.assertEqual(session['play_count'], 4)
            
            # also test if the when a new score does not beat the high score
            
            res = c.post('/scores', json={"score": 20})
            self.assertIn('score', session)
            self.assertEqual(session['highscore'], 200)
            self.assertEqual(session['play_count'], 5)
            
            
            
   
