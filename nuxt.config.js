import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - EmployeesApp',
    title: 'EmployeesApp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // target: 'static',
  // router: {
  //   base: '/employeesAppVue/'
  // },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/sw.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL : 'https://employeesapputm.herokuapp.com'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta : {
      title : 'EmployeesApp',
      author : 'EmployeesApp',
      // "apple-mobile-web-app-capable" : true,
    },
    manifest: {
      name: 'EmployeesApp',
      short_name: 'EmployeesApp PWA',
      lang: 'es',
      display: 'standalone',

    },
    icon : {
      fileName : 'iconPWA.png',
      sizes : [64, 120, 144, 152, 192, 384, 512, 1024],
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#ff9700",
          accent: colors.grey.darken3,
          secondary: "#d07323",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#212529",
          accent: colors.grey.darken3,
          secondary: "#d07323",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#198754'
        }
      },

    }
  },
  workbox: {
    runtimeCaching: [

    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
