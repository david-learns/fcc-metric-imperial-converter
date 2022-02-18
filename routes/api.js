'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { inspect } = require('util');
const utilInspectOptions =  {
  depth: 5,
  colors: true,
  compact: false
};


module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {

    let conversionObj;
    const lowerCaseInput = req.query.input.toLowerCase();
    const quantity = convertHandler.getNum(lowerCaseInput);
    const unit = convertHandler.getUnit(lowerCaseInput);

    if (quantity !== 'invalid number' && unit !== 'invalid unit') {

      const returnUnit = convertHandler.getReturnUnit(unit);
      const fullInitUnitName = convertHandler.spellOutUnit(unit);
      const fullReturnUnitName = convertHandler.spellOutUnit(returnUnit);
      const convertedQuantity = convertHandler.convert(quantity, unit);
      const humanFormatStr = convertHandler.getString(quantity, fullInitUnitName, convertedQuantity, fullReturnUnitName);
      
      if (process.env.PRINT_DEBUG_LOGS) {
        const conversionDebugObj = {
          quantity,
          unit,
          returnUnit,
          fullInitUnitName,
          fullReturnUnitName,
          convertedQuantity,
          humanFormatStr
        };
        console.log('api.js app.get \'/api/convert\'\n', inspect(conversionDebugObj, utilInspectOptions));
      }

      conversionObj = {
        initNum: quantity,
        initUnit: unit,
        returnNum: convertedQuantity,
        returnUnit,
        string: humanFormatStr
      };
      
    } else {

      if (quantity === 'invalid number' && unit === 'invalid unit') {
        conversionObj = 'invalid number and unit';
      } else {
        conversionObj = `${quantity === 'invalid number' ? quantity : unit}`;
      }

    }

    res.send(conversionObj);

  });

};
