// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            next: null,
            value: null,
          },
        },
      },
    };

    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];
    const linkedList = generateLinkedList(input);

    expect(linkedList).toMatchSnapshot();
  });
});
