const fs = require('fs');

const readData = function readDatafromCommandLineArgument() {
    const file = process.argv[2];
    try {
        const rawData = fs.readFileSync(file);
        const parsedData = JSON.parse(rawData);
        return parsedData;
    } catch (error) {
        throw error;
    }
}

readData();