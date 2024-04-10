
const valoresConversao = {
    real: {
        euro: 0.19,
        dolar: 0.20,
        simbolo: "R$"
    },
    dolar: {
        real: 4.99,
        euro: 0.92,
        simbolo: "U$"
    },
    euro: {
        real: 5.40,
        dolar: 1.08,
        simbolo: "EU"
    }
}

const botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

const botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

const botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

const botaoAceitaMensagem = document.getElementById("botao-aceita-mensagem");
botaoAceitaMensagem.addEventListener("click", aceitarMensagem);

console.log(localStorage);

if(localStorage.getItem("aceitouCookie") == "Ok, estou de acordo!") {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");
}

let ultimoResultado = "";

const valorEntrada = document.getElementById("valorEntrada");
valorEntrada.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        converter();
    }
});

document.addEventListener("keydown", function(event) { //document quando queremos retirar a função "externa" do comando
    if (event.ctrlKey && event.key === "l") {
        limpar();
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "i") {
        inverter();
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "z") {
        ultimoResultado();
        event.preventDefault();
    }
});

function limpar() {
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = "";

    let valor = document.getElementById("valorEntrada");
}

function inverter() {
    let valorMoeda1 = document.getElementById("moeda1").value;
    let valorMoeda2 = document.getElementById("moeda2").value;

    document.getElementById("moeda1").value = valorMoeda2;
    document.getElementById("moeda2").value = valorMoeda1;
}

function aceitarMensagem() {
    const divMensagemUsuario = document.getElementById("mensagem-usuario");
    divMensagemUsuario.classList.add("oculto")

    localStorage.setItem("aceitouCookie", "Ok, estou de acordo!");
}

function salvarResultadoLocalStorage(resultado) {

}

function converter() {
    let valorUsuario = document.getElementById("valorEntrada").value;

    if(valorUsuario == 0 || valorUsuario == "") {
        alert("Valor Inválido!")
        return;
    }

    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;

    if (moeda1 == moeda2) {
        alert("Moedas iguais!!");
        return;
    }

    let simbolo = valoresConversao[moeda2]["simbolo"];
    //console.log(simbolo);

    let resultado = valorUsuario * valoresConversao[moeda1][moeda2];


    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + resultado.toFixed(2);

    let objetoResultado = {
        valorDoUsuario: valorUsuario,
        valorMoeda1: moeda1,
        valorMoeda2: moeda2,
        valorResultado: resultado
    }
        console.log(objetoResultado);

        //Converter Objeto JS para texto (JSON) antes de abrir no LocalStorage
        localStorage.setItem("historico", objetoResultado)



    // Remover moedas existentes antes de adicionar novas
    const moedasContainer = document.getElementById("moedas");
    moedasContainer.innerHTML = "";

    // Adicionando moedas ao container de acordo com o valor digitado pelo usuário
    const numeroMoedas = Math.min(valorUsuario, 30); // Limitando a um máximo de 1000 moedas
    for (let i = 0; i < numeroMoedas; i++) {
        const moeda = document.createElement("div");
        moeda.classList.add("moeda");
        moeda.style.left = `${Math.random() * 90}%`; // Posicionando aleatoriamente na largura do container
        moeda.textContent = "$"; // Adicionando o cifrão como texto dentro da div
        moeda.style.animationDuration = `${Math.random() * 5 + 3}s`; // Definindo tempos de queda aleatórios
        moedasContainer.appendChild(moeda);

        // Definindo tempo para a animação de retorno
        setTimeout(() => {
            moeda.classList.add("volta");
        }, (Math.random() * 100000) + 10000); // Tempo aleatório entre 5 e 10 segundos
    }
}
