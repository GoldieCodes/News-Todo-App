import { useState, useEffect } from "react"
import newTab from "../assets/images/icons8-new-tab.svg"

const Blog = () => {
  const [articles, setArticles] = useState()
  const [articlesNg, setArticlesNg] = useState()

  async function fetchData() {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=d25de044584b432b87c43754998c2081"
      )
      const jsonData = await response.json()
      setArticles(jsonData.articles)
      const responseNg = await fetch(
        "https://newsapi.org/v2/top-headlines?country=ng&apiKey=d25de044584b432b87c43754998c2081"
      )
      const jsonDataNg = await responseNg.json()
      setArticlesNg(jsonDataNg.articles)
    } finally {
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="news-wrapper">
      <div className="container-us">
        <h1 style={{ color: "rgb(89 87 89)", margin: "1em 0" }}>
          Top Headlines: US
        </h1>
        <div className="articles">
          {(articles !== undefined || null) &&
            articles.map(article => (
              <div className="article" key={article.title}>
                <div className="img">
                  <img
                    className="article-img"
                    src={article.urlToImage}
                    alt={article.author}
                    height={200}
                  />
                </div>
                <div className="content">
                  <span className="metadata">
                    <p>Source: {article.author} | </p>
                    <p>{article.publishedAt.slice(0, 10)}</p>
                  </span>
                  <h2>{article.title}</h2>
                  <p className="description">
                    {`${article.description}`.slice(0, 120)}...
                  </p>
                  <a href={article.url} target="_blank">
                    Read Article <img src={newTab} width={20} />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="container-ng">
        <h3 style={{ color: "rgb(89 87 89)", margin: "1em 0" }}>
          Top Headlines: Nigeria
        </h3>
        <div className="articles">
          {(articlesNg !== undefined || null) &&
            articlesNg.map(article => (
              <div className="article" key={article.title}>
                <span className="metadata">
                  <p>{article.author} | </p>
                  <p>{article.publishedAt.slice(0, 10)}</p>
                </span>
                <a href={article.url} target="_blank">
                  {article.title}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default Blog
