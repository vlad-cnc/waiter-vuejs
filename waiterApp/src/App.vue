<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <div class="menu">
      <ul class="menu main">
        <!--<li><router-link :to="{ path: '/' }">Home</router-link></li>-->
        <li><router-link :to="{ path: '/' }">Place Orders</router-link></li>
        <li><router-link :to="{ path: 'orders' }">See Orders</router-link></li>
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
import Tables from "./components/Tables"

export default {
  components: {
    Tables,
    Orders,
    HomePage,
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
        &:hover,
        &.router-link-exact-active{
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
    min-height: 500px;
    max-width: 960px;
    padding: 20px;
    box-sizing: border-box;
    margin: auto;
    background: aliceblue;
    text-align: left;
  }
.tables {
  margin: {
    right: 30px;
  };
  display: flex;
  justify-content: space-between;
}
.title-page {
  text-align: center;
}
.table {
  color: white;
  background: #47aa79;
  padding: 5px;
  line-height: 60px;
  width: 60px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  &.taken,
  &:hover{
    background: {
      color: #c1000c;
    };
  }
  &.served {
    background: {
      color: #d07814;
    };
  }
}
</style>
