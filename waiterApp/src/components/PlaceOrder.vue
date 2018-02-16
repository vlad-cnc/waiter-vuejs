<template>
  <div>
    <div class="ordering-interface">
      <div class="place-order-form half">
        <h2>Create an order:</h2>

        <!--Pick a meal-->
        <meal-picker/>

        <!--Table picking component.-->
        <tables/>

        <!--Submit order button.-->
        <div class="submit"><a @click.prevent="submitOrder()">Submit order</a></div>
      </div>

      <!--Order summary-->
      <div class="place-order-summary half">
        <div class="orders-list">
          <h2>Order summary:</h2>
          <label>Meals:</label>
          <ul class="order-list">
            <li v-for="(order, key) in total" :key="key" >
              <span>{{ order.meal }}</span>
              <div @click.prevent="removeMeal(key)" class="remove">x</div>
            </li>
          </ul>
        </div>
        <label>Table: {{table}}</label>
      </div>

    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import Tables from "./Tables";
  import MealPicker from "./MealPicker";

  export default {
    components: {
      MealPicker,
      Tables},
    name: "place-order",
    data() {
      return {
        meals: [],
        total:[],
        orderedMeal: '',
        table: '',
        tableKey: '',
        minValue: [],
        errors: [],
        tables: []
      }
    },
    created() {

      // axios.get(`http://localhost:3000/tables`)
      //   .then(response => {
      //     this.tables = response.data
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   });
      //
      // axios.get(`http://localhost:3000/menu`)
      //   .then(response => {
      //     this.meals = response.data
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //   });
    },

    methods: {
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

      takeTable(keyT) {
        this.table = 'Table: '+ (keyT +1);
        if(this.tables[keyT].status === "free"){
          axios.put(`http://localhost:3000/tables/` + (keyT +1), {
            tableName: this.tables[keyT].tableName,
            id: this.tables[keyT].id,
            status: 'taken'
          });
        }
        else {
          alert('This table is already taken!')
        }
      },

      addTotal() {
        if(this.orderedMeal !== ""){
          this.total.push({meal: this.orderedMeal});
          this.orderedMeal = "";
        }
      },

      removeMeal(key) {
        this.total.splice(key, 1);
      },

      submitOrder() {
        axios.post(`http://localhost:3000/orders`, {
          order: this.total,
          id: this.table.split(' ').pop()
        })
          .then(response => {
          })
          .catch(e => {
              this.errors.push(e)
            }
          );
        axios.get(`http://localhost:3000/tables`)
          .then(response => {
            this.tables = response.data
          })
          .catch(e => {
            this.errors.push(e)
          });
        this.table = '';
        this.total = [];
      },
    },
    computed: {

    },
  }
</script>

<style scoped lang="scss">
  .ordering-interface {
    display: flex;
    flex: {
      grow: 1;
      direction: row;
    };
    .half {
      flex-grow: 1;
      flex-basis: 50%;
    }
    label {
      margin: {
        top: 25px;
      };
      display: block;
      font: {
        weight: 800;
      };
    }
    select {
      max-width: 300px;
      width: 100%;
    }
    .remove {
      cursor: pointer;
      margin: {
        left: 15px;
      };
      display: inline-block;
      vertical-align: middle;
      background: {
        color: #e8000c;
      };
      font: {
        weight: 800;
      };
      border: {
        radius: 50%;
      };
      color: white;
      line-height: 15px;
      width: 15px;
      text-align: center;
      &:hover {
        background: {
          color: #850007;
        };
      }
    }
    .submit {
      cursor: pointer;
      display: block;
      background: #47aa79;
      max-width: 120px;
      text-align: center;
      margin: {
        top: 25px;
      };
      a {
        line-height: 30px;
        color: white;
        font: {
          weight: 600;
        };
      }
      &:hover {
        background: {
          color: #34714e;
        };
      }
    }

  }
</style>
