import MockAdapter from 'axios-mock-adapter';
import { apiClient } from './apis';

export const setupMockApi = () => {
  if (import.meta.env.VITE_USE_MOCK_API === 'true') {
    const mock = new MockAdapter(apiClient, { delayResponse: 500 });

    console.log('Mock API is enabled.');

    mock.onGet('/api/health').reply(200, {
      status: 'ok',
      message: 'Mock API is running',
    });

  }
};
