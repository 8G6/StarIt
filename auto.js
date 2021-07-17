const {get_follow,get_repos,star,print,star_check} = require('./fun')
const        { login, primary, secondly,wait }     = require('./async')
const        {options,timeout,password,email }     = require('./data')
const puppeteer = require('puppeteer-core');
(async () => {
    const browser = await puppeteer.launch(options)
    print('Opned browser with given options','blue')
    const page    = await browser.newPage()
    print('Opened newtab','blue')
    await page.setDefaultNavigationTimeout(timeout)
    await page.goto('https://github.com/8G6?tab=followers').then(()=>{print('Gone to Followrs route','blue')})
    print('trying to authenticate with cookies','cyan')
    if (await page.$('button.js-profile-editable-edit-button') !== null) print('authentication sucessful !','green')
    else{
        print('authentication','red')
        print('trying to login with user name and password','cyan')
        await login(page,email,password)
    }
    let [follow,names] = await primary(page,get_follow) 
    await secondly(page,follow,get_repos,names,star,star_check)
    await browser.close()

})();

