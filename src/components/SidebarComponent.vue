<template>
    <aside class="serch-aside">
        <div>
            <h3>Search</h3>
            <p>books seeker</p>
            <form @submit.prevent="letsSearch" class="search-form">
                <label>search text</label>
                <input type="text" name="search" v-model="searchString" />
                <input type="submit" value="send" class="btn btn-success" />
            </form>
        </div>
    </aside>
</template>
<script>
export default{
    name:'SidebarComponent',
    components:{

    },
    data(){
        return{
            searchString:null
        }
    },
    mounted(){

    },
    methods:{
        letsSearch(){          
            this.$router.push('/redirect/'+this.searchString);
        }
    }
}
</script>