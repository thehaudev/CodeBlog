<script setup>
import { onMounted } from "vue";
import $ from "jquery";
import "slick-carousel";

const slides = [
  {
    id: 1,
    caption: "Slide 1",
  },
  {
    id: 2,
    caption: "Slide 2",
  },
  {
    id: 3,
    caption: "Slide 3",
  },
];

onMounted(() => {
  $(".slick-carousel").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
</script>
<template>
  <div class="slick-carousel">
    <div v-for="slide in slides" :key="slide.id">
      <p>{{ slide.caption }}</p>
    </div>
  </div>
</template>
