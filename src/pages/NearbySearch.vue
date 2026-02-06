<template>
  <div
    class="grid grid-cols-8 gap-4 w-screen h-screen m-4 rounded-lg border-black border-2"
  >
    <div class="bg-pink-400 col-span-3 w-full h-full">
      <section
        class="m-6 p-6 bg-pink-100 border-4 border-black rounded-lg"
        style="position: relative; z-index: 1"
      >
        <input
          id="autocomplete"
          class="w-1/2 h-10 rounded-md border-2 border-black"
          v-model="address"
          type="text"
        />
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
        <div class="field">
          <div class="flex w-full gap-4 m-4">
            <div class="field">
              <select
                class="p-2 m-4 bg-pink-200 rounded-lg border-red border-2"
                v-model="type"
              >
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <div class="field">
              <select
                class="p-2 m-4 w-32 text-center bg-pink-200 rounded-lg border-red border-2"
                v-model="radius"
              >
                <option value="5">5 KM</option>
                <option value="10">10 KM</option>
                <option value="15">15 KM</option>
                <option value="20">20 KM</option>
              </select>
            </div>
          </div>
        </div>
        <button
          class="bg-green-600 p-4 rounded-lg border-black border-2"
          @click="FindCloseByButtonPressed"
        >
          Find CloseBy
        </button>
      </section>
    </div>
    <div class="bg-blue-400 col-span-5 w-full h-full">There</div>
    <div id="hidden-map" style="display: none"></div>
  </div>
</template>
<script>
import axios from "axios";
import api_endpoints from "../assets/api_endpoints";
export default {
  data() {
    return {
      address: "",
      lat: "",
      lng: "",
      type: "restaurant",
      radius: "5",
    };
  },
  async mounted() {
    await this.loadGoogleMaps(process.env.VUE_APP_GOOGLE_CLOUD_API_KEY);
    let autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );
    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      this.showLocationOnMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            (this.lat = position.coords.latitude),
              (this.lng = position.coords.longitude);
            let readableAddress = await axios.get(
              `${api_endpoints.GeoLocation}${position.coords.latitude},${position.coords.longitude}&key=${process.env.VUE_APP_GOOGLE_CLOUD_API_KEY}`
            );
            if (readableAddress.data.error_message) {
              console.log(readableAddress.data.error_message);
              return;
            }
            this.address = readableAddress.data.results[0].formatted_address;
            this.showLocationOnMap(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.log(error.message);
            return;
          }
        );
      }
    },
    showLocationOnMap(latitude, longitude) {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new window.google.maps.LatLng(latitude, longitude),
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });
      new window.google.maps.Marker({
        position: new window.google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
    loadGoogleMaps(apiKey) {
      return new Promise((resolve, reject) => {
        if (window.google?.maps) {
          resolve(window.google.maps);
          return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    },
    FindCloseByButtonPressed() {
      const service = new window.google.maps.places.PlacesService(
        document.getElementById("hidden-map")
      );

      const request = {
        location: new window.google.maps.LatLng(this.lat, this.lng),
        radius: this.radius * 1000,
        type: [this.type],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log("Nearby places:", results);
          this.places = results.map((place) => ({
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            openNow: place.opening_hours?.open_now,
          }));
        } else {
          console.error("Places error:", status);
        }
      });
    },
  },
};
</script>
<style>
.pac-icon {
  display: none;
}
.pac-item {
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: blanchedalmond;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: aqua;
}
</style>
