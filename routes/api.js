'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    // Get the input query from the request
    const input = req.query.input;
    // Parse the input using the ConvertHandler methods
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum == 'invalid number' && initUnit == 'invalid unit') return res.json({error: 'invalid number and unit'});
    if (initNum == 'invalid number') return res.json({error: 'invalid number'});
    if (initUnit == 'invalid unit') return res.json({error: 'invalid unit'});
    
    // Perform conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    console.log(initNum, initUnit, input, ' return ', returnNum, returnUnit);
    
    // Construct the response object
    const response = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    };

    console.log(response);

    // Send the response
    res.json(response);
  });
  
};
