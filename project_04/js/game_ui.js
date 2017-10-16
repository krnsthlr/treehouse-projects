/**
* ------------------------------------------------------------------------
* Game UI object//
* Methods needed when game is active
* ------------------------------------------------------------------------
*/

var GAME = (function(gameUI) {

	gameUI.play = function() {
		gameUI.displayStartScreen();
		gameUI.highlightPlayer();
		gameUI.mouseAction();
		gameUI.turnHandler();
	};

	gameUI.highlightPlayer = function() {
		var players = document.getElementsByClassName("players");
		for (var i = 0; i < players.length; ++i) {
			i !== gameUI.currentPlayerIndex ? 
			players[i].classList.remove("active") : players[i].classList.add("active");
		}
	};

	gameUI.mouseAction = function() {
		var board = document.querySelectorAll(".box");
		for(var i = 0; i < board.length; ++i) {

			board[i].onmouseover = function(empty) {
				var empty = gameUI.isBoxEmpty(this);
				if(empty) {gameUI.currentPlayerIndex === 0 ?
				this.style.backgroundImage = "url('img/o.svg')" : 
				this.style.backgroundImage = "url('img/x.svg')";}	
			}
			board[i].onmouseleave = function() {
				this.style.backgroundImage = "";
			}
		}
	};

	gameUI.turnHandler = function() {
		var board = document.querySelectorAll(".box");

		for(var i = 0; i < board.length; ++i) {
			board[i].onclick = function() {
				var empty = gameUI.isBoxEmpty(this);
				if(empty) gameUI.fillBox(this);
				if(gameUI.hasEnded(board)) {
					gameUI.displayEndScreen();
				}
				gameUI.switchPlayer();
			}	
		}
	};

/**
* ------------------------------------------------------------------------
* Methods for displaying game screens//
* ------------------------------------------------------------------------
*/

	gameUI.hideGame = function() {
		gameBoard = document.getElementById("board");
		gameBoard.style.display = "none";
	};

	gameUI.showGame = function() {
		gameBoard = document.getElementById("board");
		gameBoard.style.display = "block";
	};

	gameUI.displayStartScreen = function() {
		gameUI.hideGame();
		var startScreen = document.getElementById("start");
		startScreen.style.display = "block";
		gameUI.hideStartScreen();
	};

	gameUI.hideStartScreen = function() {
		var startScreen = document.getElementById("start");
		var button = document.querySelector("#start .button");

		button.onclick = function() {
			startScreen.style.display = "none";
			gameUI.showGame();
		}
	};

	gameUI.displayEndScreen = function() {
		var winnerClass = "screen-win-" + gameUI.winner;
		var message = gameUI.winner === "tie" ? "It's a Tie!" : "Winner";
		var endScreen = document.getElementById("finish");
		
		document.querySelector("#finish .message").innerText = message;
		endScreen.classList.add(winnerClass);
		gameUI.hideGame();
		endScreen.style.display = "block";
		gameUI.startNewGame();
	};

	gameUI.hideEndScreen = function() {
		var endScreen = document.getElementById("finish");
		endScreen.style.display = "none";
	};

	gameUI.reset = function() {
		var endScreen = document.getElementById("finish");
		var board = document.querySelectorAll(".box");
		endScreen.classList.remove("screen-win-one", "screen-win-two", "screen-win-tie");
		for(var i = 0; i < board.length; ++i) {
			board[i].classList.remove("box-filled-1", "box-filled-2");
		}
		gameUI.currentPlayerIndex = gameUI.winner === "one" ? 1 : 0;
		gameUI.highlightPlayer();
		gameUI.winner = "tie";
	};

	gameUI.startNewGame = function() {
		var startButton = document.querySelector("#finish .button");
		startButton.onclick = function() {
			gameUI.reset();
			gameUI.hideEndScreen();
			gameUI.showGame();
		}
	};

	return gameUI;


}(GAME || {}));

