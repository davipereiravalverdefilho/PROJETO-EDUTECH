/* ==========================================================
  1) PEGAR OS ELEMENTOS DO HTML
  ========================================================== */

    // Onde os cards vão aparecer
const ListaCursos = document.querySelector("#listaCursos");

    // Campo de busca
const buscaCursos = document.querySelector("#buscaCursos");


/* ==========================================================
  2) CRIAR UMA VARIÁVEL PARA GUARDAR OS CURSOS
  ========================================================== */

let cursos = []; //Lista carregada do JSON


/* ==========================================================
  3) FUNÇÃO PARA CARREGAR O JSON
  ========================================================== */

async function carregarCursos() {
    //busca o arquivo cursos.JSON (como se fosse uma MINI API)
    const resposta = await fetch("../DATA/cursos.JSON");

    // TRANSFOPRMA OS DADOS QUE O JS ENTENDE
    cursos = await resposta.JSON();

    //DEPOIS DE CARREGAR, RENDERIZA NA TELA
    renderizarCursos(cursos);
}

/* ==========================================================
  4) FUNÇÃO PARA CRIAR OS CARDS NA TELA
  ========================================================== */

function renderizarCursos(lista) {
    // Limpa o conteúdo antes de desenhar de novo
    ListaCursos.innerHTML = "";

    //Para cada curso da lista, cria um card
  lista.forEach((curso) => {
      //Cria um elemento HTML <div>
      const card = document.createElement("div");

      //Coloca uma classe (para o CSS estilizar)
      card.classList.add("card-curso");

      //Coloca o conteúdo do card de curso
      card.innerHTML = `
      <a class="curso" href="../PAGES/detalhes-curso.html">
        <h3>${curso.titulo}</h3>
        <imgsrc="${curso.img}">
        <p>${curso.descricao}</p>
        <p><strong>CH:</strong>${curso.cargaHoraria}h</p>
      </a>
      `
  });
};

/* ==========================================================
  5) BUSCA: FILTRAR A LISTA QUANDO DIGITAR
  ========================================================== */

buscaCursos.addEventListener("input", function(){
    const texto = buscaCursos.value.toLowerCase(); //pega o texto digitado e transforma em minúsculo

    const filtrados = cursos.filter((curso)=>
    curso.titulo.toLowerCase().includes(texto)
    );

    renderizarCursos(filtrados);
});

/* ==========================================================
  6) CHAMA A FUNÇÃO PARA INICIAR TUDO
  ========================================================== */

carregarCursos();