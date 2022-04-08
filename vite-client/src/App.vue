<template>
      <router-view />
</template>

<style lang="scss">
* {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      transition: all 0.3s ease;
}

#app {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;

      a {
            text-decoration: none;
            display: inline-block;
      }

      ul {
            list-style: none;
      }

      .center {
            @include center();
      }

      .content {
            padding: 0 1em;
            height: 100%;
      }

      .auth-form {
            @include center($form-width);
      }

      .el-header,
      .el-footer {
            .center {
                  padding-top: 0.5em;
            }
      }
}
</style>
