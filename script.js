// Obtener referencia a los elementos del DOM
const commentForm = document.getElementById("comment-form");
const commentNameInput = document.getElementById("comment-name");
const commentTextarea = document.getElementById("comment-textarea");
const commentsList = document.getElementById("comments-list");

// Función para mostrar los comentarios almacenados en Local Storage
function displayCommentsFromLocalStorage() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsList.innerHTML = ""; // Limpiar la lista

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment.name, comment.text);
    commentsList.appendChild(commentElement);
  });
}

// Función para agregar un comentario a Local Storage
function addCommentToLocalStorage(name, text) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const newComment = { name, text };
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Manejador de envío del formulario de comentario
commentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const commentName = commentNameInput.value;
  const commentText = commentTextarea.value;

  if (commentName.trim() !== "" && commentText.trim() !== "") {
    addCommentToLocalStorage(commentName, commentText);
    commentNameInput.value = "";
    commentTextarea.value = "";
    displayCommentsFromLocalStorage();
  }
});

// Función para crear un elemento de comentario
function createCommentElement(name, text) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const commentAuthor = document.createElement("p");
  commentAuthor.classList.add("comment-author");
  commentAuthor.textContent = name;
  commentElement.appendChild(commentAuthor);

  const commentTextElement = document.createElement("p");
  commentTextElement.textContent = text;
  commentElement.appendChild(commentTextElement);

  return commentElement;
}

// Cargar y mostrar los comentarios al cargar la página
window.addEventListener("load", () => {
  displayCommentsFromLocalStorage();
});
