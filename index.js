window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".homepage").style.display = "block";
  }, 500);
});

// NAVBAR

document.addEventListener("DOMContentLoaded", function () {
  var servicosLink = document.getElementById("servicosLink");
  var portfolioLink = document.getElementById("portfolioLink");

  function toggleMenuOptions(menuLink, menuOptionsClass) {
    menuLink.addEventListener("click", function (event) {
      event.preventDefault(); // Evita a ação padrão do clique

      // Se as opções já estiverem visíveis, remove-as
      var menuOptions = document.querySelector("." + menuOptionsClass);
      if (menuOptions) {
        menuOptions.remove();
        return; // Sai da função para evitar a criação duplicada das opções
      }

      // Cria as opções do menu
      menuOptions = document.createElement("ul");
      menuOptions.classList.add(menuOptionsClass);
      if (menuOptionsClass === "servicos-options") {
        menuOptions.innerHTML = `
          <li><a href="#servicosprojetos">Nossos Trabalhos</a></li>
          <li><a href="#servicosapps">Nossos Aplicativos</a></li>
          <li><a href="./acesso-rapido/projetos.html">Projetos</a></li>
          <li><a href="./acesso-rapido/laudo.html">Laudos</a></li>
          <li><a href="./acesso-rapido/auditoria.html">Auditoria</a></li>
          <li><a href="./acesso-rapido/assessoria.html">Assessoria</a></li>
          <li><a href="./acesso-rapido/inspecao.html">Inspeção</a></li>
        `;
        // Exibe as seções "Projetos e Execuções" e "Nossos Aplicativos"
        document.getElementById("servicosprojetos").classList.remove("hidden");
        document.getElementById("servicosapps").classList.remove("hidden");
      } else if (menuOptionsClass === "portfolio-options") {
        menuOptions.innerHTML = `
          <li><a href="#nossosclientes">Nossos Clientes</a></li>
          <li><a href="#nossagaleria">Nossa Galeria</a></li>
        `;
        // Exibe as seções "Nossos Clientes" e "Nossa Galeria"
        document.getElementById("nossosclientes").classList.remove("hidden");
        document.getElementById("nossagaleria").classList.remove("hidden");
      }

      // Adiciona as opções ao menu
      menuLink.appendChild(menuOptions);
      menuOptions.classList.add("show"); // Adiciona a classe show para ativar a animação

      // Adiciona lógica para rolar até as seções correspondentes quando uma das opções é clicada
      menuOptions.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          var targetSectionId = event.target.getAttribute("href").substring(1);
          var targetSection = document.getElementById(targetSectionId);
          if (targetSection) {
            event.preventDefault();
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Remove as opções do menu após clicar em uma delas
            menuOptions.remove();
          }
        }
      });
    });
  }

  // Adiciona ouvintes de evento para os menus de serviços e portfólio
  toggleMenuOptions(servicosLink, "servicos-options");
  toggleMenuOptions(portfolioLink, "portfolio-options");

  // Adiciona um ouvinte de evento para minimizar as opções dos menus ao clicar em qualquer lugar da tela, exceto nos próprios menus ou nas opções
  document.addEventListener("click", function (event) {
    var servicosOptions = document.querySelector(".servicos-options");
    var portfolioOptions = document.querySelector(".portfolio-options");
    if (
      servicosOptions &&
      !event.target.closest(".servicos-options") &&
      event.target !== servicosLink
    ) {
      servicosOptions.remove();
    }
    if (
      portfolioOptions &&
      !event.target.closest(".portfolio-options") &&
      event.target !== portfolioLink
    ) {
      portfolioOptions.remove();
    }
  });

  // Adiciona um ouvinte de evento para remover as opções dos menus ao rolar para as seções correspondentes
  window.addEventListener("scroll", function () {
    var servicosOptions = document.querySelector(".servicos-options");
    var portfolioOptions = document.querySelector(".portfolio-options");
    if (servicosOptions) {
      servicosOptions.remove();
    }
    if (portfolioOptions) {
      portfolioOptions.remove();
    }
  });
});

// carrossel
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const carousel = document.querySelector(".necessidades");
const options = carousel.children;
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function nextOption() {
  currentIndex = (currentIndex + 1) % options.length;
  updateCarousel();
}

function prevOption() {
  currentIndex = (currentIndex - 1 + options.length) % options.length;
  updateCarousel();
}

function updateCarousel() {
  options[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}


function handleGesture() {
  const swipeThreshold = 50; // Valor mínimo de deslocamento do dedo para considerar um gesto de deslizar

  if (touchEndX < touchStartX - swipeThreshold) {
    // Deslizar para a esquerda
    nextOption();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Deslizar para a direita
    prevOption();
  }
}

prevButton.addEventListener("click", prevOption);
nextButton.addEventListener("click", nextOption);

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

carousel.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleGesture();
});

// Atualiza o carrossel quando a página é carregada
updateCarousel();

// swiper

// screen (nossos apps)

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const screen = document.querySelector(".screen"),
  inovacao = document.querySelector(".inovacao");

screen.onmouseenter = (event) => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    inovacao.innerText = inovacao.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return inovacao.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= inovacao.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

// STATS

function counterAbout() {
  const elementsNumbersAbout = document.querySelectorAll(".stats span");
  elementsNumbersAbout.forEach((element) => {
    counterElement(element);
  });
}

function counterElement(element) {
  if (element) {
    const number = Number(element.innerText);
    element.innerText = "";
    const time = 3000 / number;

    for (let counter = 0; counter <= number; counter++) {
      setTimeout(() => {
        element.innerText = String(counter);
      }, counter * time);
    }
  }
}

// Selecione a seção que você deseja observar
const secaoObservada = document.querySelector(".container-sobre-anos");
function observeSection() {
  // Crie uma instância do Intersection Observer
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counterAbout();
        observer.disconnect();
      }
    });
  });

  // Observe a seção
  if (secaoObservada) {
    observer.observe(secaoObservada);
  }
}

observeSection();

// GALERIA

const images = document.querySelectorAll(".pic img");
images.forEach((image) => {
  const altText = image.getAttribute("alt");
  if (altText) {
    image.insertAdjacentHTML(
      "afterend",
      `<span class="alt-content">${altText}</span>`
    );
  }
});

let ultimaCategoria = "";

const projetos = document.querySelectorAll(".pic");
const categorias = document.querySelectorAll(".categoria-projetos");
categorias.forEach((categoria) => {
  categoria.addEventListener("click", (ev) => {
    mostrarprojetos(ev.currentTarget.innerText);
  });
});

function mostrarprojetos(categoria) {
  if (categoria === ultimaCategoria) {
    projetos.forEach((projeto) => {
      projeto.classList.remove("show");
    });
    ultimaCategoria = "";
    return;
  }

  if (categoria === "todos") {
    projetos.forEach((projeto) => {
      projeto.classList.add("show");
    });
  } else {
    projetos.forEach((projeto) => {
      if (projeto.classList.contains(categoria)) {
        projeto.classList.add("show");
      } else {
        projeto.classList.remove("show");
      }
    });
  }
  ultimaCategoria = categoria;
}
