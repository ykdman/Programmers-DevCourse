const express = require("express");
const app = express();
const PORT = 3000;
const initialArticle = { title: "art1", id: "a1", date: "2024-04-30" };
let articles = [{ ...initialArticle }];

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

/** API */
app.get("/", (req, res) => {
  res.send("API Test Section");
});

app.get("/articles", (req, res) => {
  const articleList = {};
  articles.forEach((article) => {
    articleList[article.title] = {
      id: article.id,
      date: article.date,
    };
  });
  res.send(articleList);
});

app.delete("/articles", (req, res) => {
  if (articles.length > 0) {
    articles.splice(0, articles.length);
    res.send("모든 article이 삭제 되었습니다.");
  } else {
    res.json({
      message: "저장된 article이 없습니다.",
    });
  }
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

app.delete("/articles/:title", (req, res) => {
  const { title } = req.params;
  const articleIndex = articles.findIndex((article) => article.title === title);
  console.log(articleIndex);
  if (articleIndex > -1) {
    articles = articles.filter((article) => article.title !== title); // 자르기
  } else {
    res.send(`${title} 제목을 가진 article이 존재하지 않습니다.`);
    return;
  }
  res.json(articles);
});

app.put("/articles/:title", (req, res) => {
  const { title } = req.params;
  const { body } = req;
  const articleIndex = articles.findIndex((article) => article.title === title);

  if (articleIndex > -1) {
    const updateArticle = { ...articles[articleIndex], ...body };
    articles.splice(articleIndex, 1, updateArticle);
    res.json(articles);
  } else {
    res.json({
      message: `${title} 에 해당하는 article 이 없습니다.`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Listen PORT : ${PORT}`);
});
