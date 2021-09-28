<template>
  <v-layout row wrap>
    <v-flex xs12 class="pa-5">
      <EmployeesCard />
    </v-flex>
  </v-layout>
</template>

<script>
  import EmployeesCard from '~/components/EmployeesCard'

  export default {
    components : {
      EmployeesCard
    },
  }
</script>

<style>

</style>
