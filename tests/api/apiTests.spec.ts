import { test, expect, request } from '@playwright/test';
import * as dotenv from 'dotenv';  // Importujemy bibliotekę dotenv

dotenv.config();  // Ładujemy zmienne z pliku .env
console.log('API_KEY:', process.env.API_KEY);
console.log('API_TOKEN:', process.env.API_TOKEN);

const apiKey: string = process.env.API_KEY ?? (() => { throw new Error('API_KEY is not defined') })();
const apiToken: string = process.env.API_TOKEN ?? (() => { throw new Error('API_TOKEN is not defined') })();

const baseUrl = 'https://api.trello.com/1';
const boardName = 'Playwright Test Board';


let boardId: string;

test.describe('Trello API Tests', () => {

  // Test tworzenia tablicy
  test('Create a new board', async ({ request }) => {
    const response = await request.post(`${baseUrl}/boards`, {
      params: {
        key: apiKey,
        token: apiToken,
        name: boardName
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    
    boardId = responseBody.id;
    console.log(`Board created with ID: ${boardId}`);

    expect(responseBody.name).toBe(boardName);
  });

  // Test pobierania szczegółów tablicy
  test('Get board details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/boards/${boardId}`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    expect(response.status()).toBe(200);
    const boardDetails = await response.json();
    
    expect(boardDetails.id).toBe(boardId);
    expect(boardDetails.name).toBe(boardName);
  });

  // Test aktualizacji tablicy
  test('Update board name', async ({ request }) => {
    const newBoardName = 'Updated Playwright Test Board';

    const response = await request.put(`${baseUrl}/boards/${boardId}`, {
      params: {
        key: apiKey,
        token: apiToken,
        name: newBoardName
      }
    });

    expect(response.status()).toBe(200);
    const updatedBoard = await response.json();
    
    expect(updatedBoard.name).toBe(newBoardName);
  });

  // Test usunięcia tablicy
  test('Delete the board', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/boards/${boardId}`, {
      params: {
        key: apiKey,
        token: apiToken
      }
    });

    expect(response.status()).toBe(200);
  });
});
