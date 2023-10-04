import React, { useEffect,useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const[statearticle,updatestatearticle]=useState([])
  const[loading,updateloading]=useState(false)
  const[page,updatepage]=useState(1)
  const[totalResults,updatetotalResults]=useState(0)
  
  const captialiazefirstchar = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const updatenews=async ()=> {
    props.setprogress(10)
    updateloading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    updatestatearticle(parseddata.articles)
    updateloading(false)
    updatetotalResults(parseddata.totalResults)
    props.setprogress(100)
  }
  
  useEffect(()=>{
    document.title = `${captialiazefirstchar(props.category)}-Newsapp`;
    updatenews();
  },[])

  // const handlepreviousbutton = async () => {
  //   updatepage(page - 1);
  //   updatenews();
  // };

  // const handlenextbutton = async () => {
  //   updatepage(page + 1);
  //   updatenews();
  // };
  const fetchMoreData =async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
    updatepage(page+1)
    let data = await fetch(url);
    let parseddata = await data.json();
    updatestatearticle(statearticle.concat(parseddata.articles))
    updatetotalResults(parseddata.totalResults)
  };
    return (
      <>
        <h1 className="text-center" style={{margin:'150px 0px 30px 0px'}}>News-Top Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={statearticle.length}
          next={fetchMoreData}
          hasMore={statearticle.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {statearticle.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container my-5 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlepreviousbutton}
            className="btn btn-dark"
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pagesize)
            }
            type="button"
            onClick={this.handlenextbutton}
            className="btn btn-dark"
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
}
News.defaultProps = {
  pagesize: 8,
  country: "in",
  category: "general",
};
News.propTypes = {
  pagesize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News