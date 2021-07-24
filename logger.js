require('colors');
print = (text, clr = 'green') => {
  eval(`text=text.${clr};`);
  console.log(text);
};

const info = (namespace, message, color = 'green') => {
  print(`${getTimeStamp()} [${namespace}] [INFO] ${message}`, color);
};

const error = (namespace, message, color = 'red') => {
  print(`${getTimeStamp()} [[${namespace}] ERROR] ${message}`, color);
};

const warn = (namespace, message, color = 'yellow') => {
  print(`${getTimeStamp()} [${namespace}] [WARN] ${message}`, color);
};

const debug = (namespace, message, color = 'blue') => {
  print(`${getTimeStamp()} [[${namespace}] DEBUG] ${message}`, color);
};

const getTimeStamp = () => {
  return new Date().toLocaleString();
};

module.exports = {
  info,
  error,
  warn,
  debug,
};
