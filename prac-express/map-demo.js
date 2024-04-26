const db = new Map();
const db2 = new Map();
const dbYoutuber = new Map();

const generateProduct = (productName, price) => {
  return {
    productName,
    price,
  };
};
const youtuberObj = (name, subscribers) => {
  return {
    name,
    subscribers,
  };
};

db.set(1, generateProduct("Notebook", 20000));
db.set(2, generateProduct("Cup", 7000));
db.set(3, generateProduct("Chiar", 100000));
db.set(4, generateProduct("Poster", 35000));

// console.dir(db); // 1 => {productName : 'Notebook', price : 20000}

db2.set(1, generateProduct("Lenovo", 1250000));
db2.set(2, generateProduct("Intel", 26000));
db2.set(3, generateProduct("Samsung", 125223));
db2.set(4, generateProduct("Apple", 7000000));

dbYoutuber.set(1, youtuberObj("@ChimChakMan-Official", 122000000));
dbYoutuber.set(2, youtuberObj("@BoDDA", 2500000));
dbYoutuber.set(3, youtuberObj("@MetaComedy", 12600000));

exports.db = db;
exports.db2 = db2;
exports.dbYoutuber = dbYoutuber;
