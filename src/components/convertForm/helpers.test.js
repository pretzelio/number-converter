import {convertNumberChunkToWords, getNumberStringRepresentation, splitStringToChunks} from './helpers';

describe('convertNumberChunkToWords', () => {
  it('Tests that hundreds converted correctly', () => {
    expect(convertNumberChunkToWords("456")).toEqual("four hundred and fifty-six");
    expect(convertNumberChunkToWords("450")).toEqual("four hundred and fifty");
    expect(convertNumberChunkToWords("406")).toEqual("four hundred and six");
    expect(convertNumberChunkToWords("400")).toEqual("four hundred");
  });

  it('Tests that dozens converted correctly', () => {
    expect(convertNumberChunkToWords("56")).toEqual("fifty-six");
    expect(convertNumberChunkToWords("50")).toEqual("fifty");
    expect(convertNumberChunkToWords("16")).toEqual("sixteen");
    expect(convertNumberChunkToWords("10")).toEqual("ten");
  });

  it('Tests that units converted correctly', () => {
    expect(convertNumberChunkToWords("6")).toEqual("six");
    expect(convertNumberChunkToWords("0")).toEqual("");
  });
})

describe('getNumberStringRepresentation', () => {
  it('Tests that units converted correctly', () => {
    expect(getNumberStringRepresentation(6)).toEqual("six");
    expect(getNumberStringRepresentation(0)).toEqual("zero");
  });

  it('Tests that thousands converted correctly', () => {
    expect(getNumberStringRepresentation(10000)).toEqual("ten thousand");
    expect(getNumberStringRepresentation(10356)).toEqual("ten thousand and three hundred and fifty-six");
    expect(getNumberStringRepresentation(10020)).toEqual("ten thousand and twenty");
    expect(getNumberStringRepresentation(10500)).toEqual("ten thousand and five hundred");
    expect(getNumberStringRepresentation(10505)).toEqual("ten thousand and five hundred and five");
    expect(getNumberStringRepresentation(2000)).toEqual("two thousand");
    expect(getNumberStringRepresentation(2356)).toEqual("two thousand and three hundred and fifty-six");
  });

  it('Tests that hundred converted correctly', () => {
    expect(getNumberStringRepresentation(600)).toEqual("six hundred");
    expect(getNumberStringRepresentation(350)).toEqual("three hundred and fifty");
    expect(getNumberStringRepresentation(223)).toEqual("two hundred and twenty-three");
    expect(getNumberStringRepresentation(203)).toEqual("two hundred and three");
  });
})

describe('splitStringToChunks', () => {
  it('Tests that strings are split correctly with default length param', () => {
    expect(splitStringToChunks("50432")).toEqual(["50", "432"]);
    expect(splitStringToChunks("4000")).toEqual(["4", "000"]);
    expect(splitStringToChunks("304")).toEqual(["304"]);
    expect(splitStringToChunks("20")).toEqual(["20"]);
    expect(splitStringToChunks("1")).toEqual(["1"]);
  });

  it('Tests that strings are split correctly with custom length param', () => {
    expect(splitStringToChunks("50432", 2)).toEqual(["5", "04", "32"]);
    expect(splitStringToChunks("4000", 2)).toEqual(["40", "00"]);
    expect(splitStringToChunks("304", 2)).toEqual(["3", "04"]);

    expect(splitStringToChunks("50432", 4)).toEqual(["5", "0432"]);
    expect(splitStringToChunks("4000", 4)).toEqual(["4000"]);
    expect(splitStringToChunks("304", 4)).toEqual(["304"]);
  });
})