// Recuperar comentarios almacenados en localStorage
var savedComments = localStorage.getItem("comments");
if (savedComments) {
  var commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = savedComments;

  // Agregar evento de clic para eliminar comentarios
  var commentElements = commentsList.getElementsByClassName("comment");
  for (var i = 0; i < commentElements.length; i++) {
    commentElements[i].addEventListener("click", deleteComment);
  }
}

document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  var commentNameInput = document.getElementById("comment-name");
  var commentTextarea = document.getElementById("comment-textarea");
  
  var commentName = commentNameInput.value;
  var commentText = commentTextarea.value;

  if (commentName.trim() !== "" && commentText.trim() !== "") {
    var commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    var commentAuthor = document.createElement("p");
    commentAuthor.classList.add("comment-author");
    commentAuthor.textContent = commentName;
    commentElement.appendChild(commentAuthor);

    var commentTextElement = document.createElement("p");
    commentTextElement.textContent = commentText;
    commentElement.appendChild(commentTextElement);

    var commentsList = document.getElementById("comments-list");
    commentsList.appendChild(commentElement);

    commentNameInput.value = "";
    commentTextarea.value = "";

    // Agregar evento de clic para eliminar el nuevo comentario
    commentElement.addEventListener("click", deleteComment);

    // Guardar comentarios en localStorage
    var existingComments = localStorage.getItem("comments");
    var updatedComments = existingComments ? existingComments + commentElement.outerHTML : commentElement.outerHTML;
    localStorage.setItem("comments", updatedComments);
  }
});

function deleteComment(event) {
  var commentElement = event.target;

  // Eliminar el comentario del contenedor de comentarios
  commentElement.parentNode.removeChild(commentElement);

  // Actualizar los comentarios almacenados en localStorage
  var commentsList = document.getElementById("comments-list");
  localStorage.setItem("comments", commentsList.innerHTML);
}

  