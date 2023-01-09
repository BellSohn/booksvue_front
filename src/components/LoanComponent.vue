<template>
    <section class="loan-section-mng">
        <div class="newloan-title">
            <h4>lend the book:<span class="background-green"><strong>{{mybook.title}}</strong></span></h4>
        </div>
        <div class="" v-if="mybook">
            <form class="" @submit.prevent="saveLoan">
                <div class="form-group">
                    <label for="isbn">isbn</label>
                    <input type="text" name="isbn" v-model="mybook.isbn" disabled  />
                </div>
                <div class="form-group">
                    <label for="title">title</label>
                    <input type="text" name="title" v-model="mybook.title" disabled />
                </div>
                <div class="form-group">
                    <label for="author">author</label>
                    <input type="text" name="author" v-model="mybook.author" disabled />
                </div>
                <div class="form-group">
                    <label for="editorial">editorial</label>
                    <input type="text" name="editorial" v-model="mybook.editorial" disabled />
                </div>
                <div class="image-wrap" v-if="mybook.image">
                    <img :src="url+'getbookimage/'+mybook.image" alt="default" />
                </div>
                <div class="image-wrap" v-else>
                    <img src="../assets/image/libro.png" alt="default" />
                </div>
                <div class="form-group">
                    <label for="loandate">loan date</label>
                    <input type="date" name="loandate" v-model="loan.loandate" />
                </div>
                <div class="form-group">
                    <label for="returndate">return date</label>
                    <input type="date" name="returndate" v-model="loan.returndate" />
                </div>
                <input type="submit" value="save loan" class="btn btn-success" />
                
            </form>            
        </div>        
        
    </section>
    
    
</template>
<script>
import axios from 'axios';
import Global from '../Global';
import Loan from '../models/Loan';
import Book from '../models/Book';

export default{
    name:'LoanComponent',
    data(){
        return{
            mybook:new Book('','','','','','','',''),
            loan:new Loan('',''),
            bookId:null,
            axios:null,
            url:Global.url,
            tokken:null,
            lentBookId:null,
            loanId:null,
            loans:[]
            
        }

        
    },
    mounted(){        
        this.tokken = localStorage.getItem('tokken');
        this.bookId = this.$route.params.id;        
        this.getAllLoans();
        this.getBookInfo();        
    },
    
    methods:{
        getBookInfo(){
            axios.get(this.url+'getbook/'+this.bookId)
            .then((res)=>{
                if(res.data.book){
                    this.mybook = res.data.book                    
                }
            });
        },
        getAllLoans(){     
            axios.get(this.url+'getloans/')
            .then((res)=>{
                if(res.data.loans){
                    this.loans = res.data.loans,                    
                }
            });            
        },
        saveLoan(){            
            axios.post(this.url+'saveloan/'+this.bookId,this.loan,{
                headers:{
                    'Authorization':`${this.tokken}`
                }
            })
            .then((res)=>{
                if(res.data.loanStored){                    
                    this.lentBookId = res.data.loanStored.books[0]._id;                    
                    axios.put(this.url+'setbookaslent/'+this.lentBookId)
                    .then((res)=>{
                        if(res.data.book){
                            this.$router.push('/book/'+this.lentBookId);
                        }
                    });
                }
            });
        }

    }
}

</script>
