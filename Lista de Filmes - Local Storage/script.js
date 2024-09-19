// Criando a base de dados de filmes, inicializando com os dados do localStorage, se existirem
let filmes = JSON.parse(localStorage.getItem('filmes')) || [];

// Criando um array de filmes favoritos, inicializando com os dados do localStorage, se existirem
let filmesFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Função para salvar um item
function salvarItem() {
  const filmeInput = document.getElementById('filmeInput').value;

  if (filmeInput !== '') {
    let lista = JSON.parse(localStorage.getItem('lista')) || [];
    lista.push(filmeInput);
    localStorage.setItem('lista', JSON.stringify(lista));
    document.getElementById('filmeInput').value = '';
  }
}

const buttonAdd = document.querySelector('button');
const listaFilmes = document.querySelector('#listaFilmes');
const buttonLimpar = document.querySelector('#buttonLimpar');
window.onload = () => {
  renderizarLista();
};

// Renderizar filmes na tela
const renderizarLista = () => {
  listaFilmes.innerHTML = "";
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    listaFilmes.append(itemLista);
    itemLista.innerHTML = `${filme.nome}`;
    const favorito = document.createElement('img');
    favorito.src = filmesFavoritos.some(fav => fav.id === filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
    favorito.style.cursor = 'pointer';
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });
    itemLista.append(favorito);
  });
};

// Adiciona o evento de clique ao botão
buttonAdd.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput');
  let id = filmes.length;
  filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
  localStorage.setItem('filmes', JSON.stringify(filmes));
  renderizarLista();
  inputUsuario.value = '';
});

// Quando o botão favorito for cliado
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };
  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
};

// Salvar o filme no localStorage
const saveToLocalStorage = (objetoFilme) => {
  if (!localStorage.getItem('favoritos')) {
    filmesFavoritos = [];
  } else {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  if (!filmesFavoritos.some(fav => fav.id === objetoFilme.id)) {
    filmesFavoritos.push(objetoFilme);
  }
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
};

// remover o filme no localStorage
function removeFromLocalStorage(id) {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}

// limpar a lista
function limparLista() {
  localStorage.removeItem('filmes');
  localStorage.removeItem('favoritos');

  listaFilmes.innerHTML = '';
  filmes = [];
  filmesFavoritos = [];
}

buttonLimpar.addEventListener('click', limparLista);
