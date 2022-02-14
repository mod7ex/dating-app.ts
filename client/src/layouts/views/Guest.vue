<template>
      <div class="container-guest">
            <Header />

            <div class="content">
                  <slot>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aperiam asperiores quos nihil deserunt!
                  </slot>
            </div>

            <Footer />
      </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";

export default {
      name: "Guest",

      components: {
            Header,
            Footer,
      },
};
</script>

<style lang="scss">
.container-guest {
      min-height: 100vh;

      display: grid;
      grid-template-rows: auto 1fr auto;
}
</style>
