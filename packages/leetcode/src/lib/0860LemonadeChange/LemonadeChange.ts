const lemonadeChange = (bills: number[]) => {
  const bank = {
    5: 0,
    10: 0,
  };

  for (let i = 0; i <= bills.length; i++) {
    const bill = bills[i];

    if (bill === 5) {
      bank[5] += 1;
    }

    if (bill === 10) {
      if (bank[5] > 0) {
        bank[5] -= 1;
        bank[10] += 1;
      } else {
        return false;
      }
    }

    if (bill === 20) {
      if (bank[5] > 0 && bank[10] > 0) {
        bank[5] -= 1;
        bank[10] -= 1;
      } else if (bank[5] >= 3) {
        bank[5] -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
};

export default lemonadeChange;
