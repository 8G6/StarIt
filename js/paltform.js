load = () => {
  let os = navigator.appVersion;
  if (os.indexOf('Win') != -1) Name = 'Windows';
  if (os.indexOf('Mac') != -1) Name = 'Mac';
  if (os.indexOf('Linux') != -1) Name = 'Linux';
  if (os.indexOf('x64') != -1) arch = 'x64';
  if (os.indexOf('x86') != -1) arch = 'x86';
};

browser = (os, brow, arch, user) => {
  // window's Brave
  let [bwin32, bwin64] = [
    'C:\\\\Program Files (x86)\\\\BraveSoftware\\\\Brave-Browser\\\\Application\\\\brave.exe',
    'C:\\\\Program Files\\\\BraveSoftware\\\\Brave-Browser\\\\Application\\\\brave.exe',
  ];

  // Window's chrome
  let [cwin32, cwin64] = [
    'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
  ];

  // Linux's chrome
  let [clin32, clin64] = ['/usr/bin/google-chrome', '/usr/bin/google-chrome'];

  // Linux's brave
  let [blin32, blin64] = ['/usr/bin/brave-browser', '/usr/bin/brave-browser'];

  // linux chrome-cookie path
  let linCcookie = `/home/${user}/.cache/google-chrome/Default/Cache/Default`;

  // linux brave-cookie path
  let linBcookie = `/home/${user}/.cache/BraveSoftware/Brave-Browser/Default/Cache/Default`;

  // window chrome-cookie path
  let ccookie = `C:\\\\Users\\\\${user}\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data\\\\Profile 1`;

  // window firefox-cookie path
  let bcookie = `C:\\\\Users\\\\${user}\\\\AppData\\\\Local\\\\BraveSoftware\\\\Brave-Browser\\\\User Data\\\\Default`;
  let path = {
    binary: '',
    cookie: '',
  };
  if (os == 'Windows') {
    if (arch == 'x86') {
      if (brow == 'chrome') [path.binary, path.cookie] = [cwin32, ccookie];
      else if (brow == 'brave') [path.cookie, path.binary] = [bcookie, bwin32];
    } else if (arch == 'x64') {
      if (brow == 'chrome') [path.binary, path.cookie] = [cwin64, ccookie];
      else if (brow == 'brave') [path.binary, path.cookie] = [bwin64, bcookie];
    }
    return path;
  }
  if (os == 'Linux') {
    if (arch == 'x86') {
      if (brow == 'chrome') [path.binary, path.cookie] = [clin32, linCcookie];
      else if (brow == 'brave')
        [path.binary, path.cookie] = [blin32, linBcookie];
    } else if (arch == 'x64') {
      if (brow == 'chrome') [path.binary, path.cookie] = [clin64, linCcookie];
      else if (brow == 'brave')
        [path.binary, path.cookie] = [blin64, linBcookie];
    }
    return path;
  }
};
