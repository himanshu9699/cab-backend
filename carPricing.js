const cabPrices = {
    1: '10',
    2: '20',
    3: '30',
    4: '40',
    5: '50'
  };
  
  function carPricing(cabNumber) {
    const price = cabPrices[cabNumber];
    return price;
  }
  
  module.exports = carPricing;