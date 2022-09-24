<template>
    <section>
           <!-- <div id="search-title">
                <h2>founded books</h2>
            </div>-->
            <div v-if="books.length < 1" class="noresults-div">
                <span>sorry,no resuts,try it again</span>
            </div>
            <div v-if="books" class="search-founded-books-container">
                <Books :books="books"></Books>
                
            </div>
            
    </section>
</template>
<script>
import Global from '../Global';
import axios from 'axios';
import Books from './Books.vue';


export default{
    name:'SearchComponent',
    components:{
        Books,
        
    },
    mounted(){
        var searchString = this.$route.params.searchString;
        this.getBooksBySearch(searchString);
        //console.log(searchString);
    },
    data(){
        return{
            books:[],
            searchString:null,
            url:Global.url,
            axios:null
        }
    },
    methods:{
        getBooksBySearch(searchString){
        axios.get(this.url+'searchbook/'+searchString)
        .then((res)=>{
            if(res.data.books){
                this.books=res.data.books,
                console.log(this.books);

            }
        });

        }

    }

}
</script>