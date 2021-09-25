const body = document.querySelector("body");

fetch("https://jsonplaceholder.typicode.com/todos/")
.then(response => response.json())
.then(response => {
  response.map(tarefa => {
    body.appendChild(criarCard(tarefa.id, tarefa.title, tarefa.completed));
  });
});

function criarCard(id, titulo, status) {
  let div = document.createElement("div");
  let input = document.createElement("input");
  let span = document.createElement("span");
  let p = document.createElement("p");
  
  // ATRIBUIR VALORES AOS ELEMENTOS CRIADOS
  p.innerText = id;
  span.innerText = titulo;

  // COLOCAR ATRIBUTOS NOS ELEMENTOS CRIADOS
  input.setAttribute("type", "checkbox");
  if(status) {
    span.style.textDecoration = "line-through";
    input.setAttribute("checked", "checked");
  } else {
    span.style.fontWeight = "bold";
  }

  div.appendChild(p);
  div.appendChild(input);
  div.appendChild(span);

  return div;
}