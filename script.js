document.addEventListener("DOMContentLoaded", async () => {
    const loginBtn = document.getElementById("login-btn");
    const settingsBtn = document.getElementById("settingsBtn");
    const scheduleBody = document.getElementById("scheduleBody");
    let editMode = false;
  
    loginBtn.addEventListener("click", () => {
      window.location.href = "login.html"; // page à créer toi-même
    });
  
    settingsBtn.addEventListener("click", () => {
      editMode = !editMode;
      settingsBtn.textContent = editMode ? "✅ Mode Édition" : "⚙️";
    });
  
    const heures = [
      "08:00", "08:55", "09:50", "10:10", "11:05",
      "12:00", "12:50", "13:45", "14:40", "15:35",
      "15:55", "16:50" , "17:45"
    ];
  
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  
    async function chargerEmploi() {
      try {
        const res = await fetch("http://localhost:3001/emploi", {
          credentials: "include"
        });
        const data = await res.json();
        scheduleBody.innerHTML = "";
  
        heures.forEach((heure, i) => {
          const row = document.createElement("tr");
          const heureCell = document.createElement("td");
          heureCell.textContent = heure;
          row.appendChild(heureCell);
  
          jours.forEach(jour => {
            const cell = document.createElement("td");
            const cours = data.find(e => e.jour === jour && e.heure === heure);
            cell.classList.add(cours && cours.cours ? "Cours" : "Pause");
  
            cell.addEventListener("click", async () => {
              if (!editMode) return;
              const nouveauCours = cell.classList.contains("Cours") ? 0 : 1;
              const res = await fetch("http://localhost:3001/emploi", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ jour, heure, cours: nouveauCours })
              });
  
              if (res.ok) {
                cell.classList.toggle("Cours");
                cell.classList.toggle("Pause");
              }
            });
  
            row.appendChild(cell);
          });
  
          scheduleBody.appendChild(row);
        });
  
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    }
  
    chargerEmploi();
  });