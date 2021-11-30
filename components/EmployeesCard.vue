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
                <v-icon class="mr-2 btnPrintE"  @click="printEmploye( item )"
                  >mdi-printer</v-icon
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <p style="color: white" id="isTrue">{{ isTrue }}</p>
      </v-flex>
    </v-layout>
    <v-dialog v-model="loading" max-width="400" persistent>
      <v-card>
        <v-card-title class="display-1">Loading...</v-card-title>
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

  import { jsPDF } from "jspdf";

  import EmployeeAddCard from '../components/EmployeeAddCard.vue';
  import EmployeeDeleteDialog from '../components/EmployeeDeleteDialog.vue';
  export default {
    components : {
      EmployeeAddCard,
      EmployeeDeleteDialog
    },
    data(){
      return {
        loading : false,
        isTrue : false,
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
      getMonth( month ){
        const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        return months[ Number(month) - 1]
      },
      printEmploye( employee ){
        try {
          this.isTrue = false;
          const doc = new jsPDF();
          const current = new Date();
          const day = String(current.getDate()).padStart(2, "0"); //añade zeros (para comparar la fecha)
          const month = String(current.getMonth() + 1).padStart(2, "0");
          const year = current.getFullYear();

          doc.text(`Mérida, Yucatán a ${day} de ${this.getMonth(month)} del año ${year}`, 80, 10);
          doc.text(`A QUIEN CORRESPONDA:`, 10, 30);
          doc.text(`Por este medio de la presente y para los fines que pretenda el interesado,`, 10, 50);
          doc.text(`hago de su conocimiento ampliamente, al C. ${employee.name }, ya que es una`, 10, 60);
          doc.text(`persona Honesta y Responsable en las actividades que durante el periodo`, 10, 70);
          doc.text(`que prestó servicios en nuestra empresa le fueron asignadas, por tal motivo`, 10, 80);
          doc.text(`no tengo ninguna duda en expedir esta recomendación.`, 10, 90);
          doc.text(`Se extiendo la presente a solicitud del interesado y para los fines que`, 10, 110);
          doc.text(`juzgue convenientes.`, 10, 120);

          doc.text(`FIRMA`, 95, 170);
          doc.text(`___________________`, 73, 180);
          doc.text(`Nombre de quien firma`, 75, 190);
          doc.text(`Nombre de la empresa`, 76, 200);
          doc.save(`${employee.name}.pdf`);
          this.isTrue = true;
          return true;
        } catch (error) {
          console.log(error)
          this.isTrue = false;

          return false;
        }
      },
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
