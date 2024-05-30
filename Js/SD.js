function speakAfterDelay() {
    setTimeout(function() {
        speak();
    }, 1000);
}
function speak() {
    if ('speechSynthesis' in window) {
        var synthesis = window.speechSynthesis;
        var texto = "Hola, este es el Juego simon en el cual se " +
            "mostraran Patrones de colores y tendras que " +
            "seleccionar los correctos, da clik para comenzar, ¡MUCHA SUERTE!";
        var mensaje = new SpeechSynthesisUtterance(texto);
        synthesis.speak(mensaje);
    } else {
        alert("Lo siento, tu navegador no soporta la síntesis de voz.");
    }
}
document.addEventListener('DOMContentLoaded', speakAfterDelay);

console.log("inicializando archivo");

const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const verde = document.getElementById("verde")
const naranja = document.getElementById("naranja")
const ULTIMO_NIVEL = 5;

class Juego {
    constructor() {
        /*Ejecutando mis metodos*/
        this.inicializar()
        this.generarSecuencia()
        /*Esperando 1.5 segundos antes de ejecutar this.siguienteNivel */
        setTimeout(() => this.siguienteNivel(), 1500)
    }

    //Metodo que se ejecuta cuando empieza el juego
    inicializar() {
        this.jugador = {
            nombre: "Mildred",
            apellido: "Guerra",
            nivel: "Junior"
        }

        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this)

        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }

        btnEmpezar.classList.toggle('hide')
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.round(Math.random() * 3))
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return "celeste";
            case 1:
                return "violeta";
            case 2:
                return "naranja";
            case 3:
                return "verde";
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case "celeste":
                return 0;
            case "violeta":
                return 1;
            case "naranja":
                return 2;
            case "verde":
                return 3;
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light")
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light")
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener("click", this.elegirColor)
        this.colores.violeta.addEventListener("click", this.elegirColor)
        this.colores.naranja.addEventListener("click", this.elegirColor)
        this.colores.verde.addEventListener("click", this.elegirColor)
    }

    removerEventosClick() {
        this.colores.celeste.removeEventListener("click", this.elegirColor)
        this.colores.violeta.removeEventListener("click", this.elegirColor)
        this.colores.naranja.removeEventListener("click", this.elegirColor)
        this.colores.verde.removeEventListener("click", this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor);

        let turno = this.subnivel + 1

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;

            if (turno === this.nivel) {
                this.nivel++
                this.removerEventosClick()

                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 3000)
                    this.pasasteDeNivel()
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    pasasteDeNivel() {
        swal(` Pasaste de Nivel, genial`, `Ahora da lo mejor de ti, en el nivel ${this.nivel}`, "success")
    }

    ganoElJuego() {
        var backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.pause();
        playWinSound();

        swal({
            title: "¡Felicitaciones!",
            text: "Ganaste el juego",
            icon: "success"
        }).then(() => {
            this.inicializar();
        });
    }

    perdioElJuego() {
        document.getElementById('backgroundMusic').pause();

        swal(`Te equivocaste mi amigo`, `Presta más atención y piensa qué harás diferente la próxima vez`, "error")
            .then(() => {
                this.removerEventosClick();
                this.inicializar();
            });
    }
}

// Iniciar el juego cuando se hace clic en el botón de empezar
function empezarJuego() {
    window.primerJuego = new Juego()
    document.getElementById('backgroundMusic').play();
}

let temaClase = "Simon Dice";
let titulo = document.getElementById("title")
titulo.innerHTML = temaClase;

function playWinSound() {
    const audio = new Audio('img/win-sound.mp3');
    audio.play();
}
