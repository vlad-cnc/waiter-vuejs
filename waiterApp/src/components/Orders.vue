<template>
  <div class="container">
    <div class="side main-section">
      <h4>Tables / Orders</h4>
      <div class="tables">
        <div class="table"
             v-for="(table, keyT) in tables"
             :key="keyT"
             v-on:click="displayOrder(keyT)"
             v-bind:class="isTaken(keyT)"
        >{{table.tableName}}</div>

      </div>
      <h4>Order:</h4>
      <div class="order">
        <div v-for="order in activeOrder">
          <h4>Table: {{order.id}}</h4>
          <ul v-for="meal in order.order">
            <li v-if="meal.meal !== ''">{{meal.meal}}</li>
          </ul>
        </div>
      </div>
      <div class="actions-wrapper">
        <div v-on:click="fillOrder">Order Filled</div>
      </div>
    </div>
    <div class="side sidebar">
      <h4>Active Orders:</h4>
      <ul v-for="order in orders">
        <li>
          Table: {{order.id}}
          <ul>
            <li v-for="op in order.order">
              {{op.meal}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Orders",

    data() {
      return {
        tables: [],
        orders: [],
        activeOrder: [],
        activeTable: '',
      }
    },
    methods: {
      displayOrder(keyT){
        this.activeTable = keyT + 1;
        let key = (keyT + 1).toString();
        this.activeOrder = this.orders.filter(order => order.id === key);
      },

      isTaken(keyT){
        if(this.tables[keyT].status === "free"){
          return "free"
        }
        else if(this.tables[keyT].status === "taken") {
          return "taken"
        }
        else {
          return "served"
        }
      },

      fillOrder() {
        axios.put(`http://localhost:3000/tables/` + this.activeTable, {
          tableName: this.tables[this.activeTable - 1].tableName,
          id: this.activeTable,
          status: 'served'
        });

      },
    },
    created() {

      axios.get(`http://localhost:3000/tables`)
        .then(response => {
          this.tables = response.data
        })
        .catch(e => {
          this.errors.push(e)
        });
      axios.get(`http://localhost:3000/orders`)
        .then(response => {
          this.orders = response.data
        })
        .catch(e => {
          this.errors.push(e)
        });
    },

  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
  }
  .side {
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .main-section {
    max-width: 60%;
    border: {
      right: 1px solid #d9d9d9;
    };
  }
  .sidebar {

    max-width: 39%;
  }
  .actions-wrapper {
    div {
      display: inline-block;
      padding: 10px;
      text-align: center;
      color: white;
      background: {
        color: #47AA79;
      };
      border: {
        radius: 8px;
      };
      cursor: pointer;
      font: {
        weight: 800;
      };
      &:hover {
        background: {
          color: #34714e;
        };
      }
    }
  }
</style>
