// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: '1', b: 2, action: Action.Subtract, expected: null },
  { a: 3, b: '', action: Action.Subtract, expected: null },
  { a: 3, b: 2, action: 'action ', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected value for each argument',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
