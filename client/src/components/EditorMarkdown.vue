<template>
  <QuillEditor
    :modules="modules"
    :toolbar="[
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['image', 'link'],
    ]"
    theme="snow"
  />
</template>
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
