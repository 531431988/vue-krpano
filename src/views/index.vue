<template>
  <div class="krpano">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item, index) in list" :key="index">
        <img :src="item.src" />
        <p>{{item.title}}</p>
      </swiper-slide>
    </swiper>
    <Krpano xml="./krpano/test/test.xml" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { Krpano } from '@/components'
export default {
  components: {
    Swiper,
    SwiperSlide,
    Krpano
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      list: [{
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }, {
        src: '//rs.homestyler.com/floorplan/render/images/2019-12-30/8d14e424-6e80-4636-847c-4ebf4c484252/be2bee30-2ac7-11ea-906f-59510e2cbc84.front.jpg?x-oss-process=style/small4Pano',
        title: ''
      }]
    }
  },
  created () {
  }

}
</script>
<style lang="less" scoped>
.krpano {
  height: 100%;
  position: relative;
  .swiper-container {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    .swiper-slide {
      height: 100px;
    }
  }
}
</style>
