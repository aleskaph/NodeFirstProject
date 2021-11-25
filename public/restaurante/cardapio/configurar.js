var cardapio = [];
cardapio = leArquivo('/public/restaurante/cardapio/cardapio.json');
function leArquivo(arquivo) {
    var request = new XMLHttpRequest();
    request.open("GET", arquivo, false);
    request.send();
    return JSON.parse(request.responseText);
 }
 var tabelaCardapio = document.getElementById("cardapio");
 imprimeCardapioCompleto();

 function imprimeCardapioCompleto() {
    var linhaDaTabela = '';
    for (let index = 0; index < cardapio.length; index++) {
        linhaDaTabela = linhaDaTabela + '<tr>' + '<td>' + cardapio[index].codigo + ' <button class="btn btn-outline-info" onclick="editaItem(' + cardapio[index].codigo + ',\'' + cardapio[index].categoria + '\',\'' + cardapio[index].descricao + '\', ' + cardapio[index].valor + ')"><i class="bi bi-pencil-square"></i></button>' + '</td>' + '<td>' + cardapio[index].categoria + '</td>' + '<td>' + cardapio[index].descricao + '</td>' + '<td>' + cardapio[index].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td>' + '</tr>';
    }

    //dentro do tbody escreve a linha criada acima
    var tabelaCardapio = document.getElementById("cardapio");
    tabelaCardapio.innerHTML = linhaDaTabela;
}

function editaItem(codigo, categoria, descricao, valor) {
    document.getElementById("codigo").value = codigo;
    document.getElementById("categoria").value = categoria;
    document.getElementById("descricao").value = descricao;
    document.getElementById("valor").value = valor;
}

function apagar() {
    if (confirm("Deseja realmente apagar esse Ítem?")) {
        var form = document.getElementById("formItem");
        document.getElementById("descricao").value = "apagaresseitem";
        form.submit();
    }
}