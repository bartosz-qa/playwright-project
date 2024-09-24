import { test, expect } from '@playwright/test';

test('Test Trello Board UI', async ({ page }) => {
  await page.goto('https://trello.com');
  await page.click('[data-cy=board]');
  const listName = await page.textContent('.list-header-name');
  expect(listName).toBe('List Name');
});
