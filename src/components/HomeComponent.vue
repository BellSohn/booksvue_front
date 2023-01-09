<template>
<section id="last-books-section">      
      <div v-if="books && books.length >= 1">
        <p>last books</p>
        <article v-for="book in books" :key="book" class="book-article">
          <div class="booktitle">{{book.title}}</div>
          <div v-if="book.image" class="image-wrap">
            <img :src="url+'getbookimage/'+book.image" alt="book.title" />
          </div>
          <div v-else class="image-wrap">
            <img src="../assets/image/libro.png" alt="libro" />
          </div>
          <strong>author: </strong><span>{{book.author}}</span> |
          <strong>Edition: </strong><span>{{book.year}}</span> |
          <strong>Pages: </strong><span>{{book.pages}}</span> 
          
          <span><a v-if="role && role == 'admin' || role == 'user'" :href="'/book/'+book._id">EDIT</a> ||</span> 
          <span><a v-if="role && role == 'admin' && book.loaned == false" :href="'/loans/'+book._id">lend</a></span>          
        </article>
      </div>    
      <div v-else>
          <h4>upps!,no books available for the moment</h4>
      </div>         
    </section>
</template>
<script>
import axios from 'axios';
import Global from '../Global';

export default {
  name: 'HelloWorld',
  components:{
    //Books
  },
  props: {
    //msg: String
  },
  mounted(){    
    this.role = localStorage.getItem('role');
    this.getArrayData();
    
  },
  data(){
    return {
      books: [],
      url:Global.url,
      role:null,
      prestado:null,
      booksId:[]
      
    }
  },
  methods:{
    getArrayData(){      
      axios.get(this.url+'getbooks')
      .then((res)=>{
        this.books=res.data.books.docs
       console.log(this.books);

       var testMap = this.books.map(function(element){         
         return element._id;
         
       });
       
       this.booksId.push(testMap);            
                
      });
    },
    
    
    
  }
}
</script>
