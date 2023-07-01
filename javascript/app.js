const libraryContainer = document.querySelector(".library-container");
let library = [];

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

// To run at first load
window.addEventListener("DOMContentLoaded", function () {
  getLibrary();
});

function setLibrary() {
  resetLibrary();
  showBooks();
  showTotalBook();
  localStorage.clear();
  localStorage.setItem("book-library", JSON.stringify(library));
}

function getLibrary() {
  library = JSON.parse(localStorage.getItem("book-library")) ?? [];
  showBooks();
  showTotalBook();
}

libraryContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("book-remove")) {
    const book = event.target.parentElement;
    let title = book.querySelector(".book-title").textContent;
    let author = book.querySelector(".book-author").textContent;
    del(title, author);

    resetLibrary();
    setLibrary();
  }
});

function createBookCard(book) {
  // Create Elements
  const card = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("h3");
  const read = document.createElement("input");
  const remove = document.createElement("button");

  // Add Attributes
  card.className = "book-card";
  title.className = "book-title";
  author.className = "book-author";
  read.className = "book-read btn read-toggle";
  read.setAttribute("type", "checkbox");
  remove.className = "book-remove btn";

  // Take value from form and store
  title.textContent = book.title;
  author.textContent = book.author;
  read.checked = book.read;
  remove.textContent = "remove";

  // Add elements to library UI
  libraryContainer.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(read);
  card.appendChild(remove);

  // Add events

  read.addEventListener("change", function () {
    const book = this.parentElement;
    let title = book.querySelector(".book-title").textContent;
    let author = book.querySelector(".book-author").textContent;
    let read = book.querySelector(".book-read").checked;
    library.forEach(function (b) {
      if (title === b.title && author === b.author) {
        b.read = read;
      }
    });

    resetLibrary();
    setLibrary();
  });
}

function del(title, author) {
  library = library.filter(function (b) {
    return b.title !== title || b.author !== author;
  });
}

function showAlert(message) {
  const alertContainer = document.querySelector(".alert-container");
  const alert = document.createElement("p");
  alert.textContent = message.toUpperCase();
  alertContainer.appendChild(alert);
  setTimeout(function () {
    alert.remove();
  }, 2800);
}

function showTotalBook() {
  let totalBooks = library.length;
  document.querySelector(".total-books").textContent = totalBooks;
}

function showBooks() {
  let totalBooks = library.length;
  for (let i = 0; i < totalBooks; i++) {
    createBookCard(library[i]);
  }
}

function resetLibrary() {
  //  Reset the whole library so that books won't multi
  libraryContainer.innerHTML = "";
}

function resetForm() {
  //  Reset the form inputs
  document.querySelector(".title-input").value = "";
  document.querySelector(".author-input").value = "";
  document.querySelector(".isRead").checked = false;
}

// To check the book that if input is already exist in library or not
function isNotExist(title, author) {
  let totalBooks = library.length;
  for (let i = 0; i < totalBooks; i++) {
    let book = library[i];
    if (
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
    ) {
      return false;
    }
  }
  return true;
}

function addBookToLibrary(title, author, read) {
  if (!title) {
    showAlert("Title : Required");
  } else if (!author) {
    showAlert("author : Required");
  } else {
    let book = new Book(title, author, read);
    library.push(book);
    resetLibrary();
  }
}

const submitBookBtn = document.querySelector(".submit-book");

submitBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.querySelector(".title-input").value;
  let author = document.querySelector(".author-input").value;
  let read = document.querySelector(".isRead").checked;

  function validition() {
    if (title.length > 50 || author.length > 50) {
      showAlert("Input can't be longer than 50");
    } else {
      if (isNotExist(title, author)) {
        resetForm();
        addBookToLibrary(title, author, read);
        setLibrary();
      } else {
        showAlert("The book is already exists");
      }
    }
  }
  validition();
});

const loginBtn = document.querySelector(".login.btn");
loginBtn.addEventListener("click", function () {
  showAlert("Haven't learn backend yet");
});
