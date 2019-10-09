<template>
      <v-app>
      <v-content>
      
        
            <v-card>  

                  <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  class="pa-5 ma-0"
                >
                      <v-text-field
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        required
                      ></v-text-field>
                  
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                  
                      <v-text-field
                        v-model="phone"
                        type="number"
                        :rules="phoneRules"
                        label="Phone number"
                        required
                      ></v-text-field>
                  
                      <v-text-field
                        v-model="address"
                        :rules="addressRules"
                        label="Address"
                        required
                      ></v-text-field>


                      <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'You must agree to continue!']"
                        label="Do you agree to sell your soul to pizza?"
                        required
                      ></v-checkbox>
                  
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                      >
                        Validate
                      </v-btn>
                  
                      <v-btn
                        color="error"
                        class="mr-4"
                        @click="reset"
                      >
                        Reset Form
                      </v-btn>
                  
                      <v-btn
                        color="warning"
                        @click="resetValidation"
                      >
                        Reset Validation
                      </v-btn>

                </v-form>

                </v-card>

              
            
        

   
         
        

       
      </v-content>
    </v-app>
</template>




<script>
export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
      ],

      address: '',
      addressRules: [
        v => !!v || 'Dont you live somewhere, dude?'
      ],


      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>






<style>
  
v-app {
  height: auto;
}
 
</style>