<template>
    <section class="books-section">            
            <div class="sidebar">
                <SidebarComponent></SidebarComponent>
            </div>
            <div v-if="books && books.length >= 1">               
                <article v-for="book in books" :key="book" class="book-article">
                   <div class="booktitle">{{book.title}}</div>                   
                    <div v-if="book.image" class="image-wrap">
                        <img :src="url+'getbookimage/'+book.image" alt="book.title"/>
                    </div>
                    <div v-else class="image-wrap">
                        <img src="../assets/image/libro.png" alt="book.title" />
                    </div>
                    <div>
                        <strong>Author: </strong><span>{{book.author}}</span> |
                        <strong>Editorial : </strong><span>{{book.editorial}}</span> |
                    </div>
                    <div>
                        <strong>edition year : </strong><span>{{book.year}}</span> |
                        <strong>Pages : </strong><span>{{book.pages}}</span>                     
                    </div>
                    <span v-if="role && role == 'admin' || role == 'user' ">
                        <router-link :to="'/book/'+book._id">edit</router-link> ||
                        
                    </span> 
                    <span v-if="role && role == 'admin'">
                        <router-link v-if="!book.loaned" :to="'/loans/'+book._id">lend</router-link>
                        <span v-else class="book-borrowed-msg">borrowed</span>
                    </span>
                </article>
                                             
            </div>
            <div v-else id="book-seek-greet">
                <h4>find the book you are looking for</h4>
            </div>
            
    </section>
</template>
<script>
//import axios from 'axios';
import Global from '../Global';
import SidebarComponent from '../components/SidebarComponent.vue';
//import Search from './Search.vue';

export default{
    name:'Books',
    components:{
        //Search
       SidebarComponent
    },
    props:["books"],       
    data(){
        return{
            //books:[],
            url:Global.url,
            role:null
            //role:null
        }
    },
     mounted(){        
        this.role = localStorage.getItem('role')
        //this.getAllBooks();
    },
    /*
    methods:{
        getAllBooks(){
            axios.get(this.url+'allbooks')
            .then((res)=>{
                this.books = res.data.books,
                console.log(this.books);
            });
        }
    }*/
}   
</script>