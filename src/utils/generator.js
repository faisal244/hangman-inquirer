const dateFns = require("date-fns");

const getFormattedDateTime = () => {
	const dateTime = dateFns.format(new Date(), "do MMM, yyyy HH:mm");

	return dateTime;
};

const createHealth = (remainingAttempts) => {
	const livesArray = new Array(remainingAttempts).fill("");
	return `<div class="d-flex flex-row justify-content-around health-icons">
    ${livesArray.map(() => `<i class="fa-solid fa-heart"></i>`).join("")}
  </div>`;
};

const createHeader = ({ nickname }) => {
	return `<header class="jumbotron text-center">
    <h1 class="display-4">Hangman Game Report</h1>
    <p class="lead">
      This is a detailed report of your progress ${nickname}.
    </p>
    <hr class="my-4" />
    <p>
      To play again run the CLI application which will generate a new report.
    </p>
    <a
      class="btn btn-primary btn-lg"
      href="https://github.com/surajverma2587/hangman-inquirer"
      role="button"
      target="_blank"
      >Source Code</a
    >
  </header>`;
};

const createGuessedLetters = (guessedLetters, word) =>
	guessedLetters
		.map((guessedLetter) =>
			[...word].includes(guessedLetter)
				? `<div class="guessed-letter guessed-letter--correct">${guessedLetter}</div>`
				: `<div class="guessed-letter guessed-letter--incorrect">${guessedLetter}</div>`
		)
		.join("");

const createGameActivity = (gameHistory) =>
	gameHistory
		.map(
			({ incorrect, letter, word }) =>
				`<li class="list-group-item text-white ${
					incorrect ? "guessed-letter--incorrect" : "guessed-letter--correct"
				}">
      <div>${letter}</div>
      <div>${word}</div>
    </li>`
		)
		.join("");

const createGameResultCard = ({ gameStatus, word, remainingAttempts }) => {
	return `<section>
    <div class="card text-center">
      <div class="card-header">Game Results</div>
      <div class="card-body">
        <h5 class="card-title">${gameStatus}</h5>
        <p class="card-text">${word}</p>
        <hr />
        <h6 class="card-title">Health</h6>
        <div class="d-flex flex-row justify-content-around health-icons">
          ${createHealth(remainingAttempts)}
        </div>
      </div>
      <div class="card-footer text-muted form-text">
        <div class="form-text m-0">Generated on ${getFormattedDateTime()}</div>
      </div>
    </div>
  </section>`;
};

const createGameHistory = ({ word, guessedLetters, gameHistory }) => {
	return `<section class="my-3">
    <div class="card text-center">
      <div class="card-header">Game History</div>
      <div class="card-body">
        <h5 class="card-title">Guessed Letters</h5>
        <div
          class="card-text d-flex flex-row flex-wrap justify-content-center"
        >
          ${createGuessedLetters(guessedLetters, word)}
        </div>
        <hr />
        <h6 class="card-title">Activity</h6>
        <ul class="list-group list-group-flush">
          ${createGameActivity(gameHistory)}
          </li>
        </ul>
      </div>
      <div class="card-footer text-muted form-text m-0">
        <div class="form-text m-0">Generated on ${getFormattedDateTime()}</div>
      </div>
    </div>
  </section>`;
};

const generateHTML = (game) => {
	return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hangman Report</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="stylesheet" href="./assets/css/styles.css" />
      </head>
      <body>
        ${createHeader(game)}
        <main class="container">
          ${createGameResultCard(game)}
          ${createGameHistory(game)}
        </main>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
    `;
};

module.exports = {
	generateHTML,
};
