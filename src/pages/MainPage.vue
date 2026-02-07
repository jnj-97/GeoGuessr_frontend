<script setup>
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

const userProfile = ref(null);
const callback = (response) => {
  if (response.credential) {
    const decoded = jwtDecode(response.credential);
    userProfile.value = {
      name: decoded.name,
      picture: decoded.picture,
      email: decoded.email,
    };
  }
  console.log(jwtDecode(response.credential));
};
</script>
<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <!-- Background 1: NYC -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] bg-[url('https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Background 2: Paris -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] [animation-delay:3s] bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Background 3: Tokyo -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] [animation-delay:6s] bg-[url('https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Background 4: Dubai -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] [animation-delay:9s] bg-[url('https://images.unsplash.com/photo-1528701800489-20be3c2ea9cb?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Background 5: London -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] [animation-delay:12s] bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Background 6: San Francisco -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-0 animate-[fade_18s_infinite] [animation-delay:15s] bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2400&q=80')]"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40 z-10"></div>

    <!-- Content -->
    <div class="relative z-20">
      <nav>
        <ul
          class="flex pt-4 text-4xl font-bold justify-center gap-10 text-red-600"
        >
          <li class="cursor-pointer">Home</li>
          <li @click="codeWindow = true" class="cursor-pointer">Join Game</li>
          <li class="cursor-pointer">New Game</li>
          <li class="cursor-pointer">Public Game</li>
          <li class="cursor-pointer">Create Custom Map</li>
        </ul>
      </nav>
      <GoogleLogin
        class="absolute bottom-0 left-1/3"
        v-if="!userProfile"
        :callback="callback"
      />
      <div
        class="flex justify-center align-center gap-4 w-1/2 relative left-1/3 top-1/4 p-4"
        v-if="userProfile"
      >
        <img class="rounded-full w-16 h-16" :src="userProfile.picture" />
        <h1 class="text-2xl text-white font-thin">
          Wecome {{ userProfile.name }}
        </h1>
      </div>

      <Footer />
    </div>

    <!-- Modal -->
    <dialog
      class="absolute opacity-75 top-1/4 left-1/3 p-12 text-center z-99 w-1/4 h1/2 bg-green-400 rounded-lg"
      ref="gameCodeDialog"
    >
      <h1 class="text-4xl text-white p-4">Enter the game code</h1>
      <input class="p-4 rounded-lg" placeholder="000000" type="number" />
      <div class="p-4 flex justify-center align-center gap-4">
        <button class="bg-blue-400 w-24 p-4 text-lg rounded-lg cursor-pointer">
          Enter
        </button>
        <button
          class="bg-red-400 w-24 p-4 text-lg rounded-lg cursor-pointer"
          @click="codeWindow = false"
        >
          Close
        </button>
      </div>
    </dialog>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { GoogleLogin } from "vue3-google-login";

export default {
  components: { Footer },

  data() {
    return {
      codeWindow: false,
    };
  },

  watch: {
    codeWindow(newVal) {
      const dialog = this.$refs.gameCodeDialog;

      if (!dialog) return;

      if (newVal) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    },
  },
};
</script>
