const searchInput = document.querySelector(".container__search__input");
const autocompleteList = document.querySelector(
  ".container__search__autocomplete__list",
);
const resultList = document.querySelector(".container__search__result__list");

let timeout;
searchInput.addEventListener("input", async () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetch(`https://api.github.com/search/repositories?q=${searchInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        autocompleteList.innerHTML = "";
        data.items.slice(0, 5).forEach((repo) => {
          const autocompleteItem = document.createElement("li");
          autocompleteItem.classList.add(
            "container__search__autocomplete__list__item",
          );
          autocompleteItem.textContent = repo.name;

          autocompleteItem.addEventListener("click", () => {
            const resultItem = document.createElement("li");
            resultItem.classList.add("container__search__result__list__item");

            const resultItemTxtContent = document.createElement("div");

            resultItemTxtContent.classList.add(
              "container__search__result__list__item__txtContent",
            );

            const resultItemRepoName = document.createElement("span");
            resultItemRepoName.classList.add(
              "container__search__result__list__item__txtContent__repoName",
            );
            resultItemRepoName.textContent = `Name: ${repo.name}`;

            const resultItemRepoOwner = document.createElement("span");
            resultItemRepoOwner.classList.add(
              "container__search__result__list__item__txtContent__repoOwner",
            );
            resultItemRepoOwner.textContent = `Owner: ${repo.owner.login}`;

            const resultItemRepoStars = document.createElement("span");
            resultItemRepoStars.classList.add(
              "container__search__result__list__item__txtContent__repoStars",
            );
            resultItemRepoStars.textContent = `Stars: ${repo.stargazers_count}`;

            const resultDeleteBtn = document.createElement("div");
            resultDeleteBtn.classList.add(
              "container__search__result__list__item__deleteBtn",
            );

            resultDeleteBtn.addEventListener("click", function () {
              this.parentElement.remove();
            });

            const btnSvg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            btnSvg.setAttribute("width", "100%");
            btnSvg.setAttribute("height", "100%");

            const btnLine1 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line",
            );

            btnLine1.setAttribute("x1", "0");
            btnLine1.setAttribute("y1", "0");
            btnLine1.setAttribute("x2", "42");
            btnLine1.setAttribute("y2", "38.5");

            btnLine1.setAttribute("stroke", "red");
            btnLine1.setAttribute("stroke-width", "3");

            const btnLine2 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line",
            );

            btnLine2.setAttribute("x1", "42");
            btnLine2.setAttribute("y1", "0");
            btnLine2.setAttribute("x2", "0");
            btnLine2.setAttribute("y2", "38.5");

            btnLine2.setAttribute("stroke", "red");
            btnLine2.setAttribute("stroke-width", "3");

            btnSvg.appendChild(btnLine1);
            btnSvg.appendChild(btnLine2);

            resultDeleteBtn.appendChild(btnSvg);

            resultItemTxtContent.appendChild(resultItemRepoName);
            resultItemTxtContent.appendChild(resultItemRepoOwner);
            resultItemTxtContent.appendChild(resultItemRepoStars);

            resultItem.appendChild(resultItemTxtContent);
            resultItem.appendChild(resultDeleteBtn);

            resultList.appendChild(resultItem);
          });

          autocompleteList.appendChild(autocompleteItem);
        });
      });
  }, 500);
});
