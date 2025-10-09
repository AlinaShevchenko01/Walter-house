import Swiper from "swiper";
import 'swiper/css';
import { Mousewheel, Navigation } from 'swiper/modules';
import scrollLock from 'scroll-lock';
import { disablePageScroll, enablePageScroll } from 'scroll-lock/dist/scroll-lock.js';

export function galleriesInit () {
  function initGallerySwiper({containerSwiper, nextBtn, prevBtn, currentPage, totalPages}) {
    return  new Swiper(containerSwiper, {
      modules: [Navigation],
      loop: true,
      grabCursor: true,
      speed: 800,
      slidesPerView: 1,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      on: {
        init(swiper) {
          numberPaginationInit(swiper, {
            currentSlide: currentPage,
            totalSlides: totalPages,
          })
        },
        slideChange(swiper) {
          numberPaginationChange(swiper, {
            currentSlide: currentPage,
          })
        }
      }
    })
  }

  function numberPaginationInit (swiper, {currentSlide, totalSlides}) {
    const realSlidesCount = swiper.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;
    totalSlides.textContent = String(realSlidesCount).padStart(2, '0');
    currentSlide.textContent = String(swiper.realIndex + 1).padStart(2, '0');
  }

  function numberPaginationChange (swiper, {currentSlide}) {
    currentSlide.textContent = String(swiper.realIndex + 1).padStart(2, '0');
  }

  const swiperElite = initGallerySwiper({
    containerSwiper: '.elite__swiper',
    nextBtn: '.elite .gallery-navigation__btn_next',
    prevBtn: '.elite .gallery-navigation__btn_prev',
    currentPage: document.querySelector('.elite .gallery-navigation__page'),
    totalPages: document.querySelector('.elite .gallery-navigation__pages'),
  })

  const swiperVip = initGallerySwiper({
    containerSwiper: '.vip__swiper',
    nextBtn: '.vip .gallery-navigation__btn_next',
    prevBtn: '.vip .gallery-navigation__btn_prev',
    currentPage: document.querySelector('.vip .gallery-navigation__page'),
    totalPages: document.querySelector('.vip .gallery-navigation__pages'),
  })

  const swiperExtra = initGallerySwiper({
    containerSwiper: '.extra__swiper',
    nextBtn: '.extra .gallery-navigation__btn_next',
    prevBtn: '.extra .gallery-navigation__btn_prev',
    currentPage: document.querySelector('.extra .gallery-navigation__page'),
    totalPages: document.querySelector('.extra .gallery-navigation__pages'),
  })

  const btnsOpenGallery = document.querySelectorAll('[data-open-gallery]');
  const galleries = document.querySelectorAll('[data-gallery]');

  btnsOpenGallery.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const button = e.currentTarget;
      const dataValue = button.getAttribute('data-open-gallery');
      const galleryShow = document.querySelector(`[data-gallery="${dataValue}"]`);

      if (galleryShow) {
        galleryShow.classList.add('active');
        setTimeout(() => {
          disablePageScroll();
        }, 600)
      }
    })
  })

  galleries.forEach((gallery) => {
    gallery.addEventListener('click', (e) => {
      if (e.target.closest('.gallery__btn')) {
        gallery.classList.remove('active');
        enablePageScroll();
      }
    })
  })
}