<template>
  <div>
    <!-- App Bars -->
    <loading :active.sync="isLoading" 
        :is-full-page="fullPage"></loading>
    <v-app-bar
      color="blue darken-4"
      clipped-left
      fixed
      dark
      flat
      app
    >
      <v-btn v-show="this.token != null && this.user != null"
        color="blue darken-4"
        class="mx-n1"
        dark
        fab
        depressed
        small
        @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
 
      <v-toolbar-title class="mx-3">ENERGI PERKASA ABADI</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-divider v-show="this.token != null" class="mx-3" inset vertical></v-divider>
      <h4 v-if="this.token != null">{{user.Nama}}</h4>
      <h4 v-else></h4>
      <v-divider v-show="this.token != null" class="mx-3" inset vertical></v-divider>
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                fab
                small
                depressed
                color="blue darken-4"
                dark
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
              <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <span>Account</span>
          </v-tooltip>
        </template>

        <!-- Login|Register|Logout -->
        <v-list>
          <v-divider></v-divider>
            <v-layout justify-center>
            <v-card-actions>
              <v-btn @click="changeLocale('id')"><bendera-negara country='idn' size="normal" /></v-btn>
              <v-btn @click="changeLocale('en')"><bendera-negara country='gb' size="normal"/></v-btn>
            </v-card-actions>
          </v-layout>
          <v-divider></v-divider>
          <v-col v-show="this.token != null">
            <div class="center ">
              <v-btn class="cols-12 sm-6 md-6" block color="lime" to=/ChangePwd>
                <v-icon>mdi-key</v-icon>
                Change Password
              </v-btn>
            </div>
          </v-col>
          <v-col v-show="this.token == null">
            <div class="center ">
              <v-btn v-show="this.token == null" block to=/login dark color="success">
                Login
                <v-icon class="mx-1">mdi-login</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-divider></v-divider>
          <!-- <v-col v-show="this.token == null">
            <div class="center">
              <v-btn v-show="this.token == null" block to=/register dark color="success">
                Register
                <v-icon class="mx-1">mdi-account-plus</v-icon>
              </v-btn>
            </div>
          </v-col> -->
          <v-divider></v-divider>
          <v-col>
            <div class="center">
              <v-btn v-show="this.token != null"
                block
                v-model="logout"
                @click="logout"
                color="error"
                dark>
                <v-icon class="mx-1">mdi-logout</v-icon>
                Logout
              </v-btn>
            </div>
          </v-col>
        </v-list>
      </v-menu>
      
      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                fab
                dark
                small
                depressed
                color="blue darken-4"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                to=/testCetakan
              >
              <v-icon>mdi-bell</v-icon>
              </v-btn>
            </template>
            <span>Notifikasi</span>
          </v-tooltip>
        </template>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      class="elevation-3"
      color="white"     
      clipped
      fixed
      width='395'
      app
      v-if="this.token != null && this.user != null"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <!-- <v-list-item-avatar class="mx-n1">
              <v-avatar class="mx-n1" color="red">
                <span class="white--text headline">TA</span>
              </v-avatar>
            </v-list-item-avatar> -->
            <v-list-item-content class="mx-8">
              <!-- <v-img style="margin-left:55px;" max-width="170" max-height="48" src='../assets/logoTA.png'></v-img> -->
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </template>

      <v-list nav dense>
        <!-- <v-list-item
          link
          to="Dashboard"
          active-class="blue darken-4"
          color="white"
        >
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title color="white">Dashboard</v-list-item-title>
        </v-list-item> -->

        <!-- List Group Menu -->
        <v-list-group
          color="blue darken-4"
          v-for="item in GroupMenu"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.Icon"
          no-action
          class="mt-1"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <div v-for="child in item.ListName" :key="child.id">
            <div v-if="!child.hasOwnProperty('SubMenu')">
              
              <v-list-item
                :key="child.title"
                :to="child.link"
                link
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title" class="pl-10 ml-4"></v-list-item-title>
                </v-list-item-content>
                <v-icon v-text="child.icon"></v-icon>
              </v-list-item>
            </div>
            <div v-else>
              <v-list-group
                no-action
                sub-group
                flat
                action-class=""
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="sub in child.SubMenu"
                  :key="sub.id"
                  :to="sub.link.split(' ').join('-')"
                  flat
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="sub.title"></v-list-item-title>
                  </v-list-item-content>
                  <v-icon v-text="sub.icon"></v-icon>
                </v-list-item>
              </v-list-group>
            </div>
          </div>

          <v-divider></v-divider>
        </v-list-group>
        <!-- <v-list-item-group v-model="model">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

import api from '../services/http'
import Loading from 'vue-loading-overlay';
import i18n from '@/plugins/i18n';
import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    components: {
      Loading
    },
    data: () => ({
      items: [
        {
          icon: 'mdi-account-supervisor',
          text: 'User',
          link: '/User'
        },
        {
          icon: 'mdi-package-variant',
          text: 'Barang',
          link: '/Barang'
        },
        {
          icon: 'mdi-briefcase',
          text: 'Jasa',
          link: '/Jasa'
        },
        {
          icon: 'mdi-account-supervisor',
          text: 'Chart OF Account',
          link: '/ChartOfAccount'
        },
        {
          icon: 'mdi-receipt-text',
          text: 'Work Order',
          link: '/Work'
        },
        {
          icon: 'mdi-store',
          text: 'Purchase Order',
          link: '/PurchaseOrder'
        },
        {
          icon: 'mdi-shopping',
          text: 'Pembelian',
          link: '/Pembelian'
        },
        {
          icon: 'mdi-note-text-outline',
          text: 'Invoice',
          link: '/Invoice'
        },
      ],
      model: 1,

    MenuAkun: false,
    bahasa:'id',
    isLoading: false,
    fullPage: true,
      user:[],
      List:[],
      token : localStorage.getItem('token'),
      offset: true,
      

      // Menu Navigation Drawer
      drawer: false,
      group: null,
      GroupMenu: [],
    }),

    created(){
        // let { routes } = this.$router.options;
        // console.log('rout',routes)
        // console.log(localStorage.getItem('menus'))
        // this.$router.addRoute({path:'/reportx',name:'reportx',component:()=>import(/* webpackChunkName: "report" */ '../components/Report.vue')})
        // console.log('rout',routes)
        // let routeData = routes.find(r => r.path === this.$route.path);
        // routeData.children = [
        //   { path: 'bar', component: Bar },
        //   { path: 'baz', component: Baz },      
        // ];
        // this.$router.addRoutes([routeData])
    },

    mounted(){
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user != null) {
        this.menu()
        this.periode()
      }
      
            // mencoba nambah dynamic routing buat laporan

            // var { routes } = this.$router.options;

            // this.$router.addRoute({path:'/reportx',name:'reportx',component:()=>import(/* webpackChunkName: "report" */ '../components/Report.vue')})
            
            // console.log('rout',routes)
            // var menu = JSON.parse(localStorage.getItem('Menus'))
            
            // console.log('menu',menu)
            // for (let index = 0; index < menu.length; index++) {
            //   const element = menu[index];
            //   console.log(JSON.stringify(element.link).includes("/report"))
            // }

            // var difference = menu.filter(({ link: link1 }) => !routes.some(({ path: path }) => path === link1))

            // let b = []
            // for (let index = 0; index < difference.length; index++) {
            //   const element = difference[index];
            //   console.log(element.includes("/report"))
            // }

            // console.log('perbedaan',difference)

            // var search = (list, text) => list.filter(i => i.link.toLowerCase().includes(text.toLowerCase()))
            // var a = search(difference,'/reportx')
            // let report  = ['/repor']

            // let a = difference.filter(menu => JSON.stringify(menu.link).includes("/repor"))
            // console.log('perbedaan dengan spesifik link',a)

            // var filteredProducts = menu.filter(function(product) {
            //   return product.link.includes("/reportx");
            // });
            // console.log('f',filteredProducts)
            // let newRouting = a.map(item => {
            //   return {
            //     path: item.link,
            //     name: item.link,
            //     component: ()=>import(/* webpackChunkName: "report" */ '../components/Report.vue')
            //   }
            // })
            // console.log(newRouting)

            // a.forEach(element => {
            //   this.$router.addRoute({path:element.link,name:element.link,component:()=>import('../components/Report.vue')})
            // });

            // this.$router.addRoute(newRouting)
    },
    watch:{
      // bahasa(){
      //   this.menu()
      // }
    },
    
    methods: {
      periode(){
        api.get('period?token='+this.token).then(
          res => {
            localStorage.setItem('Periode',JSON.stringify(res.data))
          }
        )
      },
      async menu(){
        let id = []
        if (this.GroupMenu.length == 0) {
          // ambil id jabataan user
          let user = [JSON.parse(localStorage.getItem('user'))]
              await api.post('/jabatandata?token='+this.token, {
              jabatan: user[0].Jabatan
          })
          .then((res) => {
            id.push(res.data[0].id)
          })
          .catch((err) => {
              console.log(err)
          })
  
          // ambil menu untuk sidebar tergantung bahasa
          api.get('/jabatan/'+id[0]+'?token='+this.token).then(
          res=>{
            localStorage.setItem('Menus',JSON.stringify(res.data.menus))
            let tes = []
            if (this.bahasa == 'id') {
              for (let index = 0; index < res.data.menus.length; index++) {
              const element = res.data.menus[index];
              element.title = res.data.menus[index].idn;
              tes.push(element)
              }
              // console.log('tes',tes)
              // Menu induk
              var id = tes.filter( function(item){return (item.parent == 0);} );
              let List = []
              for (let index = 0; index < id.length; index++) {
                const element = id[index];
                element.title = element.idn
                element.Icon = element.icon
                element.ListName = tes.filter( function(item){return (item.parent == element.id);} );
                element.ListName.forEach(d => {
                  if (tes.filter(function(item){return (item.parent == d.id)}).length != 0) {
                    d['SubMenu'] = tes.filter(function(item){return (item.parent == d.id)})
                  }
                });
                List.push(element)
              }
              this.List = List
              this.GroupMenu = List
            }else if(this.bahasa == 'en'){
              for (let index = 0; index < res.data.menus.length; index++) {
              const element = res.data.menus[index];
              element.title = res.data.menus[index].eng;
              tes.push(element)
              }
              // Menu induk
              var ids = tes.filter( function(item){return (item.parent == 0);} );
              let List = []
              for (let index = 0; index < ids.length; index++) {
                const element = ids[index];
                element.title = element.eng
                element.Icon = element.icon
                element.ListName = tes.filter( function(item){return (item.parent == element.id);} );
                element.ListName.forEach(d => {
                  if (tes.filter(function(item){return (item.parent == d.id)}).length != 0) {
                    d['SubMenu'] = tes.filter(function(item){return (item.parent == d.id)})
                  }
                });
                List.push(element)
              }
              this.List = List
              this.GroupMenu = List
            }
            
            // this.isLoading = false
            // var { routes } = this.$router.options;
            // // console.log('rout',routes)
            // var menu = JSON.parse(localStorage.getItem('Menus'))
            // var difference = menu.filter(({ link: link1 }) => !routes.some(({ path: path }) => path === link1))
            // // console.log('perbedaan',difference)
            // let a = difference.filter(menu => JSON.stringify(menu.link).includes("/repor"))
            // // console.log('perbedaan dengan spesifik link',a)
            // a.forEach(element => {
            //   this.$router.addRoute({path:element.link.split(' ').join('-'),name:element.link,component:()=>import('../components/Report.vue')})
            // });
          })
          .catch(err=>{
            if (err == "Error: Request failed with status code 401" && this.$route.path != "/login") {
              this.logout()
            }
          })
        }
      },
      changeLocale(locale){
        i18n.locale = locale;
        this.bahasa = locale
        this.List = []
        this.GroupMenu = []
        this.menu()
      },
      logout(){
        this.isLoading = true
        this.token = localStorage.getItem('token')
        console.log(this.token)
        api.post('/logout?token='+this.token)
        .then(
          localStorage.removeItem('token'),
          localStorage.removeItem('user'),
          localStorage.removeItem('Menus'),
          this.$router.push('/login'),
          location.reload(false),
        )          
      }
    }
  }
</script>

<style scoped>
.v-navigation-drawer {
  will-change: initial;
}
</style>