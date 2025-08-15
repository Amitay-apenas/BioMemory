const grid = document.querySelector(".game-board");
const acertosSpan = document.querySelector(".acertos");
let acertos = 0;

// Dados das cartas (Pai e Filho)
const cardData = [
  { id: 1, type: "pai", src: "./imagem/sementes/A-Vv Vv.jpg" },
  { id: 1, type: "filho", src: "./imagem/sementes/A-Vv Vv.jpg" },
  { id: 2, type: "pai", src: "./imagem/sementes/AV-Vvvv.jpg" },
  { id: 2, type: "filho", src: "./imagem/sementes/AV-Vvvv.jpg" },
  { id: 3, type: "pai", src: "./imagem/sementes/A-VVVv.jpg" },
  { id: 3, type: "filho", src: "./imagem/sementes/A-VVVv.jpg" },
  { id: 4, type: "pai", src: "./imagem/sementes/A-VV vv.jpg" },
  { id: 4, type: "filho", src: "./imagem/sementes/A-VV vv.jpg" },
  // Adicione mais pares de cartas aqui
];

let firstCard = "";
let secondCard = "";
let flippedCards = 0;

// Função para verificar se as duas cartas viradas formam um par
const checkMatch = () => {
  const firstCardDataSrc = firstCard.getAttribute("data-src");
  const secondCardDataSrc = secondCard.getAttribute("data-src");

  // Encontra os objetos correspondentes aos src das cartas
  const firstCardData = cardData.find((card) => card.src === firstCardDataSrc);
  const secondCardData = cardData.find(
    (card) => card.src === secondCardDataSrc
  );

  if (firstCardData && secondCardData) {
    // Verifica se os IDs são iguais e os tipos são diferentes (Pai vs Filho)
    if (
      firstCardData.id === secondCardData.id &&
      firstCardData.type !== secondCardData.type
    ) {
      disableCards();
      acertos++;
      acertosSpan.textContent = acertos;
    } else {
      unflipCards();
    }
  } else {
    unflipCards();
  }
};

// Desabilita as cartas que formam um par
const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // Adiciona uma classe para indicar que as cartas foram pareadas
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();
};

// Vira as cartas de volta se não formam um par
const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
};

// Reseta o estado do jogo para a próxima jogada
const resetBoard = () => {
  firstCard = null;
  secondCard = null;
};

// Função para virar uma carta ao ser clicada
const flipCard = ({ target }) => {
  if (firstCard && secondCard) {
    return; // Impede que mais de duas cartas sejam viradas
  }

  const cardElement = target.closest(".card");
  if (
    !cardElement ||
    cardElement.classList.contains("flip") ||
    cardElement.classList.contains("matched")
  ) {
    return;
  }

  cardElement.classList.add("flip");

  if (!firstCard) {
    firstCard = cardElement;
  } else {
    secondCard = cardElement;
    checkMatch();
  }
};

// Função para criar um elemento de carta
const createCardElement = (card) => {
  const divCard = document.createElement("div");
  const divFront = document.createElement("div");
  const divBack = document.createElement("div");

  divCard.classList.add("card");
  divFront.classList.add("card-front"); // Mudado de 'front' para 'card-front'
  divBack.classList.add("card-back");

  divFront.style.backgroundImage = `url('${card.src}')`;

  divCard.setAttribute("data-src", card.src);

  divCard.appendChild(divFront);
  divCard.appendChild(divBack);

  divCard.addEventListener("click", flipCard);

  return divCard;
};

// Função principal para carregar o jogo
const loadGame = () => {
  const allCards = [...cardData, ...cardData]; // Duplica o array para criar os pares

  // Embaralha as cartas
  const shuffledCards = allCards.sort(() => Math.random() - 0.5);

  // Cria os elementos HTML e os adiciona à grade
  shuffledCards.forEach((item) => {
    const card = createCardElement(item);
    grid.appendChild(card);
  });
};

document.addEventListener("DOMContentLoaded", loadGame);
