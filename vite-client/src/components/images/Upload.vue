<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import type { UploadInstance, UploadUserFile } from 'element-plus';

const Preview = defineAsyncComponent(() => import('./UploadPreview.vue'));

const maxFilesNumber = ref(3);

const filesList = ref<UploadUserFile[]>([]);

const dropFile = (uid: number | undefined) => {
  const index = filesList.value.findIndex((file) => file.raw?.uid === uid);

  if (index < 0) return;

  filesList.value.splice(index, 1);
};

const submitUpload = () => {
  console.log(filesList.value);
};
</script>

<template>
	<el-upload class="upload-area" drag multiple action="/" :disabled="filesList.length >= maxFilesNumber" :auto-upload="false" :show-file-list="false" :limit="maxFilesNumber - filesList.length" :file-list="filesList">
		<i-mdi-upload />

		<div class="el-upload__text">Drop images here or <em>click to upload</em></div>
		<template #tip>
			<div class="el-upload__tip">
				<span>jpg/png files with a size less than 500kb, less than 3 images </span>
				<span class="notice" v-if="filesList.length == maxFilesNumber">({{ maxFilesNumber }} images)</span>
			</div>
		</template>
	</el-upload>

	<div class="upload-submit upload-area">
		<el-button class="ml-3" type="success" @click="submitUpload"> upload to server </el-button>
	</div>

	<!-- ****************** -->

	<div class="preview-upload">
		<Preview v-for="(file, i) in filesList" :key="file.raw.uid" :file="file.raw" @dropFile="dropFile(file.raw.uid)" />
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

			.notice {
				color: red;
			}
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
