/**
 * @param {string} s
 * @return {boolean}
 */

interface stringToString {
  [key: string]: string;
}

export const isValid: (s: string) => boolean = s => {
  const letters = s.split('');

  if (letters.length % 2 === 1) {
    return false;
  }

  const parentheses: stringToString = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  const stack = [];

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];

    if (['(', '{', '['].includes(letter)) {
      stack.push(letter);
      continue;
    }

    if (parentheses[letter]) {
      const latestLetter = stack.pop();
      if (latestLetter !== parentheses[letter]) {
        return false;
      }
    }
  }

  return !stack.length;
};
