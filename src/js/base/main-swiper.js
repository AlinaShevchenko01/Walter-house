import Swiper from "swiper";
import 'swiper/css';
import {Pagination, Mousewheel} from 'swiper/modules';


let mainSwiper;

function initSwiper() {
  const swiperBlock = document.querySelector(".swiper-main");
  const wrapper = document.querySelector(".swiper-main .swiper-main__wrapper");
  const slides = document.querySelectorAll(".swiper-main .swiper-main__slide");

  if (window.innerWidth > 1024) {
    if (!mainSwiper) {
      if (!swiperBlock.classList.contains('swiper')) {
        swiperBlock.classList.add('swiper');
      }
      if (!wrapper.classList.contains("swiper-wrapper")){
        wrapper.classList.add("swiper-wrapper");
      }
      slides.forEach(slide => {
        if (!slide.classList.contains("swiper-slide")){
          slide.classList.add("swiper-slide");
        }
      })

      mainSwiper = new Swiper('.swiper-main', {
        modules: [Mousewheel, Pagination],
        grabCursor: true,
        speed: 800,
        slidesPerView: 1,
        direction: 'vertical',
        //mousewheel: true,
        pagination: {
          el: ".swiper-main__pagination",
          clickable: true,
          renderBullet: function(index, className) {
            return `<button class="swiper-main__pagination-btn ${className}">
                      <span class = "swiper-main__pagination-dot"></span>
                    </button>`
          }
        }
      })
    }

  } else {
    if (mainSwiper) {
      mainSwiper.destroy(true, true);
      mainSwiper = null
    }

    swiperBlock.classList.remove('swiper');
    wrapper.classList.remove("swiper-wrapper");
    slides.forEach(slide => {
      slide.classList.remove("swiper-slide");
    })
    wrapper.style.transform = "";
    wrapper.style.height = "";
    wrapper.style.overflow = "";
    document.body.style.overflow = "";
  }}

initSwiper();

window.addEventListener('resize', () => {
  initSwiper();
});

