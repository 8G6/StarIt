const {info}    = require('./logger');
const NAMESPACE = 'ASYNC';

login = async (page, email, password) => {
        await page.goto('https://github.com/login').then(() => {
          info(NAMESPACE, `Gone to GitHub`, 'blue');
        });

        await Promise.all([
          page.waitForSelector('input.btn', { visible: true }),
          page.waitForSelector(
            '#login_field',
            { visible: true },
            page.waitForSelector('#password', { visible: true })
          ),
        ]);
        
        await page.type('#login_field', email).then(() => {
          info(NAMESPACE, `Typed User Name`, 'magenta');
        });
        await page.type('#password', password).then(() => {
          info(NAMESPACE, `Typed password`, 'magenta');
        });
        await page.click('input.btn').then(() => {
          info(NAMESPACE, `Clicked on login button`, 'magenta');
        });

        await page.waitForNavigation();
};

primary = async(page, get_follow) => {
          follow = await page.evaluate(get_follow);

          print(`\nFollowers (${follow.length})\n`, 'cyan');

          follow.forEach((n) => print(n.split('/')[3], 'yellow'));
          console.log('\n');
          
          names = [];

          for (i = 0; i < follow.length; i++) {
            names.push(follow[i].split('/')[3]);
          }

          return [follow, names];
        };

secondly = async (page, follow, get_repos, names, star, star_check) => {
           for (i = 0; i < follow.length; i++) {
              await page.goto(follow[i] + '?tab=repositories').then(() => {
              info(NAMESPACE, `Gone to repos of user : ${names[i]}\n`, 'blue');
              });
              
              let repos = await page.evaluate(get_repos);

              print(
                `\nRepos of ${names[i]} (${repos.length})\n`,
                'cyan'
              );

              repos.forEach((n) => print(n.split('/')[4], 'yellow'));
              console.log('\n');

              await trirdly(page, repos, star, star_check, names);
        }
};

trirdly = async (page, repos, star, star_check, names) => {
            for (j = 0; j < repos.length; j++) {
              try{
                    await page.goto(repos[j]).then(() => {
                        info( 
                              NAMESPACE,
                              `Gone to ropo  ${repos[j].split('/')[4]} of user ${names[i]}`,
                              'blue'
                            );
                    });
                    await page.waitForSelector('button.btn');
                    status = await page.evaluate(star_check);
                    if (status == 'Not Stared') {
                        info(NAMESPACE, status, 'red');
                        status = await page.evaluate(star);
                    if (status != ' Star'){
                        info(
                          NAMESPACE,
                          `Stared ${repos[j].split('/')[4]} of ${names[i]}`
                        );
                        
                    }
                    
                   

                    await page
                        .reload({ waitUntil: ['networkidle0', 'domcontentloaded']})
                        .then(() => {
                          info(NAMESPACE, `Reloading page to conform`);
                        })
                    }
                    else{
                      info(
                        NAMESPACE,
                        `Already Stared ${repos[j].split('/')[4]} of ${names[i]}`
                      )
                    }
                  }
              catch(e){
                  console.log(e);
              }
            }
            
};

module.exports = {
                    login,
                    primary,
                    secondly,
                    trirdly,
                 }
