const btnNormal = document.getElementById("btn-normal");
const btnFighting = document.getElementById("btn-fighting");
const btnFlying = document.getElementById("btn-flying");
const btnPoison = document.getElementById("btn-poison");
const btnGround = document.getElementById("btn-ground");
const btnRock = document.getElementById("btn-rock");
const btnBug = document.getElementById("btn-bug");
const btnGhost = document.getElementById("btn-ghost");
const btnSteel = document.getElementById("btn-steel");
const btnFire = document.getElementById("btn-fire");
const btnWater = document.getElementById("btn-water");
const btnGrass = document.getElementById("btn-grass");
const btnElectric = document.getElementById("btn-electric");
const btnPsychic = document.getElementById("btn-psychic");
const btnIce = document.getElementById("btn-ice");
const btnDragon = document.getElementById("btn-dragon");
const btnFairy = document.getElementById("btn-fairy");
const btnDark = document.getElementById("btn-dark");

if (loader == false) {
  console.log("esta cargando");
}

// ***************************************************************

btnNormal.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(1);
});
btnFighting.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(2);
});
btnFlying.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(3);
});
btnPoison.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(4);
});
btnGround.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(5);
});
btnRock.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(6);
});
btnBug.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(7);
});
btnGhost.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(8);
});
btnSteel.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(9);
});
btnFire.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(10);
});
btnWater.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(11);
});
btnGrass.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(12);
});
btnElectric.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(13);
});
btnPsychic.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(14);
});
btnIce.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(15);
});
btnDragon.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(16);
});
btnDark.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(17);
});
btnFairy.addEventListener("click", (e) => {
  e.preventDefault();
  callApi(18);
});
btnAll.addEventListener("click", () => {
  fetchApi(url);
});

// ***************************************************************

function callApi(number) {
  const fetchApi = async (url) => {
    loader.style.display = "block";
    generalContainer.innerHTML = "";
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.pokemon);
      infoPok(data.pokemon);
    } catch (error) {
      console.error(error);
    }
  };
  fetchApi(`https://pokeapi.co/api/v2/type/${number}`);

  const infoPok = async (data) => {
    generalContainer.innerHTML = "";
    buttons.innerHTML = "";
    try {
      data.map(async (item) => {
        const response1 = await fetch(item.pokemon.url);
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
}
