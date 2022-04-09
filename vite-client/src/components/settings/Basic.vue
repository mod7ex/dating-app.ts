<script setup lang="ts">
import { computed } from "vue";
import { useMeStore } from "../../stores/me";
let store = useMeStore();

let form = computed(() => store.user);

let saveForm = () => {
      console.log(form.value);
};
</script>

<template>
      <el-form :model="form" label-position="top">
            <div class="input-area">
                  <el-form-item label="First name">
                        <el-input type="text" v-model="form.first_name" />
                  </el-form-item>

                  <el-form-item label="Last name">
                        <el-input type="text" v-model="form.last_name" />
                  </el-form-item>

                  <el-form-item label="E-mail">
                        <el-input type="email" v-model="form.email" />
                  </el-form-item>

                  <el-form-item label="Username">
                        <el-input type="password" v-model="form.username" />
                  </el-form-item>
            </div>

            <el-form-item class="submit">
                  <el-button @click="saveForm" type="primary">Save</el-button>
            </el-form-item>
      </el-form>
</template>
