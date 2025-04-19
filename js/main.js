// place js in here

window.onload = () => {
  let all = document.getElementsByClassName("zoom"),
    lightbox = document.getElementById("lightbox");

  if (all.length > 0) {
    for (let i of all) {
      i.onclick = () => {
        let clone = i.cloneNode();
        clone.className = "";
        lightbox.innerHTML = "";
        lightbox.appendChild(clone);
        lightbox.className = "show";
      };
    }
  }

  lightbox.onclick = () => {
    lightbox.className = "";
  };
};

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

function scrollToTop() {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}

function initHamburgerMenu() {
  /* initialise Hamburger-Menu */
  const hamburger = document.querySelector(".main__nav-ham");
  const navMenu = document.querySelector(".main__nav-list");
  const title = document.querySelector(".main__nav-title");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
}

initHamburgerMenu();

/**
 * Load JSON from HTML like this
 * loadJSON('my-file.json',
 *       function(data) { console.log(data); },
 *       function(xhr) { console.error(xhr); }
 * );
 *
 * @param {*} path
 * @param {*} success
 * @param {*} error
 */
function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function generateRepoItemsFrom(theData) {
  const items = Object.keys(theData);
  items.forEach((el0) => {
    const in0 = theData[`${el0}`];
    const headline = `${el0.charAt(0).toUpperCase()}${el0.slice(1)}`;
    const id = `repo-${el0}`;
    let result = `<h2>${headline}</h2>`;
    in0.forEach((el) => {
      const push = `<ul class="repo__list"><li class="repo__item"><ul>`;
      const thumbnail = `<li><img src="/assets/images/repo/${el.thumbnail}" /></li>`;
      const l0 = `<br><a href="${el.link}" target="_blank">link</a>`;
      const link = el.link?.length > 0 ? l0 : "";
      const r0 = `${el.title}`;
      const r1 = `${el.reference}`;
      const r2 = `${link}`;
      const reference = `<li><u><p>${r0}</u><br><br>${r1}<br>${r2}</p></li>`;
      const description = `<li><p>${el.description}</p></li>`;
      const pop = `</li></ul></ul>`;
      result += `${push}${thumbnail}${reference}${description}${pop}`;
    });
    document.getElementById(id).innerHTML = result;
  });
}

function logErrorMessage(theError) {
  console.error(theError);
}


document.addEventListener("keydown", function(e) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
  const o = document.getElementById("go-prev").href
    , s = document.getElementById("go-next").href;
  if (e.key == "ArrowLeft")
      window.location.assign(o);
  else if (e.key == "ArrowRight")
      window.location.assign(s);
  else if (e.key == "Escape") {
      const t = document.getElementById("bio-details");
      t.classList.toggle("expanded"),
      t.classList.toggle("collapsed")
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.graph-node img');

  // Example: Add a click event to each node
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      alert(`You clicked on ${node.alt}`);
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Create an image element for the hover effect
  const hoverImage = document.createElement('img');
  hoverImage.classList.add('hover-image');
  document.body.appendChild(hoverImage);

  // Add event listeners to all links with the data-image attribute
  const links = document.querySelectorAll('a[data-image]');
  links.forEach(link => {
    // Show the image on mouseover
    link.addEventListener('mouseover', (e) => {
      const imageSrc = link.getAttribute('data-image');
      hoverImage.src = imageSrc;
      hoverImage.style.display = 'block';
    });

    // Hide the image on mouseout
    link.addEventListener('mouseout', () => {
      hoverImage.style.display = 'none';
    });

    // Move the image with the cursor
    link.addEventListener('mousemove', (e) => {
      hoverImage.style.left = `${e.pageX + 15}px`; // Offset slightly to the right of the cursor
      hoverImage.style.top = `${e.pageY + 15}px`; // Offset slightly below the cursor
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".footer-link");

  function highlightCurrentSection() {
    let currentSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section.id;
      }
    });

    links.forEach((link) => {
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightCurrentSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.createElement("img");
  lightbox.appendChild(lightboxImg);

  // Add click event to all images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src; // Set the clicked image as the lightbox image
      lightbox.classList.add("show"); // Show the lightbox
    });
  });

  // Close the lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove("show"); // Hide the lightbox
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Select all carousels on the page
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const items = carousel.querySelectorAll(".carousel-item");
    const leftButton = carousel.querySelector(".carousel-button.left");
    const rightButton = carousel.querySelector(".carousel-button.right");
    let currentIndex = 0;

    // Function to move the carousel
    function moveCarousel(direction) {
      const totalItems = items.length;

      // Update the current index
      currentIndex = (currentIndex + direction + totalItems) % totalItems;

      // Move the carousel
      const offset = -currentIndex * 100; // Each item is 100% width
      track.style.transform = `translateX(${offset}%)`;
    }

    // Add event listeners for the buttons
    leftButton.addEventListener("click", () => moveCarousel(-1));
    rightButton.addEventListener("click", () => moveCarousel(1));

    
    
  });
});
