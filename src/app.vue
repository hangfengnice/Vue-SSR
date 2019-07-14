<template>
  <div id="app">
    <div id="cover"></div>
    <Header />
    <Todo />
    <Footer />
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.vue'
import Todo from './todo/todo.vue'

export default {
  name: "app",
  components: {
    Header,
    Footer,
    Todo

  }
};
</script>

<style lang='scss' scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.6;
  z-index: -1;
}
</style>