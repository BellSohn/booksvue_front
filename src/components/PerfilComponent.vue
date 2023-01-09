<template>
    <section class="user-profile-section">
        <div class="perfil-title">
            <h3>user profile</h3>
            <span class="updateuser-success" v-if="updated">
                <h4>profile successfully updated</h4>
            </span>            
        </div>
        <div>
            <section>
                <form @submit.prevent="updateUser">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" v-model="user.name" />
                        <div v-if="submitted && !$v.user.name.required">name requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="surname">Surname</label>
                        <input type="text" name="surname" v-model="user.surname" />
                        <div v-if="submitted && !$v.user.surname.required">surname requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" v-model="user.email" />
                        <div v-if="submitted && !$v.user.email.required">email requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea name="address" cols="31" rows="3" v-model="user.address" >
                        </textarea>
                        <div v-if="submitted && !$v.user.address.required">address required</div>
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" name="age" v-model="user.age" />
                        <div v-if="submitted && !$v.user.age.required">age es requerida</div>
                    </div>            
                    <div class="image-wrap" v-if="user.image">
                        <img :src="url+'get-image/'+user.image" alt="" />
                    </div>
                    <div v-else>
                        <img src="../assets/image/user.png" alt="default" />
                    </div>
                    <div class="image-wrap">
                        <label for="image">Avatar</label>
                        <input type="file" id="file" ref="file" name="image" @change="fileChange" />
                    </div>
                    <input type="submit" value="update" class="btn btn-success" />            
                </form>
            </section>
        </div>
    </section>
</template>
<script>
import User from '../models/User';
import Global from '../Global';
import axios from 'axios';

import {required,minLength,email,numeric} from 'vuelidate/lib/validators';
export default{
    name:'PerfilComponent',
    data(){
        return{
            user:new User('','','','','','','','',''),
            axios:null,
            url:Global.url,
            file:null,
            tokken:null,
            submitted:null,
            updated:null,
            userId:null,
            logged:null

        }      
        

    },
    validations:{
        user:{
            name:{
                required,
                minLength:minLength(5)
            },
            surname:{
                required,
                minLength:minLength(2)
                
            },
            email:{
                required,
                email
            },
            address:{
                required,
                minLength:minLength(5)
            },
            age:{
                required,
                numeric
            }
        }

    },
  
    mounted(){     
               
        this.userId = localStorage.getItem('userId');
        if(!this.userId){
            this.$router.push('/login');
        }        
        this.getDataUser();       
        this.tokken = localStorage.getItem('tokken');
    },
    methods:{       

        fileChange(){
            this.file = this.$refs.file.files[0];
            
        },
        getDataUser(){
         axios.get(this.url+'getuser/'+this.userId)
         .then((res)=>{
             if(res.data.user){
                 this.user = res.data.user
             }
         });   
        },
        updateUser(){           
            this.submitted = true;
            this.$v.$touch();
            if(this.$v.$invalid){
                return false;               

            }else{
                
                axios.put(this.url+'updateuser',this.user,{
                    headers:{
                        'Authorization':`${this.tokken}`
                    }
                })
                .then((res)=>{
                    if(res.data.userUpdated){
                        this.user = res.data.userUpdated                        
                        if(this.file != null &&
                        this.file != "" &&
                        this.file != undefined){
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.file,
                                this.file.name
                            );                            
                            var userId = this.user._id;
                            axios.post(this.url+'uploadavatar/'+userId,formData)
                            .then((res)=>{
                                if(res.data.userUpdated){
                                    this.updated = true,
                                    this.user = res.data.userUpdated,
                                    window.scrollTo(0,1000);
                                }
                            });
                        
                        }else{
                            this.updated = true,
                            this.user = res.data.userUpdated,
                            window.scrollTo(0,1000);
                        }
                    }
                });

            }
            
        }

    }
}
</script>
