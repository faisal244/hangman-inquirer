const fs = require("fs");
const path = require("path");

const readDataFromFile = (filePath) => {
	const rawData = fs.readFileSync(path.join(__dirname, filePath), "utf8");

	return JSON.parse(rawData);
};

const writeDataToFile = (filePath, data) => {
	fs.writeFileSync(path.join(__dirname, filePath), data);
};

module.exports = {
	readDataFromFile,
	writeDataToFile,
};
