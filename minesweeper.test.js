const {
  fillBombCount,
  generateMinesweep,
  gameFromGrid,
  openCell,
  BOMB: b,
  SPACE: s,
} = require('./front/src/app/minesweeper');

test('Preenche com 1 bomba em todos os vizinhos', () => {
  const tabuleiro = [
    [s, s, s],
    [s, b, s],
    [s, s, s],
  ];
  const esperado = [
    [1, 1, 1],
    [1, b, 1],
    [1, 1, 1],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('Conta vizinhos do canto superior esquerdo', () => {
  const tabuleiro = [
    [b, s, s],
    [s, s, s],
    [s, s, s],
  ];
  const esperado = [
    [b, 1, s],
    [1, 1, s],
    [s, s, s],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('Conta vizinhos do canto inferior direito', () => {
  const tabuleiro = [
    [s, s, s],
    [s, s, s],
    [s, s, b],
  ];
  const esperado = [
    [s, s, s],
    [s, 1, 1],
    [s, 1, b],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('Conta vizinhos do cantos', () => {
  const tabuleiro = [
    [b, s, b],
    [s, s, s],
    [b, s, b],
  ];
  const esperado = [
    [b, 2, b],
    [2, 4, 2],
    [b, 2, b],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('[BUG #0001] Bombas vizinhas', () => {
  const tabuleiro = [
    [b, b, b],
    [s, s, s],
    [b, s, b],
  ];
  const esperado = [
    [b, b, b],
    [3, 5, 3],
    [b, 2, b],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('Conta vizinhos de um exemplo aleatório', () => {
  const tabuleiro = [
    [b, s, s, s],
    [s, s, s, s],
    [s, b, s, s],
    [s, s, s, s],
  ];
  const esperado = [
    [b, 1, s, s],
    [2, 2, 1, s],
    [1, b, 1, s],
    [1, 1, 1, s],
  ];
  const resultado = fillBombCount(tabuleiro);
  expect(resultado).toEqual(esperado);
});

test('Gera um campo com N bombas', () => {
  const N = 5;
  const rows = 10;
  const cols = 5;
  const novoTabuleiro = generateMinesweep(rows, cols, N);
  const bombas = contaBombas(novoTabuleiro);
  expect(bombas).toBe(N);
  expect(novoTabuleiro.length).toEqual(rows);
  expect(novoTabuleiro[0].length).toEqual(cols);
});

function contaBombas(tabuleiro) {
  let bombas = 0;
  for (const linha of tabuleiro) {
    for (const celula of linha) {
      if (celula === b) bombas++;
    }
  }
  return bombas;
}

test('[Jogando] Clicando numa bomba', () => {
  const tabuleiro = gameFromGrid(
    fillBombCount([
      [b, s, s, s],
      [s, s, s, s],
      [s, b, s, s],
      [s, s, s, s],
    ]),
  );
  const { game: resultado, died: morreu } = openCell(tabuleiro, 0, 0);
  expect(morreu).toBe(true);
  expect(resultado).toBe(tabuleiro);
});

test('[Jogando] Clicando num número', () => {
  const tabuleiro = gameFromGrid(
    fillBombCount([
      [b, s, s, s],
      [s, s, s, s],
      [s, b, s, s],
      [s, s, s, s],
    ]),
  );
  const { game: resultado, died: morreu } = openCell(tabuleiro, 0, 1);
  expect(morreu).toBe(false);
  expect(resultado[0][1].status).toBe('open');
});

test('[Jogando] Clicando num espaço', () => {
  const tabuleiro = gameFromGrid(
    fillBombCount([
      [b, 1, s],
      [1, 1, s],
    ]),
  );
  const { game: resultado, died: morreu } = openCell(tabuleiro, 0, 2);
  expect(morreu).toBe(false);
  expect(resultado[0][1].status).toBe('open');
  expect(resultado[0][2].status).toBe('open');
  expect(resultado[1][1].status).toBe('open');
  expect(resultado[1][2].status).toBe('open');
});


test('[Jogando] Clicando num grande espaço', () => {
  const tabuleiro = gameFromGrid(
    fillBombCount([
      [b, 1, s],
      [1, 1, s],
      [s, s, s],
    ]),
  );
  const { game: resultado, died: morreu } = openCell(tabuleiro, 0, 2);
  expect(morreu).toBe(false);

  expect(resultado[0][0].status).toBe('closed');
  expect(resultado[0][1].status).toBe('open');
  expect(resultado[0][2].status).toBe('open');

  expect(resultado[1][0].status).toBe('open');
  expect(resultado[1][1].status).toBe('open');
  expect(resultado[1][2].status).toBe('open');

  expect(resultado[2][0].status).toBe('open');
  expect(resultado[2][1].status).toBe('open');
  expect(resultado[2][2].status).toBe('open');
});
