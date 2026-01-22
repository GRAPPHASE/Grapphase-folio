/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


 

})();

 function showService(event, id) {
  event.preventDefault();

  const contents = document.querySelectorAll('.service-content');
  const links = document.querySelectorAll('.services-list a');

  // เอา active ออกจากเมนู
  links.forEach(link => link.classList.remove('active'));

  // fade out ทุก content
  contents.forEach(content => {
    content.classList.remove('active');
  });

  // หน่วงนิดนึงก่อน fade in ตัวใหม่
  setTimeout(() => {
    document.getElementById(id).classList.add('active');
  }, 150);

  // active เมนูที่กด
  event.currentTarget.classList.add('active');
}
function showService(event, id) {
  event.preventDefault();

  const contents = document.querySelectorAll('.service-content');
  const links = document.querySelectorAll('.services-list a');

  // เอา active ออกจากเมนู
  links.forEach(link => link.classList.remove('active'));

  // fade out ทุก content
  contents.forEach(content => {
    content.classList.remove('active');
  });

  // หน่วงนิดนึงก่อน fade in ตัวใหม่
  setTimeout(() => {
    document.getElementById(id).classList.add('active');
  }, 250);

  // active เมนูที่กด
  event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const iso = new Isotope('.isotope-container', {
    itemSelector: '.isotope-item',
    layoutMode: 'masonry'
  });

  const filterButtons = document.querySelectorAll('.portfolio-filters li');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      if (filterValue === '*') {
        // All → ซ่อน portfolio-hidden
        iso.arrange({
          filter: function (itemElem) {
            return !itemElem.classList.contains('portfolio-hidden');
          }
        });
      } else {
        // หมวดอื่น → แสดงตาม filter ปกติ
        iso.arrange({
          filter: filterValue
        });
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.isotope-item');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const showLessBtn = document.getElementById('showLessBtn');
  const filterBtns = document.querySelectorAll('.portfolio-filters li');

  const SHOW_COUNT = 6;
  let isAllFilter = true;

  // INIT ISOTOPE
  const iso = new Isotope('.isotope-container', {
    itemSelector: '.isotope-item',
    layoutMode: 'masonry'
  });

  // ===== ALL จำกัดจำนวน =====
  function applyAllLimit() {
    let count = 0;

    items.forEach(item => {
      if (count < SHOW_COUNT) {
        item.classList.remove('portfolio-hidden');
        count++;
      } else {
        item.classList.add('portfolio-hidden');
      }
    });

    iso.arrange({
      filter: item => !item.classList.contains('portfolio-hidden')
    });

    loadMoreBtn.style.display = 'inline-block';
    showLessBtn.style.display = 'none';
  }

  // ===== FILTER BUTTON =====
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // ALL
      if (filterValue === '*') {
        isAllFilter = true;
        applyAllLimit();
      }
      // หมวดอื่น
      else {
        isAllFilter = false;

        items.forEach(item =>
          item.classList.remove('portfolio-hidden')
        );

        iso.arrange({ filter: filterValue });

        loadMoreBtn.style.display = 'none';
        showLessBtn.style.display = 'none';
      }
    });
  });

  // ===== LOAD MORE =====
  loadMoreBtn.addEventListener('click', () => {
    if (!isAllFilter) return;

    let revealed = 0;

    items.forEach(item => {
      if (
        item.classList.contains('portfolio-hidden') &&
        revealed < SHOW_COUNT
      ) {
        item.classList.remove('portfolio-hidden');
        revealed++;
      }
    });

    // แก้ไขตรงนี้: ต้องใส่ filter เพื่อให้ Isotope คำนวณพื้นที่ใหม่และขยับ Item ขึ้นมา
    iso.arrange({
      filter: itemElem => !itemElem.classList.contains('portfolio-hidden')
    });

    if (document.querySelectorAll('.portfolio-hidden').length === 0) {
      loadMoreBtn.style.display = 'none';
      showLessBtn.style.display = 'inline-block';
    }
  });

  // ===== SHOW LESS =====
  showLessBtn.addEventListener('click', () => {
    if (!isAllFilter) return;

    applyAllLimit();

    // เลื่อนจอกลับไปที่หัวข้อ Portfolio หลังจากย่อ
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ===== START AT ALL =====
  applyAllLimit();
    });

    function scrollFilters(direction) {
  const container = document.getElementById('filterList');
  const scrollAmount = 250; // ปรับความแรงในการเลื่อนได้ที่นี่
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}