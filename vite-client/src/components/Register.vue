<script setup lang="ts">
import { reactive, ref } from "vue";

let register = reactive({
      email: undefined,
      username: undefined,
      password: undefined,
      password_confirmation: undefined,
      agree: false,
});

let onSubmit = () => {
      console.log(register);
};
</script>

<template>
      <el-form :model="register" class="demo-form-inline">
            <el-form-item>
                  <el-input
                        type="email"
                        v-model="register.email"
                        placeholder="example@email.com"
                  />
            </el-form-item>

            <el-form-item>
                  <el-input
                        type="text"
                        v-model="register.username"
                        placeholder="Username"
                  />
            </el-form-item>

            <el-form-item>
                  <el-input
                        v-model="register.password"
                        type="password"
                        placeholder="Password"
                        show-password
                  />
            </el-form-item>

            <el-form-item>
                  <el-input
                        v-model="register.password_confirmation"
                        type="password"
                        placeholder="Confirm password"
                        show-password
                  />
            </el-form-item>

            <el-form-item>
                  <el-checkbox v-model="register.agree" size="large">
                        I agree to&nbsp;
                        <el-link :underline="false">
                              Terms &#38; conditions
                        </el-link>
                  </el-checkbox>
            </el-form-item>

            <el-form-item class="cta-auth">
                  <el-button type="primary" @click="onSubmit">
                        sign up
                  </el-button>

                  <div class="cta-other-auth">
                        <p>have an account ?</p>
                        <router-link :to="{ name: 'Auth' }">
                              &nbsp;login
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
