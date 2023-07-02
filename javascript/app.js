const libraryContainer = document.querySelector(".library-container");
const isReadBtn = document.querySelector("form > .is-read.btn");
const submitBookBtn = document.querySelector(".submit-book");
const loginBtn = document.querySelector(".login.btn");

let library = [];

class Book {
  constructor(id, title, author, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }
}

// To run at first load
window.addEventListener("DOMContentLoaded", function () {
  getLibrary();
  showBooks();
  showTotalBooks();
});

isReadBtn.addEventListener("click", (event) => {
  const isRead = event.target.dataset.isRead === "false";
  event.target.dataset.isRead = isRead;
  event.target.classList.toggle("light-red-gradient", isRead);
  event.target.textContext = isRead ? "unread" : "read";
});

function setLibrary() {
  localStorage.setItem("book-library", JSON.stringify(library));
}

function getLibrary() {
  library = JSON.parse(localStorage.getItem("book-library")) ?? [];
}

function getBookDetails(bookCard) {
  const title = bookCard.querySelector(".book-title").textContent;
  const author = bookCard.querySelector(".book-author").textContent;
  return { title, author };
}

function createBookCard(book) {
  // Create Elements
  const card = document.createElement("div");
  card.dataset.id = book.id;
  card.className = "book-card";

  const title = document.createElement("h1");
  title.className = "book-title";
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement("h3");
  author.className = "book-author";
  author.textContent = book.author;
  card.appendChild(author);

  const read = document.createElement("button");
  read.className = "book-read btn read-toggle";
  read.dataset.isRead = book.isRead;
  read.textContent = read.dataset.isRead === "false" ? "read" : "unread";
  card.appendChild(read);

  const remove = document.createElement("button");
  remove.className = "book-remove btn";
  remove.textContent = "remove";
  card.appendChild(remove);

  libraryContainer.appendChild(card);
}

function removeBookCard(bookCard) {
  const id = bookCard.dataset.id;
  library = library.filter((book) => {
    return book.id !== id;
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

function showTotalBooks() {
  const totalBooks = library.length;
  document.querySelector(".total-books").textContent = totalBooks;
}

function showBooks() {
  resetLibrary();
  library.forEach((book) => createBookCard(book));
  showTotalBooks();
}

// Remove all book cards from library container element
function resetLibrary() {
  while (libraryContainer.firstChild) {
    libraryContainer.firstChild.remove();
  }
}

function resetForm() {
  //  Reset the form inputs
  document.querySelector(".title-input").value = "";
  document.querySelector(".author-input").value = "";
  document.querySelector("form > .is-read").checked = false;
}

// To check the book that if input is already exist in library or not
function isBookNotInLibrary(title, author) {
  return library.every((book) => {
    book.title.toLowerCase() !== title.toLowerCase() ||
      book.author.toLowerCase() !== author.toLowerCase();
  });
}

function addBookToLibrary(title, author, isRead) {
  if (!title) {
    showAlert("Title : Required");
  } else if (!author) {
    showAlert("author : Required");
  } else {
    const id = uniqueid(); // Generate unique ID
    let book = new Book(id, title, author, isRead);
    library.push(book);
    resetLibrary();
    showBooks();
    resetForm();
  }
}

libraryContainer.addEventListener("click", (event) => {
  const bookCard = event.target.closest(".book-card");
  if (event.target.classList.contains("book-remove")) {
    bookCard.remove();
    removeBookCard(bookCard);
    setLibrary();
  }

  // Toggle read status
  if (event.target.classList.contains("book-read")) {
    const id = bookCard.dataset.id;
    const isRead = bookCard.dataset.isRead === "false";
    bookCard.dataset.isRead = isRead;
    event.target.textContext = isRead ? "unread" : "read";
    // Update library list's isRead status by ID
    const book = library.find((b) => b.id === id);
    if (book) {
      book.isRead = isRead;
      setLibrary();
    }
  }
});

submitBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const titleInput = document.querySelector(".title-input");
  const authorInput = document.querySelector(".author-input");
  const isReadInput = document.querySelector("form > .is-read");
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isRead = isReadInput.dataset.isRead === "true";

  if (title.length > 50 || author.length > 50) {
    showAlert("Input can't be longer than 50");
  } else {
    if (isBookNotInLibrary(title, author)) {
      addBookToLibrary(title, author, isRead);
    } else {
      showAlert("The book is already exists");
    }
  }
});

loginBtn.addEventListener("click", function () {
  showAlert("Haven't learn backend yet");
});
