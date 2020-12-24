<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Request from "@/api/request.js";

export default {
  name: "App"
};
</script>

<style>
@import "assets/css/base.css";

@import "assets/css/normalize.css";
</style>
