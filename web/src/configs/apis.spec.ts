import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { apiClient } from './apis';
import MockAdapter from 'axios-mock-adapter';

describe('API Client Configuration', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should be configured with default headers', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should successfully make a request and get a response', async () => {
    mock.onGet('/test-endpoint').reply(200, { success: true });

    const response = await apiClient.get('/test-endpoint');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});
