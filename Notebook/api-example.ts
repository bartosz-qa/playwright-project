import { test, expect, request } from '@playwright/test';

test('Test Trello API', async ({ request }) => {
  const response = await request.get('https://api.trello.com/1/boards/{boardId}?key=API_KEY&token=API_TOKEN');
  expect(response.status()).toBe(200);
  const data: { name: string } = await response.json();
  expect(data.name).toBe('Expected Board Name');
});
