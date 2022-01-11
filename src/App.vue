<template>
  <router-view />
</template>
<script>
import nprogress from "nprogress";
import "./views/nprogress.css";
export default {
    name: "app",
    components: {},
    created() {
        window.axios.interceptors.request.use(
            function (config) {
                nprogress.start();
                return config;
            },
            function (error) {
                nprogress.done();
                return Promise.reject(error);
            }
        );
        window.axios.interceptors.response.use(
            function (response) {
                nprogress.done();
                return response;
            },
            function (error) {
                nprogress.done();
                return Promise.reject(error);
            }
        );
    },
};
</script>

<style lang="scss">
html{
  font-size: 14px;
}
#app {
    font-family: "Font-Custom" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
