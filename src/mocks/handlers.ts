import { http, HttpResponse } from 'msw';
import { mockData } from './data';

const createMockHandler = (endpoint: string, status: number) => {
  return http.post(endpoint, () => HttpResponse.json(mockData, { status }));
};

export const handlers = [
  createMockHandler('https://rickandmortyapi.com/graphql', 200),
  createMockHandler('https://rickandmortyapi.com/graphql/500', 500),
  createMockHandler('https://rickandmortyapi.com/graph', 500),
];

export default handlers;
