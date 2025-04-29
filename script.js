document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");

  loginBtn.addEventListener("click", () => {
      window.location.href = "login.html";
  });

  const settingsBtn = document.getElementById("settingsBtn");
  let editMode = false;

  settingsBtn.addEventListener("click", () => {
      editMode = !editMode;
      settingsBtn.textContent = editMode ? "✅ Mode Édition " : "⚙️";
  });

  document.querySelectorAll("td").forEach(cell => {
      cell.addEventListener("click", () => {
          if (editMode) {
              if (cell.classList.contains("Cours")) {
                  cell.classList.remove("Cours");
                  cell.classList.add("Pause");
              } else if (cell.classList.contains("Pause")) {
                  cell.classList.remove("Pause");
                  cell.classList.add("Cours");
              }
          }
      });
  });
});