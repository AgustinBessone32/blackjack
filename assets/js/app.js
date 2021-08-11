
(() => {
    //'use strict'


    //variables
    let deck = []
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K']
    let puntosJugador = 0
    let puntosComputadora = 0
    let puntosGlobales = [0,0]

    //Referencias HTML

    const btnPedir = document.querySelector('#btn-pedir')
    const btnDetener = document.querySelector('#btn-detener')
    const btnNuevo = document.querySelector('#btn-nuevo')
    const puntosHTML = document.querySelectorAll('small')
    const puntosHTMLGlobales = document.querySelectorAll('b')
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')
    const h1Jugador = document.querySelector('#jugador-nombre')
    const resultadoGlobal = document.querySelector('#resultado-global')


    const inicializarJuego = () => {
        deck = crearDeck()
    }


    //funcion que crea baraja
    const crearDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (especial of especiales) {
                deck.push(especial + tipo)
            }
        }

        return _.shuffle(deck)
    }




    //pedir carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            alert('Debes inicializar el juego!!')
            throw 'No hay cartas en la baraja;'
        }

        return deck.pop()

    }

    // determina el valor de cada carta

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1)

        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1
    }

    //turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta()

            puntosComputadora = puntosComputadora + valorCarta(carta)

            puntosHTML[1].innerHTML = puntosComputadora

            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta')
            divCartasComputadora.append(imgCarta)

            if (puntosMinimos > 21) {
                break
            }

        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)


        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(')
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
                puntosGlobales[1]++
                puntosHTMLGlobales[1].innerHTML = puntosGlobales[1]
            } else if (puntosComputadora > 21) {
                alert('Jugador gana!!')
                puntosGlobales[0]++
                puntosHTMLGlobales[0].innerHTML = puntosGlobales[0]
            } else {
                alert('Computadora gana')
                puntosGlobales[1]++
                puntosHTMLGlobales[1].innerHTML = puntosGlobales[1]
            }

        }, 100)

    }


    //Eventos

    btnPedir.addEventListener('click', function () {
        const carta = pedirCarta()

        puntosJugador = puntosJugador + valorCarta(carta)

        puntosHTML[0].innerHTML = puntosJugador

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)

        if (puntosJugador > 21) {
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }

    })


    btnDetener.addEventListener('click', function () {
        btnPedir.disabled = true
        btnDetener.disabled = true

        turnoComputadora(puntosJugador)
    })


    btnNuevo.addEventListener('click', function () {
        resultadoGlobal.style.display = 'block'
        puntosHTMLGlobales[0].innerHTML = puntosGlobales[0]
        puntosHTMLGlobales[1].innerHTML = puntosGlobales[1]
        inicializarJuego()
        puntosComputadora = 0
        puntosJugador = 0
        puntosHTML[0].innerText = 0
        puntosHTML[1].innerText = 0

        divCartasComputadora.innerHTML = ''
        divCartasJugador.innerHTML = ''

        btnPedir.disabled = false
        btnDetener.disabled = false
    })

})()

