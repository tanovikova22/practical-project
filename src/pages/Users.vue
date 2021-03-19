<template>
  <v-container>
    <div class="text-center">
      <v-progress-circular v-if="!getAll" :size="50" color="primary" indeterminate></v-progress-circular>
    </div>

    <v-row align="center" v-if="getAll !== null">
      <v-col class="d-flex" cols="12" sm="6">
        <v-text-field v-model="search">
          <template v-slot:label>
            Whom ure you looking for?
            <v-icon style="vertical-align: middle">{{"mdi-magnify"}}</v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="emailVariety"
          v-model="emailChoice"
          label="Filter by emails"
          @click="pageNumber = 1"
        >
        </v-select>
        <v-icon v-if="emailChoice" @click="emailChoice = ''">{{"mdi-close"}}</v-icon>
      </v-col>
    </v-row>


    <template v-if="getAll !==null">
       <div class="text-center">
    <v-pagination
      v-model="pageNumber"
      :length="numberOfPages"
      :total-visible="7"
    ></v-pagination>
  </div>
    <v-row align="center">
      Show:
      <v-col
        class="d-flex"
        cols="12"
        sm="1"
      >
        <v-select
          :items="numToShow"
          v-model="usersToShow"
          @change="pageNumber = 1"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-simple-table
    fixed-header
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            #
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Phone
          </th> 
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, idx) in showenItems"
          :key="user.id"
        >
         <td>
            {{filterItems.indexOf(user)+1}}
          </td>
        <template v-if="editUserIndex === idx">
          <td>
            <v-text-field required
            label="Name"
            v-model="user.name"
          ></v-text-field>
          </td>
          <td>
          <v-text-field
          label="email"
          v-model="user.email">
          </v-text-field>
          </td>
          <td>
          <v-text-field
          label="phone"
          v-model="user.phone">
          </v-text-field>
          </td>
          <td>
            <v-btn depressed color="light green" @click="editUserIndex = null">Done <v-icon>{{"mdi-check"}}</v-icon></v-btn>
          </td>
        </template>
        <template v-else>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <div class="text-center">
              <v-menu offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="primary"
                    depressed
                    v-bind="attrs"
                    v-on="on"
                  >
                    Actions
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn width="100%" dark light depressed color="red" @click="deleteUser(user.id)">Delete</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn width="100%" dark light depressed color="green" @click="editUser(user.id)">Edit</v-btn>
                  </v-list-item>
                  <v-list-item>
                    <router-link :to="'/dashboard/profile/'+user.id"  tag="button">
                    <v-btn width="100%" dark depressed color="blue">View profile</v-btn>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </template>
        </tr>
        <tr>
          <td></td>
          <td>
            <v-icon @click="sortNamesASC">{{"mdi-arrow-up"}}</v-icon>
            <v-icon @click="sortNamesDESC">{{"mdi-arrow-down"}}</v-icon>
          </td>
          <td></td>
          <td>
            <v-icon @click="sortNumbers('up')">{{"mdi-arrow-up"}}</v-icon>
            <v-icon @click="sortNumbers('down')">{{"mdi-arrow-down"}}</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    search: "",
    pageNumber: 1,
    emailVariety: [
      'gmail.com',
      'mail.ru',
      'mail.ua'
    ],
    emailChoice: "",
    editUserIndex: null,
    usersToShow: 1,
  }),
  computed: {
    ...mapGetters(["getAll", "getLoading"]),

     filterItems() {
      let filteredByString = this.getAll.filter(element => 
      element.name.toLowerCase().includes(this.search.toLowerCase())
      );
      return this.emailChoice ? (
         filteredByString.filter(element => {
           let searchLength = this.emailChoice.length
           let lastOfUsersEmail = element.email.slice(-searchLength)
           return lastOfUsersEmail === this.emailChoice
          })
      ) : filteredByString
    },

    numberOfPages(){
      return Math.ceil(this.filterItems.length / this.usersToShow)
    },

    showenItems(){
      let lastElement = (this.pageNumber * this.usersToShow)
      let firstElement = (this.pageNumber - 1) * this.usersToShow
      return this.filterItems.slice(firstElement, lastElement)
    },

    numToShow(){
      let numOfUsers = [1, 3, 5, 10, 20, 50]
      return numOfUsers.filter(num => num <= this.filterItems.length)
    },


  },
  methods: {
    ...mapActions(["getAllUsers"]),
    ...mapMutations(["setAll"]),

    sortNamesASC(){
      this.getAll.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0
      })
    },
    sortNamesDESC(){
       this.getAll.sort((a, b) => {
        if(a.name > b.name) { return -1; }
        if(a.name < b.name) { return 1; }
        return 0
      })
    },

    sortNumbers(direction){
      this.getAll.sort((a, b) => {
          if(a.phone < b.phone) {
             return direction === 'up' ? -1 : 1
             }
          if(a.phone > b.phone) {
             return direction === 'up' ? 1 : -1
             }
          return 0
      })
    },

    deleteUser(uid){
    let deleteIndex = this.getAll.findIndex(user => user.id === uid)
    this.getAll.splice(deleteIndex, 1)
  },

  viewProfile(uid){
    this.$router.push(`/dashboard/profile/${uid}`)
  },

  editUser(uid){
    this.editUserIndex = this.getAll.findIndex(user => user.id === uid)
  }
  },

  created() {
    this.getAllUsers()
  }
};
</script>

