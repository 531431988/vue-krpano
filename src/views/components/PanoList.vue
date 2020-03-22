<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in list" :key="index" @click="onSlideClick(index)">
      <van-image
        width="100%"
        :src="item.src"
      />
      <p class="title">{{item.title}} {{index+1}}</p>
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 3,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      },
      list: [{
        src: './imgs/achilleion-hof-unten.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/canaldemure5.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/kalamaki-strand.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/kassiopi-felsen.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/korfu-stadt-alte-festung-ganz-oben.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/pantokrator-antenne.tiles/thumb.jpg',
        title: '测试'
      }, {
        src: './imgs/pantokrator-kloster.tiles/thumb.jpg',
        title: '测试'
      }]
    }
  },
  methods: {
    onSlideClick () {
    }
  }

}
</script>
<style lang="less" scoped>
  .swiper-container {
    position: absolute;
    left: 0;
    bottom: 120px;
    width: 100%;
    z-index: 999;
    padding: 10px;
    background: rgba(0, 0, 0, 0.2);
    .swiper-slide {
      border: 3px solid transparent;
      &:not(:first-child) {
        margin-left: 15px
      }
      .van-image{
        vertical-align: middle;
      }
      &-active{
        border-color: @primary-color
      }
    }
    .title{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      margin: 0;
      text-align: center;
      color: #fff;
      font-size: 14px;
      padding: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>
