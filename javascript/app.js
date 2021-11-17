let library = [];

function Book(title, aurthor, read) {
  this.title = title;
  this.aurthor = aurthor;
  this.read = read;
}

window.addEventListener("DOMContentLoaded", function () {
  getLibrary();
});

function setLibrary() {
  resetLibrary(); /* last commit fix multiplying book problem */
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

function createBookCard(book) {
  // Create Elements
  const card = document.createElement("div");
  const title = document.createElement("h1");
  const aurthor = document.createElement("h3");
  const read = document.createElement("input");
  const remove = document.createElement("button");

  // Add Attributes
  card.className = "book-card";
  title.className = "book-title";
  aurthor.className = "book-aurthor";
  read.className = "book-read btn read-toggle";
  read.setAttribute("type", "checkbox");
  remove.className = "book-remove btn";

  // Take value from form and store
  title.textContent = book.title;
  aurthor.textContent = book.aurthor;
  read.checked = book.read;
  remove.textContent = "remove";

  // Add elements to library UI
  document.querySelector(".library-container").appendChild(card);
  card.appendChild(title);
  card.appendChild(aurthor);
  card.appendChild(read);
  card.appendChild(remove);

  // Add events
  remove.addEventListener("click", function () {
    const book = this.parentElement;
    let title = book.querySelector(".book-title").textContent;
    let aurthor = book.querySelector(".book-aurthor").textContent;
    del(title, aurthor);

    resetLibrary();
    setLibrary();
  });

  read.addEventListener("click", function () {
    const book = this.parentElement;
    let title = book.querySelector(".book-title").textContent;
    let aurthor = book.querySelector(".book-aurthor").textContent;
    let read = book.querySelector(".book-read").checked;
    library.forEach(function (b) {
      if (title === b.title && aurthor === b.aurthor) {
        b.read = read;
      }
    });

    resetLibrary();
    setLibrary();
  });
}

function del(title, aurthor) {
  library = library.filter(function (b) {
    return b.title !== title || b.aurthor !== aurthor;
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
  document.querySelector(".library-container").innerHTML = "";
}

function resetForm() {
  //  Reset the form inputs
  document.querySelector(".title-input").value = "";
  document.querySelector(".aurthor-input").value = "";
  document.querySelector(".isRead").checked = false;
}

// To check the book that if input is already exist in library or not
function isNotExist(title, aurthor) {
  let totalBooks = library.length;
  for (let i = 0; i < totalBooks; i++) {
    let book = library[i];
    if (
      book.title.toLowerCase() === title.toLowerCase() &&
      book.aurthor.toLowerCase() === aurthor.toLowerCase()
    ) {
      return false;
    }
  }
  return true;
}

function addBookToLibrary(title, aurthor, read) {
  if (!title) {
    showAlert("Title : Required");
  } else if (!aurthor) {
    showAlert("Aurthor : Required");
  } else {
    let book = new Book(title, aurthor, read);
    library.push(book);
    resetLibrary();
  }
}

const submitBookBtn = document.querySelector(".submit-book");

submitBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.querySelector(".title-input").value;
  let aurthor = document.querySelector(".aurthor-input").value;
  let read = document.querySelector(".isRead").checked;
  if (isNotExist(title, aurthor)) {
    resetForm();
    addBookToLibrary(title, aurthor, read);
    setLibrary();
  } else {
    showAlert("The book is already exists");
  }
});

const loginBtn = document.querySelector(".login.btn");
loginBtn.addEventListener("click", function () {
  showAlert("Haven't learn backend yet");
});
