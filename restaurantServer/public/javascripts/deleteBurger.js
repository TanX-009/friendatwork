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
  const getTable = document.getElementById("getTable");
  const table = document.getElementById("table");

  const name = document.getElementById("name");

  const errorDiv = document.getElementById("errorDiv");

  submit.onclick = () => {
    clearErrorDiv(errorDiv);
    if (!name.value) {
      appendToError("Empty name", errorDiv);
      return;
    }
    form.submit();
    return;
  };

  getTable.onclick = async () => {
    table.innerHTML = `
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Description</th>
                      </tr>
                      `;
    await fetch("/getAllBurgers", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        for (let i = 0; i < json.length; i++) {
          table.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
              <td>${json[i].id}</td>
              <td>${json[i].name}</td>
              <td>${json[i].image}</td>
              <td>${json[i].description}</td>
            </tr>
            `,
          );
        }
      })
      .catch((err) => console.error("error: " + err));
  };
};
