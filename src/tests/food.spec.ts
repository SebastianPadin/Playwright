import { test } from '@playwright/test';

test('Prueba simplificada de agregar alimento', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://4200-vallegrande-vgwebdashbo-qbguf9p9d3v.ws-us118.gitpod.io/Modulo-Galpon/Alimento', { timeout: 60000 });

  // Confirmar que el botón "Agregar Alimento" para abrir el modal está presente y visible
  const abrirModalButton = page.locator('button.bg-green-500:has-text("Agregar Alimento")');
  await abrirModalButton.waitFor({ state: 'visible', timeout: 30000 });
  
  // Simular un clic en el botón para abrir el modal
  await abrirModalButton.click();

  // Llenar el formulario dentro del modal
  await page.selectOption('#foodType', { label: 'Inicio' });
  await page.selectOption('#foodBrand', { label: 'Avifort' });
  await page.fill('input[name="amount"]', '25');
  await page.fill('input[name="packaging"]', 'Saco');
  await page.fill('input[name="unitMeasure"]', 'Kg');

  // Confirmar que el botón "Agregar" dentro del modal está presente y visible
  const enviarFormularioButton = page.locator('button[type="submit"]:has-text("Agregar")');
  await enviarFormularioButton.waitFor({ state: 'visible', timeout: 30000 });
  
  // Simular clic en el botón para enviar el formulario
  await enviarFormularioButton.click();

});
