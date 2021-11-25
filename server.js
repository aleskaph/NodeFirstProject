const express = require("express");
const sessions = require("express-session");
const path = require("path");
const bcrypt = require('bcryptjs');
const listaJson = require('./listaCompras.json');
const fs = require("fs");


const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

//habilita o parse dos application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));

app.use(sessions({
  secret: 'PossoColocarer',
  resave: false,
  saveUninitialized: false,
}));



app.get("/", 
    function (req, res) {
        if (req.session.emailLogado) {
            //entra aqui se já tiver logado na sessão
            res.sendFile( __dirname + '/public/lista.html' );
            req.session.save();
        } else {
            //aqui se não tiver logado, então mostra a tela de login
            res.sendFile( __dirname + '/public/index.html' );
        }
    }
);



app.get("/listaJson", (req, res) => {
    if (req.session.emailLogado) {
        res.send(JSON.stringify(listaJson));
    } else {
        res.end();
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});


//var urlencodedParser = express.urlencoded({ extended: false })
app.post('/login', 
    function (requisicao, resposta) {

        if (
            (requisicao.body.email === 'aleskaph@gmail.com' && requisicao.body.senha === '1425') ||
            (requisicao.body.email === 'kadu@cabopec.com.br' && requisicao.body.senha === '1234') ||
            (requisicao.body.email === 'vinickhoff@gmail.com' && requisicao.body.senha === '2243') 
            ) {
                requisicao.session.emailLogado = requisicao.body.email;
                //resposta.send("Olá " + requisicao.body.email + ", seja bem vindo ao nosso site. ");
                resposta.redirect("/");
            } else {
                resposta.send("Usuário/senha inválidos");
            }
            
    }
);


app.get("/calc", (req, res) => {
    res.sendFile(__dirname + "/public/calc.html");
});




app.get("/colorir", (req, res) => {
    res.sendFile(__dirname + "/public/colorir.html");
});




app.get("/novoItem", (req, res) => {
    var maiorId = 0;

    for (var i = 0; i < listaJson.itens.length; i++) {
        if (maiorId < listaJson.itens[i].id) {
            maiorId = listaJson.itens[i].id;
        }
    }

    var dado = {
        id: ++maiorId,
        descricao: req.query.descricao,
        quantidade: req.query.quantidade
    }

    listaJson.itens.push(dado);
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});

app.get("/removeItem", (req, res) => {
    var itens = listaJson.itens;
    var novosItens = [];
    for (let index = 0; index < itens.length; index++) {
        if (itens[index].id != req.query.id) {
            novosItens.push(itens[index]);
        }
        
    }
    listaJson.itens = novosItens;
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});

app.get("/addQtd", (req, res) => {
    var itens = listaJson.itens;
    for (let index = 0; index < itens.length; index++) {
        if (itens[index].id == req.query.id) {
            itens[index].quantidade++;
        }         
    }
    listaJson.itens = itens;
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});

app.get("/remQtd", (req, res) => {
    var itens = listaJson.itens;
    for (let index = 0; index < itens.length; index++) {
        if (itens[index].id == req.query.id) {
            itens[index].quantidade--;
        }         
    }
    listaJson.itens = itens;
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});











app.get("/ex1", (req, res) => {
    res.sendFile( __dirname + "/public/exercicio1.html")
});


app.get("/ex2", (req, res) => {
    res.sendFile( __dirname + "/public/exercicio2.html")
});


app.get("/ex3", (req, res) => {
    res.sendFile( __dirname + "/public/exercicio3.html")
});



app.get("/ex4", (req, res) => {
    res.sendFile( __dirname + "/public/exercicio4.html")
});


app.get("/ex5", (req, res) => {
    res.sendFile( __dirname + "/public/exercicio5.html")
});


app.get("/game", (req, res) => {
    res.sendFile( __dirname + "/public/roubamao.html");
});


app.get("/logica", (req, res) => {
    res.sendFile( __dirname + "/public/ex_logica/logica.html");
});


app.get("/logica2", (req, res) => {
    res.sendFile( __dirname + "/public/ex_logica2/logica2.html");
});


app.get("/logica3", (req, res) => {
    res.sendFile( __dirname + "/public/ex_logica3/logica3.html");
});


app.get("/atendimento", (req, res) => {
    res.sendFile( __dirname + "/public/restaurante/atendimento/atendimento.html");
});

app.get("/restaurante", (req, res) => {
    res.sendFile( __dirname + "/public/restaurante/index.html");
});


app.get("/cardapio", (req, res) => {
    res.sendFile( __dirname + "/public/restaurante/cardapio/configurar.html");
});

app.post("/cardapio", (req, res) => {
    const listCardapio = require('./public/restaurante/cardapio/cardapio.json');

    var valorDigitado = req.body.valor;
    valorDigitado = parseFloat(valorDigitado.replace("," , "."));
    
    var codigoDigitado = parseInt(req.body.codigo);

    //verifica se o código digitado já existe dentro da lista do cardápio
    var flagAchou = false;

    if (req.body.descricao === "apagaresseitem") {
        for (let index = 0; index < listCardapio.length; index++) {
            //achou o produto com o codigo digitado
            if (listCardapio[index].codigo === codigoDigitado) {
                listCardapio.splice(index, 1);
            }
        }
    } else {
        for (let index = 0; index < listCardapio.length; index++) {
            if (listCardapio[index].codigo === codigoDigitado) {
                //achou o produto com o codigo digitado
                flagAchou = true;
                //edita os dados
                listCardapio[index].categoria = req.body.categoria;
                listCardapio[index].descricao = req.body.descricao;
                listCardapio[index].valor = valorDigitado;
            } 
        }

        if (flagAchou === false) {
            listCardapio.push({ codigo: codigoDigitado, categoria: req.body.categoria, descricao: req.body.descricao, valor: valorDigitado });
        }
    }
    
    fs.writeFile("./public/restaurante/cardapio/cardapio.json", JSON.stringify(listCardapio), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.sendFile( __dirname + "/public/restaurante/cardapio/configurar.html");
});























app.listen(48082, () => {
    console.log("o servidor está rodando...");
});




