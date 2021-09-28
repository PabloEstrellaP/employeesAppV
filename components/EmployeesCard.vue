<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md4 class="pa-5">
        <EmployeeAddCard ref="employeeAddCard"/>
      </v-flex>
      <v-flex xs12 md8 class="pa-5">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Employees</v-toolbar-title><v-spacer />
          </v-toolbar>

          <v-card-text>
            <v-data-table :headers="headers" :items="employees" :items-per-page="5">
              <template v-slot:[`item.date`]="{ item }">
                <span>
                  {{ new Date(item.date).toISOString().substring(0, 10) }}
                </span>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-icon class="mr-2" @click="$refs.employeeAddCard.getEmployee(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon class="mr-2" @click="$refs.employeeDeleteDialog.openDialog(item)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-data-table>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="loading" max-width="400" persistent>
      <v-card>
        <v-card-title class="display-1">Cargando</v-card-title>
        <v-card-text class="display-5">{{ msg }}</v-card-text>
      </v-card>
      <v-progress-linear
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-linear>
    </v-dialog>
    <EmployeeDeleteDialog ref="employeeDeleteDialog" />
  </div>

</template>

<script>
  import EmployeeAddCard from '~/components/EmployeeAddCard';
  import EmployeeDeleteDialog from '~/components/EmployeeDeleteDialog';
  export default {
    components : {
      EmployeeAddCard,
      EmployeeDeleteDialog
    },
    data(){
      return {
        loading : false,
        employees : [],
        msg : null,
        headers : [
          { text : 'ID', value : 'id', align: "center"},
          { text : 'Name', value : 'name', align: "center"},
          { text : 'Email', value : 'email', align: "center"},
          { text : 'Creation date', value : 'date', align: "center"},
          { text: "Actions", align: "center", value: "action", sortable: false },
        ]
      }
    },
    async created(){
      this.loading = true;
      if( process.browser ){
        await this.getEmployees();
      }
    },
    methods : {
      async getEmployees(){
        try {
          this.loading = true;
          this.msg = 'Getting information'
          const response = await this.$axios.$get('/employee', {
             headers: {'Access-Control-Allow-Origin': '*'},
          });
          this.employees = response.msg;
          this.loading = false;
        } catch (error) {
          console.log(error.response);
        }
      }
    }
  }
</script>

<style>

</style>
