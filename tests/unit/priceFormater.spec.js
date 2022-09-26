const amountFormater = require('../../app/utils/priceFormater');

describe('amountFormater function', () => {
    it('entering the price by parameter should return an object with two key values: fraction and cents', () => {
        const result = amountFormater(1920.12);
        expect(result).toEqual(expect.objectContaining({ fraction: '1.920', cents: '12' }));
    });

    it('if the decimal is a single digit, a trailing 0 must be concatenated to cents', () => {
        const result = amountFormater(3500.0);
        expect(result).toEqual(expect.objectContaining({ fraction: '3.500', cents: '00' }));
    });
    it('if the decimal has 3 or more digits, should only consider the first two for cents', () => {
        const result = amountFormater(2100.100);
        expect(result).toEqual(expect.objectContaining({ fraction: '2.100', cents: '10' }));
    });
    it('if there is no decimal, cents must be "00"', () => {
        const result = amountFormater(580);
        expect(result).toEqual(expect.objectContaining({ fraction: '580', cents: '00' }));
    });
});