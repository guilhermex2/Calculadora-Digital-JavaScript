const display = document.querySelector('.area-resultado')
const numeros = document.querySelectorAll('[id*=tecla]') //Qualquer elemento que tenha tecla no nome do id
const operadores = document.querySelectorAll('[id*=operador]') 
let novoNumero = true
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined

//Logica dos calculos
const calcular = () => {
    if(operacaoPendente()){
        numeroAtual = parseFloat(display.textContent);
        novoNumero = true
        if(operador == '+'){
            atualizaDisplay(numeroAnterior + numeroAtual)
        } else if(operador == '-'){
            atualizaDisplay(numeroAnterior - numeroAtual)
        } else if(operador == '*'){
            atualizaDisplay(numeroAnterior * numeroAtual)
        } else if(operador == '/'){
            atualizaDisplay(numeroAnterior / numeroAtual)
        }
    }
}

//Atualiza o display
const atualizaDisplay = (texto) => {
    if (novoNumero){ //Se for um novo numero
        display.textContent = texto; //Adiciona o novo numero
        novoNumero = false //Deixa de ser novo numero, e irá cair no else
    } else {
        display.textContent += texto; //Concatena os numeros
    }
    
} 

//Mandando numero pra o display
const inserirNumero = (evento) => atualizaDisplay(evento.target.textContent)

//Criando evento para cada numero
numeros.forEach(numero => 
    numero.addEventListener('click', inserirNumero)
)

//Logica dos operadores
const selecionarOperador = (evento) => {
    if(!novoNumero){ //Se não for um novo numero
        calcular()
        novoNumero = true //Ao clicar no operador, limpa o display e passa a ser um novo numero
        operador = evento.target.textContent //Recebe o operador
        numeroAnterior = parseFloat(display.textContent) //Recebe os numeros anteriores apos limpar o display
    }
}

//Evento dos operadores
operadores.forEach(operador => 
    operador.addEventListener('click', selecionarOperador)
)

//Botão =
ativarIgual = () =>{
    calcular()
    operador = undefined
}
document.querySelector('.igual').addEventListener('click', ativarIgual)

//Botão C
const limparDisplay = () => display.textContent = ''
document.querySelector('.ce').addEventListener('click', limparDisplay)

//Botão CE
const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    novoNumero = true
    numeroAnterior = undefined
}
document.querySelector('.c').addEventListener('click', limparCalculo)

//Decimal '.'
const Decimal = () => display.textContent.indexOf('.') != -1;
const Valor = () => display.textContent.length > 0;

const inserirPonto = () => {
    if(!Decimal()){
        if(Valor()){
            atualizaDisplay('.')
        }else {
            atualizaDisplay('0.')
        }
    }
}
document.querySelector('.ponto').addEventListener('click', inserirPonto)