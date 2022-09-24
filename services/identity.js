'use strict'

export default function identity({next}){
    if(!localStorage.getItem('tokken')){
        //return router.push('/home');
        return false;
    }
     next();
}

