let library = [];

function Book(title, aurthor, isRead) {
  this.title = title;
  this.aurthor = aurthor;
  this.isRead = isRead;
}

function addBookToLibrary() {
  let title = document.querySelector(".title-input").value;
  let aurthor = document.querySelector(".aurthor-input").value;
  let isRead = document.querySelector(".isRead").checked;
  if (!title || !aurthor) {
    console.log("oh no");
  } else {
    let book = new Book(title, aurthor, isRead);
    library.push(book);
  }
}

const submitBookBtn = document.querySelector(".submit-book");

submitBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addBookToLibrary();
});
