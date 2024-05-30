const micBtn = document.getElementById('mic-btn');
const checkBtn = document.getElementById('check-btn');
const problemEl = document.getElementById('problem-text');
const feedbackEl = document.getElementById('feedback');
const answerInput = document.getElementById('answer-input');

const synth = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let currentProblem;
let correctAnswer;

const numberWords = {
    'uno.': 1, 'dos.': 2, 'tres.': 3, 'cuatro.': 4, 'cinco.': 5,
    'seis.': 6, 'siete.': 7, 'ocho.': 8, 'nueve.': 9, 'diez.': 10,
    'once.': 11, 'doce.': 12, 'trece.': 13, 'catorce.': 14, 'quince.': 15,
    'dieciseis.': 16, 'diecisiete.': 17, 'dieciocho.': 18, 'diecinueve.': 19, 'veinte.': 20
};

// Función para convertir texto a número
function textToNumber(text) {
    text = text.toLowerCase().trim();
    return numberWords[text] !== undefined ? numberWords[text] : parseInt(text);
}

// Función para generar un problema de cálculo mental aleatorio
function generateProblem() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';
    if (operator === '-' && num1 < num2) {
        [num1, num2] = [num2, num1];
    }
    correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    currentProblem = `${num1} ${operator === '+' ? 'más' : 'menos'} ${num2}`;
    problemEl.textContent = currentProblem;
    speak(`Por favor, resuelve: ${currentProblem}`);
}

// Función para leer el texto en voz alta
function speak(text) {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = 'es-ES';
    synth.speak(utterThis);
}

// Función para iniciar el juego
function startGame() {
    feedbackEl.textContent = '';
    answerInput.value = '';
    generateProblem();
}

// Función para mostrar las instrucciones y dar la bienvenida
function showInstructions() {
    const instructions = `
        ¡Bienvenido al Juego de Cálculo Mental!
        En este juego, se te presentarán problemas matemáticos simples.
        Para responder, haz clic en el botón de micrófono y di tu respuesta en voz alta.
        Luego haz clic en el botón de calcular para verificar tu respuesta.
        Si es correcta, recibirás un nuevo problema.
        ¡Buena suerte y diviértete!
    `;
    speak(instructions);
}

// Función para manejar el resultado del reconocimiento de voz
function handleResult(event) {
    const transcript = event.results[0][0].transcript;
    answerInput.value = transcript;
}

// Función para verificar la respuesta del usuario
function checkAnswer() {
    const userAnswer = textToNumber(answerInput.value);

    if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = '¡Muy bien, vamos con el siguiente ejercicio!';
            speak('¡Muy bien, vamos con el siguiente ejercicio!');
            setTimeout(startGame, 3000); // Esperar 3 segundos antes de generar un nuevo problema
        } else {
            feedbackEl.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
            speak('Respuesta incorrecta. Inténtalo de nuevo.');
        }
    } else {
        feedbackEl.textContent = 'No se detectó una respuesta válida. Inténtalo de nuevo.';
        speak('No se detectó una respuesta válida. Inténtalo de nuevo.');
    }
}

// Agregar listeners a los eventos
window.addEventListener('load', () => {
    showInstructions();
    startGame();
});

micBtn.addEventListener('click', () => {
    recognition.start();
});

checkBtn.addEventListener('click', checkAnswer);

recognition.addEventListener('result', handleResult);
recognition.addEventListener('end', () => {
    recognition.stop();
});
