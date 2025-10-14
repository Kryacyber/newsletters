fetch("./intro-outro.json")
  .then((res) => res.json())
  .then((data) => {
    const introContainer = document
      .getElementById("summary")
      .querySelector("p");
    const outroContainer = document
      .getElementById("takeaways")
      .querySelector("p");

    introContainer.innerHTML = data[0].intro;
    outroContainer.innerHTML = data[1].outro;
  });

fetch("./news-articles.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("news-articles");
    const grouped = {};
    data.forEach((article) => {
      if (!grouped[article.category]) grouped[article.category] = [];
      grouped[article.category].push(article);
    });

    Object.keys(grouped).forEach((category) => {
      const section = document.createElement("div");
      section.className = "section";

      const heading = document.createElement("h2");
      heading.textContent = category;
      section.appendChild(heading);

      const list = document.createElement("ul");
      grouped[category].forEach((item) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.title;
        a.target = "_blank";

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent =
          "(" + new Date(item.date).toISOString().split("T")[0] + ")";

        const p = document.createElement("p");
        p.textContent = item.content;

        li.appendChild(a);
        li.appendChild(dateSpan);
        li.appendChild(p);
        list.appendChild(li);
      });

      section.appendChild(list);
      container.appendChild(section);
    });
  })
  .catch((err) => console.error("Error loading JSON:", err));

document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");
  if (dateElement) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateElement.innerHTML = formattedDate;
  }
});

const openDialog = document.getElementById("openDialog");
const closeDialog = document.getElementById("closeDialog");
const emailDialog = document.getElementById("emailDialog");
const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");

function closeDialogWithAnimation() {
  emailDialog.classList.add('closing');
  setTimeout(() => {
    emailDialog.close();
    emailDialog.classList.remove('closing');
    emailInput.value = "";
  }, 300);
}

openDialog.addEventListener("click", () => {
  emailDialog.showModal();
  emailInput.focus();
});

closeDialog.addEventListener("click", () => {
  closeDialogWithAnimation();
  emailInput.value = "";
});

emailDialog.addEventListener("click", (e) => {
  if (e.target === emailDialog) {
    closeDialogWithAnimation();
    emailInput.value = "";
  }
});

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email) {
    console.log("Collected email:", email);
    // TODO: Replace with actual API call to save email
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    
    alert("Thanks for subscribing! We'll keep you updated with the latest cybersecurity insights.");
    emailDialog.close();
    emailInput.value = "";
  }
});