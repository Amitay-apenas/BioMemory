const card = document.querySelectorAll('.cards');
const contentElements = document.querySelectorAll(".content");
const body_background = document.querySelector('body');
const main_background = document.querySelector('main');
const svgIndex = '<img class = "mathIcon"src="./img/mathmemory.svg" alt="mathmemory">';
const cardArrayOriginal = [
    { conta: '10/30', resultado: '1/3' },
    { conta: '15/60', resultado: '1/4' },
    { conta: '50/150', resultado: '0.33...' },
    { conta: '1/2', resultado: '0.5' },
    { conta: '0.85', resultado: '85%' },
    { conta: '0.7', resultado: '70%' },
    { conta: '25/125', resultado: '1/5' },
    { conta: '1/ 5', resultado: '0.2' },
    { conta: '0.934', resultado: '93%' },
    { conta: '100%', resultado: '1.0' }
];

let cardArray = [];

cardArrayOriginal.forEach(par => {
    cardArray.push(par.conta);
    cardArray.push(par.resultado);
});

let primeiroCardClicado = null;
let valorPrimeiroCard = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(cardArray);

if (card.length < cardArray.length) {
    console.error("have more cards than cardArray");
}

function verificarQuantidadeRight() {
    const elementosRight = document.querySelectorAll('.right');
    const quantidadeRight = elementosRight.length;

    console.log(`Quantidade de elementos com a classe "right": ${quantidadeRight}`);

    if (quantidadeRight >= 20) {
        body_background.style.backgroundColor = 'hsl(194, 95.30%, 75.10%)';
        main_background.style.backgroundColor = 'hsl(225, 100.00%, 81.40%)';
        main_background.style.outline = '4px solid hsl(225, 100.00%, 81.40%)'
    }
}

card.forEach((cardElement, index) => {
    const contentDoCard = cardElement.querySelector('.content');
    if (contentDoCard) {
        contentDoCard.innerHTML = svgIndex;
    }

    cardElement.addEventListener('click', () => {
        if (cardElement.classList.contains('activate') || cardElement.classList.contains('right')) {
            return;
        }

        cardElement.classList.add('activate');

        if (contentDoCard) {
            contentDoCard.textContent = cardArray[index];
            console.log(`Conteúdo do card ${index + 1} alterado para: ${cardArray[index]}`);
        }

        if (primeiroCardClicado === null) {
            primeiroCardClicado = cardElement;
            valorPrimeiroCard = cardArray[index];
            console.log("Primeiro card clicado:", valorPrimeiroCard);
        } else if (cardElement !== primeiroCardClicado) {
            const valorSegundoCard = cardArray[index];
            console.log("Segundo card clicado:", valorSegundoCard);

            const parCorreto = cardArrayOriginal.find(par =>
                (par.conta === valorPrimeiroCard && par.resultado === valorSegundoCard) ||
                (par.resultado === valorPrimeiroCard && par.conta === valorSegundoCard)
            );

            if (parCorreto) {
                console.log("Você encontrou um par correto!");
                setTimeout(() => {
                    cardElement.classList.add('right');
                    primeiroCardClicado.classList.add('right');
                    primeiroCardClicado = null;
                    valorPrimeiroCard = null;
                    verificarQuantidadeRight();
                }, 1000);
            } else {
                console.log("Os cards não formam um par.");
                setTimeout(() => {
                    cardElement.classList.remove('activate');
                    primeiroCardClicado.classList.remove('activate');

                    const contentPrimeiroCard = primeiroCardClicado.querySelector('.content');
                    const contentSegundoCard = cardElement.querySelector('.content');

                    if (contentPrimeiroCard) {
                        contentPrimeiroCard.innerHTML = svgIndex;
                    }
                    if (contentSegundoCard) {
                        contentSegundoCard.innerHTML = svgIndex;
                    }

                    primeiroCardClicado = null;
                    valorPrimeiroCard = null;
                }, 1000);
            }
        }
    });
});

contentElements.forEach(item => {
    item.innerHTML = svgIndex;
});

verificarQuantidadeRight();