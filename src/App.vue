<template>
  <div>
  
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    }
  },
  methods: {
   
  },

created () {
  setTimeout(() => {
    window.L2Dwidget.init({
      pluginRootPath: 'static/live2dw/',
      pluginJsPath: 'lib/',
      pluginModelPath: 'live2d-widget-model-hijiki/assets/',
      tagMode: false,
      debug: false,
      model: { jsonPath: './static/live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json' },
      display: { position: 'left', width: 150, height: 300 },
      mobile: { show: true },
      log: false
    })
  }, 1000)
},

}
</script>
<style lang="scss">
@import "./css/quill-css.css";
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
button,
input {
  outline: none;
  // border:none;
}
.vertical-center{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.level-center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
