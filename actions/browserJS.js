get_follow = () => {
              $ = (a) => document.querySelectorAll(a);
              follow = $('a.mb-1');
              console.log(follow);
              final = [];
              for (i = 1; i < follow.length; i++) {
                final.push(follow[i].href.toString());
              }
              return final;
          };
  
get_repos = () => {
            $ = (a) => document.querySelectorAll(a);
            follow = $('h3.wb-break-all>a');
            final = [];
            for (i = 1; i < follow.length; i++) {
              final.push(follow[i].href.toString());
            }
            return final;
           };
  
star = () => {
        $ = (a) => document.querySelectorAll(a);
        $('button.btn')[3].focus();
          if (
            $('button.btn')[3].innerText !=
            '        \n    \n\n        \n          Star\n'
          ) {
            $('button.btn')[3].click();
            return $('button.btn')[3].innerText;
          }
          return $('a.btn').innerText;
        };
  
star_check = () => {
              $ = (a) => document.querySelectorAll(a);
              if (
                $('button.btn')[3].innerText !=
                '        \n    \n\n        \n          Star\n'
              ) {
                return 'Not Stared';
              } else {
                return 'Stared';
              }
        };
  
module.exports =  {
                    get_follow,
                    get_repos,
                    star,
                    star_check
                  };
  