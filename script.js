const apiUrl = 'https://api.exchangerate.host/latest?base=USD&symbols=COP';

async function obtenerTasaDeCambio() {
  try {
    const respuesta = await fetch(apiUrl);
    const datos = await respuesta.json();
    return datos.rates.COP;
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error);
    return 5000; // Valor predeterminado
  }
}

async function actualizarCOP(inputUSD, inputCOP) {
  const tasa = await obtenerTasaDeCambio();
  inputCOP.value = (parseFloat(inputUSD.value) * tasa || 0).toFixed(2);
}
function actualizarUSD(inputCOP, inputUSD) {
  const tasa = 5000;
  inputUSD.value = (parseFloat(inputCOP.value) / tasa || 0).toFixed(2);
}

const precioCompraUSDInput = document.getElementById('precioCompraUSD');
const precioCompraCOPInput = document.getElementById('precioCompraCOP');
const precioVentaUSDInput = document.getElementById('precioVentaUSD');
const precioVentaCOPInput = document.getElementById('precioVentaCOP');
const precioEnvioInput = document.getElementById('precioEnvio');
const precioEnvioCOPInput = document.getElementById('precioEnvioCOP');

precioCompraUSDInput.addEventListener('input', () => actualizarCOP(precioCompraUSDInput, precioCompraCOPInput));
precioVentaUSDInput.addEventListener('input', () => actualizarCOP(precioVentaUSDInput, precioVentaCOPInput));
precioEnvioInput.addEventListener('input', () => actualizarCOP(precioEnvioInput, precioEnvioCOPInput));

precioCompraCOPInput.addEventListener('input', () => actualizarUSD(precioCompraCOPInput, precioCompraUSDInput));
precioVentaCOPInput.addEventListener('input', () => actualizarUSD(precioVentaCOPInput, precioVentaUSDInput));
precioEnvioCOPInput.addEventListener('input', () => actualizarUSD(precioEnvioCOPInput, precioEnvioInput));

const form = document.getElementById('productForm');
const tableBody = document.querySelector('#inventoryTable tbody');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const producto = document.getElementById('producto').value;
  const precioCompraCOP = parseFloat(precioCompraCOPInput.value);
  const precioCompraUSD = parseFloat(precioCompraUSDInput.value);
  const precioVentaCOP = parseFloat(precioVentaCOPInput.value);
  const precioVentaUSD = parseFloat(precioVentaUSDInput.value);
  const precioEnvioCOP = parseFloat(precioEnvioCOPInput.value);
  const precioEnvioUSD = parseFloat(precioEnvioInput.value);
  const deposito = document.getElementById('deposito').value;
  const fechaEntrega = document.getElementById('fechaEntrega').value;
  const estado = document.getElementById('estado').value;

  const gananciaCOP = precioVentaCOP - precioCompraCOP;
  const gananciaUSD = precioVentaUSD - precioCompraUSD;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${producto}</td>
    <td>${precioCompraCOP}</td>
    <td>${precioCompraUSD}</td>
    <td>${precioVentaCOP}</td>
    <td>${precioVentaUSD}</td>
    <td>${gananciaCOP}</td>
    <td>${gananciaUSD}</td>
    <td>${precioEnvioCOP}</td>
    <td>${precioEnvioUSD}</td>
    <td>${deposito}</td>
    <td>${fechaEntrega}</td>
    <td>${estado}</td>
  `;
  tableBody.appendChild(row);
  form.reset();
});