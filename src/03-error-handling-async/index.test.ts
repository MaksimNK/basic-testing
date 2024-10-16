// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    await expect(resolveValue('TEST')).resolves.toBe('TEST');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect.assertions(1);
    const msg = 'test error';
    try {
      throwError(msg);
    } catch (error) {
      if (error instanceof Error) expect(error.message).toBe(msg);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    const defaultMsg = 'Oops!';
    try {
      throwError();
    } catch (error) {
      if (error instanceof Error) expect(error.message).toBe(defaultMsg);
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    return await expect(rejectCustomError()).rejects.toBeInstanceOf(
      MyAwesomeError,
    );
  });
});
