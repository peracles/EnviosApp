const cron = require('node-cron');
const puppeteer = require('puppeteer');
const axios = require('axios');

module.exports = {
  scheduleTask: function() {
    var x = 1;
    // Ejecutar cada 30 segundos
    cron.schedule('*/30 * * * * *', async function() {
      console.log('Escaneando página...' + x);
      await openWebPageAndUpdateDatabase();

      x++;
    });
  }
};

async function openWebPageAndUpdateDatabase() {
  try {
    const browser = await puppeteer.launch({
      headless: false,  // Lanzar con interfaz gráfica visible
      defaultViewport: null  // Opcionalmente, establece el tamaño de la ventana con un objeto { width, height }
  });
    const page = await browser.newPage();

   // Definir la función delay
   function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Ir a la página y esperar a que se cargue completamente
    await page.goto('http://localhost:1337/', { waitUntil: 'networkidle0' });

    // Esperar 20 segundos para que puedas ver la página
    await delay(20000);  // Llamar a la función de espera personalizada

    // Esperar a que la tabla esté presente en la página
    await page.waitForSelector('#envios');

    // Extraer la información de la página
    const envios = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#envios tbody tr'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        const button = row.querySelector('button.btn-editar');
        return {
          id: parseInt(cells[0]?.innerText || -1),
          codigoEnvio: cells[1]?.innerText || '',
          descripcion: cells[2]?.innerText || '',
          destinatario: cells[3]?.innerText || '',
          direccion: cells[4]?.innerText || '',
          codigoPostal: cells[5]?.innerText || '',
          municipio: cells[6]?.innerText || '',
          estado: cells[7]?.innerText || '',
          pais: cells[8]?.innerText || '',
          idPaqueteria: button?.dataset.idpaqueteria ? parseInt(button.dataset.idpaqueteria) : null,
          idEstadoEnvio: button?.dataset.idestadoenvio ? parseInt(button.dataset.idestadoenvio) : null
        };
      }).filter(envio => envio.id !== -1 && envio.idPaqueteria !== null && envio.idEstadoEnvio !== null); // Filtrar registros inválidos
    });

    console.log(envios);
    

    await browser.close();

    // Enviar los datos extraídos a tu API para actualizar la base de datos
    for (const envio of envios) {
      try {
        await axios.post('http://localhost:1337/actualizar', envio);
        console.log(`Envio con ID ${envio.id} actualizado.`);
      } catch (error) {
        console.error(`Error al actualizar el envio con ID ${envio.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error al escanear la página:', error.message);
  }
}