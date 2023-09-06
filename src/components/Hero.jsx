import { logo } from "../assets";
const Hero = () => {
  const clickHandler = () => {
    window.open("https://github.com/dashboard");
  };
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex flex-row justify-between items-center w-full mb-10 pt-3">
        <img src={logo} className="w-28 object-contain"></img>
        <button type="button" onClick={clickHandler} className="black_btn">
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient"> Power of OpenAPI</span>
      </h1>
      <h2 className="desc">
        Revolutionize Reading Habits with ArticleSummarizer - Your Gateway to
        Quick, Accurate, and Context-Rich Article Summaries. Harness the
        Potential of OpenAPI for Effortless Information Extraction and Enhanced
        Content Comprehension
      </h2>
    </header>
  );
};

export default Hero;
