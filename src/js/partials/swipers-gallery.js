import Swiper from "swiper";
import 'swiper/css';
import {Navigation} from 'swiper/modules';

const swiperElite = new Swiper(".elite__swiper", {
  loop: true,
  grabCursor: true,
  speed: 1200,
  slidesPerView: 1,
})

const swiperVip = new Swiper(".vip__swiper", {
  loop: true,
  grabCursor: true,
  speed: 1200,
  slidesPerView: 1,
})

const swiperExtra = new Swiper(".extra__swiper", {
  loop: true,
  grabCursor: true,
  speed: 1200,
  slidesPerView: 1,
})