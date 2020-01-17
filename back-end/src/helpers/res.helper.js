let resHandler = (code)=>{

    if(code==200){
        return {message:"Ok"};
    }else 
        return {error:"Bad request"};
}


module.exports = {
    resHandler
}