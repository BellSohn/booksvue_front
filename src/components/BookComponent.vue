<template>
    <section>       
        <div v-if="updated" class="book-updt-success">
            <span><h4>book info successfully updated</h4></span>
        </div>
        <div class="book-edit">
             <div class="book-edition-title">
                <h3>books edition</h3>
            </div>
            <section>
                <form @submit.prevent="updateBook">
                    <span v-if="book.loaned" class="positive-message">BOOK BORROWED</span>
                    <div class="form-group">
                        <label for="isbn">ISBN</label>
                        <input type="text" name="isbn" v-model="book.isbn" />
                        <div v-if="submitted && !$v.book.isbn.required">ISBN requerido</div>                        
                    </div>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" name="title" v-model="book.title" />
                        <div v-if="submitted && !$v.book.title.required">title requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="author">author</label>
                        <input type="text" name="author" v-model="book.author" />
                        <div v-if="submitted && !$v.book.author.required">author requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="editorial">editorial</label>
                        <input type="text" name="editorial" v-model="book.editorial" />
                        <div v-if="submitted && !$v.book.editorial.required">editorial requerida</div>
                    </div>
                    <div class="form-group">
                        <label for="year">year</label>
                        <input type="number" name="year" v-model="book.year" />
                        <div v-if="submitted && !$v.book.year.required">year requerido</div>
                    </div>
                    <div class="form-group">
                        <label for="pages">pages</label>
                        <input type="number" name="pages" v-model="book.pages" />
                        <div v-if="submitted && !$v.book.pages.required">pages requerido</div>
                    </div>
                    <div class="image-wrap" v-if="book.image">
                            <img :src="url+'getbookimage/'+book.image" alt="" />
                    </div>
                    <div class="image-wrap" v-else>
                            <img src="../assets/image/libro.png" alt="default" />
                    </div>
                    <div class="form-group" v-if="role && role == 'admin'">
                        <label for="image">Image</label>                        
                        <input type="file" id="file" ref="file" name="image" @change="fileChange" />
                    </div>
                    <input type="submit" class="btn btn-success" value="update" v-if="role && role == 'admin'" />
                    
                </form>
            </section>
        </div>
       
    </section>
</template>
<script>
import Book from '../models/Book';
import Global from '../Global';
import axios from 'axios';
import {numeric,required,minLength} from 'vuelidate/lib/validators';
export default{
    name:'BookComponent',
    components:{

    },
     data(){
        return{
            book:new Book('','','','','','','',''),
            file:null,
            role:null,
            bookId:null,
            url:Global.url,
            axios:null,
            submitted:null,
            tokken:null,
            updated:null,
            dateToday:null
        }

        /* constructor(isbn,title,author,editorial,year,pages,image,loaned){
        this.isbn = isbn,
        this.title = title,
        this.author = author,
        this.editorial = editorial,
        this.year = year,
        this.pages = pages,
        this.image = image,
        this.loaned = loaned

    }

    } */
       
    },
    validations:{
        book:{
            isbn:{
                required,
                numeric
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
        //console.log('BookComponent invoked');
        this.role = localStorage.getItem('role');
        this.bookId = this.$route.params.id;
        this.tokken = localStorage.getItem('tokken');
        //console.log(this.bookId);
        this.loadBookInfo();
        console.log(this.getDateToday());
    },
   
    methods:{
        fileChange(){
            this.file = this.$refs.file.files[0];
             
        },
        loanBook(){
            //alert("vas a prestar el libro");
        },
        getDateToday(){
            this.dateToday = new Date();
            const year = this.dateToday.getFullYear();
            const month = this.dateToday.getMonth()+1;
            const day = this.dateToday.getDate();
            //console.log("dia : "+day+"mes : "+month+ " year :"+year);
            return `${year}-${month}-${day}`;
        },
        loadBookInfo(){
            //console.log("loadBookInfo method invoked");
            axios.get(this.url+'getbook/'+this.bookId)
            .then((res)=>{
                if(res.data.book){
                    this.book = res.data.book,
                    console.log(this.book);
                }
            });

        },
        updateBook(){
            //alert("actualizamos libro!!");
            this.submitted = true;
            this.$v.$touch();
            if(this.$v.$invalid){
                return false;
            }else{
                 axios.put(this.url+'updatebook/'+this.bookId,this.book,{
                     headers:{
                         'Authorization':`${this.tokken}`
                     }
                 })
                .then((res)=>{
                    if(res.data.bookUpdated){                        
                        //console.log(res.data.bookUpdated);
                        if(this.file != '' &&
                        this.file != null && 
                        this.file != undefined){
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.file,
                                this.file.name
                            );                                                      
                        axios.post(this.url+'uploadbookavatar/'+this.bookId,formData,{
                            headers:{
                                'Authorization':`${this.tokken}`
                            }
                        })
                        .then((res)=>{
                            if(res.data.bookUpdated){
                                this.updated = true
                                this.book = res.data.bookUpdated
                            }
                        })    
                        }else{
                            this.updated = true
                            this.book = res.data.bookUpdated
                        }
                      
                    }
                }).catch(
                    console.log(Error)
                );
            }
          
        }
    }

}
</script>