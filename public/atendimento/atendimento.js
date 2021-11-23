var totalMesa = [];
var produto = (cod, desc, val) => {
    return {
        codigo: cod,
        descricao: desc,
        valor: val
    }
}
var cardapio = [];
cardapio.push(produto(100, "Refrigerante Coca Cola 355ml", 3.50));
cardapio.push(produto(101, "Refrigerante Fanta 355ml", 2.50));
cardapio.push(produto(102, "X-Burger", 6.00));
cardapio.push(produto(103, "X-Egg", 7.50));
cardapio.push(produto(104, "Cachorro Quente", 4.50));
cardapio.push(produto(105, "Pudim de Leite", 3.50));
cardapio.push(produto(106, "Sagu", 2.00));
cardapio.push(produto(107, "Cachorro Quente Duplo", 6.00));
cardapio.push(produto(108, "Batatas Fritas", 5.00));

var mesas = [];

var idUnico = 0;
var mesaAtual = 0;


imprimeCardapioCompleto();

function selecionaMesa(m) {
    //mesa selecionada é passada pelo parametro
    mesaAtual = m;
    if (mesas[mesaAtual]) {

    } else {
        mesas[mesaAtual] = [];
        totalMesa[mesaAtual] = 0;
    }
    mostraNaTela();
    document.getElementById("tituloMesaAtual").innerHTML = "Pedido da Mesa " + m;
}

function listaPedidoMesa() {
    var liElem = '';
    for (let index = 0; index < mesas[mesaAtual].length; index++) {
        liElem = liElem + '<li> <button class="btn btn-outline-danger mb-2" id="'+idUnico+'" onclick="remove(' + index + ')"><i class="bi bi-trash"></i></button>' + "<b> Cód: </b>" + mesas[mesaAtual][index].codigo +  " <b> Item: </b> " + mesas[mesaAtual][index].descricao + "   " + mesas[mesaAtual][index].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "</li>";
        idUnico = idUnico + 1;
    }
    
    return liElem;
}

function addCod(codigo) {
    //se não estiver selecionada a mesa
    if (mesaAtual == 0) {
        //alerta o usuário que ele deve selecionar uma mesa
        window.alert("Favor selecionar uma mesa antes");
    } else {
        mesas[mesaAtual].push(cardapio[codigo -100]);//(codItem, descItem, valorItem);
        totalMesa[mesaAtual] = totalMesa[mesaAtual] + cardapio[codigo -100].valor;
        mostraNaTela();
    }
}

function remove(id) {//id tem numer 8
    //remove da mesa o indice passado no parametro
    totalMesa[mesaAtual] = totalMesa[mesaAtual] - mesas[mesaAtual][id].valor;
    mesas[mesaAtual].splice(id,1);
    mostraNaTela();
}

function mostraNaTela() {
    var elementoDivPedido = document.getElementById("detalhesPedido");
    var elementoDivTotal = document.getElementById("totalPedido");

    elementoDivPedido.innerHTML = listaPedidoMesa();
    elementoDivTotal.innerHTML = "<b>O total do pedido é: " + totalMesa[mesaAtual].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "</b>";
}

function imprimeCardapioCompleto() {
    var linhaDaTabela = '';
    for (let index = 0; index < cardapio.length; index++) {
        linhaDaTabela = linhaDaTabela + '<tr>' + '<td>' + cardapio[index].codigo + ' <button class="btn btn-outline-info" onclick="addCod(' + cardapio[index].codigo + ')"><i class="bi bi-cart-plus"></i></button>' + '</td>' + '<td>' + cardapio[index].descricao + '</td>' + '<td>' + cardapio[index].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td>' + '</tr>';
    }

    //dentro do tbody escreve a linha criada acima
    var tabelaCardapio = document.getElementById("cardapio");
    tabelaCardapio.innerHTML = linhaDaTabela;
}