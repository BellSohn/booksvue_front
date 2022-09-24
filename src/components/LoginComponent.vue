<template>
    <section class="login-user-section">
            <div class="login-title">
                <h3>users login</h3>
            </div>            
            <div class="general">
                <form @submit.prevent="userlogin">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" v-model="user.email" />
                        <div v-if="submitted && !$v.user.email.required">revise campo Email</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" v-model="user.password" />
                        <div v-if="submitted && !$v.user.password.required">Password es requerido</div>
                    </div>
                    <input type="submit" value="login" class="btn btn-success" />
                </form>
            </div>
    </section>
</template>
<script>
import {required,email} from 'vuelidate/lib/validators';
import User from '../models/User';
import axios from 'axios';
import Global from '../Global';
    export default{
        name:'LoginComponent',
        data(){
            return{                
                user:new User('','','','','','','','user',true),                
                axios:null,
                url:Global.url,
                submitted:null,
                login:null
                
            }
        },
        validations:{
            user:{
                email:{
                    required,
                    email
                },
                password:{
                    required
                }
            }
        },
        components:{

        },
        mounted(){
            console.log('login component invoked');
            //this.user.email = localStorage.getItem('email');
            
        },
        methods:{
            userlogin(){
                //console.log("userLogin invoked");
                //console.log(this.user);
                this.submitted = true,
                this.$v.$touch();                
                if(this.$v.$invalid){
                    return false;
                }else{                    
                    axios.post(this.url+'login',this.user,                     
                    )
                    .then((res)=>{
                        //console.log(res.data);
                        localStorage.setItem('tokken',res.data.tokken);
                        axios.post(this.url+'logindata',this.user)
                        .then((res)=>{
                            console.log(res.data.userStored);
                            this.login = true;
                            localStorage.setItem('name',res.data.userStored.name);                            
                            localStorage.setItem('role',res.data.userStored.role);
                            localStorage.setItem('userId',res.data.userStored._id);                            
                            window.location.reload();
                        }); 
                        this.$router.push('/home');                    
                    }); 
                                      
                }

            }
        }

        
    }
    
</script>