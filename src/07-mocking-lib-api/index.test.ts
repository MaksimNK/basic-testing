import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.advanceTimersByTime(5000);
  });

  test('should create instance with provided base url', async () => {
    const mockData = { data: 'test' };
    const axiosInstance: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance;

    const create = jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockData = { data: 'test' };
    const axiosInstance: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);
    const fetch = jest.spyOn(axiosInstance, 'get');

    await throttledGetDataFromApi(relativePath);

    expect(fetch).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { data: 'test' };
    const axiosInstance: AxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toBe(mockData);
  });
});
