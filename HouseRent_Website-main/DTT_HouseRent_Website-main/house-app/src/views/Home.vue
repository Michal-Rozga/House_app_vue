<template>
  <div class="home">
    <div class="title">
      <h1>Houses</h1>
      <router-link to="/create" tag="button" class="create__button">+ CREATE NEW</router-link>
    </div>
    <Houses /> 
  </div>
</template>

<script>
import Houses from './Houses/Houses.vue'



export default {
  name: 'Home',
  components: { Houses },
  
}
</script>

<style lang="scss">
.home{
  max-width: 1335px;
  margin-right: auto;
  margin-left: auto;

  .title {
    display: flex;
    flex-direction: row;
    margin-top: 75px;
    padding-bottom: 30px;
    align-content: center;
    justify-content: space-between;
    
    h1{
      position: relative;
    }

    .create__button {
      position: relative;
      background-color: #e65540;
      border-radius: 10px;
      font-size: 22px;
      color: #FFFFFF;
      padding: 8px;
      width: 200px;
      text-align: center;
      transition-duration: 0.4s;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
