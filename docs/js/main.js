$ = (a) => document.querySelector(a);
let Name, arch;
make = () => {
  let brow = navigator.brave ? 'brave' : window.chrome ? 'chrome' : '';

  let email = $('#email').value;
  let password = $('#password').value;
  let user = $('#user').value;
  let timeout = $('#timeout').value ? $('#timeout').value : 70000;
  a = email == '' ? alert('Enter GitHub Email') : 1;
  b = password == '' ? alert('Enter GitHub Password') : 1;
  c = user == '' ? alert('Enter Your User name') : 1;
  if (a + b + c == 3) {
    let path = browser(Name, brow, arch, user);
    let text = `module.exports={
                    "email":"${email}",
                    "password":"${password}",
                    "options":{
                        "headless":false,
                        "args": [
                            "--no-sandbox",
                            "--disable-setuid-sandbox",
                            "--disable-dev-shm-usage",
                            "--disable-accelerated-2d-canvas",
                            "--no-first-run",
                            "--no-zygote",
                            "--disable-gpu"
                        ],
                        "executablePath":"${path.binary}",
                        "userDataDir":"${path.cookie}",
                    },
                    "timeout":"${timeout}"
        }`;
    create(text);
  }
};
function create(text) {
  let a = $('a');
  var file = new Blob([text], { type: 'text/javascript' });
  a.href = URL.createObjectURL(file);
  a.download = 'data.js';
}
