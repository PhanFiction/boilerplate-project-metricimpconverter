const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Validate Input Number', () => {
    test('Should read the numbers in the input', (done) => {
      assert.equal(convertHandler.getNum('12kg'), 12);
      assert.equal(convertHandler.getNum('38lbs'), 38);
      done();
    });

    test('Should read the decimal numbers in the input', (done) => {
      assert.equal(convertHandler.getNum('6.3kg'), 6.3);
      assert.equal(convertHandler.getNum('32.13lbs'), 32.13);
      done();
    });

    test('Should read the fractial in the input', (done) => {
      assert.equal(convertHandler.getNum('2/6kg'), 0.33333);
      assert.equal(convertHandler.getNum('2/24lbs'), 0.08333);
      done();
    });

    test('Should read the fractial with decimal in the input', (done) => {
      assert.equal(convertHandler.getNum('3.1/5kg'), 0.62);
      assert.equal(convertHandler.getNum('13.1/34lbs'), 0.38529);
      done();
    });

    test('Should correctly return an error due to double fraction', (done) => {
      assert.equal(convertHandler.getNum('2./1//5kg'), 'invalid number');
      assert.equal(convertHandler.getNum('13.1/14/13.1lbs'),'invalid number');
      done();
    });

    test('Should correctly return 1 when no number provided', (done) => {
      assert.equal(convertHandler.getNum('kg'), 1);
      assert.equal(convertHandler.getNum('lbs'), 1);
      done();
    });
  });

  suite('Validate Input Unit', () => {
    test('Should read the unit in the input', (done) => {
      assert.equal(convertHandler.getUnit('2kg'), 'kg');
      assert.equal(convertHandler.getUnit('4lbs'), 'lbs');
      done();
    });

    test('Should correctly return an error due to invalid input unit', (done) => {
      assert.equal(convertHandler.getUnit('2.3k'), 'invalid unit');
      assert.equal(convertHandler.getUnit('24.13'),'invalid unit');
      done();
    });

    test('Should correctly return the correct return unit', (done) => {
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      done();
    });

    test('Should correctly return the spelled out string unit', (done) => {
      assert.equal(convertHandler.getString(1, 'kg', 2.20462, 'lbs'),'1 kilograms converts to 2.20462 pounds');
      assert.equal(convertHandler.getString(1, 'gal', 3.78541, 'L'),'1 gallons converts to 3.78541 liters');
      done();
    });
  });

  suite('Validate Convertion', () => {
    test('Should correctly convert km to mi', (done) => {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137);
      assert.equal(convertHandler.convert(12, 'km'), 7.45647);
      done();
    });

    test('Should correctly convert mi to km', (done) => {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
      assert.equal(convertHandler.convert(12, 'mi'), 19.31208);
      done();
    });

    test('Should correctly convert kg to lbs', (done) => {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
      assert.equal(convertHandler.convert(12, 'kg'), 26.45549);
      done();
    });

    test('Should correctly convert lbs to kg', (done) => {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
      assert.equal(convertHandler.convert(6, 'lbs'), 2.72155);
      done();
    });

    test('Should correctly convert gal to L', (done) => {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
      assert.equal(convertHandler.convert(34.13, 'gal'), 129.19604);
      done();
    });

    test('Should correctly convert L to gal', (done) => {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417);
      assert.equal(convertHandler.convert(12.2, 'L'), 3.2229);
      done();
    });
  });
});