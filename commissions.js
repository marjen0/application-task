const request = require('request');


const getCashInCommissions = function getCashInCommissionsProperties() {
    return new Promise((resolve,reject) => {
        request.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in', (error,response,body) => {
            if (error) reject(error);
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            } 
        });
    });
}
const getCashOutCommissionsNatural = function getCashoutCommissionsForNaturalPersons() {
    return new Promise((resolve,reject) => {
        request.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural', (error,response,body) => {
            if (error) reject(error);
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            }
        });
    });
}

const getCashOutCommissionsJuridical = function getCashoutCommissionsForJuridicalPersons() {
    return new Promise((resolve,reject) => {
        request.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',(error,response,body) => {
            if(error) reject(error);
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            }
        });
    });
}

const commissions = {
    getCashInCommissions,
    getCashOutCommissionsJuridical,
    getCashOutCommissionsNatural
}

module.exports = commissions;
