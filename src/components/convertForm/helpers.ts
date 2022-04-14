const numbersMap: Record<number, string> = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
}

const numberDozensMap: Record<number, string> = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
};

const UNION_WORD = " and ";

export const splitStringToChunks = (str: string, size = 3) => {
  const length = str.length;
  const chunks = Array(Math.ceil(length / size));

  if (!length) {
    return chunks;
  }

  chunks[0] = str.slice(0, length % size || size);
  for (let i = 1, index = chunks[0].length; index < length; i++) {
    chunks[i] = str.slice(index, index += size);
  }
  return chunks;
}

export const getNumberStringRepresentation = (number: number): string => {
  if (!number) {
    return numbersMap[number];
  }
  // split to chunks so that 12345 will become ["12", "345"] and then reverse it to ["345", "12"]
  const chunks = splitStringToChunks(String(number)).reverse();

  let stringRepresentation = "";

  for (let i = 0; i < chunks.length; i++) {
    let newStringChunk = convertNumberChunkToWords(chunks[i]);
    // if we want to get millions, billions, etc. we can add similar part for it (or switch, or map):
    if (i === 1) {
      newStringChunk += " thousand";
      if (stringRepresentation) {
        newStringChunk += UNION_WORD;
      }
    }

    stringRepresentation = newStringChunk + stringRepresentation;
  }

  return stringRepresentation;
}

export const convertNumberChunkToWords = (numberChunk: string): string => {
  // we get "345" and convert it to "543", so we can easily check if there are hundreds and dozens
  // without any math operations that could cause wrong results
  const reversedNumber = numberChunk.split("").reverse().join("");
  const hundred = Number(reversedNumber[2]);
  const dozens = Number(reversedNumber[1]);
  const units = Number(reversedNumber[0]);

  let words = "";

  if (hundred) {
    words += numbersMap[hundred] + " hundred";
  }

  if (dozens) {
    if (hundred) {
      words += UNION_WORD;
    }

    if (dozens >= 2) {
      words += numberDozensMap[dozens];
      if (units) {
        words += "-" + numbersMap[units];
      }
    } else {
      // for all -teen numbers
      words += numbersMap[dozens * 10 + units];
    }
  } else if (units) {
    if (hundred) {
      words += UNION_WORD + numbersMap[units];
    } else {
      words += numbersMap[units];
    }
  }

  return words;
}