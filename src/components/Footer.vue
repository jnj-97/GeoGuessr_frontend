<template>
  <footer
    style="
      padding: 3%;
      bottom: 0;
      background-color: black;
      color: blanchedalmond;
    "
  >
    <h1>Created by {{ name }}</h1>
  </footer>
</template>
<script>
export default {
  name: "FOOTER",
  data() {
    return {
      name: "Nobin Johnson",
    };
  },
};
</script>
