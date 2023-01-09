<template>
  <section class="loanmanager-section">
      <div class="loanmanager-title">
          <h3>Welcome to the loan manager</h3>
      </div>
      <div v-if="loans && loans.length >= 1" class="loan-div">
          <table class="table table-hover">
             <tr>
                 <th>loan date</th>
                 <th>return date</th>    
                 <th>status</th>            
                 <th>title</th>                
                 <th>management</th>
              </tr>
              <tr v-for="loan in loans" :key="loan">
                  <td><span>{{ loan.loandate | moment.format("dddd MMMM YYYY") }}</span></td>
                  <td>{{loan.returndate | moment.format("dddd MMMM YYYY") }}</td>  
                  <td v-if="loan.status == 'activ'" class="activ-style">{{loan.status}}</td>
                  <td v-else class="completed-style">{{loan.status}}</td>
                  <td>{{loan.books[0].title}}</td>                  
                  <td><a :href="'/loan/'+loan._id">edit</a></td>                
                  
             </tr>                   
          </table>          
      </div>
      <div v-else>
          <h2>there are no pending loans</h2>
      </div>
      
  </section>
</template>
<script>
import Global from "../Global";
import axios from "axios";
import Loan from '../models/Loan';
export default {
  name: "LoanManagerComponent",
  data() {
    return {
      axios: null,
      url: Global.url,
      loans:[Loan],      
      books:[]
    };
  },
  mounted() {
    this.getAllLoans();
  },
  methods: {
    getAllLoans() {
      axios.get(this.url + "getloans").then((res) => {
        if (res.data.loans) {
          this.loans = res.data.loans;         
          var BooksLoans = this.loans.map(function(element){
            return element.books;            
          });
          this.books = BooksLoans;
        }
        
      });
    },
  },
};
</script>
