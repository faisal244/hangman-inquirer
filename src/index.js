const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const { gameSettingQuestions } = require("./questions");

const getCategoryFromFile = (category) => {
	// build the file path
	const fileName = `${category}.json`;

	const filePath = path.join(__dirname, "data", fileName);

	// read from file using file path
	const rawData = fs.readFileSync(filePath, "utf8");

	const parsedData = JSON.parse(rawData);

	// return data from file
	return parsedData;
};

const init = async () => {
	// prompt the game setting questions and store answers
	const answers = await inquirer.prompt(gameSettingQuestions);

	// log the answers
	console.log(answers);

	// ask the category question and console log the data from the chosen category
	const categoryDataFromFile = getCategoryFromFile(answers.category);

	// extract the level from categoryDataFromFile
	const wordList = categoryDataFromFile[answers.level];

	console.log(wordList);
};

init();
