/**
* ------------------------------------------------------------------------
* Game helper functions//
* Player functions
* ------------------------------------------------------------------------
*/

var GAME = (function(myGame) {

	var myGame = {
		players: ["player1", "player2"],
		currentPlayerIndex: 0,
		winner: "tie"
	};

	myGame.getCurrentPlayer = function() {
		return this.players[this.currentPlayerIndex];
	};

	myGame.switchPlayer = function() {
		this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
		myGame.highlightPlayer();
	};

	myGame.isBoxEmpty = function(box) {
		return !box.classList.contains("box-filled-1") && !box.classList.contains("box-filled-2");
	};

	myGame.fillBox = function(box) {
		var player = this.getCurrentPlayer();
		player === "player1" ? box.classList.add("box-filled-1") : box.classList.add("box-filled-2");
	};

	/**
* ------------------------------------------------------------------------
* Tic Tac Toe Game Logic
* ------------------------------------------------------------------------
*/

	myGame.hasEnded = function(board) {
	//Check if every box has been checked
	var full = true;
	for(var i = 0; i < board.length; ++i) {
		if(board[i].classList.length <= 1) full = false;
	}
	//Check if there is a winner
	for(var i = 0; i < 3; ++i) {

		//3 boxes vertically
		if(board[0 + i].classList[1] !== undefined &&
		   board[0 + i].classList[1] == board[3 + i].classList[1] &&
		   board[3 + i].classList[1] == board[6 + i].classList[1]) {

		   board[6 + i].classList[1] === "box-filled-1" ? this.winner = "one" : this.winner = "two";
		}

		//3 boxes horizontally
		if(board[3 * i].classList[1] !== undefined &&
		   board[3 * i].classList[1] == board[3 * i + 1].classList[1] &&
		   board[3 * i + 1].classList[1] == board[3 * i + 2].classList[1]) {

		   board[3 * i + 2].classList[1] === "box-filled-1" ? this.winner = "one" : this.winner = "two";
		}

		//3 boxes diagonally (upper left to lower right)
		if(board[0].classList[1] !== undefined &&
		   board[0].classList[1] == board[4].classList[1] &&
		   board[4].classList[1] == board[8].classList[1]) {
		   
		   board[8].classList[1] === "box-filled-1" ? this.winner = "one" : this.winner = "two";

		}

		//3 boxes diagonally (upper right to lower left)
		if(board[2].classList[1] !== undefined &&
		   board[2].classList[1] == board[4].classList[1] &&
		   board[4].classList[1] == board[6].classList[1]) {
		   
		   board[6].classList[1] === "box-filled-1" ? this.winner = "one" : this.winner = "two";

		}
	}

	if(full || this.winner !== "tie") return true;
	
	};

	return myGame;

}(GAME || {}));

