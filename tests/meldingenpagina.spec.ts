import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const MELDINGEN = [
  {
    id: '1',
    titel: 'Straatverlichting gestolen',
    omschrijving: 'De straatverlichting op de hoek van de straat is gestolen.',
    categorie: 'Diefstal',
    datum: '2023-05-01T10:00:00',
    status: 'Nieuw',
  },
  {
    id: '2',
    titel: 'Afval container leeg',
    omschrijving: 'De afval container in de straat is leeg.',
    categorie: 'Vandalisme',
    datum: '2023-06-01T10:00:00',
    status: 'In behandeling',
  },
  {
    id: '3',
    titel: 'Ongeluk met twee autos',
    omschrijving: 'Twee autos zijn op elkaar gereden.',
    categorie: 'Ongeluk',
    datum: '2025-05-01T10:00:00',
    status: 'Nieuw',
  },
];

test.describe('meldingenpagina', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/meldingen', (route) => route.fulfill({ json: MELDINGEN }));
    await page.goto('/meldingen');
    await expect(page.locator('tbody tr')).toHaveCount(3); // wacht tot de data er is
  });

  test.describe('toegankelijkheid', () => {
    test('lijst heeft geen axe-violations', async ({ page }) => {
      const resultaat = await new AxeBuilder({ page }).analyze();
      expect(resultaat.violations).toEqual([]);
    });

    test('filter-overlay heeft geen axe-violations', async ({ page }) => {
      await page.getByRole('button', { name: 'Filteren', exact: true }).click();
      await expect(page.getByRole('combobox', { name: /status/i })).toBeVisible();

      const resultaat = await new AxeBuilder({ page }).analyze();
      expect(resultaat.violations).toEqual([]);
    });
  });

  test.describe('filter', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Filteren', exact: true }).click();
    });

    test('toont de juiste opties', async ({ page }) => {
      const status = page.getByRole('combobox', { name: /status/i });
      const categorie = page.getByRole('combobox', { name: /categorie/i });

      await expect(status.getByRole('option')).toHaveText(['Nieuw', 'In behandeling']); // pas aan op jouw template
      await expect(categorie.getByRole('option')).toHaveText(['Diefstal', 'Ongeluk', 'Vandalisme']);
    });

    test('filteren op status toont alleen die meldingen', async ({ page }) => {
      await page.getByRole('combobox', { name: /status/i }).selectOption({ label: 'Nieuw' });
      await page.getByRole('button', { name: 'Filter toepassen' }).click();

      await expect(page.locator('tbody tr')).toHaveCount(2);
      await expect(page.getByRole('row', { name: /Afval container/ })).toHaveCount(0);
    });

    test('filters wissen toont alles weer', async ({ page }) => {
      await page.getByRole('combobox', { name: /status/i }).selectOption({ label: 'Nieuw' });
      await page.getByRole('button', { name: 'Filter toepassen' }).click();
      await expect(page.locator('tbody tr')).toHaveCount(2);

      await page.getByRole('button', { name: 'Filters wissen' }).click();
      await expect(page.locator('tbody tr')).toHaveCount(3);
    });

    test('sluiten haalt de overlay weg', async ({ page }) => {
      await page.getByRole('button', { name: 'Filter sluiten' }).click();
      await expect(page.getByRole('combobox', { name: /status/i })).toHaveCount(0);
    });
  });
});
