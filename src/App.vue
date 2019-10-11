<template>
  <v-app>
    <v-content>
      <v-container class="pa-0">
        <!-- HEADER START -->
        <v-row id="header" class="primary">
          <v-col cols="12" sm="6" md="2">
            <v-row aling="center" justify="center">
              <v-img src="./assets/logo.png" max-height="100" contain></v-img>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="2" class="pt-12 justify-space-around accent">
            <v-row class="font-weight-bold justify-space-around primary--text mx-auto">
              <v-badge v-model="show" color="error" left>
                <template v-slot:badge>
                  <span>{{ numberOfItems() }}</span>
                </template>
                <v-icon large color="primary">mdi-cart</v-icon>
              </v-badge>
              {{ sum() }}$
            </v-row>
          </v-col>
        </v-row>

        <!-- HEADER END -->

        <!-- MAIN STARTS -->
        <v-row id="main" class="secondary">
          <v-col cols="12" md="3" class="accent--text">
            <div class="card">CATEGORY</div>
            <div class="product">
              <a href="#drinks">
                <H2>DRINKS</H2>
              </a>
              <a href="#pizzas">
                <H2>PIZZAS</H2>
              </a>
              <a href="#fastFood">
                <H2>FAST FOOD</H2>
              </a>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="accent--text">
            <!-- PRODUCT CARD DRINKS -->

            <div class="card" id="drinks">DRINKS</div>
            <div class="product" v-for="item in items2" v-bind:key="item.id">
              <H2>{{ item.name }}</H2>
              <v-row class="justify-space-between px-3">
                <p>SMALL</p>
                <div class="d-flex">
                  <p class="px-4">{{item.price}}$</p>
                  <v-btn @click="addToBaskedPrice(item)" x-small color="accent">
                    <v-icon x-small>fa-cart-plus</v-icon>
                  </v-btn>
                </div>
              </v-row>

              <v-divider></v-divider>
            </div>

            <!-- PRODUCT CARD DRINKS END -->

            <!-- PRODUCT CARD PIZZAS -->

            <div class="card" id="pizzas">PIZZAS</div>
            <div class="product" v-for="item in items" v-bind:key="item.id">
              <H2>{{ item.name }}</H2>
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
                  <v-btn @click="addToBaskedFamily(item)" x-small color="accent">
                    <v-icon x-small>fa-cart-plus</v-icon>
                  </v-btn>
                </div>
              </v-row>
              <v-divider></v-divider>
            </div>

            <!-- PRODUCT CARD PIZZAS END -->

            <!-- PRODUCT CARD FAST FOOD -->

            <div class="card" id="fastFood">FAST FOOD</div>
            <div class="product" v-for="item in items3" v-bind:key="item.id">
              <H2>{{ item.name }}</H2>

              <v-row class="justify-space-between px-3">
                <p>SMALL</p>
                <div class="d-flex">
                  <p class="px-4">{{item.smallPrice}}$</p>
                  <v-btn @click="addToBaskedSmall(item)" x-small color="accent">
                    <v-icon x-small>fa-cart-plus</v-icon>
                  </v-btn>
                </div>
              </v-row>
              <v-row class="justify-space-between px-3">
                <p>MEDIUM</p>
                <div class="d-flex">
                  <p class="px-4">{{item.largePrice}}$</p>
                  <v-btn @click="addToBaskedLarge(item)" x-small color="accent">
                    <v-icon x-small>fa-cart-plus</v-icon>
                  </v-btn>
                </div>
              </v-row>
              <v-divider></v-divider>
            </div>

            <!-- PRODUCT CARD FAST FOOD END -->

            <!-- SHOPPING CART -->
          </v-col>
          <v-col id="basket" cols="12" md="3" class="accent--text">
            <div class="card">SHOPPING CART</div>

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

                      <td>{{ item.price }}$</td>
                      <v-btn @click="removeFromBasket(item, index)" fab x-small class="mt-2 accent">
                        <v-icon>fa-minus</v-icon>
                      </v-btn>
                    </tr>
                    <tr>
                      <td class="font-weight-black">TOTAL</td>
                      <td class="font-weight-black">{{ sum() }}$</td>
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
                    <v-card-title color="#7e5a44">
                      <span class="headline">Tell us where we should send the pizza</span>
                    </v-card-title>

                    <v-container>
                      <v-form>
                        <v-row class="ma-3">
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="Name" label="Name" required color="#7e5a44"></v-text-field>
                          </v-col>

                          <v-col cols="12" color="#7e5a44">
                            <v-text-field v-model="Email" label="Email*" required color="#7e5a44"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="Address"
                              label="Address*"
                              required
                              color="#7e5a44"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              v-model="PhoneNumber"
                              label="Phone"
                              type="number"
                              required
                              color="#7e5a44"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              v-model="Message"
                              label="Special requests"
                              required
                              color="#7e5a44"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="#7e5a44" text @click="dialog = false">Close</v-btn>

                      <v-btn
                        color="accent"
                        text
                        v-on:click="submitOrder(),dialog = false"
                      >Submit order</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </v-col>

          <!-- SHOPPING CART END-->
        </v-row>
        <v-row class="pa-3 justify-space-around accent">
          <div class="my-2">
            <a href="#pizzas">
              <v-btn color="error" fab x-large dark>
                <v-icon class="error">mdi-pizza</v-icon>
              </v-btn>
            </a>
          </div>

          <div class="my-2">
            <a href="#drinks">
              <v-btn color="error" fab x-large dark>
                <v-icon class="error">mdi-glass-cocktail</v-icon>
              </v-btn>
            </a>
          </div>

          <div class="my-2">
            <a href="#fastFood">
              <v-btn color="error" fab x-large dark>
                <v-icon class="error">mdi-food</v-icon>
              </v-btn>
            </a>
          </div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},
  mounted() {
    this.getData();
    this.getDataDrinks();
    this.getDataFastFood();
  },
  data() {
    return {
      items: [],
      items2: [],
      items3: [],
      basketDump: [],
      Name: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      Message: "",
      //overlay: false,
      dialog: false
      //activeBtn: 1,
      //showNav: true,
    };
  },

  methods: {
    getData() {
      axios
        .get("https://pizzashop00.azurewebsites.net/api/pizzas")
        .then(data => {
          this.items = data.data;
        });
    },
    getDataDrinks() {
      axios
        .get("https://pizzashop00.azurewebsites.net/api/drinks")
        .then(data => {
          this.items2 = data.data;
        });
    },
    getDataFastFood() {
      axios
        .get("https://pizzashop00.azurewebsites.net/api/fastfoods")
        .then(data => {
          this.items3 = data.data;
        });
    },
    addToBaskedNormal(item) {
      this.basketDump.push({
        id: item.id,
        name: item.name,
        price: item.normalPrice
      });
    },
    addToBaskedFamily(item) {
      this.basketDump.push({
        id: item.id,
        name: item.name,
        price: item.familyPrice
      });
    },
    addToBaskedLarge(item) {
      this.basketDump.push({
        id: item.id,
        name: item.name,
        price: item.largePrice
      });
    },
    addToBaskedSmall(item) {
      this.basketDump.push({
        id: item.id,
        name: item.name,
        price: item.smallPrice
      });
    },
    addToBaskedPrice(item) {
      this.basketDump.push({ id: item.id, name: item.name, price: item.price });
    },
    sum() {
      var sumValue = 0;
      this.basketDump.forEach(item => {
        sumValue += item.price;
      });
      return sumValue;
    },
    numberOfItems() {
      return this.basketDump.length;
    },
    removeFromBasket: function(item, index) {
      if (this.basketDump[index] === item) {
        this.basketDump.splice(index, 1);
      } else {
        let found = this.basketDump.indexOf(item);
        this.basketDump.splice(found, 1);
      }
    },
    submitOrder() {
      axios.post("https://pizzashop00.azurewebsites.net/api/order", {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        message: this.message
      });
    }
  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

body {
  font-family: "Roboto", sans-serif;
  margin: 0px;
}

h2 {
  color: #7e5a44;
  padding: 0em 0 1.5em 0;
}

a {
  text-decoration: none;
}
.theme--light.v-application {
  height: 400px !important;
}

#namings {
  background-color: #f2c779;
  color: #be3d06;
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
  color: #7e5a44;
  font-size: 1em;
}
</style>
