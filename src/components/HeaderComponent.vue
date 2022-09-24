<template>
    <section id="menu">
        <div class="header-title">
            <h2>Welcome to the books management app</h2>
        </div>
        <div v-if="logedId" class="logged-user-data">
            Hallo <span><strong>{{logedName}} | </strong> you are logged as <b>{{role}}</b></span>
        </div>
        <div class="logout-div" v-if="logedName">
            <span><a href="#" @click="logOut">logout</a></span> ||
            <router-link to="/perfil" class="lnk-to-profil">profil management</router-link>
        </div>
        <div class="div-menu-log-admin" v-if="logedName && role == 'admin'">
            <ul>
                <li><router-link to="/home">home</router-link></li>                
                <li><router-link to="/newbook">new book</router-link></li>
                <li><router-link to="/books">books</router-link></li> 
                <li><router-link to="/loanmanager">loan manager</router-link></li>                
            </ul>
        </div>  
        <div class="div-menu-log-user" v-if="logedName && role == 'user'">
             <ul>
                 <li><router-link to="/home">home</router-link></li>                
                <li><router-link to="/books">books</router-link></li>                
                <!--<li><router-link to="/">perfil</router-link></li>-->                
             </ul>             
        </div>   
        <div v-if="!logedName" class="div-menu-standart">
            <ul>
                <li><router-link to="/home">home</router-link></li>  
                <li><router-link to="/books">books</router-link></li>                
                <li><router-link to="/register">registro</router-link></li>
                <li><router-link to="/login">login</router-link></li>
                
            </ul>
        </div>   
    </section>
</template>
<script>

export default{
    name:'HeaderComponent',
    components:{

    },
    data(){
        return{
          logedName:null,
          logedId:null,
          role:null
        }
    },
    mounted(){
        this.logedName = localStorage.getItem('name'),
        this.logedId = localStorage.getItem('userId');
        this.role = localStorage.getItem('role')
        
    },
    methods:{
        logOut(){            
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>