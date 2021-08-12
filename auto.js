
const puppeteer      = require('puppeteer-core')

const { get_follow, 
        get_repos, 
        star,
        star_check } = require('./actions/browserJS');

const { login,
        primary, 
        secondly,   
                   } = require('./actions/async');
const { options, 
        timeout, 
        password, 
        email      } = require('./config/data');

const { info }       = require('./actions/logger');

const NAMESPACE      = 'Auto';

(async () => {
  const browser = await puppeteer.launch(options);

  info(NAMESPACE, 'Opened browser with given options', 'blue');

  const page    = await browser.newPage();
  info(NAMESPACE, 'Opened newtab in browser', 'blue');

  await page.setDefaultNavigationTimeout(timeout);

  await page.goto('https://github.com/8G6?tab=followers').then(() => {
    info(NAMESPACE, 'Gone to Followrs route', 'blue');
  });

  info(NAMESPACE, 'trying to authenticate with cookies', 'cyan');

  if ((await page.$('button.js-profile-editable-edit-button')) !== null)
    info(NAMESPACE, 'authentication sucessful !', 'green');

  else {
    info(NAMESPACE, 'Authentication failed', 'red');

    await login(page, email, password);

    await page.goto('https://github.com/8G6?tab=followers').then(() => {
    info(NAMESPACE, 'Gone to Followrs route', 'blue');
    });

    info(
      NAMESPACE,
      'Trying to login with user name and password',
      'cyan'
    );
  }
  let [follow, names] = await primary(page, get_follow);

  await secondly(page, follow, get_repos, names, star, star_check);

  await browser.close();
  
  info(NAMESPACE, 'Browser Closed');
})();


  
