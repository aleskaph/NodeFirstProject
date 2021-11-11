//variaveis
var elem_maoJogador1 = document.getElementById("maoJogador1");
var elem_maoJogador2 = document.getElementById("maoJogador2");
var elem_descarte = document.getElementById("descarte");
var elem_rodada = document.getElementById("rodada");
var elem_mostravez = document.getElementById("vez");

var rodada = 0;
var baralho = [];
var baralhodojogador1;
var baralhodojogador2;
var vez = 1;

//fim da ciriação das variaveis

var carta = (v, n) => ({
    valor: v,
    naipe: n                
});

criaCartas();
        
//console.log(baralho)
embaralhar();
baralhodojogador1 = [...baralho];
embaralhar();
baralhodojogador2 = [...baralho];

atualizaQtdCartas();


//maoJogador1.innerHTML = baralho.valor + baralho.naipe;
function atualizaQtdCartas() {
    elem_maoJogador1.innerHTML = (baralhodojogador1.length) + " cartas";
    elem_maoJogador2.innerHTML = (baralhodojogador2.length) + " cartas";
}

function jogarcarta1() {
    if (vez == 1) {
        var mao = baralhodojogador1.pop();
        elem_descarte.innerHTML = mao.naipe + ' ' + mao.valor;
        atualizaQtdCartas();
        atualizarRodada();
    }
} 

function jogarcarta2() {
    if (vez == 2) {
        var mao = baralhodojogador2.pop();
        elem_descarte.innerHTML = mao.naipe + ' ' + mao.valor;
        atualizaQtdCartas();
        atualizarRodada();
    }
}

function atualizarRodada() {
    rodada++;
    if (rodada == 14) {
        rodada = 1;
    }
    elem_rodada.innerHTML = rodada;
    mudaVez();
}

function mudaVez() {
    if (vez == 2) {
        elem_mostravez.innerHTML = "Vez do jogador 1";
        vez = 1;
    } else if (vez == 1) {
        elem_mostravez.innerHTML = "Vez do jogador 2";
        vez = 2;
    }

}

function embaralhar() {
    baralho.sort((a,b) => (Math.random() - 0.5));
}

function criaCartas() {
    for (let i = 1; i <= 13; i++) {
        baralho.push(carta(i,"copas"));
        baralho.push(carta(i,"ouros"));
        baralho.push(carta(i,"paus"));
        baralho.push(carta(i,"espadas"));
    }
}