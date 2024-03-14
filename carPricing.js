const cabPrices = {
    1: '10',
    2: '20',
    3: '30',
    4: '40',
    5: '50'
  };
  
  function carPricing(cabNumber) {
    if (cabNumber < 1 || cabNumber > 5 || isNaN(cabNumber)) {
      return "Invalid cab number. Please provide a number between 1 and 5.";
    }
  
    const price = cabPrices[cabNumber];
    return price;
  }
  
  module.exports = carPricing;