<template>
  <div>
    <div class="ordering-interface">
      <div class="place-order-form half">
        <h2>Create an order:</h2>

        <!--Pick a meal-->
        <label>Pick a meal:</label>
        <select  v-model="orderedMeal" class="meal-picker">
          <option disabled value="">Select a meal...</option>
          <option v-for="meal in meals">{{meal.mealName}}  -  {{meal.mealPrice}}</option>
        </select>
        <button v-on:click="addTotal">Add Meal</button>

        <!--Pick a table-->
        <label>Pick a table:</label>
        <select v-model="table">
          <option disabled value="">Select table...</option>
          <option>Table 1</option>
          <option>Table 2</option>
          <option>Table 3</option>
          <option>Table 4</option>
          <option>Table 5</option>
        </select>
        <div class="submit"><a @click.prevent="submitOrder()">Submit order</a></div>
      </div>

      <!--Order summary-->
      <div class="place-order-summary half">
        <div class="orders-list">
          <h2>Order summary:</h2>
          <label>Meals:</label>
          <ul class="order-list">
            <li v-for="(order, key) in total" :key="key" >
              <span>{{ order }}</span>
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

  export default {
    name: "place-order",
    data() {
      return {
        meals: [],
        total:[],
        orderedMeal: '',
        table: '',
        minValue: [],
        errors: [],
        myJSON : '{ "name":"John", "age":31, "city":"New York" }',
      }
    },
    created() {
      axios.get(`static/menu.json`)
        .then(response => {
          this.meals = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    methods: {
      addTotal() {
        if(this.orderedMeal !== ""){
          this.total.push(this.orderedMeal);
          this.orderedMeal = "";
        }
      },

      removeMeal(key) {
        console.log(key);
        this.total.splice(key, 1);
      },

      submitOrder() {
        console.log(JSON.parse(this.myJSON));
        axios.post(`static/orders.json`, {
          body: this.myJSON

        })
          .then(response => {

          })
          .catch(e => {
              this.errors.push(e)
            }
          )
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
    ul {
      /*padding: 0;*/
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
