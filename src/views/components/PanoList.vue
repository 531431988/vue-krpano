<template>
  <swiper ref="swiper" :options="swiperOptions" @click-slide="handleClickSlide">
    <swiper-slide v-for="(item, index) in list" :key="index">
      <van-image fit="cover" width="100%" :src="item.src" />
      <p class="title">{{item.title}}</p>
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

  inject: ['getContext'],
  data () {
    return {
      swiperOptions: {
        slidesPerView: 3,
        centeredSlides: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      },
      list: [{
        src: './krpano/panorama.tiles/balcony/thumb.jpg',
        title: '阳台',
        scene: 'balcony'
      }, {
        src: './krpano/panorama.tiles/parlour/thumb.jpg',
        title: '客厅',
        scene: 'parlour'
      }, {
        src: './krpano/panorama.tiles/bedroom1/thumb.jpg',
        title: '卧室1',
        scene: 'bedroom1'
      }, {
        src: './krpano/panorama.tiles/bedroom2/thumb.jpg',
        title: '卧室2',
        scene: 'bedroom2'
      }, {
        src: './krpano/panorama.tiles/bedroom3/thumb.jpg',
        title: '卧室3',
        scene: 'bedroom3'
      }, {
        src: './krpano/panorama.tiles/toilet/thumb.jpg',
        title: '厕所',
        scene: 'toilet'
      }]
    }
  },
  computed: {
    swiper () {
      return this.$refs.swiper.$swiper
    },
    context () {
      return this.getContext()
    }
  },
  methods: {
    handleClickSlide (index) {
      this.swiper.slideTo(index, 1000, false)
      this.$bus.$emit('on-pano-list-click', this.list[index], index)
    }
  },
  mounted () {
    const { active } = this.context
    if (active) {
      this.swiper.slideTo(active, 1000, false)
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
    overflow: hidden;
    &:not(:first-child) {
      margin-left: 15px;
    }
    .van-image {
      vertical-align: middle;
    }
    &-active {
      border-color: @primary-color;
    }
  }
  .title {
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
