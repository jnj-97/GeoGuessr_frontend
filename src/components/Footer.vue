<template>
  <footer
    class="relative top-100 p-screen bottom-4 w-screen text-4xl text-white font-mono text-center"
  >
    <h1>Created by {{ name }}</h1>
    <div
      class="flex gap-4 cursor-pointer align-center justify-center text-2xl mt-4"
    >
      <a href="https://github.com/jnj-97">Github</a>
      <a href="https://www.linkedin.com/in/nobin-johnson/">LinkedIn</a>
    </div>
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
