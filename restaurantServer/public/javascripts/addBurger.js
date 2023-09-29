function appendToError(error, errorDiv) {
  errorDiv.insertAdjacentHTML("beforeend", error + "<br/>");
  errorDiv.style.backgroundColor = "rgba(255, 125, 125, 0.5)";
}

function clearErrorDiv(errorDiv) {
  errorDiv.innerText = "";
}

window.onload = async () => {
  const form = document.getElementById("form");

  const submit = document.getElementById("submit");
  const name = document.getElementById("name");
  const image = document.getElementById("image");
  const description = document.getElementById("description");

  const errorDiv = document.getElementById("errorDiv");

  submit.onclick = () => {
    clearErrorDiv(errorDiv);
    if (!name.value) {
      appendToError("Empty name", errorDiv);
      return;
    }
    if (!image.value) {
      appendToError("Empty image", errorDiv);
      return;
    }
    if (!description.value) {
      appendToError("Empty description", errorDiv);
      return;
    }
    form.submit();
    return;
  };
};
