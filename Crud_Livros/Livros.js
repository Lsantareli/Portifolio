document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookIdInput = document.getElementById('bookId');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readDateInput = document.getElementById('readDate');
    const submitButton = document.getElementById('submitButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const bookTableBody = document.getElementById('bookTableBody');

    let books = JSON.parse(localStorage.getItem('books')) || [];
    let currentBookId = null; // Para controlar a edição

    // Função para salvar os livros no localStorage
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Função para renderizar a tabela de livros
    function renderBooks() {
        bookTableBody.innerHTML = '';
        books.forEach(book => {
            const row = bookTableBody.insertRow();
            row.insertCell(0).textContent = book.title;
            row.insertCell(1).textContent = book.author;
            row.insertCell(2).textContent = book.pages;
            row.insertCell(3).textContent = book.readDate;

            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => editBook(book.id));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteBook(book.id));
            actionsCell.appendChild(deleteButton);
        });
    }

    // Função para adicionar ou atualizar um livro
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newBook = {
            id: bookIdInput.value ? parseInt(bookIdInput.value) : Date.now(), // Usa o ID existente ou cria um novo
            title: titleInput.value,
            author: authorInput.value,
            pages: parseInt(pagesInput.value),
            readDate: readDateInput.value
        };

        if (bookIdInput.value) {
            // Atualizar livro existente
            books = books.map(book => book.id === newBook.id ? newBook : book);
            alert('Livro atualizado com sucesso!');
        } else {
            // Adicionar novo livro
            books.push(newBook);
            alert('Livro adicionado com sucesso!');
        }

        saveBooks();
        renderBooks();
        bookForm.reset();
        resetFormState(); // Reseta o formulário para estado de adição
    });

    // Função para editar um livro
    function editBook(id) {
        const bookToEdit = books.find(book => book.id === id);
        if (bookToEdit) {
            bookIdInput.value = bookToEdit.id;
            titleInput.value = bookToEdit.title;
            authorInput.value = bookToEdit.author;
            pagesInput.value = bookToEdit.pages;
            readDateInput.value = bookToEdit.readDate;

            submitButton.textContent = 'Atualizar Livro';
            cancelEditButton.style.display = 'inline-block';
            currentBookId = id;
        }
    }

    // Função para cancelar a edição
    cancelEditButton.addEventListener('click', () => {
        bookForm.reset();
        resetFormState();
    });

    // Função para resetar o estado do formulário (após adicionar/atualizar/cancelar)
    function resetFormState() {
        bookIdInput.value = '';
        submitButton.textContent = 'Adicionar Livro';
        cancelEditButton.style.display = 'none';
        currentBookId = null;
    }

    // Função para deletar um livro
    function deleteBook(id) {
        if (confirm('Tem certeza que deseja excluir este livro?')) {
            books = books.filter(book => book.id !== id);
            saveBooks();
            renderBooks();
            alert('Livro excluído com sucesso!');
        }
    }

    // Renderiza os livros ao carregar a página
    renderBooks();
});