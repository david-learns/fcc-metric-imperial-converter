
const { inspect } = require('util');
const utilInspectOptions =  {
  depth: 5,
  colors: true,
  compact: false
};

function ConvertHandler() {
  
  this.getNum = function(input) {

    const indexAlphaChar = input.search(/[a-zA-Z]/);
    const quantity = input.slice(0, indexAlphaChar) || '1';
    const units = input.slice(indexAlphaChar);
    const operands = quantity.includes('/') ? quantity.split('/') : [quantity];
    const isValidNum = operands.length < 3 ? operands.every(num => !Number.isNaN(Number(num))) : false;
    const divByZero = Number(operands[1]) === 0;
    let result = 'invalid number';

    if (isValidNum && !divByZero) {
      if (operands.length > 1) {
        result = Number(operands[0]) / Number(operands[1]);
      } else {
        result = Number(operands[0]);
      }
    }

    if (process.env.PRINT_DEBUG_LOGS) {
      const getNumDebugObj = {
        quantity,
        units,
        operands,
        isValidNum,
        divByZero,
        result
      };
      console.log(`convertHandler.js getNum\ngetNumDebugObj: ${inspect(getNumDebugObj, utilInspectOptions)}`);
    }

    return result;
  };
  
  this.getUnit = function(input) {

    const unitArr = ['gal','L','lbs','kg','mi','km'];
    const indexAlphaChar = input.search(/[a-zA-Z]/);
    let units = input.slice(indexAlphaChar);
    units = (units === 'l') ? 'L' : units;
    const isValidUnit = unitArr.includes(units);
    let result = isValidUnit ? units : 'invalid unit';

    if (process.env.PRINT_DEBUG_LOGS) {
      const getUnitDebugObj = {
        units,
        isValidUnit,
        result
      };
      console.log(`convertHandler.js getUnit\ngetUnitDebugObj: ${inspect(getUnitDebugObj, utilInspectOptions)}`);
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {

    const unitConversionObj = {
      'mi': 'km',
      'lbs': 'kg',
      'gal': 'L',
      'km': 'mi',
      'kg': 'lbs',
      'L': 'gal'
    };

    return unitConversionObj[initUnit];
  };

  this.spellOutUnit = function(unit) {

    const unAbbreviateObj = {
      'km': 'kilometers',
      'kg': 'kilograms',
      'L': 'liters',
      'mi': 'miles',
      'lbs': 'pounds',
      'gal': 'gallons'
    };
    
    return unAbbreviateObj[unit];
  };
  
  this.convert = function(initNum, initUnit) {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversionValObj = {
      'km': initNum / miToKm,
      'kg': initNum / lbsToKg,
      'L': initNum / galToL,
      'mi': initNum * miToKm,
      'lbs': initNum * lbsToKg,
      'gal': initNum * galToL
    };
    
    return Number.parseFloat(conversionValObj[initUnit].toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
