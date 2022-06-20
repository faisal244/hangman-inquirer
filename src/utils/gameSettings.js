const getRandomWordFromList = (words) =>
	words[Math.floor(Math.random() * words.length)];

module.exports = {
	getRandomWordFromList,
};
