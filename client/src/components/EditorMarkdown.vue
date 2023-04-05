<script setup>
import { URL_IMG } from "../constants/index";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageUploader from "quill-image-uploader";
import instance from "../configs/axios";
const modules = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        instance
          .post("/images/uploads", formData)
          .then((res) => {
            resolve(URL_IMG + res.data.data.name);
          })
          .catch((err) => {
            reject("Upload failed");
            console.error("Error:", err);
          });
      });
    },
  },
};
</script>
<template>
  <QuillEditor
    :modules="modules"
    contentType="html"
    toolbar="full"
    @change="onEditorChange($event)"
  />
</template>
