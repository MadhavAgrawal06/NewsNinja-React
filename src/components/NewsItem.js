import React from "react";

export default function NewsItem(props){
    return (
      <div className="card">
        <div className="badge text-bg-primary" style={{position:"absolute",right:"0"}}>Source: {props.source}</div>
        <img src={props.imgUrl} className="card-img-top " alt="..." style={{ height: '180px', objectFit: 'cover' }}/>
        <div className="card-body bg-light">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}...</p>
          <p className="card-text"><small className="text-secondary">By {props.author} on {props.date}</small></p>
          <a href={props.goToUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    );
}
