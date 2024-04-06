import { createId, expandSpreadExpressions, parseNumbers, parseNumericValues, NumberParseStrategies, IValueWithIndex } from "./index"

describe('createId function', () => {
  it('should generate a unique identifier', () => {
    const id = createId();
    expect(id).toBeTruthy(); // Expect the generated ID to be truthy
    expect(typeof id).toBe('string'); // Expect the generated ID to be a string
    // Add more specific assertions based on the expected format or length of the ID if needed
  });
});

describe('expandSpreadExpressions function', () => {
  it('should expand spread expressions in a string', () => {
    const input = '1..3 5..2';
    const expectedOutput = '1 1 1 5 5';
    const output = expandSpreadExpressions(input);
    expect(output).toBe(expectedOutput);
  });

  it('should return the input string if no spread expressions are present', () => {
    const input = 'No spread expressions here';
    const output = expandSpreadExpressions(input);
    expect(output).toBe(input);
  });
});

describe('parseNumbers function', () => {
  it('should parse numeric values from a string', () => {
    const input = '123 45.6 -7';
    const expectedOutput = [123, 45.6, -7];
    const output = parseNumbers(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should handle spread expressions before parsing', () => {
    const input = '1..3 5..2';
    const expectedOutput = [1, 1, 1, 5, 5];
    const output = parseNumbers(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should return fallback array if input is null or empty', () => {
    const fallback = [0, 0, 0];
    expect(parseNumbers(null, fallback)).toEqual(fallback);
    expect(parseNumbers('', fallback)).toEqual(fallback);
  });
});

describe('parseNumericValues function', () => {
  it('should parse numeric values from a string with Int strategy', () => {
    const input = '123 45 -7';
    const expectedOutput: IValueWithIndex[] = [
      { start: 0, end: 3, value: 123 },
      { start: 4, end: 6, value: 45 },
      { start: 7, end: 9, value: -7 }
    ];

    const output = parseNumericValues(input, NumberParseStrategies.Int);

    
    console.log("INT OUT:", output)

    expect(output).toEqual(expectedOutput);
  });

  it('should parse numeric values from a string with Float strategy', () => {
    const input = '123.45 -67.89';
    const expectedOutput: IValueWithIndex[] = [
      { start: 0, end: 6, value: 123.45 },
      { start: 7, end: 13, value: -67.89 }
    ];
    const output = parseNumericValues(input, NumberParseStrategies.Float);
    expect(output).toEqual(expectedOutput);
  });
});
