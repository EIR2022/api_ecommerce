const random = amount => {
  let number = '1';

  for (let i = 0; i < amount; i++) {
    number += '0';
  }

  return Math.floor(Math.random() * number);
};

module.exports = random;
