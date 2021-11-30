<template>
  <v-icon class="mr-2" :id='"btnPrintE-" + item.id'  @click="printEmploye( item )">mdi-printer</v-icon>
</template>

<script>
  import { jsPDF } from "jspdf";

  export default {
    props: {
      employee: {

      }
    },
    methods: {
      getMonth( month ){
        const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        return months[ Number(month) - 1]
      },
      printEmploye(  ){
        try {
          this.$parent.isTrue = false;
          const doc = new jsPDF();
          const current = new Date();
          const day = String(current.getDate()).padStart(2, "0"); //añade zeros (para comparar la fecha)
          const month = String(current.getMonth() + 1).padStart(2, "0");
          const year = current.getFullYear();

          doc.text(`Mérida, Yucatán a ${day} de ${this.getMonth(month)} del año ${year}`, 80, 10);
          doc.text(`A QUIEN CORRESPONDA:`, 10, 30);
          doc.text(`Por este medio de la presente y para los fines que pretenda el interesado,`, 10, 50);
          doc.text(`hago de su conocimiento ampliamente, al C. ${this.employee?.name }, ya que es una`, 10, 60);
          doc.text(`persona Honesta y Responsable en las actividades que durante el periodo`, 10, 70);
          doc.text(`que prestó servicios en nuestra empresa le fueron asignadas, por tal motivo`, 10, 80);
          doc.text(`no tengo ninguna duda en expedir esta recomendación.`, 10, 90);
          doc.text(`Se extiendo la presente a solicitud del interesado y para los fines que`, 10, 110);
          doc.text(`juzgue convenientes.`, 10, 120);

          doc.text(`FIRMA`, 95, 170);
          doc.text(`___________________`, 73, 180);
          doc.text(`Nombre de quien firma`, 75, 190);
          doc.text(`Nombre de la empresa`, 76, 200);
          doc.save(`${this.employee?.name}.pdf`);
          this.$parent.isTrue = true;
          return true;
        } catch (error) {
          console.log(error)
          this.$parent.isTrue = false;

          return false;
        }
      },
    }
  }
</script>

<style>

</style>
