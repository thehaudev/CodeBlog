<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <p>{{ mail }}</p>
        <p>{{ phone }}</p>
      </div>
      <div id="contacts--social">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const mail = ref("xavier.seignard+drangies@gmail.com");
const phone = ref("06.00.00.00.00");
const mention = ref("2018 | mentions légales");
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

#container {
  padding-top: 20px;
  margin-top: 20px;
  width: 100%;
  color: white;
  background-color: #292354;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: static;
  align-self: flex-end;
}
#contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
#contacts--contact {
  text-align: right;
}
#contacts--social {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
#contacts--social div {
  height: 30px;
  width: 30px;
  background-color: white;
  border-radius: 50%;
}
#mentions p {
  font-size: 0.5em;
}
</style>
