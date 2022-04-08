<script setup lang="ts">
import { reactive, ref } from "vue";

let loginType = ref("1");

let login = reactive({
      login: undefined,
      password: undefined,
      remember_me: false,
});

let onSubmit = () => {
      console.log(login);
};
</script>

<template>
      <el-form :model="login" class="demo-form-inline">
            <el-form-item>
                  <el-input
                        :type="loginType == '1' ? 'email' : 'text'"
                        v-model="login.login"
                        :placeholder="loginType == '1' ? 'E-mail' : 'Username'"
                        class="input-with-select"
                  >
                        <template #prepend>
                              <el-select
                                    v-model="loginType"
                                    style="width: 110px"
                              >
                                    <el-option label="E-mail" value="1" />
                                    <el-option label="Username" value="2" />
                              </el-select>
                        </template>
                  </el-input>
            </el-form-item>

            <el-form-item>
                  <el-input
                        type="password"
                        v-model="login.password"
                        placeholder="Password"
                  />
            </el-form-item>

            <el-form-item>
                  <el-checkbox
                        v-model="login.remember_me"
                        size="large"
                        label="Remember me"
                  />
            </el-form-item>

            <el-form-item class="cta-auth">
                  <el-button type="primary" @click="onSubmit">
                        login
                  </el-button>

                  <div class="cta-other-auth">
                        <p>don't have an account ?</p>
                        <router-link :to="{ name: 'Auth' }">
                              &nbsp;sign-up
                        </router-link>
                  </div>
            </el-form-item>
      </el-form>
</template>

<style lang="scss">
.el-form-item {
      margin-bottom: 2em;
}
</style>
