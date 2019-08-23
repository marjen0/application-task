const OperationDetails = require('./OperationDetails');
const { getCashInCommissions, 
    getCashOutCommissionsJuridical, 
    getCashOutCommissionsNatural
} = require('../commissions');

class Operation {
    constructor(options) {
        this.date = new Date(options.date)
        this.type = options.type;
        this.userId = options.userId;
        this.userType = options.userType;
        this.details = new OperationDetails(options.details);
    }

    async calculateCommissionFee() {
        try {
            const cashInCommission = await getCashInCommissions();
            const cashOutCommissionNatural = await getCashOutCommissionsNatural();
            const cashOutCommissionJuridical = await getCashOutCommissionsJuridical();
            let fee = 0;
            if (this.type === 'cash_in') {
                fee = this.calculateCashInFee(cashInCommission, this.details.amount);
            } else if(this.type === 'cash_out' && this.userType === 'natural') {
                fee = this.calculateCashOutFeeNatural(cashOutCommissionNatural, this.details.amount);
            } else if(this.type === 'cash_out' && this.userType === 'juridical') {
                fee = this.calculateCashOutFeeJuridical(cashOutCommissionJuridical, this.details.amount);
            }
            console.log(fee.toFixed(2));

        } catch (error) {
            console.log(error);
        }
    }
    calculateCashInFee(commission, amount) {
        const feePercents = commission.percents
        const fee = (feePercents / 100)  * amount
        return this.getMaxFee(fee,commission.max.amount)
    }

    calculateCashOutFeeJuridical(commission,amount){
        const feePercents = commission.percents;
        const calculatedFee = (feePercents / 100)  * amount;
        const actualFee = this.getMinFee(calculatedFee,commission.min.amount);
        return this.getCeilednumber(actualFee);
    }

    calculateCashOutFeeNatural(commission, amount) {
        const feePercents = commission.percents;
        const calculatedFee = (feePercents / 100) * amount;
        return calculatedFee;
    }

    getMaxFee(fee, maxFee) {
        if (fee > maxFee) {
            return maxFee;
        }
        return fee;
    }

    getMinFee(fee, minFee){
        if (fee < minFee) {
            return minFee
        }
        return fee;
    }

    getCeilednumber(number) {
        return Math.ceil(number * 10) / 10;
    }
}


module.exports = Operation;