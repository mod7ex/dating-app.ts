<script setup lang="ts">
import { computed, ref } from "vue";
import { useMeStore } from "../../stores/me";
import { useAppStore } from "../../stores/app";
let store = useMeStore();
let appStore = useAppStore();

let form = computed(() => store.meta);

const loading = ref(false);
let countryOptions = computed(() => appStore.countryOptions);

const remoteMethod = async (query: string) => {
      if (!query) return;

      loading.value = true;
      await appStore.fetch_countries(query);
      setTimeout(() => {
            loading.value = false;
      }, 200);
};

let saveForm = () => {
      console.log(form.value);
};
</script>

<template>
      <el-form :model="form" :inline="true" label-position="right">
            <el-form-item label="Gender">
                  <el-radio-group v-model="form.gender">
                        <el-radio label="none">Not selected</el-radio>
                        <el-radio label="male">Male</el-radio>
                        <el-radio label="female">Female</el-radio>
                  </el-radio-group>
            </el-form-item>

            <el-form-item label="Date of birth">
                  <el-date-picker
                        v-model="form.dob"
                        type="date"
                        placeholder="Pick a day"
                  />
            </el-form-item>

            <el-form-item label="Country">
                  <el-select-v2
                        v-model="form.location.country"
                        style="width: 240px"
                        multiple
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        clearable
                        :options="countryOptions"
                        :loading="loading"
                        placeholder="Search for a country"
                  />
            </el-form-item>

            <el-form-item label="State/Region">
                  <el-input type="text" v-model="form.location.state" />
            </el-form-item>

            <el-form-item label="City">
                  <el-input type="text" v-model="form.location.city" />
            </el-form-item>

            <br />

            <el-form-item>
                  <el-button @click="saveForm">Save</el-button>
            </el-form-item>
      </el-form>
</template>

<style lang="scss"></style>
