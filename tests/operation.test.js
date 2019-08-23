const Operation = require('../classes/Operation');
const options = {
    date: Date.now(),
    type: 'cash_in',
    userType: 'natural',
    details: { amount: 200.00, currency: "EUR" }
}
const operation = new Operation(options);

describe('max fee', () => {
    it('should return maxFee value if calculated fee is bigger', () => {
        const result = operation.getMaxFee(3,2);
        expect(result).toBe(2)
    });
    it('should return calculated fee value if maxFee is bigger', () => {
        const result = operation.getMaxFee(1,2);
        expect(result).toBe(1)
    });
});

describe('calculate cash in fee', () => {
    it('should return calculated fee', () => {
        const commission = {
            percents: 0.03,
            max: {
                amount: 5
            }
        }
        const result = operation.calculateCashInFee(commission, 100);
        expect(result).toBe(0.03)
    });
    it('should return max fee', () => {
        const commission = {
            percents: 0.03,
            max: {
                amount: 5
            }
        }
        const result = operation.calculateCashInFee(commission, 10000000);
        expect(result).toBe(5)
    });
});
describe('ceiling number', () => {
    it('should return ceiled number', () => {
        const result = operation.getCeilednumber(0.23);
        expect(result).toBe(0.3)
    });
})

