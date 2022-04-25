<template>
<v-app>
<!--sub-header-->
  <v-card-title class='dizagara-sub-header'>
    <span class='mdi mdi-18px dizagara-margin-right' id='headerIcon'></span>
    <span>Dashboard</span>
  </v-card-title>
  <!--v-row-->
  <v-row style='text-align: center; margin-top: 300px;'>
    <v-col>
      <!--delete-->
      <v-btn dense dark
             class='dizagara-button-red dizagara-button-width-medium'
             style='width: 190px; text-align: center; margin: auto;'
             @click='deleteAccount()'>
        <span class="mdi" id='deleteIcon'></span>
        DELETE ACCOUNT
      </v-btn><br /><br />
      <!--logout-->
      <v-btn dense class='dizagara-button-blue'
             style='width: 190px;'
             @click='logout()'>
        <span class='mdi' id='logoutIcon'></span>
        LOGOUT
      </v-btn>
    </v-col>
  </v-row>
</v-app>
</template>
<script>
// import
import bridge from '../bridge.js'
import references from '../utils/references.js'
import toastr from 'toastr'

// master
export default {
// name
  name: 'dashboard',
  // components
  components: {
  },
  // cycle methods
  async created () {
    // get generics
    this.userId = this.$route.params.id
    // get icons (must be after stuff above)
    setTimeout(() => {
      $('#headerIcon').addClass(references.getIcon('dashboard'))
      $('#logoutIcon').addClass(references.getIcon('logout'))
      $('#deleteIcon').addClass(references.getIcon('delete'))
    }, 0)
  },
  // custom methods
  methods: {
    // delete account
    async deleteAccount () {
      // delete account
      // re-direct to login page
      this.$router.push({ path: '/login' })
      // notify
      toastr.info(`Deleted account successfully!`, ``, { 'closeButton': true, positionClass: 'toast-bottom-right' })
    },
    // logout
    logout () {
      // re-direct to login page
      this.$router.push({ path: '/login' })
      // notify
      toastr.info(`Logged out successfully!`, ``, { 'closeButton': true, positionClass: 'toast-bottom-right' })
    }
  },
  // global
  data: global => ({
    userId: ``
  })
}
</script>
