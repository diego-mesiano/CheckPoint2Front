// INPUTS
const dataCriacao = document.getElementById("dataCriacao");
const dataLimite = document.getElementById("dataLimite");
const descricao = document.getElementById("descricao");

let date = new Date();
let mes = date.getMonth() + 1;
let dia = date.getDate();
let ano = date.getFullYear();

if(mes < 10) {
  mes = '0' + mes;
}

let dataDoDia = dia + '/' + mes + "/" + ano;
let dataFormatoAmericano = ano + '-' + mes + "-" + dia;
dataCriacao.value = dataDoDia;
dataLimite.setAttribute("min", dataFormatoAmericano);

dataLimite.addEventListener("blur", () => validarCampoVazio(dataLimite));
descricao.addEventListener("blur", () => {
  let campo = validarCampoVazio(descricao);
  if(!campo) {
    validarTamanhoCampo(descricao);
  }
});

function validarTamanhoCampo(input) {
  let erros = false;
  if(input.value.length <= 10) {
    input.style.borderColor = "red";
    input.nextElementSibling.innerHTML = "Este campo precisa ter mais de 10 caracteres";
    erros = true;
  } else {
    input.style.borderColor = "green";
    input.nextElementSibling.innerHTML = "";
  }

  return erros;
}

function validarCampoVazio(input) {
  let erros = false;
  if(input.value == "" || input.value === null) {
    input.style.borderColor = "red";
    input.nextElementSibling.innerHTML = "Por favor, preencha este campo!";
    erros = true;
  } else {
    input.style.borderColor = "green";
    input.nextElementSibling.innerHTML = "";
  }

  return erros;
}

function validarFormulario() {
  let erros = false;
  let inputs = document.getElementsByName("inputs-criar-card");
  
  // VALIDAR O CAMPO VAZIO
  for(input of inputs) {
    let resposta = validarCampoVazio(input);
    if(resposta) erros = true;
  }

  // VALIDAR O TAMANHO DO CAMPO
  if(!erros) {
    for(input of inputs) {
      if(input.id == "descricao") {
        let resposta = validarTamanhoCampo(input);
        if(resposta) erros = true;
      }
    }
  }

  if(erros) return;
  
  // AQUI É SO CHAMAR A FUNÇÃO PARA CRIAR O CARD
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validarFormulario();
})


var tarefaDiv=document.getElementById(`tarefas-div`)

var addTarefa=document.getElementById('add-tarefa')

addTarefa.addEventListener('click',(e)=>{
  e.preventDefault();

  let ul=document.createElement('ul')
  ul.setAttribute('id','tarefas-pendentes')

  let li=document.createElement('li')
  li.setAttribute('id','tarefa')
 
  let divLi=document.createElement('div')
  divLi.setAttribute('id','descricao')

  let pNome=document.createElement('p')
  pNome.setAttribute('id', 'nome')
  let pNomeText=document.createTextNode('Minha tarefa')
  pNome.appendChild(pNomeText)
  
  let pTime=document.createElement('p')
  pTime.setAttribute('id', 'timestamp')
  let pTimeText=document.createTextNode(dataCriacao.value)
  pTime.appendChild(pTimeText)

  ul.appendChild(li)
  li.appendChild(divLi)
  divLi.appendChild(pNome)
  divLi.appendChild(pTime)

  tarefaDiv.appendChild(ul)
})




