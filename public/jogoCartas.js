//variaveis
var elem_maoJogador1 = document.getElementById("maoJogador1");
var elem_maoJogador2 = document.getElementById("maoJogador2");
var elem_descarte = document.getElementById("descarte");
var elem_rodada = document.getElementById("rodada");
var elem_mostravez = document.getElementById("vez");
var descarte;

window.addEventListener("keydown", (evento) => {
    if (evento.key === "a") {
        jogarcarta1();
    } else if (evento.key === "l") {
        jogarcarta2();
    } else if (evento.key === "s") {
        baterjogador1();
    } else if (evento.key === "k") {
        baterjogador2();
    }
});

var rodada = 0;
var baralho = [];
var baralhoDuplo = [];
var baralhodojogador1;
var baralhodojogador2;
var vez = 1;

//fim da ciriação das variaveis

var carta = (v, n) => ({
    valor: v,
    naipe: n                
});


criaCartas();

baralhoDuplo.push(...baralho);
baralhoDuplo.push(...baralho);


//console.log(baralho)
embaralhar();
baralhodojogador1 = baralhoDuplo.slice(0,52);
baralhodojogador2 = baralhoDuplo.slice(52,104);

atualizaQtdCartas();

function iniciarPartida() {
    embaralhar();
    baralhodojogador1 = baralhoDuplo.slice(0,52);
    baralhodojogador2 = baralhoDuplo.slice(52,104);
    atualizaQtdCartas();
    rodada = 0;
    vez = 1;
    elem_descarte.innerHTML = "";
    elem_rodada.innerHTML = "0";
    elem_mostravez.innerHTML = "Vez do jogador 1";
}

function baterjogador1() {
    if (vez != 0) {
        if (rodada === descarte.valor) {
            elem_mostravez.innerHTML = "Vencedor Jogador 1";
        } else {
            elem_mostravez.innerHTML = "Jogador 1 perdeu";
        }
        vez = 0;
    }
}

function baterjogador2() {
    if (vez != 0) {
        if (rodada === descarte.valor) {
            elem_mostravez.innerHTML = "Vencedor Jogador 2";
        } else {
            elem_mostravez.innerHTML = "Jogador 2 perdeu";
        }
        vez = 0;
    }
}

function atualizaQtdCartas() {
    elem_maoJogador1.innerHTML = (baralhodojogador1.length) + " cartas";
    elem_maoJogador2.innerHTML = (baralhodojogador2.length) + " cartas";
}
function mostradescarte() {
    if (descarte.valor == 1) {
        elem_descarte.innerHTML = "<b>A</b>";
    } else if (descarte.valor == 11) {
        elem_descarte.innerHTML = "<b>J</b>";
    } else if (descarte.valor == 12) {
        elem_descarte.innerHTML = "<b>Q</b>";
    } else if (descarte.valor == 13) {
        elem_descarte.innerHTML = "<b>K</b>";
    } else {
        elem_descarte.innerHTML = "<b>" + descarte.valor + "</b>";
    }
    if (descarte.naipe == "copas") {
        elem_descarte.innerHTML = elem_descarte.innerHTML + '<center><img width="60px" src="/public/assets/images/baralho/copas.svg" alt=""></img></center>';
    } else if(descarte.naipe == "ouros") {
        elem_descarte.innerHTML = elem_descarte.innerHTML + '<center><img width="60px" src="/public/assets/images/baralho/ouros.svg" alt=""></img></center>';
    } else if(descarte.naipe == "espadas") {
        elem_descarte.innerHTML = elem_descarte.innerHTML + '<center><img width="60px" src="/public/assets/images/baralho/espadas.svg" alt=""></img></center>';
    } else if(descarte.naipe == "paus") {
        elem_descarte.innerHTML = elem_descarte.innerHTML + '<center><img width="60px" src="/public/assets/images/baralho/paus.svg" alt=""></img></center>';
    } else {
        elem_descarte.innerHTML = '';
    }
} 

function jogarcarta1() {
    if (vez == 1) {
        if (baralhodojogador1.length > 0) {
            descarte = baralhodojogador1.pop();
            mostradescarte();
            atualizaQtdCartas();
            atualizarRodada();
        } else {
            vez = 0; 
            elem_mostravez.innerHTML = "Não houve vencedor";
        }
    }
} 

function jogarcarta2() {
    if (vez == 2) {
        if (baralhodojogador2.length > 0) {
            descarte = baralhodojogador2.pop();
            mostradescarte();
            atualizaQtdCartas();
            atualizarRodada();
        } else {
            vez = 0; 
            elem_mostravez.innerHTML = "Não houve vencedor";
        }
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
    baralhoDuplo.sort((a,b) => (Math.random() - 0.5));
}

function criaCartas() {
    for (let i = 1; i <= 13; i++) {
        baralho.push(carta(i,"copas"));
        baralho.push(carta(i,"ouros"));
        baralho.push(carta(i,"paus"));
        baralho.push(carta(i,"espadas"));
    }
}