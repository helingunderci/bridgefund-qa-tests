function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomSliderStep(min = 5000, max = 250000, step = 1000) {
    const steps = Math.floor((max - min) / step);
    const randomStep = Math.floor(Math.random() * (steps + 1));
    return min + randomStep * step;
  }

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  module.exports = {
    getRandomInt,
    getRandomSliderStep,
    getRandomItem
  };
  