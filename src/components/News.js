import React  from 'react'
import { useState, useEffect } from 'react'
import NewsItem from "./NewsItem.js"
import Spinner  from './Spinner.js'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function News(props){
    const apiKey = process.env.REACT_APP_GNEWS_KEY;
    const { category, totalProgress } = props;

    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [totalArticles,setTotalArticles]=useState(0);

    useEffect(()=>{
        
        const fetchNews=async()=>{
        totalProgress(0);
        setLoading(true);
        
        let res = await fetch(`/news-proxy/top-headlines?category=${category}&lang=en&country=in&apikey=${apiKey}&page=${page}&max=10`);  

        totalProgress(30);
        let data=await res.json();
        totalProgress(70);

        setArticles(data.articles);
        setLoading(false);
        setTotalArticles(data.totalArticles);

        totalProgress(100);
        }
    
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category]);

    const fetchMoreData=async()=>{
        let nextPage=page+1;

        let res = await fetch(`/news-proxy/top-headlines?category=${category}&lang=en&country=in&apikey=${apiKey}&page=${nextPage}&max=10`);
        let data=await res.json();

        if(data.articles){
        setArticles(articles.concat(data.articles));
        setTotalArticles(data.totalArticles);
        setPage(nextPage);
        console.log("Articles length:", articles.length, "Total:", totalArticles);
        }

    }
        return(
            <> 
                <h1 className='text-center mt-3 mb-1 mx-1'>NewNinja - Top {category.charAt(0).toUpperCase()+category.slice(1)} Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalArticles}
                    loader={<Spinner/>}
                >
                
                <div className="container">
                <div className="row">
                {articles.map((element)=>{
                    return  <div className='col-md-3 my-4 d-flex' key={element.url}>
                                 <NewsItem title={element.title?element.title.slice(0,70):"No title"} 
                                      description={element.description?element.description.slice(0,110):"No description"} 
                                      imgUrl={element.image?element.image:"https://img.freepik.com/free-vector/news-grunge-text_460848-9369.jpg"}
                                      author={element.source.name?element.source.name:"Anonymous"}
                                      date={element.publishedAt? new Date(element.publishedAt).toDateString():"Unknown Date"}
                                      source={element.source.name} 
                                      goToUrl={element.url}/>
                            </div>
                })}
                </div>
                </div>

                </InfiniteScroll>
            </>
            
        )
}
