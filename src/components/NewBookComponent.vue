<template>
    <section class="new-book-content">
        <div class="newbook-title">
            <h4>register a new book</h4>
        </div>        
        <form class="newbook-form" @submit.prevent="createBook">
                   <div class="form-group">
                       <label for="isbn">isbn</label>
                       <input type="text" name="isbn" v-model="book.isbn" />
                       <div v-if="submitted && !$v.book.isbn.required">ISBN  requerido</div>
                   </div>
                   <div class="form-group">
                       <label for="title">title</label>
                       <input type="text" name="title" v-model="book.title" />
                       <div v-if="submitted && !$v.book.title.required">Titulo requerido</div>
                   </div>
                   <div class="form-group">
                       <label for="author">author</label>
                        <input type="text" name="author" v-model="book.author" />
                        <div v-if="submitted && !$v.book.author.required">Author requerido</div>
                   </div>
                   <div class="form-group">
                       <label for="editorial">editorial</label>
                       <input type="text" name="editorial" v-model="book.editorial" />
                       <div v-if="submitted && !$v.book.editorial.required">Editorial requerida</div>
                   </div>
                   <div class="form-group">
                       <label for="year">edition year</label>
                       <input type="number" name="year" v-model="book.year" />
                       <div v-if="submitted && !$v.book.year.required">año de edicion requerido</div>
                   </div>
                   <div class="form-group">
                       <label for="pages">pages number</label>
                       <input type="number" name="pages" v-model="book.pages" />
                       <div v-if="submitted && !$v.book.pages.required">numero de paginas requerido</div>
                   </div>
                   <div class="form-group div-btn-image">
                       <label for="image">image</label>
                       <input type="file" id="file" ref="file" name="image" @change="fileChange" />
                   </div>
                   <input type="submit" value="send" class="btn btn-success" />
        </form>
          
        
    </section>
</template>
<script>
import axios from 'axios';
import Global from '../Global';
import Book from '../models/Book';


import {required,minLength,numeric} from 'vuelidate/lib/validators';
export default{
    name:'NewBookComponent',
    data(){
       return{
           book:new Book('','','','','','','',false),
           axios:null,
           submitted:null,
           url:Global.url,
           file:null,
           tokken:null
       } 

       /*constructor(isbn,title,author,editorial,year,pages,image,loaned){
        this.isbn = isbn,
        this.title = title,
        this.author = author,
        this.editorial = editorial,
        this.year = year,
        this.pages = pages,
        this.image = image,
        this.loaned = loaned

    } */
    },
    /*components:{

    },*/
    validations:{
        book:{
            isbn:{
                required,
                minLength:minLength(5)
            },
            title:{
                required,
                minLength:minLength(5)
            },
            author:{
                required,
                minLength:minLength(5)
            },
            editorial:{
                required,
                minLength:minLength(5)
            },
            year:{
                required,
                numeric
            },
            pages:{
                required,
                numeric
            }

        }
    },
    mounted(){
        console.log('new book component loaded');
        this.tokken = localStorage.getItem('tokken');
    },
    
    methods:{
        createBook(){             
          this.submitted = true;
          this.$v.$touch();
          if(this.$v.$invalid){
            return false;
          }else{
            axios.post(this.url+"savebook",this.book,{
                headers:{
                    'Authorization':`${this.tokken}`
                }
            })
         .then((response)=>{        
            if(response.data.bookStored){
              if(this.file != null && 
              this.file != undefined &&
              this.file != "")
               {
                 const formData = new FormData();
                 formData.append(
                  'file0',
                  this.file,
                  this.file.name
                 );   
                var bookId = response.data.bookStored._id;         
                axios.post(this.url+"uploadbookavatar/"+bookId,formData,{
                    headers:{
                        'Authorization':`${this.tokken}`
                    }
                })
                .then(response=>{
                  if(response.data.bookUpdated){
                    /*swal(
                      "Articulo creado",
                      "Articulo creado correctamente",
                      "success"
                    );*/
                    this.book = response.data.bookUpdated;
                    this.$router.push('/home');
                  }else{
                    console.log("Error al subir imagen");
                  }
                });    

                }else{
                  /*swal(
                     "Articulo creado",
                      "Articulo creado correctamente",
                      "success"
                  );*/
                  this.book = response.data.bookStored;
                  this.$router.push('/home');
                }                           
            }
          }).catch(
           console.log(Error)
          );

        }    
                   
        },

        fileChange(){
            //this.file = this.$refs.file.files[0];
            this.file = this.$refs.file.files[0];
            //console.log(this.file);
        }
    }

}
</script>