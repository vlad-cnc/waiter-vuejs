<template>
    <div>
      <label>Pick a table:</label>
      <div class="tables">
        <div class="table"
             v-bind:class="isTaken(keyT)"
             v-for="(table, keyT) in tables"

             :key="keyT"
             @click="takeTable(keyT)">{{table.tableName}}</div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "tables",
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
    },


    created() {

      axios.get(`http://localhost:3000/tables`)
        .then(response => {
          this.tables = response.data
        })
        .catch(e => {
          this.errors.push(e)
        });
    },
  }
</script>

<style scoped>

</style>
