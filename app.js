'use strict'
const fs = require('fs');
const Operation = require('./classes/Operation');

/**
 * Reads data of given json file
 */
const readJsonFile = function readDatafromCommandLineArgument(file) {
    if (!file) {
        throw new Error('No file provided')
    }
    try {
        const rawData = fs.readFileSync(file);
        const parsedData = JSON.parse(rawData);
        return parsedData;
    } catch (error) {
        throw error;
    }
}
/**
 * Returns operations as an array of objects
 */
const getOperations = function parseDataToOperationObjects() {
    
    const file = process.argv[2];
    const jsonData = readJsonFile(file);
    let operations = [];
     
    jsonData.forEach(operation => {
        const newOperation = {
            date: operation.date,
            type: operation.type,
            userId: operation.user_id,
            userType: operation.user_type,
            details: operation.operation
        }
        operations.push(new Operation(newOperation));
    });
    return operations;
}
const run = () => {
    const operations = getOperations();
    operations.forEach(operation => {
        operation.calculateCommissionFee()
    });
}

run();


