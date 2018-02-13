<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <div class="menu">
      <ul class="menu main">
        <li><router-link :to="{ path: '/' }">Home</router-link></li>
        <li><router-link :to="{ path: 'orders' }">See Orders</router-link></li>
        <li><router-link :to="{ path: 'place-order' }">Place Orders</router-link></li>
      </ul>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Orders from "./components/Orders";
import HomePage from "./components/HomePage";
import axios from 'axios';

export default {
  components: {
    Orders,
    HomePage
  },
  name: 'App',

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    margin-top: 10px;
}
  .main {
    padding: 0;
    li {
      display: inline-block;
      max-width: 140px;
      cursor: pointer;
      width: 100%;
      a {
        text: {
          decoration: none;
        }
        font: {
          weight: 800;
        };
        line-height: 40px;
        background: {
          color: #47aa79;
        };
        border: {
          radius: 5px;
        };
        display: block;
        color: white;
        &:hover {
          background: {
            color: #34714e;
          };
        }
      }
    }

  }
  .logo {
    max-width: 250px;
    height: auto;
  }
  .container {
    max-width: 960px;
    padding: 20px;
    box-sizing: border-box;
    margin: auto;
    background: aliceblue;
    height: 500px;
    text-align: left;
  }
</style>
