<template>
  <v-app>
  <v-content>

        <v-container class="pa-0"> <!-- fluid === full width design -->



          <v-row  id="header" class="primary"> <!-- no-gutters + dense -->

            <v-col cols="12" sm="6" md="2" > <!-- cols="12" md="4" -->

              <v-row aling="center" justify="center">
                 <v-img src="./assets/logo.png" max-height="100" contain> </v-img>
              </v-row>

            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="2" class=" pt-12 justify-space-around  accent" >
              <v-row class="font-weight-bold justify-space-around primary--text mx-auto">

                <v-badge
                        v-model="show"
                        color="error"
                        left
                >
                  <template v-slot:badge>
                    <span>{{ numberOfItems() }}</span>
                  </template>
                  <v-icon
                          large
                          color="primary"
                  >mdi-cart</v-icon>
                </v-badge>

                 {{ sum() }}$</v-row>
            </v-col>
          </v-row>




          <v-row id="main" class="secondary"> <!-- no-gutters  -->

            <v-col cols="12" md="3" class="accent--text" >
              <div class="card">CATEGORY</div>
              <div class="product">
                <H2> UL </H2>
                <p>li</p>
              </div>

            </v-col>
            <v-col cols="12" md="6" class="accent--text">

              <div class="card">MENU</div>

              <div class="product" v-for="item in items" v-bind:key="item.id">

                <H2> {{ item.name }} </H2>
                <p>{{ item.toppings }}</p>
                <v-row class="justify-space-between px-3">
                  <p>SMALL</p>
                  <div class="d-flex">
                    <p class="px-4">{{item.normalPrice}}$</p>
                    <v-btn @click="addToBaskedNormal(item)" x-small color="accent">
                      <v-icon x-small>fa-cart-plus</v-icon>
                    </v-btn>
                  </div>

                </v-row>
                <v-row class="justify-space-between px-3">
                  <p>MEDIUM</p>
                  <div class="d-flex">
                    <p class="px-4">{{item.familyPrice}}$</p>
                    <v-btn @click="addToBaskedFamily(item)" x-small color="accent"><v-icon x-small>fa-cart-plus</v-icon></v-btn>
                  </div>
                </v-row>


                <v-divider></v-divider>

              </div>


            </v-col>
            <v-col id="basket" cols="12" md="3" class="accent--text">
              <div class="card">CART</div>



              <div class="cart primary">

                

                    <v-simple-table height="auto" class="ma-0 pa-2 overline">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Product</th>
                              <th class="text-left">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in basketDump" :key="item.id">
                              <td>{{ item.name }}</td>
                              
                              <td>{{ item.price  }}$</td>
                              <v-btn @click="removeFromBasket(item, index)" fab x-small class=" mt-2 accent">
                                <v-icon>fa-minus</v-icon>
                              </v-btn>
                            </tr>
                            <tr >
                              <td class="font-weight-black" >TOTAL</td>
                              <td class="font-weight-black" >{{ sum() }}$</td>

                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>


                

               



                      <!-- BUTTON -->

                    <div class="d-flex justify-space-around pb-5 primary">

                    <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="error" v-on="on">Check out</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">Tell us where we should send the pizza</span>
                            </v-card-title>
                            
                              <v-container>
                                <v-form>
                                <v-row class="ma-3">
                                  <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="Name" label="Name" required></v-text-field>
                                    
                                  </v-col>
                                  <p> {{Name}} </p>
                                  <v-col cols="12">
                                    <v-text-field v-model="Email" label="Email*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field v-model="Address" label="Address*" required></v-text-field>
                                  </v-col>
                                  <p> {{Address}} </p>
                                   <v-col cols="12">
                                    <v-text-field v-model="PhoneNumber" label="Phone" type ="number" required></v-text-field>
                                  </v-col>

                                  <v-col cols="12">
                                    <v-text-field v-model="Message" label="Special requests" required></v-text-field>
                                  </v-col>
                                  
                                </v-row>
                                </v-form>

                              </v-container>
                              
                            
                            <v-card-actions>
                              <div class="flex-grow-1"></div>
                              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                              <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>

                    <!--
                    <v-dialog 
                          v-model="dialog"
                          width="500"
                        >
                          <template v-slot:activator="{ on }">
                          <router-link to="/order_form"> 
                            <v-btn
                              color="error"
                              
                              v-on="on"
                            > 
                                    
                                    
                              Your order
                            </v-btn>
                            </router-link>
                          </template>

                          <v-card>
                            <router-view></router-view>
                          </v-card>
                        </v-dialog>

                        -->


                    </div>


                        <!-- BUTTON ENDS HERE -->




  <!--
                  <div class="d-flex justify-space-around my-2">
                    <router-link to="/order_form"> 
                      <v-btn @click="overlay = !overlay" color="error" dark large>check out</v-btn>
                    </router-link>
                      <v-overlay :value="overlay">
                        <router-view></router-view>
                            <v-btn
                              icon
                              @click="overlay = false"
                            >

                                    <v-icon>mdi-close</v-icon>
                            
                            </v-btn>
                          </v-overlay>
                    
                    
                  </div>

  -->

                </div>
                
              </v-col>

            </v-row>





        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'App',

    

    components: {},
    mounted(){
      this.getData();

    },
    data () {
      return {
        items: [],
        basketDump:[],
        Name: '',
        Email: '',
        PhoneNumber: '',
        Address: '',
        Message: '',
        overlay: false,
        dialog: false,
      }
      
    },
    methods:{
      getData(){
        axios.get('https://pizzashop00.azurewebsites.net/api/pizzas').then(data => {this.items = data.data})
      },
      addToBaskedNormal(item){
        this.basketDump.push({id: item.id, name:item.name, price:item.normalPrice});



      },
      addToBaskedFamily(item){
        this.basketDump.push({id: item.id, name:item.name, price:item.familyPrice});
      },
      sum(){
        var sumValue = 0;
        this.basketDump.forEach(item => {
          sumValue += item.price;
        });
        return sumValue;
      },
      numberOfItems(){
       return this.basketDump.length
      },
      removeFromBasket: function(item, index){
        if(this.basketDump[index]===item){
          this.basketDump.splice(index, 1)
        } else{
          let found = this.basketDump.indexOf(item)
          this.basketDump.splice(found, 1)
        }

      }


    }

  };
</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');


  body {
    font-family: 'Roboto', sans-serif;
    margin: 0px;

  }

  a {
    text-decoration: none;
  }
  .theme--light.v-application {
    height: 400px !important;
  }

  #namings {
    background-color: #F2C779;
    color: #BE3D06;
    font-size: 2em;

  }

  #main {
    
    background-color: #f2c779;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23be3d06' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%237e5a44' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23b25912' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%239c6e45' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23a56d18' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23b67f47' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23977f1e' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23cc8d48' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23878e22' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e09b4a' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23769c26' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23f2a74b' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;



  }



  .card {
    font-size: 1.7em;
    font-weight: 600;
  }

  #main .product {

    height: auto;
    background-color: #ffffff;
    padding: 1em;
    box-sizing: border-box;
    color:#7E5A44;
    font-size: 1em;
  }
</style>
