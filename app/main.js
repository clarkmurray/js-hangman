var phraseWindow = document.getElementById('phrase');
var guessCounter = 6;
var hiddenPhrase = [];
var incorrectLetters = document.getElementById('incorrect');
var alreadyGuessed = [""];
var phraseCheck = 0;
var phrase;
var canvas = document.getElementById("gallows");
var context = canvas.getContext("2d");



document.onreadystatechange = function() {
  if (document.readyState === "interactive") {

  	document.getElementById("showPhrase").addEventListener("click", function(e){
    	var show = document.getElementById("userPhrase");
    	if(show.getAttribute("type")=="password"){
        	show.setAttribute("type","text");
    	} else {
        	show.setAttribute("type","password");
   		}
	});

	document.getElementById("goForGold").addEventListener("click", function(e){
	   var guessDiv = document.getElementById('guessDiv');
	   var guessPhraseDiv = document.getElementById('guessPhraseDiv');
	   guessDiv.style.display = "none";
	   guessPhraseDiv.style.display = "block";
	   warning.style.display = "block";
	});

	document.getElementById("noGold").addEventListener("click", function(e){
	   var guessDiv = document.getElementById('guessDiv');
	   var guessPhraseDiv = document.getElementById('guessPhraseDiv');
	   var warning = document.getElementById("warning");
	   warning.style.display = "none";
	   guessDiv.style.display = "block";
	   guessPhraseDiv.style.display = "none";
	});

	document.getElementById('userPhrase').addEventListener('keypress', function(event) {
	    if (event.keyCode == 13) {
	        document.getElementById('createPhrase').click();
	    }
	 });

	document.getElementById('userGuess').addEventListener('keypress', function(event) {
	    if (event.keyCode == 13) {
	        document.getElementById('createGuess').click();
	     }
	 });

	document.getElementById('userPhraseGuess').addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            document.getElementById('guessWholePhrase').click();
        }
 });

  	createGallows();
  };
};


function multiplayerStart() {
	var startScreen = document.getElementById('startScreen');
	var phraseDiv = document.getElementById('phraseDiv');
	startScreen.style.display = "none";
	phraseDiv.style.display = "flex";
}

function createGallows() {
	context.beginPath();
	context.moveTo(96, 230);
	context.lineTo(188, 230);
	context.lineTo(188, 20);
	context.lineTo(125, 20);
	context.lineTo(125, 35);
	context.moveTo(125,65);
	context.stroke();

}

function drawFullHangman() {
	context.beginPath();
	context.arc(125, 65, 30, 0, 2 * Math.PI);
	context.stroke();
	context.moveTo(125, 95);
	context.lineTo(125, 160);
	context.stroke();
	context.lineTo(110, 210);
	context.stroke();
	context.moveTo(125, 160);
	context.lineTo(140, 210);
	context.stroke();
	context.moveTo(125, 115);
	context.lineTo(85, 140);
	context.stroke();
	context.moveTo(125, 115);
	context.lineTo(165, 140);
	context.stroke();
}

function victory() {
	var win = document.getElementById('win');
	var guessDiv = document.getElementById('guessDiv');
	var guessPhraseDiv = document.getElementById('guessPhraseDiv');
	var warning = document.getElementById("warning");
	var phrase = document.getElementById('phrase');
	warning.style.display = "none";
	win.style.display = "block";
	guessDiv.style.display = "none";
	guessPhraseDiv.style.display = "flex";
	phrase.style.color = "green";
	document.getElementById('winAgain').focus();
}


function guessthePhrase() {
	var warning = document.getElementById("warning");
	var hailMary = document.getElementById("userPhraseGuess").value;
	console.log(hailMary);
	hailMary = hailMary.toUpperCase();
	console.log(hailMary);
	if (hailMary == phrase) {
		phraseWindow.innerHTML = phrase;
		victory();
	}
	else {
		drawFullHangman();
		console.log("Moving on to lose function");
		lose();
		console.log("lose function complete");
	}
};


function generatePhrase() {
	phrase = document.getElementById('userPhrase').value;
	if (!(/[a-z]/i.test(phrase))) {
		return false;
	}
	createPhraseArray();
}

function createPhraseArray() {
	var phraseDiv = document.getElementById('phraseDiv');
	var guessDiv = document.getElementById('guessDiv');
	var incorrectDiv = document.getElementById('incorrectLetters');
	var gallowsDiv = document.getElementById('gameBoard');
	phrase = phrase.toUpperCase();
	splitPhrase = phrase.split('');
	phrase = splitPhrase.join('');
	phraseDiv.style.display = 'none';
	guessDiv.style.display = 'flex';
	incorrectDiv.style.display = 'flex';
	gallowsDiv.style.display = 'flex';
	hidePhrase();
}


function hidePhrase() {
	for (i=0; i < splitPhrase.length; i++) {
		if (splitPhrase[i] === " ") {
			hiddenPhrase.push("\u00A0");
		} else {
			hiddenPhrase.push('\u005F');
		}
	}

	hiddenPhrase = hiddenPhrase.join('');
	phraseWindow.innerHTML = hiddenPhrase;
}


Array.prototype.contains = function(guess) {
   for (i in this) {
       if (this[i] == guess) return true;
   }
   return false;
}

function lose() {
	lossNotification = document.getElementById('loss');
	lossMessage = document.getElementById('lossMessage');
	var warning = document.getElementById("warning");
	var guessPhraseDiv = document.getElementById('guessPhraseDiv');
	warning.style.display = "none";
	lossNotification.style.display = "block";
	lossMessage.innerHTML = "You're out of guesses! The correct answer was " + phrase;
	var guessDiv = document.getElementById('guessDiv');
	guessDiv.style.display = "none";
	guessPhraseDiv.style.display = "none";
	document.getElementById('loseAgain').focus();
}


function userGuess() {
	var guess = document.getElementById("userGuess").value;
	guess = guess.toUpperCase();
	var guessTracker = false;
	if (alreadyGuessed.contains(guess)) {
		document.getElementById("userGuess").value = "";
		return false;
	}
	hiddenPhrase = hiddenPhrase.split('');
	for (i=0; i < hiddenPhrase.length; i++) {
		if (guess == splitPhrase[i]) {
			hiddenPhrase[i] = guess;
			guessTracker = true;
			if (!((hiddenPhrase.join()).includes('\u005F'))) {
				victory();
			}
		}
	}

	if (!guessTracker) {
		guessCounter = guessCounter - 1;
		incorrectLetters.innerHTML += guess + "\u00A0";

		if (guessCounter == 5) {
			context.beginPath();
			context.arc(125, 65, 30, 0, 2 * Math.PI);
			context.stroke();
		} else if (guessCounter == 4) {
			context.moveTo(125, 95);
			context.lineTo(125, 160);
			context.stroke();
		} else if (guessCounter == 3) {
			context.lineTo(110, 210);
			context.stroke();
		} else if (guessCounter == 2) {
			context.moveTo(125, 160);
			context.lineTo(140, 210);
			context.stroke();
		} else if (guessCounter == 1){
			context.moveTo(125, 115);
			context.lineTo(85, 140);
			context.stroke();
		} else if (guessCounter == 0) {
			context.moveTo(125, 115);
			context.lineTo(165, 140);
			context.stroke();
		}

		if (guessCounter == 0) {
			lose();
		}

	}

	hiddenPhrase = hiddenPhrase.join('');
	phraseWindow.innerHTML = hiddenPhrase;
	console.log(guessCounter);
	alreadyGuessed.push(guess);
	document.getElementById("userGuess").value = "";

}


function isLetter(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
    	alert("Letters only");
        return false;
    }
    return true;

}

function letterOrSpace(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
    	alert("Letters or spaces only");
        return false;
    }
    return true;

}

function restartGame() {
	location.reload();
}

function randomWord() {
    var requestStr = "http://setgetgo.com/randomword/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
       // success : randomWordComplete,
        error : apiFail,
        jsonpCallback: 'randomWordComplete'
    });
}

function randomWordComplete(data) {
    phrase = data.Word;
    console.log(phrase);
    var startScreen = document.getElementById('startScreen');
    var guessPhraseDiv = document.getElementById('guessPhraseDiv');
    var gallowsDiv = document.getElementById('gameBoard');
    startScreen.style.display = "none";
    guessPhraseDiv.style.display = "none";
    gallowsDiv.style.display = "flex";
    createPhraseArray();
}

function apiFail( errors ) {
	console.log( 'apiFail' );
	console.log( 'apiFail ', errors );
}