<template>
  <div>
    <label>Pick a meal:</label>
    <select  v-model="orderedMeal" class="meal-picker">
      <option disabled value="">Select a meal...</option>
      <option v-for="meal in meals">{{meal.mealName}}  -  {{meal.mealPrice}}</option>
    </select>
    <button v-on:click="addTotal">Add Meal</button>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "meal-picker",
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
    methods: {

      addTotal() {
        if(this.orderedMeal !== ""){
          this.total.push({meal: this.orderedMeal});
          this.orderedMeal = "";
        }
      },
    },
    created() {
      axios.get(`http://localhost:3000/menu`)
        .then(response => {
          this.meals = response.data
        })
        .catch(e => {
          this.errors.push(e)
        });
    }

  }
</script>

<style scoped>

</style>
