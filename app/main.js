let books = [];
const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
getSearchBooks()

async function getSearchBooks(){
    const ans = await fetch(endpointAPI);
    books = await ans.json();
    let bookDiscount = discountApply(books);
    booksIn(bookDiscount);
}

// forEach
const elementForBooks = document.getElementById('livros');
const elementTotalAvailablePrice = document.getElementById('valor_total_livros_disponiveis')

function booksIn(booksList) {
    elementTotalAvailablePrice.innerHTML = ''
    elementForBooks.innerHTML = '';
    booksList.forEach(book => {
        let available = book.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel'
        elementForBooks.innerHTML+= `
        <div class="livro">
      <img class="${available}" src="${book.imagem}" alt="${book.alt}" />
      <h2 class="livro__titulo">
        ${book.titulo}
      </h2>
      <p class="livro__descricao">${book.autor}</p>
      <p class="livro__preco" id="preco">R$${book.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${book.categoria}</span>
      </div>
    </div>`
     });
}

//map

function discountApply(books){
    const discount = 0.3;
    booksWithDiscount = books.map(book => {
         return {...book, preco: book.preco - (book.preco * discount)}
    })
    return booksWithDiscount;
}

//filter

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.addEventListener('click', filterBooks))

function filterBooks() {
    const elementBtn = document.getElementById(this.id)
    const category = elementBtn.value
    let filteredBooks = category == 'available' ? availableFilter() : categoryFilter(category)
    booksIn(filteredBooks)
    if (category == 'available') {
        const totalValue = totalAvalabePrice(filteredBooks)
        console.log(totalValue)
        totalPriceAvailableBooks(totalValue)
    }
}   

function categoryFilter(category) {
    return books.filter(book => book.categoria == category);
}

function availableFilter() {
    return books.filter(book => book.quantidade > 0);
}

function totalPriceAvailableBooks(totalValue){
    elementTotalAvailablePrice.innerHTML = `
    <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${totalValue}</span></p>
     </div>
    `
}

//sort

const btnPriceSort = document.getElementById('btnOrdenarPorPreco')
btnPriceSort.addEventListener('click', priceSortBooks)

function priceSortBooks(){
    let sortedBooks = books.sort((a, b) => a.preco - b.preco)
    booksIn(sortedBooks)
}

//reduce 

function totalAvalabePrice(books) {
    return books.reduce ((acc, book) => (acc + book.preco), 0).toFixed(2)
}