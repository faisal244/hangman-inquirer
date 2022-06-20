const inquirer = require("inquirer");
const figlet = require("figlet");
const path = require("path");
const open = require("open");

const { gameSettingQuestions, generateGameQuestion } = require("./questions");
const { getRandomWordFromList } = require("./utils/gameSettings");
const { readDataFromFile, writeDataToFile } = require("./utils/fileReadWrite");
const {
	initGame,
	displayWord,
	displayHealth,
	displayGuessedLetters,
	play,
} = require("./utils/game");
const { generateHTML } = require("./utils/generator");

const init = async () => {
	// prompt the gameSettingQuestions and get answers
	const { category, level, gameMode, nickname } = await inquirer.prompt(
		gameSettingQuestions
	);

	// get selected category data from file
	const categoryDataFromFile = readDataFromFile(`../data/${category}.json`);

	// extract the level from categoryDataFromFile
	const wordList = categoryDataFromFile[level];

	// pick a random word from wordList
	const word = getRandomWordFromList(wordList);

	// initial game for word
	initGame(word);

	// declare guessedLetters array to track guessed letters from user
	const guessedLetters = [];
	// declare gameHistory array to track overall game history
	const gameHistory = [];
	// declare inProgress to keep track of game in progress
	let inProgress = true;
	// declare remainingAttempts as the initial health
	let remainingAttempts = 10;
	// declare gameStatus as "Oh snap, you lost. Better luck next time!!"
	let gameStatus = "Oh snap, you lost. Better luck next time!!";

	while (inProgress) {
		// get game question
		const gameQuestion = generateGameQuestion(gameMode, nickname);

		// prompt game question to get letter
		const { letter } = await inquirer.prompt(gameQuestion);

		// check if the letter guessed exists in the word
		if (!word.includes(letter)) {
			// reduce attempts
			remainingAttempts -= 1;
		}

		// check if the letter guessed has been guessed previously
		if (!guessedLetters.includes(letter)) {
			// updated guessedLetters array with the letter guessed
			guessedLetters.push(letter);

			// play game for letter entered by user
			const newWord = play(guessedLetters, word);

			// display word
			displayWord(newWord);

			// display health
			displayHealth(remainingAttempts);

			// display guessed letters
			displayGuessedLetters(guessedLetters);

			// update the gameHistory array of the game progress
			gameHistory.push({
				letter,
				word: newWord,
				incorrect: !word.includes(letter),
			});

			if (word.toLowerCase() === newWord && remainingAttempts > 0) {
				gameStatus = "Congratulations!! You won!!";

				// stop the loop
				inProgress = false;
			}

			if (word.toLowerCase() !== newWord && remainingAttempts === 0) {
				gameStatus = "Oh snap, you lost. Better luck next time!!";

				// stop the loop
				inProgress = false;
			}
		} else {
			console.log(
				"You have already guessed this letter, please try another one."
			);
		}
	}

	const game = {
		nickname,
		gameStatus,
		word,
		remainingAttempts,
		guessedLetters,
		gameHistory,
	};

	const html = generateHTML(game);

	writeDataToFile("../../dist/index.html", html);

	console.log(
		figlet.textSync("Done", {
			font: "Doom",
			horizontalLayout: "default",
			verticalLayout: "default",
			width: 80,
			whitespaceBreak: true,
		})
	);

	const root = path.dirname(require.main.filename);

	const absolutePath = path.join(root, "../dist/index.html");

	open(`file://${absolutePath}`, { app: "chrome" });
};

init();
