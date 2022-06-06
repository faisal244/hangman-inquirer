const inquirer = require("inquirer");

const { gameSettingQuestions } = require("./questions");

const init = async () => {
	// prompt the game setting questions and store answers
	const answers = await inquirer.prompt(gameSettingQuestions);

	// log the answers
	console.log(answers);
};

init();

// ask the category question and console log the data from the chosen category
