<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <v-card>
      <v-card-title>Are you sure you want to delete this employee?</v-card-title>
      <v-card-text class="mt-5">
        <v-layout row wrap>
          <v-spacer />
          <v-btn @click="dialog = false" class="error">Cancel</v-btn>
          <v-btn @click="deleteEmploye() " class="success ml-3"> delete </v-btn>
        </v-layout>
      </v-card-text>
      <v-progress-linear
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-linear>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data(){
      return {
        dialog : false,
        loading : false,
        id : null,
      }
    },
    methods : {
      openDialog( item ){
        this.id = item.id;
        this.dialog = true;
      },
      async deleteEmploye(){
        try {
          this.loading = true;
          const response = await this.$axios.$delete('/employee/' + this.id, {
            headers: {'Access-Control-Allow-Origin': '*'},
          });

          if( response ){
            this.$store.commit(
              'openSnack',
              'Employee deleted'
            );
            this.$parent.getEmployees();
            this.dialog = false;
            this.loading = false;
          }
        } catch (error) {
          console.log( error.response );
          this.$store.commit(
            'openSnack',
            'Something is wrong. Please try again'
          );
          this.dialog = false;
          this.loading = false;
          this.errorDialog = true;
          this.errorMsg = error.response.data.msg;
        }
      },
    }
  }
</script>

<style>

</style>
