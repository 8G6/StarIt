load = () => {
    let os = navigator.appVersion
    if (os.indexOf("Win")   != -1) Name = "Windows";
    if (os.indexOf("Mac")   != -1) Name = "Mac";
    if (os.indexOf("Linux") != -1) Name = "Linux";
    if (os.indexOf('x64')   != -1) arch = "x64"
    if (os.indexOf('x86')   != -1) arch = "x86"
    Name!='Windows' ? $('#win').innerHTML='' : ''
}
browser = (os,brow,arch,user) => {
    let [bwin32,bwin64]=[
        'C:\\\\Program Files (x86)\\\\BraveSoftware\\\\Brave-Browser\\\\Application\\\\brave.exe',
        'C:\\\\Program Files\\\\BraveSoftware\\\\Brave-Browser\\\\Application\\\\brave.exe'
    ]
    let [cwin32,cwin64]=[
        'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
        'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe'
    ]
    let ccookie = `C:\\\\Users\\\\${user}\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data\\\\Profile 1`
    let bcookie = `C:\\\\Users\\\\${user}\\\\AppData\\\\Local\\\\BraveSoftware\\\\Brave-Browser\\\\User Data\\\\Default`
    let path={
        "binary":'',
        "cookie":''
    };
    if(os=='Windows'){
        if(arch=='x86'){
            if(brow=='chrome') [path.binary,path.cookie]=[cwin32,ccookie]
            else if(brow=='brave') [path.cookie,path.binary] = [bcookie,bwin32]
        }
        else if(arch=='x64'){
            if(brow=='chrome')[path.binary,path.cookie]=[cwin64,ccookie] 
            else if(brow=='brave')[ path.binary,path.cookie]= [bwin64,bcookie]
        }
        return path
    } 
}

