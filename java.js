const buttons = document.getElementById("buttons");
let namePok = document.getElementById("name");
let imgPok = document.getElementById("img-pok");
const generalContainer = document.getElementById("general-container");
const btnSearch = document.getElementById("btn-search");
const btnAll = document.getElementById("btn-all");
const likesView = document.getElementById("likes-view-pok");
const contLikes = document.getElementById("cont-likes");
let cont = 0;
let arrayId = [];
let arrayNoRepeat = [];
const loader = document.getElementById("loader-container");

let url = "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0";
let prev = "⏮";
let next = "⏭";
let nextLink = "";
let prevLink = "";
const blackHeart = "🖤";
const redHeart = "❤️";
const likeDelete = "❌";

const fetchApi = async (url) => {
  loader.style.display = "block";
  generalContainer.innerHTML = "";
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    infoPok(data.results);
    nextLink = data.next;
    prevLink = data.previous;

    let btnPrev = data.previous
      ? `<button class ="btn" id ="btn-prev" > ${prev} </button>`
      : "";
    let btnNext = data.next
      ? `<button class ="btn" id ="btn-next" > ${next} </button>`
      : "";

    buttons.innerHTML = btnPrev + " " + btnNext;

    const btnUrlPrev = document.getElementById("btn-prev");
    const btnUrlNext = document.getElementById("btn-next");

    btnUrlNext.addEventListener("click", () => {
      fetchApi(nextLink);
    });
    btnUrlPrev.addEventListener("click", () => {
      fetchApi(prevLink);
    });
  } catch (error) {
    console.error(error);
  }
};
fetchApi(url);

const infoPok = async (data) => {
  generalContainer.innerHTML = "";
  try {
    data.map(async (item) => {
      const response1 = await fetch(item.url);
      const data1 = await response1.json();
      // console.log(data1);
      const img = data1.sprites.other.dream_world.front_default;
      const types = data1.types;
      const typesPok = types.map((item) => {
        return `<button class="card-buttons" id=${item.type.name}> ${item.type.name} </button>`;
      });

      generalContainer.innerHTML += `
        <div class="card">
          <div class="card-upper">
            <div class="card-upper-info"> 
              <h2 class="card-upper-text"> #${data1.id} </h2>
              <h2 class="card-upper-text"> ${data1.name} </h2>
            </div>
            <div class="btn-heart-container">
              <button class="btn-heart btn-add"> ADD LIKE </button>
            </div>
          </div>
          <img src=${img} alt=${data1.name} class="card-img" />
          <div class="card-buttons-container">
            ${typesPok.join(" ")}
          </div>
        </div>
      `;

      const blackHeartLike = document.querySelectorAll(".btn-heart");
      addLikePok(blackHeartLike);
    });
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
  }
};

// *******************************************************************************************

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  generalContainer.innerHTML = "";
  buttons.innerHTML = "";
  let searchPok = document.getElementById("search-pok").value;
  const fetchApi = async (url) => {
    loader.style.display = "block";
    generalContainer.innerHTML = "";
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      const img = data.sprites.other.dream_world.front_default;
      const types = data.types;
      const typesPok = types.map((item) => {
        return `<button class="card-buttons" id=${item.type.name}> ${item.type.name} </button>`;
      });

      generalContainer.innerHTML += `
        <div class="card">
          <div class="card-upper">
            <div class="card-upper-info"> 
              <h2 class="card-upper-text"> #${data.id} </h2>
              <h2 class="card-upper-text"> ${data.name} </h2>
            </div>
            <button class="btn-heart btn-add"> ADD LIKE </button> 
          </div>
          <img src=${img} alt=${data.name} class="card-img" />
          <div class="card-buttons-container">
            ${typesPok.join(" ")}
          </div>
        </div>
      `;

      const blackHeartLike = document.querySelector(".btn-heart");
      blackHeartLike.addEventListener("click", function () {
        cont++;
        contLikes.textContent = cont;
        let parentDivId =
          this.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[1].cloneNode(
            true
          );
        let parentDivName =
          this.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[3].cloneNode(
            true
          );
        let parentDivImg =
          this.parentElement.parentElement.childNodes[3].cloneNode(true);
        console.log(parentDivId);
        let removeItem = document.createElement("button");
        removeItem.innerHTML =
          '<ion-icon name="close-outline" class="btn-delete"></ion-icon>';
        removeItem.addEventListener("click", function () {
          newGeneralDiv.remove();
          cont--;
          contLikes.textContent = cont;
        });

        let upperDiv = document.createElement("div");
        upperDiv.className = "likes-view-card-upper";

        upperDiv.appendChild(parentDivId);
        upperDiv.appendChild(removeItem);

        let newGeneralDiv = document.createElement("div");
        newGeneralDiv.className = "likes-view-card";

        newGeneralDiv.appendChild(upperDiv);
        newGeneralDiv.appendChild(parentDivImg);
        newGeneralDiv.appendChild(parentDivName);

        likesView.appendChild(newGeneralDiv);
      });
    } catch (error) {
      console.error(error);
    } finally {
      loader.style.display = "none";
    }
  };
  fetchApi(`https://pokeapi.co/api/v2/pokemon/${searchPok.toLowerCase()}`);
});

// ***************************************************************
function addLikePok(btnLikePoke) {
  btnLikePoke.forEach(function (itemLike) {
    itemLike.addEventListener("click", function () {
      cont++;
      contLikes.textContent = cont;
      let parentDivId =
        itemLike.parentElement.parentElement.childNodes[1].childNodes[1].cloneNode(
          true
        );
      let parentDivName =
        itemLike.parentElement.parentElement.childNodes[1].childNodes[3].cloneNode(
          true
        );
      let parentDivImg =
        itemLike.parentElement.parentElement.parentElement.childNodes[3].cloneNode(
          true
        );
      let removeItem = document.createElement("button");
      removeItem.innerHTML =
        '<ion-icon name="close-outline" class="btn-delete"></ion-icon>';
      removeItem.addEventListener("click", function () {
        newGeneralDiv.remove();
        cont--;
        contLikes.textContent = cont;
      });

      let upperDiv = document.createElement("div");
      upperDiv.className = "likes-view-card-upper";

      upperDiv.appendChild(parentDivId);
      upperDiv.appendChild(removeItem);

      let newGeneralDiv = document.createElement("div");
      newGeneralDiv.className = "likes-view-card";

      newGeneralDiv.appendChild(upperDiv);
      newGeneralDiv.appendChild(parentDivImg);
      newGeneralDiv.appendChild(parentDivName);

      likesView.appendChild(newGeneralDiv);
    });
  });
}
// ***************************************************************
