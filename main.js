fetch("/intro-outro.json")
    .then((res) => res.json())
    .then((data) => {
        const introContainer = document.getElementById("summary").querySelector("p");
        const outroContainer = document.getElementById("takeaways").querySelector("p");

        introContainer.innerHTML = data[0].intro;
        outroContainer.innerHTML = data[1].outro;
    })

fetch("/news-articles.json")
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