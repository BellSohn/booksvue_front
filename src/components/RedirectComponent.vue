<template>
    <h2>Redirigiendo...</h2>
</template>
<script>
export default{
    name:'RedirectComponent',
    mounted(){
        var searchString = this.$route.params.searchString;
        this.$router.push('/buscador/'+searchString)
    }
}
</script>