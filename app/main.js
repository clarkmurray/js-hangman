var phraseWindow = document.getElementById('phrase');
var phrase = "Hello World";
var guess = "A";
var guessCounter = 6;
var hiddenPhrase = [];
var incorrectLetters = document.getElementById('incorrect');


function createPhraseArray() {
	phrase = phrase.toUpperCase();
	splitPhrase = phrase.split('');
	phrase = splitPhrase.join('');
	hidePhrase();
}


function hidePhrase() {
	for (i=0; i < phrase.length; i++) {
		if (phrase[i] === " ") {
			hiddenPhrase.push("\u00A0");
		} else {
			hiddenPhrase.push("?");
		}
	}

	hiddenPhrase = hiddenPhrase.join('');
	phraseWindow.innerHTML = hiddenPhrase;
}

function userGuess() {
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
		incorrectLetters.innerHTML += guess;

	}

	hiddenPhrase = hiddenPhrase.join('');
	phraseWindow.innerHTML = hiddenPhrase;
	console.log(guessTracker);
	console.log(guessCounter);

}

createPhraseArray();
userGuess();



