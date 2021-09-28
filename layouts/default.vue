<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
      color="white"
      class="hidden-md-and-up"
      v-if="$vuetify.breakpoint.mdAndDown"
    >
      <v-list nav color="primary">
      </v-list>
      <v-list nav>
        <v-divider></v-divider>

        <v-list-item
          style="color : black"
          v-for="(item, i) in items"
          :key="i"
          :to="item.isBotton ? '' : item.to "
          router
          exact
          @click="item.isBotton ? showDialog( item.title ) : ''"

        >
          <v-list-item-action>
            <v-avatar>
              <v-img
                v-if="item.icon.includes('/Icons')"
                :src="item.icon"
                aspect-ratio="1.4"
                contain
                max-width="30"
              ></v-img>
              <v-icon v-else color="black" size="30">{{ item.icon }}</v-icon>
            </v-avatar>

          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      :clipped-left="clipped"
      fixed
      app
    >

      <!-- Mobil version -->

      <v-app-bar-nav-icon v-if="!isSearch" color="white" @click.stop="drawer = !drawer" class="hidden-md-and-up" />
      <v-app-bar-title class="font-weight-medium hidden-md-and-up" style="color : white " v-if="!isSearch" > {{ title }} </v-app-bar-title>
      <v-spacer v-if="!isSearch" class="hidden-md-and-up" />


      <!-- Web version -->

      <v-toolbar elevation="0" color="primary" class="font-weight-medium hidden-sm-and-down" style="color : white ">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>

    </v-app-bar>

    <v-main>
      <transition name="fade">
        <v-container>
          <Nuxt />
        </v-container>
      </transition>
    </v-main>

    <v-footer
      color="primary"
      class="hidden-sm-and-down"
    >
      <v-container>
        <v-layout
          row
          wrap
          align-center
          align-content-center
          justify-center
          style="text-align: center"
        >

          <v-flex xs12 md3>
            <v-img
              src="/iconPWA.png"
              lazy-src="/iconPWA.png"
              contain
              width="80"
              style="margin : auto"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
    <v-snackbar v-model="snackBar">
      {{ snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  export default {
    components : {

    },
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-home',
            title: 'Inicio',
            to: '/',
            isBotton : false,
          },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title : null,
        isSearch : false,
      }
    },
    watch : {
      $route( to, from ){
        setTimeout(() => {
          this.title = this.pathTitle( to.name );
        }, 1);
      }
    },
    created(){
      if( process.browser ){
        this.title = this.pathTitle( this.$route.name );
      }
    },
    computed: mapState(["snackText", "snackBar"]),
    methods : {
      pathTitle( title ){
        console.log( title );
        switch ( title ) {
          case 'aboutUs':
            return 'Acerca de nosotros'
          case 'index':
            return 'Inicio'
          default:
            return 'Página no encontrada'
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
