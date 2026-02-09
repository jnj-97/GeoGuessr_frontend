<template>
  <h1 class="text-center text-4xl font-thin">New Game: {{ code }}</h1>
</template>
<script>
export default {
  data() {
    return {
      code: Math.floor(100000 + Math.random() * 900000),
      connection: null,
    };
  },
  methods: {
    sendMessage(message) {
      console.log(this.connection);
      this.connection.send(message);
    },
  },
  mounted() {
    console.log("Starting connection to websocket server");
    this.connection = new WebSocket(
      `${process.env.VUE_APP_BACKEND_SERVER_URL}/ws?room=${this.code}`,
    );
    this.connection.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the websocket server");
    };
    this.connection.onmessage = (event) => {
      console.log(event);
    };
  },
};
</script>
