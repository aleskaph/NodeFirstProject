var totalPedido = 0;
var produto = (a, b, c) => {
    return {
        codigo: a,
        descricao: b,
        valor: c
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

var pedido = [];
var idUnico = 0;

imprimeCardapioCompleto();


function addPedido(seucod, descItem, valorItem) {
    pedido.push(' <button id="'+idUnico+'" onclick="remove(' + idUnico + ')">-</button>' + "<b> Cód: </b>" + seucod +  " <b> Item: </b> " + descItem + "   " + valorItem.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "<br>");
    idUnico = idUnico + 1;
}

function addCod(codigo) {
    //valor do item recebe valor do produto
    var valorItem = cardapio[codigo -100].valor;//4.5
    var seucod = cardapio[codigo -100].codigo;//104
    var descItem = cardapio[codigo -100].descricao;//cachorroquente
    addPedido(seucod, descItem, valorItem);
    totalPedido = totalPedido + valorItem;
    mostraNaTela();
}

function remove(id) {//id tem numer 8
    //remove do pedido o indice passado no parametro
    for (let index = 0; index < pedido.length; index++) {
        if (pedido[index].includes('id="' + id + '"')) {
            //remove essa linha
            pedido.splice(index,1);
        }
    }
    
    mostraNaTela();
}

function mostraNaTela() {
    var elementoDivPedido = document.getElementById("detalhesPedido");
    var elementoDivTotal = document.getElementById("totalPedido");
    var elementoCod = document.getElementById("numItem");

    elementoDivPedido.innerHTML = pedido.join('');
    elementoDivTotal.innerHTML = "<br><b>O total do pedido é: " + totalPedido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "</b>";
    elementoCod.value = "";
}

function imprimeCardapioCompleto() {
    var linhaDaTabela = '';
    for (let index = 0; index < cardapio.length; index++) {
        linhaDaTabela = linhaDaTabela + '<tr>' + '<td>' + cardapio[index].codigo + ' <button onclick="addCod(' + cardapio[index].codigo + ')">+</button>' + '</td>' + '<td>' + cardapio[index].descricao + '</td>' + '<td>' + cardapio[index].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td>' + '</tr>';
    }

    //dentro do tbody escreve a linha criada acima
    var tabelaCardapio = document.getElementById("cardapio");
    tabelaCardapio.innerHTML = linhaDaTabela;
}