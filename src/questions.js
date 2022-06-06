const gameSettingQuestions = [
	{
		type: "input",
		message: "Please enter your nickname:",
		name: "nickname",
		validate: (answer) => (answer ? true : "This is required"),
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname} please choose a category:`,
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
		],
		name: "category",
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname} please choose a level:`,
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
	},
	{
		type: "list",
		message: ({ nickname }) => `${nickname} please choose a game mode:`,
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
	},
	{
		type: "confirm",
		message: ({ nickname }) => `${nickname} do you want to generate a report?`,
		name: "generateReport",
		default: true,
	},
];

module.exports = {
	gameSettingQuestions,
};
