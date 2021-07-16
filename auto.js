const {get_follow,get_repos,star,print,check,login} = require('./fun')
const data = require('./data')
const puppeteer = require('puppeteer-core');
(async () => {
    const browser = await puppeteer.launch(data.options)
    print('Opned browser with given options','blue')
    const page    = await browser.newPage()
    print('Opened newtab','blue')
    await page.setDefaultNavigationTimeout(data.timeout)
    await page.goto('https://github.com/login').then(()=>{print('gone to GitHub','blue')})
    await page.waitForSelector('#login_field',{visible:true})
    await page.waitForSelector('#password',{visible:true})
    await page.waitForSelector('input.btn',{visible:true})
    await page.type('#login_field',data.email).then(()=>{print('Typed User Name','magenta')})
    await page.type('#password',data.password).then(()=>{print('Typed password','magenta')})
    await page.click('input.btn').then(()=>{print('Clicked on login button','magenta')})
    await page.waitForNavigation()
    await page.goto('https://github.com/8G6?tab=followers').then(()=>{print('Gone to Followrs route','blue')})
    let auth=await page.evaluate(login)
    print('\n'+auth[0]+'\n',auth[1])
    follow=await page.evaluate(get_follow)
    print(`\nFollowers (${follow.length})\n`,'cyan')
    follow.forEach(n=>print(n.split('/')[3],'yellow'))
    print('\n')
    names=[]
    for(i=0;i<follow.length;i++){
        names.push(follow[i].split('/')[3])
    }
    for(i=3;i<follow.length;i++){
        await page.goto(follow[i]+'?tab=repositories').then(()=>{print(`Gone to repos of user : ${names[i]}\n`,'blue')})
        reops=await page.evaluate(get_repos)
        print(`\nRepos of ${names[i]} (${reops.length})\n`,'cyan')
        reops.forEach(n=>print(n.split('/')[4],'yellow'))
        print('\n')
        for(j=0;j<reops.length;j++){
            try{
                await page.goto(reops[j]).then(()=>{print(`\nGone to ropo  ${reops[j].split('/')[4]} of user ${names[i]}`,'blue')})
                await page.waitForSelector('button.btn')
                status=await page.evaluate(check)
                if(status=='Not Stared'){
                    status=await page.evaluate(star)
                    await page.waitForNavigation()
                    if(status!=' Star') print(`Stared ${reops[j].split('/')[4]} of ${names[i]}` )
                    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] }).then(()=>{print(`Reloading page to conform` )});
                }
                else{
                    print(`Already Stared ${reops[j].split('/')[4]} of ${names[i]}`)
                }
                
            }
            catch(e){
                console.log(e)
            }
            
        }
    
    }
    await browser.close()
})();

