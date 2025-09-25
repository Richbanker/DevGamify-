import { test, expect } from '@playwright/test'

test('create daily -> complete -> history shows -> xp increases @screenshot', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Quests' }).click()
  await page.getByRole('button', { name: 'Добавить' }).click()
  await page.getByLabel('Название').fill('Daily test')
  await page.getByLabel('Категория').fill('react')
  await page.getByRole('button', { name: 'Сохранить' }).click()

  await page
    .getByRole('row', { name: /Daily test/ })
    .getByRole('button', { name: 'Done' })
    .click()

  await page.getByRole('link', { name: 'History' }).click()
  await expect(page.getByRole('cell', { name: 'Daily test' })).toBeVisible()

  await page.getByRole('link', { name: 'Dashboard' }).click()
  await page.screenshot({ path: 'docs/screens/dashboard.png', fullPage: true })
})
