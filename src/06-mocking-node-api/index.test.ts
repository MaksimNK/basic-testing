import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackMock = jest.fn();

    const time = 1;
    const timeOutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callbackMock, time);
    expect(timeOutSpy).toHaveBeenLastCalledWith(callbackMock, time);
  });

  test('should call callback only after timeout', () => {
    const time = 1;

    const callbackMock = jest.fn();
    expect(callbackMock).not.toHaveBeenCalled();
    doStuffByTimeout(callbackMock, time);
    jest.advanceTimersByTime(time);

    expect(callbackMock).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();

    const time = 1;
    const timeOutSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callbackMock, time);
    expect(timeOutSpy).toHaveBeenLastCalledWith(callbackMock, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const time = 1;

    const callbackMock = jest.fn();
    expect(callbackMock).not.toHaveBeenCalled();
    doStuffByInterval(callbackMock, time);

    jest.advanceTimersByTime(time);
    expect(callbackMock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(time);
    expect(callbackMock).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file/test.txt';
    const joinSpy = jest.spyOn(path, 'join').mockReturnValue(pathToFile);
    readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file/test.txt';
    const fullPath = path.join(__dirname, pathToFile);
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(existsSyncSpy).toHaveBeenLastCalledWith(fullPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    const pathToFile = 'file/test.txt';
    const fullPath = path.join(__dirname, pathToFile);

    const buffer = Buffer.from(fileContent);
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSpy = jest
      .spyOn(fsPromise, 'readFile')
      .mockReturnValue(Promise.resolve(buffer));

    const result = await readFileAsynchronously(pathToFile);

    expect(existsSyncSpy).toHaveBeenLastCalledWith(fullPath);
    expect(readFileSpy).toHaveBeenLastCalledWith(fullPath);

    expect(result).toBe(fileContent);
  });
});
