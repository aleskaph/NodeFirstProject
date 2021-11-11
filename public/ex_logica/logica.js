// e clicar no botao calcular dobro
function dobro() {
    var num = document.getElementById('numeroDigitado');
    //se digitar o numero na caixa, ou seja, se conteudo do imput for diferente de vazio
    if (num.value != "")  {
         //vai aparecer o dobro do numero digitado no corpo do documento 
         num.value = num.value  * 2;
    }
}
    
function quadrado() {
    var  num2 = document.getElementById('numeroQuadrado');  
    if (num2.value != "")  {

        num2.value = num2.value * num2.value;
    }    
}

function cubo() {
    var  num3 = document.getElementById('numeroCubo');  
    if (num3.value != "")  {
        num3.value = num3.value * num3.value * num3.value;
    }    
}

function potencia() {
    var  num3 = document.getElementById('numeroElevado');  
    var  pot = document.getElementById('potencia');  
    if (num3.value != "")  {
        num3.value = Math.pow(num3.value, pot.value);
    }    
}