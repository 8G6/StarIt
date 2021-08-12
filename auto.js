<<<<<<< HEAD
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

=======

const puppeteer = require('puppeteer-core');

const { get_follow, get_repos, star, star_check } = require('./actions/fun');
const { login, primary, secondly}                 = require('./actions/async');
const { options, timeout, password, email }       = require('./data');
const {info}                                      = require('./actions/logger');

=======
const { get_follow, get_repos, star, star_check } = require('./fun');
const { login, primary, secondly, wait } = require('./async');
const { options, timeout, password, email } = require('./data');
const puppeteer = require('puppeteer-core');
const logger = require('./logger');
>>>>>>> 2424812059f610120ab66ac7e2bed9079e7f5667
const NAMESPACE = 'Auto';
>>>>>>> 9fde3276c75096a0d15e42c828b27b7f4e33dc59

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
<<<<<<< HEAD

 
=======

  logger.info(NAMESPACE, 'Opned browser with given options', 'blue');

  const page = await browser.newPage();
  logger.info(NAMESPACE, 'Opened newtab in browser', 'blue');


  await page.setDefaultNavigationTimeout(timeout);
  await page.goto('https://github.com/8G6?tab=followers').then(() => {
    logger.info(NAMESPACE, 'Gone to Followrs route', 'blue');
  });
  logger.info(NAMESPACE, 'trying to authenticate with cookies', 'cyan');

  if ((await page.$('button.js-profile-editable-edit-button')) !== null)
    logger.info(NAMESPACE, 'authentication sucessful !', 'green');
  else {
    logger.info(NAMESPACE, 'Authentication', 'red');
    logger.info(
      NAMESPACE,
      'Trying to login with user name and password',
      'cyan'
    );
    await login(page, email, password);
  }
  let [follow, names] = await primary(page, get_follow);
  await secondly(page, follow, get_repos, names, star, star_check);
  await browser.close();
  logger.info(NAMESPACE, 'Browser Closed');
})();
>>>>>>> 9fde3276c75096a0d15e42c828b27b7f4e33dc59
