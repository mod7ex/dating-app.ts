<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

const Preview = defineAsyncComponent(() => import("./UploadPreview.vue"));

import type { UploadInstance, UploadUserFile } from "element-plus";

const uploadRef = ref<UploadInstance>();
const filesList = ref<UploadUserFile[]>([]);

const submitUpload = () => {
      // uploadRef.value!.submit();
      console.log(filesList.value);
};
</script>

<template>
      <el-upload
            class="upload-area"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :auto-upload="false"
            :show-file-list="false"
            :limit="3"
            :file-list="filesList"
      >
            <i-mdi-upload />

            <div class="el-upload__text">
                  Drop images here or <em>click to upload</em>
            </div>
            <template #tip>
                  <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb, less than 3
                        images
                  </div>
            </template>
      </el-upload>

      <div class="upload-submit upload-area">
            <el-button class="ml-3" type="success" @click="submitUpload">
                  upload to server
            </el-button>
      </div>

      <!-- ****************** -->

      <div class="preview-upload">
            <div v-for="(file, i) in filesList" :key="i">
                  <Preview :file="file.raw" />
            </div>
      </div>
</template>

<style lang="scss">
.upload-area {
      @include center($form-width);
      @include flex($direction: column, $align: stretch);

      margin-bottom: 2em;

      &.upload-submit {
            align-items: center;
      }

      .el-upload__tip {
            text-align: center;
      }

      .el-upload {
            .el-upload-dragger {
                  @include flex($direction: column);

                  svg {
                        width: 5em;
                        height: 5em;
                  }
            }
      }

      li.el-upload-list__item {
            background-color: rgba($primary, 0.1);

            &:hover {
                  background-color: rgba($primary, 0.3);
            }
      }
}

.preview-upload {
      @include flex($gap: 1em);
}
</style>
