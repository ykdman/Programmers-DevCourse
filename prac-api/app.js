const express = require("express");
const app = express();
const PORT = 3000;
const articles = [];

/**
 * Article 중복확인 함수
 * @param {*} ariticles: article 저장 객체
 * @param {*} updateArticle: update할 article
 * true 반환 시 중복 존재
 *
 */
function checkDuplicateArticle(ariticles, updateArticle) {
  const filteredArticles = ariticles.filter(
    (article) => article.title === updateArticle.title
  );
  return filteredArticles.length === 0 ? false : true;
}

function updateArticleItem(updateArticle) {
  const updateTitle = updateArticle.title;

  if (checkDuplicateArticle(articles, updateArticle)) {
    // 중복 article이 있는 경우
    const existingIndex = articles.findIndex(
      (article) => article.title === updateTitle
    );
    articles[existingIndex] = updateArticle;
    return;
  } else {
    articles.push(updateArticle);
  }
}

/** Middleware */
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Test Section");
});

app.get("/articles", (req, res) => {
  res.send(articles);
});

app.get("/articles/:title", (req, res) => {
  const { title } = req.params;

  const viewArticleIndex = articles.findIndex(
    (article) => article.title === title
  );

  if (viewArticleIndex > -1) {
    const viewArticle = articles[viewArticleIndex];
    res.send(viewArticle);
  } else {
    res.send("Article Not Found");
  }
});

app.post("/articles/:title", (req, res) => {
  const { title } = req.params;
  const { id, date } = req.body;
  const updateArticle = {
    title,
    id,
    date,
  };
  updateArticleItem(updateArticle);
  res.send(articles);
});

app.listen(PORT, () => {
  console.log(`Server Listen PORT : ${PORT}`);
});
