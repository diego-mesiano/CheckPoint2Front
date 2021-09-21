const dataInicial = document.getElementById("dataCriacao")
const dataFinal = document.getElementById("dataLimite")
const descricao = document.getElementById("descricao")

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataAtual = dia + '/' + mes + '/' + ano;
console.log(dataAtual);

dataInicial.value = dataAtual

