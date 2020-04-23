<template>
  <div class="footer">
    <p>作者：俞阳</p>
    <p>学校：浙江传媒大学 &nbsp;&nbsp; | &nbsp;&nbsp; 学院：媒体工程学院 &nbsp;&nbsp; | &nbsp;&nbsp; 专业：信息管理与信息系统</p>
    <p>学号：160806211</p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .footer{
    // width: 100%;
    min-width: 1000px;
    height: 200px;
    background-color: black;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      width:auto
    }
    p:nth-child(1),p:nth-child(2){
      margin-bottom: 30px;
    }
  }
</style>