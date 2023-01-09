'use strict'

export default function identity({next}){
    if(!localStorage.getItem('tokken')){        
        return false;
    }
     next();
}

