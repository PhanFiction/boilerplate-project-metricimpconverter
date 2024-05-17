const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

function ConvertHandler() {

  this.getNum = function(input) {

    let num;
    let fractions;
    let trimmedInput = input ? input.trim() : '';

    if (trimmedInput) {
      if (trimmedInput.includes('/')) {
        fractions = trimmedInput.replace(/[a-z]/gi, '').split('/');
        console.log('fractions ', fractions);
        if (fractions.length <= 2 && fractions.length > 0) return eval((parseFloat(fractions[0]) / parseFloat(fractions[1])).toFixed(5)); 
      } else {
        num = trimmedInput.match(/[\d\.]+/);
        console.log('number is ', num);
        return num ? eval(num[0]) : 1;
      }
    }
    
    return 'invalid number';
  };
  
  this.getUnit = function(input) {
    let result;
    let unitInput = input.match(/[a-zA-Z]+/);

    if (unitInput) {
      result = unitInput[0].trim().toLowerCase();
      if (units.includes(result)) return result == 'l' ? 'L' : result;
      return 'invalid unit';
    }
    
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitConversions = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs',
    }
    return unitConversions[initUnit];
  };

  this.spellOutUnit = function(unit) {
    // Define unit spellings
    const unitSpellings = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    // Look up the spelled-out unit from the spellings table
    return unitSpellings[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitLowerCase = initUnit.toLowerCase();

    let result;

    switch(unitLowerCase) {
      case 'gal':
        result = parseFloat(initNum * galToL);
        break;
      case 'l':
        result = parseFloat(initNum / galToL);
        break;
      case 'lbs':
        result = parseFloat(initNum * lbsToKg);
        break;
      case 'kg':
        result = parseFloat(initNum / lbsToKg);
        break;
      case 'mi':
        //console.log('miles', initNum * miToKm, parseFloat(initNum * miToKm));
        result = parseFloat(initNum * miToKm);
        break;
      case 'km':
        result = parseFloat(initNum / miToKm);
        break;
      default:
        result = parseFloat(initNum / miToKm);
    }
  
    // convert to number and return to be fixed decimal point of 5
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
