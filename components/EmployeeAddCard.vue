<template>
  <v-card>
    <v-card-title>{{isEdit ? 'Edit employee':'Add new employee'}}</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Name"
          outlined
          dense
          v-model="name"
          :rules="validations.nameRules"
        ></v-text-field>
        <v-text-field
          label="Email"
          outlined
          dense
          :rules="validations.emailRules"
          v-model="email"
        ></v-text-field>
      </v-form>
      <v-col>
        <v-btn block class="info" @click="cleanForm()">Clean 🙆🏼‍♂️</v-btn>
        <v-btn v-if="isEdit" block class="error mt-1" @click="cancelEdit()">Cancel</v-btn>
        <v-btn block class="success mt-1" @click="validate()">{{ isEdit ? 'Edit' : 'Add' }}</v-btn>
      </v-col>
    </v-card-text>

    <v-dialog v-model="dialog" max-width="290" persistent>
      <v-card>
        <v-card-title>Are you sure you want to {{ isEdit ? 'edit' : 'add' }} this employee?</v-card-title>
        <v-card-text class="mt-5">
          <v-layout row wrap>
            <v-spacer />
            <v-btn @click="dialog = false" class="error">Cancel</v-btn>
            <v-btn @click="isEdit ? editEmploye() : addEmploye() " class="success ml-3">{{ isEdit ? 'Edit' : 'Add' }}</v-btn>
          </v-layout>
        </v-card-text>
        <v-progress-linear
          indeterminate
          color="primary"
          v-if="loading"
        ></v-progress-linear>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" max-width="290" persistent>
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text class="mt-5">
          {{ errorMsg }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="secondary" @click="errorDialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
  export default {
    data(){
      return {
        dialog : false,
        errorDialog : false,
        loading : false,
        id : null,
        name : null,
        email : null,
        errorMsg : null,
        validations: {
          nameRules: [
            (v) => !!v || "Name is required",
            (v) => (!!v && v.length <= 50) || "Name must be less than 50 characters",
          ],
          emailRules: [
            (v) => !!v || "Email is required",
            (v) => /.+@.+\..+/.test(v) || "Email must be valid",
            (v) => (v && v.length <= 50) || "Email must be less than 50 characters",
          ],
        },
        isEdit : false,
      }
    },
    methods : {
      validate(){
        if( this.$refs.form.validate() ){
          this.dialog = true;
        }
      },
      cleanForm(){
        this.$refs.form.reset();
      },
      cancelEdit(){
        this.isEdit = false;
        this.$refs.form.reset();
        this.id = null;
      },
      getEmployee( item ){
        this.isEdit = true;
        this.id = item.id;
        this.name = item.name;
        this.email = item.email;
      },
      async addEmploye(){
        try {
          this.loading = true;
          const body = {
            email : this.email,
            name : this.name
          }

          const response = await this.$axios.$post('/employee', body, {
            headers: {'Access-Control-Allow-Origin': '*'},
          });

          if( response ){
            this.$store.commit(
              'openSnack',
              'Employee Added'
            );
            this.$parent.getEmployees();
            this.$refs.form.reset();
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
      async editEmploye(){
        try {
          this.loading = true;
          const body = {
            email : this.email,
            name : this.name
          }

          const response = await this.$axios.$put('/employee/' + this.id, body, {
            headers: {'Access-Control-Allow-Origin': '*'},
          });

          if( response ){
            this.$store.commit(
              'openSnack',
              'Employee edited'
            );
            this.$parent.getEmployees();
            this.$refs.form.reset();
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
      }
    },
  }
</script>

<style>

</style>
