<template>
<div class='modal-mask' transition='modal'><!--background shade-->
<div class='center-block' style='width: 500px; margin-top: 175px;'><!--modal props-->
<v-card class='dizagara-outline-blue' @keyup.enter='closeDialog("submit")'>
<!--title-->
	<v-card-title
		class="primary"
		style='color: white;'>
		<span class='mdi mdi-24px dizagara-margin-right dizagara-margin-left' id='headerIcon'></span>
		Register   
	</v-card-title>		
<!--content-->
	<v-card-text>
		<v-form ref = 'form' lazy-validation>
	<v-row><!--master row-->
	<v-col><!--right col-->
	<!--content-->
		<v-card-text style='padding: 20px 20px 0px 20px;'>
		<!--username-->
			<v-text-field dense outlined
				label='Username'
				:rules='[validate.required]'
				placeholder='Type username...'
				v-model='user.username'
				autocomplete='off'
				background-color='yellow lighten-4'
			></v-text-field>
		<!--password-->
			<v-text-field dense outlined
				label='Password'
				:rules='[validate.required]'
				placeholder='Type password...'
				type='password'
				v-model='user.fruit'
				autocomplete='off'
				background-color='yellow lighten-4'
			></v-text-field>
		</v-card-text>
	</v-col>
</v-row>
</v-form>		
</v-card-text>   
<!--actions-->
	<v-card-actions style='margin-top: -30px;'>
		<v-row>
		    <v-col class="text-right">
	<!--register button-->
		<v-btn dense
			class='dizagara-button-blue dizagara-button-width-medium' 
			style='margin-right: 20px;'
			@click='closeDialog("submit")'>
			<span class="mdi mdi-24px mdi-check-circle dizagara-margin-right"></span>
			SUBMIT
		</v-btn>
	<!--cancel button-->
		<v-btn dense dark
			class='dizagara-button-red dizagara-button-width-medium'
			style='text-align: center !important; margin: auto !important;'
			@click='closeDialog("cancel")'>
			<span class="mdi mdi-24px mdi-cancel dizagara-margin-right"></span>
			CANCEL
		</v-btn>
		</v-col>
		</v-row>
	</v-card-actions>
</v-card>
</div>
</div>
</template>
<script>
//imports
	import references from '../utils/references.js';
	import toastr from 'toastr';
	
//master
	export default {
//name
	name: 'user',
//components
	components: {
	},
	props: ['data', 'params'],
//cycle methods
    async created(){
	//focus the first textbox
		setTimeout(() => {
			$('#firstFocus').focus();
			$('#headerIcon').addClass(references.getIcon('user'));
		
		}, 0);
	},
//custom methods
    methods: {
	//close modal
		closeAccountModal(){
			this.$emit('closeAccountModal');
		},
	//close dialog
        async closeDialog(action){
        if(action == 'submit'){
        //form
            if(!this.$refs.form.validate()){
                toastr.error(references.getToast(`genericFormError`), ``, {'closeButton': true, positionClass: 'toast-bottom-right'});
                return;
            }
		}		
		//send data
            this.$emit('closeDialog', {
                action: action,
                data: this.user
            });
		}
    },
//global vars
	data: global => ({
		user: {
			username: ``,
			fruit: ``,
		},
		validate: {
			required: a => !!a || 'Entry is required!'
		}
	})
}
</script>