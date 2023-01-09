<template>
    <section class="loanedit-section">
        <div class="loanedit-title">
            <h3>loan edition</h3>
        </div>
        <div v-if="updatedLoan" class="activ-style">return date updated</div>
        <div v-if="loanStatus && loanStatus == 'completed'" class="activ-style left-align">loan finished</div>
        <div class="div-loan">
            <article class="loan-article">
                <form @submit.prevent="updateReturnDate">
                    <div class="form-group>">                    
                        <span class="spn-book-id"><strong>ID:</strong></span>                    
                        <span class="spn-id">{{loan._id}}</span>                    
                     </div>
                    <div class="form-group">
                        <label for="loandate" class="loan-date-title"><b>loandate:</b></label>
                        <p class="p-date">{{loan.loandate | moment('dddd,MM,YYYY')}}</p>
                    </div>
                <div class="form-group rtr-date">
                    <label for="returndate">return date:</label>
                    <input type="text" name="returndate" v-model="loan.returndate" />
                </div>
                <input type="submit" value="update return date" class="btn btn-success upd-rtr-date" />                
                </form>
                <a href="" class="btn btn-warning fns-loan" @click.prevent="endLoan">finish loan</a>
                
            </article>
            <article class="book-edit-info">
                <p>book info</p>
                <p v-if="bookLent == 'false'" class="positive-message">
                    BOOK AVAILABLE AGAIN
                </p>
                <p>
                    <label>ISBN</label> : <span>{{loan.books[0].isbn}}</span>
                </p>
                <p>
                    <label>title</label> : <span>{{loan.books[0].title}}</span>
                </p>
                <p>
                    <label>author</label> : <span>{{loan.books[0].author}}</span>
                </p>
                <p>
                    <label>editorial</label>: <span>{{loan.books[0].editorial}}</span>
                </p>
                <a href="#" class="btn btn-primary btn-avail-set" @click.prevent="setBookAsFree">set to available</a>
            </article>
        </div>
    </section>
</template>
<script>
import Global from '../Global';
import axios from 'axios';
import Loan from '../models/Loan';
import Book from '../models/Book';

 export default{
    name:'LoanEditComponent',
    data(){
        return{
            axios:null,
            tokken:null,
            url:Global.url,
            loanId:null,
            bookId:null,
            loan:Loan,
            book:Book,
            updatedLoan:null,
            loanStatus:null,
            bookLent:null,
           
        }
    },
    mounted(){
        this.loanInfo();
        this.tokken = localStorage.getItem('tokken');
        this.loanStatus = this.loan.status;
        
    },
    methods:{
        loanInfo(){            
            this.loanId = this.$route.params.id;
            axios.get(this.url+'getloan/'+this.loanId)
            .then((res)=>{
                if(res.data.loan){
                    this.loan = res.data.loan;
                    this.loanStatus = res.data.loan.status;                   
                }
            });            
        },
        updateReturnDate(){            
            axios.put(this.url+'updateloan/'+this.loanId,this.loan,{
                headers:{
                    'Authorization':`${this.tokken}`
                }
            })
            .then((res)=>{
                if(res.data.loanUpdated){
                    this.updatedLoan = true;
                    
                }
                
            });
        },
        endLoan(){
            
            //search book loan
            axios.get(this.url+'getloan/'+this.loanId)
            .then((res)=>{
                if(res.data.loan){                  
                    if(res.data.loan.status == 'activ'){
                        //change to completed
                        axios.put(this.url+'endloan/'+this.loanId,this.loan,{
                             headers:{
                            'Authorization':`${this.tokken}`
                            }
                        })
                        .then((res)=>{
                            if(res.data.loan){
                                this.loan.status = res.data.loan.status;                                
                                if(res.data.loan.status == 'completed'){
                                    this.loanStatus = 'completed'
                                }
                            }
                        });
                    }else{
                        this.loanStatus == 'completed'
                    }
                }
                
            });
        },
        
        setBookAsFree(){            
            this.bookId = this.loan.books[0]._id;            
            //search the book           
            axios.get(this.url+'getbook/'+this.bookId)
            .then((res)=>{
                if(res.data.book){                  
                    if(res.data.book.loaned == true){
                       //change loan to false                       
                       axios.put(this.url+'setbookasfree/'+this.bookId)
                       .then((res)=>{
                           if(res.data.book){
                               this.book  = res.data.book;                               
                               if(this.book.loaned == false){
                                   this.bookLent = 'false'
                               }
                           }
                       });
                   }
                   
                }
            });            
            
            
        }

    }
}
</script>
