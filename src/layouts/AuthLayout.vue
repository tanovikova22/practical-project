<template>
  <div class="container">
    <h1>Home Page</h1>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "AuthLayout"
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #e6e;
}
</style>

