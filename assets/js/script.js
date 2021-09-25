//ao carregar a pagina, mostra p local storage
window.onload = function () {
  baixarLocalStorage();
  for (let i = 0; i < tarefasJs.data.length; i++) {
    document.getElementById("tarefas-div").innerHTML += 
    `<ul id="tarefas-pendentes">
       <li id="tarefa">
          <div id="descricao">
            <p id="titulo-conteudo">${tarefasJs.titulo[i]}</p>
            <p id="timestamp">Criado: ${tarefasJs.data[i]}</p>
            <p id="timestamp">Data Limite: ${tarefasJs.limite[i]}</p>`
            
            if (tarefasJs.concluida[i]==1){
              document.getElementById("tarefas-div").innerHTML += 
                `<p id="descricao-conteudo"><s>Descrição:${tarefasJs.descricao[i]}</p></s>`
            } else{
              document.getElementById("tarefas-div").innerHTML += 
                `<p id="descricao-conteudo">Descrição:${tarefasJs.descricao[i]}</p>`
            }
            
            document.getElementById("tarefas-div").innerHTML +=
            `<div class="botoesAcao">
              <a onclick="excluir(${i})">
                <img alt="Excluir Tarefa" src="./assets/img/excluir.png" width="30px">
              </a>
              <a onclick="editar(${i})">
                <img alt="Editar Tarefa" src="./assets/img/editar.png" width="30px">
              </a>
              <a onclick="concluir(${i})">
                <img alt="Concluir Tarefa" src="./assets/img/concluir.png" width="30px">
                </a>
            </div> 
          </div>
        </li>
      </ul>`
  }
}

//variaveis para manipulação do session storage
var tarefasJs = {
  i:[],
  data: [],
  limite: [],
  titulo: [],
  descricao: [],
  concluida: [],
}
var tarefasStr = JSON.stringify(tarefasJs);

//Criando local Storage se não existir
if (!localStorage.getItem("@TAREFAS")) {
  localStorage.setItem("@TAREFAS", tarefasStr);
  console.log("Criado Local Storage")
}

//funções para manipular o local storage
function baixarLocalStorage() {
  tarefasStr = localStorage.getItem("@TAREFAS");
  tarefasJs = JSON.parse(tarefasStr);
  console.log("Local storage baixado, manipule atraves da variavel \"tarefasJS\"");
}

function subirLocalStorage() {
  tarefasStr = JSON.stringify(tarefasJs);
  localStorage.setItem("@TAREFAS", tarefasStr);
  console.log("Subindo Local Storage")
}



// INPUTS
const dataCriacao = document.getElementById("dataCriacao");
const dataLimite = document.getElementById("dataLimite");
const titulo = document.getElementById("titulo-input");
const descricao = document.getElementById("descricao");

//variaveis para receber a data atual
let date = new Date();
let mes = date.getMonth() + 1;
let dia = date.getDate();
let ano = date.getFullYear();

if (mes < 10) {
  mes = '0' + mes;
}

let dataDoDia = dia + '/' + mes + "/" + ano;
let dataFormatoAmericano = ano + '-' + mes + "-" + dia;

//Mostra a data atual no input
dataCriacao.value = dataDoDia;

//validações
//garante que data limite não pode ser menor que a data atual e que não esta vazia
dataLimite.setAttribute("min", dataFormatoAmericano);
dataLimite.addEventListener("blur", () => validarCampoVazio(dataLimite));

//garante que a descrição não seja vazia e com menos de 10 caracteres
descricao.addEventListener("blur", () => {
  let campo = validarCampoVazio(descricao);
  if (!campo) {
    validarTamanhoCampo(descricao);
  }
});

function validarTamanhoCampo(input) {
  let erros = false;
  if (input.value.length <= 10) {
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
  if (input.value == "" || input.value === null) {
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
  for (input of inputs) {
    let resposta = validarCampoVazio(input);
    if (resposta) erros = true;
  }

  // VALIDAR O TAMANHO DO CAMPO
  if (!erros) {
    for (input of inputs) {
      if (input.id == "descricao") {
        let resposta = validarTamanhoCampo(input);
        if (resposta) erros = true;
      }
    }
  }

  if (erros) return;

  // AQUI É SO CHAMAR A FUNÇÃO PARA CRIAR O CARD

  adicionarTarefa()


}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validarFormulario();
})


// 
// function criar objetos da lista
// 

var tarefaDiv = document.getElementById(`tarefas-div`)

var addTarefa = document.getElementById('add-tarefa')

function adicionarTarefa() {

  let ul = document.createElement('ul')
  ul.setAttribute('id', 'tarefas-pendentes')

  let li = document.createElement('li')
  li.setAttribute('id', 'tarefa')

  let divLi = document.createElement('div')
  divLi.setAttribute('id', 'descricao divteste')


  // titulo
  let pTitulo = document.createElement('p')
  pTitulo.setAttribute('id', 'titulo-conteudo')
  let pTituloText = document.createTextNode(titulo.value)
  pTitulo.appendChild(pTituloText)


  // data criacao
  let pTime = document.createElement('p')
  pTime.setAttribute('id', 'timestamp')
  let pTimeText = document.createTextNode("Criado: " + dataCriacao.value)
  pTime.appendChild(pTimeText)



  // data limite
  const [ano, mes, dia] = dataLimite.value.split("-")

  const dataLimiteFormatada = dia + '/' + mes + '/' + ano

  let pTimeNew = document.createElement('p')
  pTimeNew.setAttribute('id', 'timestamp')
  let pTimeNewText = document.createTextNode("Data Limite: " + dataLimiteFormatada)
  pTimeNew.appendChild(pTimeNewText)


  // conteudo
  let descricaoInput = document.createElement('p')
  descricaoInput.setAttribute('id', 'descricao-conteudo')
  let descricaoText = document.createTextNode("Descrição: " + descricao.value)
  descricaoInput.appendChild(descricaoText)

  
  
  ul.appendChild(li)
  li.appendChild(divLi)
  divLi.appendChild(pTitulo)
  divLi.appendChild(pTime)
  divLi.appendChild(pTimeNew)
  divLi.appendChild(descricaoInput)
  tarefaDiv.appendChild(ul)
  
  //botoes
  //variaveis
  let btnExcluir = document.createElement("a");
  let btnEditar = document.createElement("a");
  let btnConcluir = document.createElement("a");
  let paiDosBtns = document.createElement("div");

  //tornado filhos
  divLi.appendChild(paiDosBtns);
  paiDosBtns.appendChild(btnExcluir);
  paiDosBtns.appendChild(btnEditar);
  paiDosBtns.appendChild(btnConcluir);

  //descobrindo em qual indice do local storage a tarefa sera criada
  baixarLocalStorage();
  let indice = tarefasJs.data.length;


  //setando atributos
  paiDosBtns.setAttribute("class","botoesAcao")
  btnExcluir.setAttribute("onclick","excluir("+indice+")");
  btnEditar.setAttribute("onclick","editar("+indice+")");
  btnConcluir.setAttribute("onclick","concluir("+indice+")");

  //colocando os icones
  imgExcluir = document.createElement("img");
  imgEditar = document.createElement("img");
  imgConcluir = document.createElement("img");

  btnExcluir.appendChild(imgExcluir);
  btnEditar.appendChild(imgEditar);
  btnConcluir.appendChild(imgConcluir);

  imgExcluir.setAttribute("alt","Excluir Tarefa");
  imgEditar.setAttribute("alt","Editar Tarefa");
  imgConcluir.setAttribute("alt","Concluir Tarefa");

  imgExcluir.setAttribute("src","./assets/img/excluir.png");
  imgEditar.setAttribute("src","./assets/img/editar.png");
  imgConcluir.setAttribute("src","./assets/img/concluir.png");

  imgExcluir.setAttribute("width","30px");
  imgEditar.setAttribute("width","30px");
  imgConcluir.setAttribute("width","30px");

  //adicionando no local storage
  tarefasJs.i.push(indice);
  tarefasJs.data.push(dataCriacao.value);
  tarefasJs.limite.push(dataLimiteFormatada);
  tarefasJs.titulo.push(titulo.value)
  tarefasJs.descricao.push(descricao.value);
  tarefasJs.concluida.push(0);
  subirLocalStorage();
}

//funções dos botões de ação das tarefas
function excluir(index){
  if(confirm("Deseja realmente excluir a tarefa: " + tarefasJs.titulo[index]+"?")){
    baixarLocalStorage();
    console.log("Apagando tarefa do indice: " + index);
    tarefasJs.i.splice(index,1);
    tarefasJs.data.splice(index,1);
    tarefasJs.limite.splice(index,1);
    tarefasJs.titulo.splice(index,1);
    tarefasJs.descricao.splice(index,1);
    tarefasJs.concluida.splice(index,1);
    subirLocalStorage();
    window.location.reload();
  }
}

function editar(index){
  baixarLocalStorage();
  document.getElementById("dataCriacao").value = tarefasJs.data[index];
  const [dia, mes, ano] = tarefasJs.limite[index].split("/");
  const dataFormatada = ano + '-' + mes + '-' + dia;
  let a = document.getElementById("dataLimite") 
  a.value = dataFormatada;
  let b = document.getElementById("titulo-input")
  b.value = tarefasJs.titulo[index];
  let c = document.getElementById("descricao");
  c.focus();
  c.value = tarefasJs.descricao[index];
  
  document.getElementById("add-tarefa").style.display ="none";
  document.getElementById("editar-tarefa").style.display ="initial";
  document.getElementById("cancelar").style.display ="initial";
  
  document.getElementById("editar-tarefa").addEventListener("click",function(x){
    x.preventDefault();
    let erros = false;
    let inputs = document.getElementsByName("inputs-criar-card");

    // VALIDAR O CAMPO VAZIO
    for (input of inputs) {
      let resposta = validarCampoVazio(input);
      if (resposta) erros = true;
    }

    // VALIDAR O TAMANHO DO CAMPO
    if (!erros) {
      for (input of inputs) {
        if (input.id == "descricao") {
          let resposta = validarTamanhoCampo(input);
          if (resposta) erros = true;
        }
      }
    }

    if (erros) return;

    if(confirm("Confirma a edição?")){
      const [aa, m, d] = a.value.split("-")
      const data = d + '/' + m + '/' + aa;
      tarefasJs.limite[index] = data;
      tarefasJs.titulo[index] = b.value;
      tarefasJs.descricao[index] = c.value;
      subirLocalStorage();
      window.location.reload();
      console.log("entrei");
    }
  })

  document.getElementById("cancelar").addEventListener("click",function(x){
    x.preventDefault;
    if(confirm("Deseja parar a edição, todo texto editado será perdido?")){
      window.location.reload();
    }
  })
}

function concluir(index){
  baixarLocalStorage();
  if(tarefasJs.concluida[index] == 1){
    tarefasJs.concluida[index] = 0;
  }else{
    tarefasJs.concluida[index] = 1;
  }
  subirLocalStorage();
  window.location.reload();
}





