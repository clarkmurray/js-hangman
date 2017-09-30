var phraseWindow = document.getElementById('phrase');
var guessCounter = 6;
var hiddenPhrase = [];
var incorrectLetters = document.getElementById('incorrect');



function createPhraseArray() {
	var phrase = document.getElementById('userPhrase').value;
	phrase = phrase.toUpperCase();
	splitPhrase = phrase.split('');
	phrase = splitPhrase.join('');
	hidePhrase();
	document.getElementById('userPhrase').value = '';
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

function userGuess() {
	var guess = document.getElementById("userGuess").value;
	guess = guess.toUpperCase();
	var guessTracker = false;
	hiddenPhrase = hiddenPhrase.split('');
	for (i=0; i < hiddenPhrase.length; i++) {
		if (guess == splitPhrase[i]) {
			hiddenPhrase[i] = guess;
			guessTracker = true;
		}
	}

	if (!guessTracker) {
		guessCounter = guessCounter - 1;
		incorrectLetters.innerHTML += guess + "\u00A0"

	}

	hiddenPhrase = hiddenPhrase.join('');
	phraseWindow.innerHTML = hiddenPhrase;
	console.log(guessTracker);
	console.log(guessCounter);
	document.getElementById("userGuess").value = "";

}


