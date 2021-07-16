const colors = require('colors');
print=(text,clr='green')=>{eval(`text=text.${clr};`);console.log(text)}

get_follow=()=>{
    $=(a)=>document.querySelectorAll(a)
    follow=$('a.mb-1')
    final=[]
    for(i=1;i<follow.length;i++){
        final.push(follow[i].href.toString())
    }
    return final
 }
get_repos=()=>{
    $=(a)=>document.querySelectorAll(a)
    follow=$('h3.wb-break-all>a')
    final=[]
    for(i=1;i<follow.length;i++){
        final.push(follow[i].href.toString())
    }
    return final
}
star=()=>{
    $=(a)=>document.querySelectorAll(a)
    $('button.btn')[3].focus()
    if($('button.btn')[3].innerText!="        \n    \n\n        \n          Star\n"){
        $('button.btn')[3].click()
        return  $('button.btn')[3].innerText
    }
    return $('a.btn').innerText
}
check=()=>{
    $=(a)=>document.querySelectorAll(a)
    if($('button.btn')[3].innerText!="        \n    \n\n        \n          Star\n"){
        return 'Not Stared'
    }
    else{
        return 'Stared'
    }
}
login=()=>{
    try{
    document.querySelector('button.js-profile-editable-edit-button').innerText
    return ['Login Sucess','green']
    }
    catch(e){
        return ['Login Failed','red']
    }
}
module.exports={
    get_follow:get_follow,
    get_repos:get_repos,
    star:star,
    print:print,
    check:check,
    login:login
}