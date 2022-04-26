<template>
<v-app style='background-image: linear-gradient(to bottom right, #009dff, #003dbf);'>
<!--dialogs-->
	<transition name="fade">
		<user 
			:data='user' 
			:params='params'
			v-if='dialogs.user.show'
			@closeDialog='closeDialog($event, "user")'>
		</user>
	</transition>
<!--card-->
	<v-form ref='form' lazy-validation><!--required for this.$refs.form.validate()-->
	<v-card elevation='2' style='width: 450px; text-align: center; margin: 150px auto auto auto;' class='dizagara-outline-blue'>
		<!--logo-->
			<div style='margin: 50px;'>
				<strong style='font-weight: bolder; font-size: 25px; color: gray; text-align: center;'>
					<i class='fa fa-fw fa-bars'></i>FULL-STACK
				</strong>
			</div>
		<!--username textbox-->
			<v-text-field dense outlined
				id='firstFocus'
				append-icon='mdi-account-circle'
				label='Username'
				:rules='[validate.required]'
				placeholder='Type username...'
				v-model='username'
				autocomplete='off'
				background-color='light-blue lighten-5'
				style='margin-left: 30px; margin-right: 30px;'
			></v-text-field>
		<!--password textbox-->
			<v-text-field dense outlined
				append-icon='mdi-lock'
				label='Password'
				:rules='[validate.required]'
				placeholder='Type password...'
				v-model='password'
				type='password'
				autocomplete="off"
				background-color='light-blue lighten-5'
				style='margin-left: 30px; margin-right: 30px;'
			></v-text-field>
	<!--action buttons-->
		<v-card-actions style = 'background-color: #2655a9 !important; padding-bottom: 0px;'>
			<v-card-text v-on:keyup.enter='login()'>
			<!--login button-->
				<v-btn dense class='dizagara-button-blue'
          v-if='loginAttempts < 5'
					style='width: 100%; margin: 0px 0px 10px 0px; font-weight: bold;'
					@click='login()'>
					<span class='mdi' id='loginIcon'></span>
					LOGIN
				</v-btn>
				<v-row class = "align-center">
			<!--register button-->
				<v-btn small class='dizagara-button-blue'
					style='margin: 10px; width: 190px' 
					@click="register()" 
					title='Create an account'>
					<span class='mdi' id='accountIcon'></span>
					REGISTER
				</v-btn>
			<!--recover password-->
				<v-btn small class='dizagara-button-blue'
					style='margin: 10px; width: 190px;' 
					@click='recover()' 
					title='Recover your password.'>
					<span class='mdi' id='passwordIcon'></span>
					PASSWORD
				</v-btn>
				</v-row>
			</v-card-text>
		</v-card-actions>
		</v-card>
		</v-form>
	</v-app>
</template>
<script>
//import
	import bridge from '../bridge.js';
	import references from '../utils/references.js';
	import user from './user.vue';
	import toastr from 'toastr';

//master
    export default {
      //name
        name: 'login',//global vars
      data: () => ({
        username: '',
        password: '',
        userID: ``,
        loginAttempts: 0,
        user: {},
        validate: {
          required: a => !!a || 'Entry required!'
        },
        params: {},
        dialogs: {
          user: {
            show: false
          }
        }
      }),
      //components
        components: {
          user
        },
      //cycle methods
        //created
          async created() {
            //init timeout
            setTimeout(() => {
              $('#firstFocus').focus();
              $('#loginIcon').addClass(references.getIcon('login'));
              $('#accountIcon').addClass(references.getIcon('user'));
              $('#passwordIcon').addClass(references.getIcon('password'));
            }, 0);
            //CRUD examples (for reference only)
          },
      //custom methods
        methods: {
        //login
          async login(){
            //validate entries
              if(!this.$refs.form.validate()){
                return;
              }
            //get access token
            let username = this.username
            let password = this.password
            let accessToken = await bridge.getToken({
              collection: 'users',
              item: {
                username: username,
                password: password
              }
            });
            //notify based on the token
            if (accessToken[0]) {
              toastr.info(`Login Successful!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
              //redirect if successful token
              this.userID = accessToken[1];
              console.log(accessToken);
              this.$router.push({ path: `/dashboard/${accessToken[1]}`});
            } else {
              this.loginAttempts++;
              toastr.info(`Login Failed! Wrong password or account does not exist.`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            }
          },
        //create account
          register(){
            this.dialogs.user.show = true;
          },
        //forgot password
          recover(){
            toastr.info(`Ignore this button, no coding required here!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
          },
        //dialogs
          async closeDialog(params, type){
            //check if username already exists
            await bridge
            if (params.action == 'submit') {//if user is submitting
              //save user to database
              await bridge.setUser({
                collection: `users`,
                item: {
                  params
                }
              })
              //notify
              toastr.info(`Account Created!`, ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
            }
            //close dialog
            this.dialogs[type].show = false;
          }
        },
}
</script>