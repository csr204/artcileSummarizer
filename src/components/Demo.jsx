import { useEffect, useState } from "react";
import { loader, linkIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/articles";
const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setallArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  useEffect(() => {
    const articelsFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articelsFromLocalStorage) {
      setallArticles(articelsFromLocalStorage);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(() => {
        return newArticle;
      });
      setallArticles((p) => {
        {
          return [...p, newArticle];
        }
      });
      console.log(newArticle);
    }
    localStorage.setItem("articles", JSON.stringify(allArticles));
    console.log("submitted");
  };

  const changeHandler = (e) => {
    setArticle(() => {
      return { ...article, url: e.target.value };
    });
  };

  return (
    <section className="mt-16 w-full">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={submitHandler}
        >
          <img src={linkIcon} className="absolute ml-3 left-0 my-2 w-5" />
          <input
            type="url"
            placeholder="Enter a url"
            onChange={changeHandler}
            value={article.url}
            className="url_input peer"
            required
          />
          <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            =
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div
              key={`link${index + 1}`}
              onClick={() => {
                return setArticle(article);
              }}
              className="link_card"
            >
              {article.url}
            </div>
          ))}
        </div>
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img className="w-20 h-20 object-contain" src={loader}></img>
          ) : error ? (
            <p className="font-bold font-inter text-center text-red-600">
              An error
              <br />
              <span className="font-satoshi text-center text-black font-normal">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-2">
                <h2 className="blue_gradient">Article Summary</h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-gray-700 text-sm">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;
