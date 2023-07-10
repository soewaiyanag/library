// DOM elements
const libraryContainer = document.querySelector(".library-container");
const isReadBtn = document.querySelector("form > .is-read.btn");
const submitBookBtn = document.querySelector(".submit-book");
const loginBtn = document.querySelector(".login.btn");

// Library array
let library = [];

// Book class
class Book {
  constructor(id, title, author, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
  }
}

// Event listener for initial load
window.addEventListener("DOMContentLoaded", () => {
  getLibrary();
  showBooks();
  showTotalBooks();
});

// Event listener for isRead button
isReadBtn.addEventListener("click", (event) => {
  const isRead = event.target.dataset.isRead === "false";
  event.target.dataset.isRead = isRead;
  event.target.textContent = isRead ? "unread" : "read";
});

// Set library in local storage
function setLibrary() {
  localStorage.setItem("book-library", JSON.stringify(library));
}

// Get library from local storage
function getLibrary() {
  library = JSON.parse(localStorage.getItem("book-library")) ?? [];
}

// Get book details from book card
function getBookDetails(bookCard) {
  const title = bookCard.querySelector(".book-title").textContent;
  const author = bookCard.querySelector(".book-author").textContent;
  return { title, author };
}

// Create a book card
function createBookCard(book) {
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
  read.className = "is-read btn-gradient btn read-toggle";
  read.dataset.isRead = book.isRead;
  read.textContent = read.dataset.isRead === "false" ? "read" : "unread";
  card.appendChild(read);

  const remove = document.createElement("button");
  remove.className = "book-remove btn";
  remove.textContent = "remove";
  card.appendChild(remove);

  libraryContainer.appendChild(card);
}

// Remove a book card
function removeBookCard(bookCard) {
  const id = bookCard.dataset.id;
  library = library.filter((book) => book.id !== id);
}

// Show an alert message
function showAlert(message) {
  const alertContainer = document.querySelector(".alert-container");
  const alert = document.createElement("p");
  alert.textContent = message.toUpperCase();
  alertContainer.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 2800);
}

// Show total number of books
function showTotalBooks() {
  const totalBooks = library.length;
  document.querySelector(".total-books").textContent = totalBooks;
}

// Show all books
function showBooks() {
  resetLibrary();
  library.forEach((book) => createBookCard(book));
  showTotalBooks();
}

// Reset library container
function resetLibrary() {
  while (libraryContainer.firstChild) {
    libraryContainer.firstChild.remove();
  }
}

// Reset the form inputs
function resetForm() {
  //  Reset the form inputs
  document.querySelector(".title-input").value = "";
  document.querySelector(".author-input").value = "";
  document.querySelector("form > .is-read").dataset.isRead = false;
  document.querySelector("form > .is-read").textContent = "read";
}

// Check if the book is not in the library
function isBookNotInLibrary(title, author) {
  return library.every(
    (book) =>
      book.title.toLowerCase() !== title.toLowerCase() ||
      book.author.toLowerCase() !== author.toLowerCase()
  );
}

// Add book to library
function addBookToLibrary(title, author, isRead) {
  if (!title) {
    showAlert("Title: Required");
  } else if (!author) {
    showAlert("Author: Required");
  } else {
    const id = uniqueid(); // Generate unique ID
    const book = new Book(id, title, author, isRead);
    library.push(book);
    resetLibrary();
    showBooks();
    resetForm();
    setLibrary();
  }
}

// Event listener for library container
libraryContainer.addEventListener("click", (event) => {
  const bookCard = event.target.closest(".book-card");

  // Remove book card
  if (event.target.classList.contains("book-remove")) {
    bookCard.remove();
    removeBookCard(bookCard);
    setLibrary();
  }

  // Toggle read status
  if (event.target.classList.contains("is-read")) {
    const id = bookCard.dataset.id;
    const isRead = event.target.dataset.isRead === "false";
    event.target.dataset.isRead = isRead;
    event.target.textContent = isRead ? "unread" : "read";
    const book = library.find((b) => b.id === id);
    if (book) {
      book.isRead = isRead;
      setLibrary();
    }
  }
});

// Event listener for submit book button
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
      showAlert("The book already exists");
    }
  }
});

// Event listener for login button
loginBtn.addEventListener("click", () => {
  showAlert("Haven't learned backend yet");
});
