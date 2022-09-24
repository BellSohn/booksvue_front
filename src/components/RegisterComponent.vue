<template>
    <section class="register-user-section">
        <div class="success-register" v-if="registered">
            <span id="register-msg">register successfull <router-link class="lnk-reg" to="/login">login</router-link></span>
        </div>
        <div class="register-title">
            <h3>new user register</h3>
        </div>
        <form class="" @submit.prevent="crateUser" id="formNewUser">
            <input type="hidden" name="role" value="user" />
             <div class="form-group">
                <label for="name">name</label>
                <input type="text" name="name" v-model="user.name"/>
                <div v-if="submitted && !registered && !$v.user.name.required">Name es requerido</div>
            </div>
            <div class="form-group">
                <label for="surname">surname</label>
                <input type="text" name="surname" v-model="user.surname" />
                <div v-if="submitted && !registered && !$v.user.surname.required">Surname es requerido</div>
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type="email" name="email" v-model="user.email" />
                <div v-if="submitted && !registered && !$v.user.email.required">E-mail es requerido</div>
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input type="password" name="password" v-model="user.password" />
                <div v-if="submitted && !registered && !$v.user.password.required">Password es requerido</div>
            </div> 
            <div class="form-group">
                <label for="address">address</label>
                <textarea name="address" cols="20" rows="2" v-model="user.address"></textarea>
                <div v-if="submitted && !registered && !$v.user.address.required">Address es requerida</div>
            </div>
            <div class="form-group">
                <label for="age">age</label>
                <input type="number" name="age" v-model="user.age" />
                <div v-if="submitted && !registered && !$v.user.age.required">Age es requerida</div>
            </div>
            <div class="form-group">
                <label for="avatar">avatar</label>
                <input type="file" id="file" ref="file" name="image"  @change="fileChange" />
            </div>
            <input type="submit" value="send" class="btn btn-success" />
        </form> 
                 
        
    </section>
</template>
<script>
import {required,minLength,email,numeric} from 'vuelidate/lib/validators';
import User from '../models/User';
import axios from 'axios';
import Global from '../Global';
export default{
    name:'RegisterComponent',
    data(){
        return{
            file:null,
            submitted:null,
            url:Global.url,
            user:new User('','','','','','','','user'),
            registered:null
        }
        
    },
    validations:{
        user:{
                name:{
                required,
                minLength:minLength(4)
                },
            surname:{
                required,
                minLength:minLength(4)
                },
            email:{
                required,
                email
            },
            password:{
                required,
                minLength:minLength(4)
            },
            address:{
                required,
                minLength:(5)                
            },
            age:{
                required,
                numeric
            }
        }
        
    },
    components:{

    },
    mounted(){
        console.log("new user form invoked");
    },
    methods:{
        fileChange(){
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        resetForm(){            
            this.user.name = "",
            this.user.surname = "",
            this.user.email = "",
            this.user.password = "",
            this.user.address = "",
            this.user.age = ""
        },
        crateUser(){ 
            //console.log("crear usuario!");
            this.submitted = true;
            this.$v.$touch();
            if(this.$v.$invalid){
                return false
            }else{   
                console.log("estamos aqui!");
                axios.post(this.url+'saveuser',this.user)
                .then((res)=>{                    
                    var userId = res.data.userStored._id;
                    if(this.file != null
                    && this.file != "" &&
                    this.file != undefined){                         
                       const formData = new FormData();
                        formData.append(
                            'file0',
                            this.file,
                            this.file.name
                        )
                        axios.post(this.url+'uploadavatar/'+userId,formData)
                        .then((res)=>{
                        if(res.data.userUpdated){
                            this.user = res.data.userUpdated;
                            this.registered = true;                           
                            this.resetForm();                            
                            //this.$router.push("/home");
                        }else{
                            console.log("Error al subir el archivo");
                        }                        
                    });                            
                        
                    }else{
                            this.user = res.data.userStored;
                            this.registered = true;                            
                            this.resetForm();                      
                            //this.$router.push("/home");  
                    }
                    
                });
            }


        }
    }
}
</script>