const gameSettingQuestions = [
	{
		type: "input",
		message: "Please enter your nickname:",
		name: "nickname",
		validate: (answer) => (answer ? true : "Nickname is required"),
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname}, please choose a category:`,
		choices: [
			{
				name: "Movies",
				value: "movies",
				short: "Movies",
			},
			{
				name: "Food",
				value: "food",
				short: "Food",
			},
			{
				name: "Sports",
				value: "sports",
				short: "Sports",
			},
			{
				name: "Places",
				value: "places",
				short: "Places",
			},
		],
		name: "category",
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname}, please choose a level:`,
		choices: [
			{
				name: "Easy",
				value: "easy",
				short: "Easy",
			},
			{
				name: "Medium",
				value: "medium",
				short: "Medium",
			},
			{
				name: "Hard",
				value: "hard",
				short: "Hard",
			},
		],
		name: "level",
		default: "easy",
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname}, please choose a mode of play:`,
		choices: [
			{
				name: "Letter Input",
				value: "input",
				short: "Letter Input",
			},
			{
				name: "Letter Choice",
				value: "choice",
				short: "Letter Choice",
			},
		],
		name: "gameMode",
		default: "input",
	},
	{
		type: "confirm",
		message: ({ nickname }) =>
			`${nickname}, would you like to generate a game report?`,
		name: "generateReport",
		default: true,
	},
];

const generateGameQuestion = (gameMode, nickname) => {
	if (gameMode === "input") {
		return {
			type: "input",
			message: `${nickname} please enter a letter from a-z:`,
			name: "letter",
		};
	}

	return {
		type: "list",
		message: `${nickname} please select a letter:`,
		name: "letter",
		choices: [..."abcdefghijklmnopqrstuvwxyz"],
	};
};

module.exports = {
	gameSettingQuestions,
	generateGameQuestion,
};
