<template>
  <div class="content">
    <header class=" conetent-header">
      <nav></nav>
      <div class="nav-pic"></div>
    </header>
    <div class="content-mian">
      <main></main>
      <aside></aside>
    </div>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "Article"
};
</script>

<style>
.content {
  width: 60vw;
  height: 98vh;
  margin: 0 auto;
  background-color: var(--color-text);
}

nav {
  width: 100%;
  height: 45px;
  background-color: rgb(148, 52, 52);
}

.nav-pic {
  width: 100%;
  height: 12vh;
  background-color: rgb(241, 196, 196);
}

.content-mian {
  display: flex;
  height: calc(100% - 49px - 45px - 12vh);
}

main {
  flex: 1;
  background-color: blue;
}

aside {
  width: 250px;
  background-color: rgb(209, 224, 125);
}

footer {
  width: 100%;
  height: 49px;
  background-color: aquamarine;
}
</style>
