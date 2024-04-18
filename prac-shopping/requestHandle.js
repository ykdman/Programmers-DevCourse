const { error } = require('console');

const main = (res) => {
  console.log('main');
  res.end('메인 화면!');
};

const login = (res) => {
  console.log('login');
  res.end('로그인 화면!');
};

const home = (res) => {
  console.log('홈화면');
  res.end("ykdman's home");
};

const errorPage = (res) => {
  console.log('error page');
  res.statusCode = 404;
  res.end('Page 404!');
};

const handle = {};
handle['/main'] = main;
handle['/login'] = login;
handle['/'] = home;
handle['/error'] = errorPage;

exports.handle = handle;
