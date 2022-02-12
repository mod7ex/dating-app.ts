<template>
      <router-view />
</template>

<script>
export default {
      name: "App",
};
</script>

<style lang="scss">
* {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      transition: all 0.5s ease;
}

#app {
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
      color: $black;
}

ul {
      list-style: none;
}

a {
      text-decoration: none;
}
</style>
