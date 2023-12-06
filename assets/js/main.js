/**
 * Template Name: DevFolio
 * Updated: Nov 17 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  function factorial(fact) {
    return fact <= 1 ? 1 : fact * factorial(fact - 1);
  }

  const calculateFactorial = () => {
    const inputNumber = parseInt(select("#factorial").value);
    const resultInput = select("#result-factorial");

    if (!isNaN(inputNumber)) {
      const result = factorial(inputNumber);
      resultInput.value = result;
    } else {
      resultInput.value = "Invalid input";
    }
  };

  on("click", "#calculate-factorial-Btn", calculateFactorial);

  function diceRandom() {
    let dice = Math.floor(Math.random() * 6 + 1);
    return dice;
  }

  const handleRandomButtonClick = () => {
    const resultInput = select("#result-random-dice");
    const randomValue = diceRandom();

    resultInput.value = randomValue;
  };

  on("click", "#random-dice-Btn", handleRandomButtonClick);

  function findCircle(n) {
    let length_circle = 2 * (3.14 * n);
    return length_circle.toFixed(2);
  }

  const calculateRadiusCircle = () => {
    const inputRadius_Circle = parseFloat(document.getElementById('radius-circle').value);
    const resultInput = document.getElementById("result-radius-cirlce");

    if (!isNaN(inputRadius_Circle)) {
      const result = findCircle(inputRadius_Circle);
      resultInput.value = result;
    } else {
      resultInput.value = "Invalid input";
    }
  };

  document.getElementById("calculate-raduisCircle-Btn").addEventListener("click", calculateRadiusCircle)


  const F2C = (n) => {
    let celsius = (n - 32) / 1.8;
    return celsius.toFixed(2);
  };
  
  const calculateF2C = () => {
    const inputNumber = parseFloat(document.getElementById("f2c").value);
    const resultInput = document.getElementById("result-f2c");
  
    if (!isNaN(inputNumber)) {
      const result = F2C(inputNumber);
      resultInput.value = `${result} ํC`;
    } else {
      resultInput.value = "Invalid input";
    }
  };
  
  document.getElementById("calculate-f2c-Btn").addEventListener("click", calculateF2C);

  // let currentCharCode = 'A'.charCodeAt(0)

  // const printAlphabet = () => {
  //   const alphabetInput = document.getElementById('a-z');
  //   alphabetInput.value = String.fromCharCode(currentCharCode);
  //   currentCharCode++;

  //   if (currentCharCode > 'Z'.charCodeAt(0)) {
  //     currentCharCode = 'A'.charCodeAt(0)
  //   }
  // };

  // const intervalId = setInterval(printAlphabet, 1000);

  function Day2Second(day){
    let seconds = (day * 24) * 3600
    return seconds
  }

  const calculateD2S = () => {
    const inputNumber = parseInt(select("#d2s").value);
    const resultInput = select("#result-d2s");

    if (!isNaN(inputNumber)) {
      const result = Day2Second(inputNumber);
      resultInput.value = `${result} seconds`;
    } else {
      resultInput.value = "Invalid input";
    }
  };

  on("click", "#calculate-d2s-Btn", calculateD2S);


  function fetchRandomNeko() {
    fetch('https://nekos.best/api/v2/neko')
      .then(response => response.json())
      .then(data => {
        const nekoImage = document.getElementById('neko');
        nekoImage.src = data.results[0].url;
      })
      .catch(error => {
        console.error('Error fetching random neko:', error);
      });
  }
  
  document.getElementById('fetchButton').addEventListener('click', fetchRandomNeko);
  


  document.addEventListener("DOMContentLoaded", function () {
    var xValues = ["Eat", "Sleep", "Exercise", "Relax", "Work"];
    var yValues = [3, 8, 1, 4, 8];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
  
    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "World Wide Wine Production 2018"
        }
      }
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    // ดึงข้อมูลจากไฟล์ JSON
    fetch('assets/country.json')
        .then(response => response.json())
        .then(data => {
            // สร้างข้อมูลสำหรับ Chart.js
            const labels = data.map(item => item.country);
            const temperatures = data.map(item => item.temperature);

            // สร้างกราฟ
            const ctx = document.getElementById('temperatureChart').getContext('2d');
            const temperatureChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: temperatures,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

window.addEventListener("load", function() {
  const form = document.getElementById('my-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  });
});

function predictName() {
  const nameToCheck = document.getElementById('predict-name').value;

  const apiUrl = `https://api.nationalize.io/?name=${nameToCheck}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const count = data.count;
      const countries = data.country;

      document.getElementById('predict-count').value = count;
      document.getElementById('predict-country').value = countries.map(country => `${country.country_id}: ${country.probability}`).join(', ');
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

document.getElementById('predict-btn').addEventListener('click', predictName)

function fetchCryptoData() {
  const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // const updateTime = data.time.updated;
      const utcUpdateTime = data.time.updatedISO;
      const thaiUpdateTime = new Date(utcUpdateTime).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });

      const usdRate = data.bpi.USD.rate;
      const gbpRate = data.bpi.GBP.rate;
      const eurRate = data.bpi.EUR.rate;

      document.getElementById('crypto-time').value = `Update Time (ICT): ${thaiUpdateTime}`;
      document.getElementById('crypto-USD').value = `USD Rate: ${usdRate}`;
      document.getElementById('crypto-GBP').value = `GBP Rate: ${gbpRate}`;
      document.getElementById('crypto-EUR').value = `EUR Rate: ${eurRate}`;
    })
    .catch(error => {
      console.error('Error fetching crypto data:', error);
    });
}

  setInterval(fetchCryptoData, 10000);
  fetchCryptoData()


})();
