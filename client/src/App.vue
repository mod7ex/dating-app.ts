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
      transition: all 0.3s ease;
}

#app {
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
      background-color: $white;
      position: relative;

      .content {
            @include center();

            input[type="submit"],
            .btn {
                  padding: 1em;
                  border: none;
                  @include shadow($blure: 3px);
                  font-weight: bold;
                  color: white;
                  background-color: $brand-color;
                  cursor: pointer;

                  &:hover {
                        @include shadow();

                        color: $brand-color;
                        background-color: $white;
                  }
            }
      }
}

ul {
      list-style: none;
}

a {
      display: inline-block;
      text-decoration: none;
}

button {
      outline: none;
      border: none;
      background-color: transparent;
}

input,
textarea,
button {
      outline: none;
      border-radius: $border-radius;
}

button {
      cursor: pointer;
}

input[type="password"],
input[type="text"],
input[type="number"],
input[type="email"],
input[type="date"],
textarea {
      padding: 1em;
      border: 1px solid transparent;
      display: block;
      width: 100%;
      @include shadow($blure: 3px);
      margin-top: 0.3em;

      &:hover {
            @include shadow();
      }

      &:focus {
            @include shadow();
            border-color: rgba($black, 0.3);
      }
}
</style>
