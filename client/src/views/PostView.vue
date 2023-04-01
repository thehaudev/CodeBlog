<template>
  <main>
    <div class="container title">
      <h2>Title</h2>
      <span>Tiêu đề của bài viết.</span>
      <input type="text" placeholder="ex: cách hoạt động của express..." />
    </div>
    <div class="container tags">
      <h2>Tags</h2>
      <span
        >Thêm tối đa 5 thẻ để mô tả nội dung bài viết của bạn. Bắt đầu nhập để
        xem gợi ý.</span
      >
      <div class="input">
        <input
          v-model="tags"
          type="text"
          placeholder="Ít nhất 1 thẻ tối đa 5 thẻ"
        />
        <div v-if="isPending" class="icon-container">
          <i class="loader"></i>
        </div>
      </div>
    </div>
    <div class="container content">
      <EditorMarkdown></EditorMarkdown>
    </div>

    <div class="container submit">
      <Button>Post</Button>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import EditorMarkdown from "../components/EditorMarkdown.vue";
const tags = ref("");
</script>
<style scoped>
main {
  width: 60%;
  height: 95%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.container {
  display: flex;
  flex-direction: column;
  border: 0.5px solid #e3e5e7;
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px 25px;
  background-color: #fff;
}
.container.submit {
  flex: 0.1;
  width: 10%;
  text-align: center;
  margin: 10px 0 0 0;
  background-color: #0a95ff;
  color: #fff;
  align-self: normal;
  margin: 10px 0 0 100px;
}

.container.content {
  padding: 0;
  border: none;
}
.container h2 {
  font-size: 24px;
}
.container span {
  font-size: 14px;
  color: #555555;
}
.container input {
  border: 0.5px solid #e3e5e7;
  margin: 10px 0 0 0;
  height: 35px;
  padding: 0 15px;
}
.container .input {
  width: 100%;
  padding: 0 0 0 0;
}
.container .input input {
  border: 0.5px solid #e3e5e7;
  margin: 10px 0 0 0;
  height: 35px;
  padding: 0 15px;
  width: 100%;
}
.title {
  width: 90%;
  flex: 0.6;
}
.content {
  width: 90%;
  flex: 5;
}
.tags {
  width: 90%;
  flex: 0.6;
}
.tags .input {
  position: relative;
}
.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 5px);
}
.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader::after,
.loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #333 #333 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}
</style>
