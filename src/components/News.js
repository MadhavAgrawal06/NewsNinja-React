import React  from 'react'
import { useState, useEffect } from 'react'
import NewsItem from "./NewsItem.js"
import Spinner  from './Spinner.js'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function News(props){

    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [totalResults,setTotalResults]=useState(0);

    useEffect(()=>{
        
        const fetchNews=async()=>{
        props.totalProgress(0);
        setLoading(true);
        let res=await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=8af368a850524bd2af513e9b3ef9d126&page=${page}&pageSize=16`);
        props.totalProgress(30);
        let data=await res.json();
        props.totalProgress(70);

        setArticles(data.articles);
        setLoading(false);
        setTotalResults(data.totalResults);

        props.totalProgress(100);
        }
    
        fetchNews();
    },[]);

    const fetchMoreData=async()=>{
        let nextPage=page+1;
        setPage(page+1);
        let res=await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=8af368a850524bd2af513e9b3ef9d126&page=${nextPage}&pageSize=16`);
        let data=await res.json();

        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
        console.log("Articles length:", articles.length, "Total:", totalResults);

    }
        return(
            <> 
                <h1 className='text-center mt-3 mb-1 mx-1'>NewNinja - Top {props.category.charAt(0).toUpperCase()+props.category.slice(1)} Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner/>}
                >
                
                <div className="container">
                <div className="row">
                {articles.map((element)=>{
                    return  <div className='col-md-3 my-4 d-flex' key={element.url}>
                                 <NewsItem title={element.title?element.title:"No title"} 
                                      description={element.description?element.description.slice(0,110):"No description"} 
                                      imgUrl={element.urlToImage?element.urlToImage:"https://img.freepik.com/free-vector/news-grunge-text_460848-9369.jpg"}
                                      author={element.author?element.author:"Anonymous"}
                                      date={new Date(element.publishedAt).toDateString()}
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
