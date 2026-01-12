<template>
  <h1>User Location Page</h1>
  <div class="mt-10 p-y-6 bg-pink-100 border-4 border-black rounded">
    <input class="w-3/4 h-10 br-4" v-model="address" type="text" />
    <button
      class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      v-on:click="getLocation"
    >
      <!-- Location Pin Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-3.73 0-6.75 3.02-6.75 6.75
         0 5.25 6.75 12.75 6.75 12.75s6.75-7.5 6.75-12.75
         C18.75 5.27 15.73 2.25 12 2.25zm0 9.75a3
         3 0 110-6 3 3 0 010 6z"
          clip-rule="evenodd"
        />
      </svg>

      <span>Use current location</span>
    </button>
  </div>
</template>
<script>
import axios from "axios";
import api_endpoints from "../assets/api_endpoints";
export default {
  data() {
    return {
      address: "",
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            let readableAddress = await axios.get(
              `${api_endpoints.GeoLocation}${position.coords.latitude},${position.coords.longitude}&key=${process.env.VUE_APP_GOOGLE_CLOUD_API_KEY}`
            );
            if (readableAddress.data.error_message) {
              console.log(readableAddress.data.error_message);
              return;
            }
            this.address = readableAddress.data.results[0].formatted_address;
          },
          (error) => {
            console.log(error.message);
            return;
          }
        );
      }
    },
  },
};
</script>
