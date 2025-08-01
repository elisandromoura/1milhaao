const grid = document.getElementById('grid');
const total = 1000000;
let selected = 0;

function updateCounter() {
  const remaining = total - selected;
  document.getElementById('counter').innerText = `Restam ${remaining.toLocaleString()} quadrados disponíveis.`;
}

function generateGrid() {
  for (let i = 0; i < total; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.addEventListener('click', () => {
      if (!pixel.classList.contains('selected')) {
        pixel.classList.add('selected');
        selected++;
      } else {
        pixel.classList.remove('selected');
        selected--;
      }
      updateCounter();
    });
    grid.appendChild(pixel);
  }
  updateCounter();
}

function generatePix() {
  alert("Pix gerado automaticamente.");
}

function localizarQuadrado() {
  alert("Função de localizar quadrado ainda será implementada.");
}

function finalizarCompra() {
  alert("Compra finalizada! Imagem poderá ser enviada.");
}

generateGrid();
