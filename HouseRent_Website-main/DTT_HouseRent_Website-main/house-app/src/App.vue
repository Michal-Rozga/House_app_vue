<template>
  <div id="nav">
    <Navigation />
    <Footer />
  </div>
  <router-view/>
</template>

<script>
import Navigation from './components/NavBar/Navigation.vue'
import Footer from './components/FooterBar/Footer.vue'





export default {
  name: "app",
  components: { Navigation, Footer},
  
  data() {
    return { }
  },

  created() { },
  mounted() { },
  methods() { },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');


*{
  margin: 0;
  padding: 0;
}

body{
  background-color: rgb(246, 246, 246);
  font-family: 'Open Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Montserrat", sans-serif;
  color: #000;
}

a {
  color: #679acb;
  text-decoration: none;
  /*
      Used a border-bottom instead of text-decoration underline so you can actually use transitions with it
      By initializing it with transparent (= blank / invisible) you don't get it weirdly popping out when you hover
   */
  border-bottom: 1px solid transparent;
  transition: color ease-out 250ms, border ease-out 250ms;
}
a:hover {
  color: #5d8bb7;
  /* currentColor always uses the same color as the foreground color, in this case blue */
  border-bottom-color: currentColor;
}

</style>
