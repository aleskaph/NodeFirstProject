var totalPedido = 0;
var produto = (a, b, c) => {
    return {
        codigo: a,
        descricao: b,
        valor: c,
        preco: c.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
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
cardapio.push(produto(108, "X-Salada", 6.75));

escreveCardapio();

var pedido = [];
var linha = 0;

function escreveCardapio() {
    //cardapio tem o tbody
    var tbodyCardapio = document.getElementById("cardapio");
    var tr;
    var td;
    for (let index = 0; index < cardapio.length; index++) {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = cardapio[index].codigo + " " + '<button onclick="addCod(' + cardapio[index].codigo + ')"><i class="bi bi-cart-plus"></i></button>';
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = cardapio[index].descricao;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = cardapio[index].preco;
        tr.appendChild(td);
        tbodyCardapio.appendChild(tr);
    }

}

function listarPedido() {
    totalPedido = 0;
    //var elemList = "<ol></ol>";
    var elemList = document.createElement("ol");

    //var itemList = "<ol>";
    for (let index = 0; index < pedido.length; index++) {
        var li = document.createElement("li");
        li.innerHTML = '<button onclick="remove(' + index + ')"><i class="bi bi-trash"></i></button>' + "<b> Cód: </b>" + pedido[index].codigo +  " <b> Item: </b> " + pedido[index].descricao + "  " + pedido[index].preco + "<br>";
        elemList.appendChild(li);
        //itemList = itemList + '<li> <button onclick="remove(' + index + ')">-</button>' + "<b> Cód: </b>" + pedido[index].codigo +  " <b> Item: </b> " + pedido[index].descricao + "  <b> R$ </b> " + pedido[index].valor + "<br> </li>";        
        totalPedido = totalPedido + pedido[index].valor;
    }
    //itemList = itemList + '</ol>';
    return elemList;
}

function mostraNaTela() {
    var elementoDivPedido = document.getElementById("detalhesPedido");
    var elementoDivTotal = document.getElementById("totalPedido");
    var elementoCod = document.getElementById("numItem");

    elementoDivPedido.innerHTML = listarPedido().outerHTML;
    elementoDivTotal.innerHTML = "<br><b>O total do pedido é: " + totalPedido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "</b>";
    elementoCod.value = "";
}

function addCod(codigo) {
    pedido.push(cardapio[codigo-100]);
    //valor do item recebe valor do produto
    mostraNaTela();
}

function remove(indice) {
    pedido.splice(indice, 1);
    
    mostraNaTela();
}