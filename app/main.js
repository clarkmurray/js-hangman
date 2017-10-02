var phraseWindow = document.getElementById('phrase');
var guessCounter = 6;
var hiddenPhrase = [];
var incorrectLetters = document.getElementById('incorrect');
var alreadyGuessed = [];
var phraseCheck = 0;
var phrase;
var canvas =document.getElementById("gallows");
var context = canvas.getContext("2d");



function victory() {
	var win = document.getElementById('win');
	var guessDiv = document.getElementById('guessDiv');
	win.style.display = "block";
	guessDiv.style.display = "none";
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


function createPhraseArray() {
	phrase = document.getElementById('userPhrase').value;
	var phraseDiv = document.getElementById('phraseDiv');
	var guessDiv = document.getElementById('guessDiv');
	var incorrectDiv = document.getElementById('incorrectLetters');
	phrase = phrase.toUpperCase();
	splitPhrase = phrase.split('');
	phrase = splitPhrase.join('');
	console.log(phrase);
	phraseDiv.style.display = 'none';
	guessDiv.style.display = 'block';
	incorrectDiv.style.display = 'block';
	hidePhrase();
}


function hidePhrase() {
	for (i=0; i < splitPhrase.length; i++) {
		if (splitPhrase[i] === " ") {
			hiddenPhrase.push("\u00A0");
		} else {
			hiddenPhrase.push("?");
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
			if (!((hiddenPhrase.join()).includes("?"))) {
				victory();
			}
		}
	}

	if (!guessTracker) {
		guessCounter = guessCounter - 1;
		incorrectLetters.innerHTML += guess + "\u00A0";

		if (guessCounter == 5) {
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
			lossNotification = document.getElementById('loss');
			lossMessage = document.getElementById('lossMessage');
			lossNotification.style.display = "block";
			lossMessage.innerHTML = "You're out of guesses! The correct answer was " + phrase;
			var guessDiv = document.getElementById('guessDiv');
			guessDiv.style.display = "none";
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


createGallows();
