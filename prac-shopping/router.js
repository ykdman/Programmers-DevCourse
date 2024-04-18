const route = (pathName, handle, res) => {
  if (pathName.includes('favicon')) {
    return;
  }
  console.log(`Path Name : ${pathName}`);

  if (handle[pathName]) {
    handle[pathName](res);
  } else {
    handle['/error'](res);
  }
};

exports.route = route;
