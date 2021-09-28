//ao carregar a pagina, carrega todo conteúdo do local Storage
window.onload = function () {
  baixarLocalStorage();

  for (let i = 0; i < tarefasJs.data.length; i++) 
  {function criarTachado(){
    if(tarefasJs.concluida[i]==1){
      return "<s>";
    }else{
      return "";
    }
  }
    document.getElementById("tarefas-div").innerHTML +=`
    <div class="tarefa">
      <div class="caixa-data">
        <span>${tarefasJs.data[i]}</span>
        <span>${tarefasJs.limite[i]}</span>
      </div>
      <div class="caixa-descricao">
        <h2>${tarefasJs.titulo[i]}</h2>
        <p id="descricao-conteudo">Descrição:${criarTachado()}${tarefasJs.descricao[i]}</s></p>
      </div>
      <div class="caixa-botoes">
        <a onclick="excluir(${i})">
          <img alt="Excluir Tarefa" src="./assets/img/excluir.svg" width="30px">
        </a>
        <a onclick="editar(${i})">
          <img alt="Editar Tarefa" src="./assets/img/editar.svg" width="30px">
        </a>
        <a onclick="concluir(${i})">
          <img alt="Concluir Tarefa" src="./assets/img/concluir.svg" width="30px">
        </a>
      </div>
    </div>`
  }
}

//variaveis de manipulação do Local Storage
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

// variaveis dos inputs
const dataCriacao = document.getElementById("dataCriacao");
const dataLimite = document.getElementById("dataLimite");
const titulo = document.getElementById("titulo-input");
const descricao = document.getElementById("descricao");

//variaveis para receber a data atual
let date = new Date();
let mes = date.getMonth() + 1;
let dia = date.getDate();
let ano = date.getFullYear();

//Mostra a data atual no input
if (mes < 10) {
  mes = '0' + mes;
}
let dataDoDia = dia + '/' + mes + "/" + ano;
let dataFormatoAmericano = ano + '-' + mes + "-" + dia;
dataCriacao.value = dataDoDia;

//validações
//garante que data limite não pode ser menor que a data atual e que não esta vazia
dataLimite.setAttribute("min", dataFormatoAmericano);
dataLimite.addEventListener("blur", () => validarCampoVazio(dataLimite));
titulo.addEventListener("blur", () => validarCampoVazio(titulo));

//garante que a descrição não seja vazia e com menos de 10 caracteres
descricao.addEventListener("blur", () => {
  let campo = validarCampoVazio(descricao);
  if (!campo) {
    validarTamanhoCampo(descricao);
  }
});

//função que valida o tamanho do campo
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

//função que valida campos vazios
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
  adicionarTarefa()
}

//evento de clique do botão cadastrar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validarFormulario();
})


//adiciona a nova tarefa ao Local Storage
function adicionarTarefa() {
  baixarLocalStorage();
  let indice = tarefasJs.data.length;
  const [ano, mes, dia] = dataLimite.value.split("-");
  const dataLimiteFormatada = dia + '/' + mes + '/' + ano;
  tarefasJs.i.push(indice);
  tarefasJs.data.push(dataCriacao.value);
  tarefasJs.limite.push(dataLimiteFormatada);
  tarefasJs.titulo.push(titulo.value)
  tarefasJs.descricao.push(descricao.value);
  tarefasJs.concluida.push(0);
  subirLocalStorage();
  window.location.reload();
}

//funções dos botões de ação das tarefas
//função do botão excluir
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

//função do botão editar
function editar(index){
  baixarLocalStorage();
  document.getElementById("dataCriacao").value = tarefasJs.data[index];
  const [dia, mes, ano] = tarefasJs.limite[index].split("/");
  const dataFormatada = ano + '-' + mes + '-' + dia;
  dataLimite.value = dataFormatada;
  titulo.value = tarefasJs.titulo[index];
  descricao.value = tarefasJs.descricao[index];
  descricao.focus();
  
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
      const [aa, m, d] = dataLimite.value.split("-");
      const data = d + '/' + m + '/' + aa;
      tarefasJs.limite[index] = data;
      tarefasJs.titulo[index] = titulo.value;
      tarefasJs.descricao[index] = descricao.value;
      subirLocalStorage();
      window.location.reload();
    }
  })

  document.getElementById("cancelar").addEventListener("click",function(x){
    x.preventDefault;
    if(confirm("Deseja parar a edição, todo texto editado será perdido?")){
      window.location.reload();
    }
  })
}

//funcção do botão concluir
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





