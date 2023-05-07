<template>
  <div class="d-flex justify-content-center align-items-center container">
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>
<script>
    import { useStore } from 'vuex'
    export default {
        beforeCreate() {
            const store = useStore();
            store.commit('loadStore');
        }
    }
</script>

<style>
.container{
  font-family: 'Montserrat', sans-serif;
  
  height: 100vh;
  margin: 0;
  padding: 0;
  min-width: -webkit-fill-available;
  width: -webkit-fill-available;
  background: rgb(194,255,99);
  background: linear-gradient(27deg, rgb(242 247 198) 0%, rgb(229 255 188) 50%, rgb(247 249 188) 100%);
}
</style>