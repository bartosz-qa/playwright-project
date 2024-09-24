import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN;

export default defineConfig({
    
  testDir: './tests',  // Folder, w którym znajdują się testy
  timeout: 30000,      // Maksymalny czas testu w milisekundach
  expect: {
    timeout: 5000      // Czas oczekiwania dla asercji
  },
  reporter: [['list'], ['allure-playwright']],  // Dodaj Allure jako reporter
  use: {
    baseURL: 'https://api.trello.com/1',  // Podstawowy URL Trello API
    // Opcje konfiguracyjne dla testów
    headless: true,    // Uruchamianie testów w trybie bezgłowym
    screenshot: 'only-on-failure',  // Zrzuty ekranu tylko przy błędach
    video: 'retain-on-failure',     // Nagrywanie wideo tylko w przypadku błędów
    trace: 'on-first-retry',        // Śledzenie (trace) w przypadku ponownego uruchomienia testu
  },  
});
