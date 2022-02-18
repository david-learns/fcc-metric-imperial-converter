const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function (){

    suite('ConvertHandler', function () {

        test('convertHandler.getNum()#1', function () {
            assert.equal(convertHandler.getNum('2mi'), 2, 'read whole number input');
        });

        test('convertHandler.getNum()#2', function () {
            assert.equal(convertHandler.getNum('1.3L'), 1.3, 'read decimal number input');
        });
        
        test('convertHandler.getNum()#3', function () {
            assert.approximately(convertHandler.getNum('1/3kg'), 0.3333, 0.0001, 'read fractional input');
        });
        
        test('convertHandler.getNum()#4', function () {
            assert.equal(convertHandler.getNum('1.5/3lbs'), 0.5, 'read fractional input with decimal');
        });

        test('convertHandler.getNum()#5', function () {
            assert.equal(convertHandler.getNum('1/2/2gal'), 'invalid number', 'return error message on double fraction');
        });
        
        test('convertHandler.getNum()#6', function () {
            assert.equal(convertHandler.getNum('mi'), 1, 'default to 1 when no quantity provided');
        });

        test('convertHandler.getUnit()#1', function () {
            assert.equal(convertHandler.getUnit('2mi'), 'mi', 'read each valid input unit');
            assert.equal(convertHandler.getUnit('2lbs'), 'lbs', 'read each valid input unit');
            assert.equal(convertHandler.getUnit('2gal'), 'gal', 'read each valid input unit');
            assert.equal(convertHandler.getUnit('2km'), 'km', 'read each valid input unit');
            assert.equal(convertHandler.getUnit('2kg'), 'kg', 'read each valid input unit');
            assert.equal(convertHandler.getUnit('2L'), 'L', 'read each valid input unit');
        });

        test('convertHandler.getUnit()#2', function () {
            assert.equal(convertHandler.getUnit('2oz'), 'invalid unit', 'return error message on invalid unit');
        });

        test('convertHandler.getReturnUnit()#1', function () {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'return correct return unit for valid input unit');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'return correct return unit for valid input unit');
            assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'return correct return unit for valid input unit');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'return correct return unit for valid input unit');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'return correct return unit for valid input unit');
            assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'return correct return unit for valid input unit');
        });

        test('convertHandler.spellOutUnit()#1', function () {
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'return non-abbreviated unit name for valid input unit');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'return non-abbreviated unit name for valid input unit');
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'return non-abbreviated unit name for valid input unit');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'return non-abbreviated unit name for valid input unit');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'return non-abbreviated unit name for valid input unit');
            assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'return non-abbreviated unit name for valid input unit');

        });

        test('convertHandler.convert()#1', function () {
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'return correct conversion value');
        });

        test('convertHandler.convert()#2', function () {
            assert.equal(convertHandler.convert(1, 'L'), 0.26417, 'return correct conversion value');
        });

        test('convertHandler.convert()#3', function () {
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'return correct conversion value');
        });

        test('convertHandler.convert()#4', function () {
            assert.equal(convertHandler.convert(1, 'km'), 0.62137, 'return correct conversion value');
        });

        test('convertHandler.convert()#5', function () {
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'return correct conversion value');
        });

        test('convertHandler.convert()#6', function () {
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462, 'return correct conversion value');
        });
        
    });

});