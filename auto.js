const { get_follow, get_repos, star, star_check } = require('./fun');
const { login, primary, secondly, wait } = require('./async');
const { options, timeout, password, email } = require('./data');
const puppeteer = require('puppeteer-core');
const logger = require('./logger');
const NAMESPACE = 'Auto';

(async () => {
  const browser = await puppeteer.launch(options);
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
