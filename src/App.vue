<template>
  <div id="app">   
    <HeaderComponent id="header-component"/>   
    <router-view></router-view>
    <FooterComponent id="footer-component" />

  </div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    
    HeaderComponent,
    FooterComponent
  }
}

</script>

<style>
@import './assets/css/styles.css';

</style>
