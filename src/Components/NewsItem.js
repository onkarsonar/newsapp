import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source,apiKey } = this.props
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://www.moroccoworldnews.com/wp-content/uploads/2024/02/apple-vision-pro-glasses-ndash-the-next-big-thing-in-wearable-tech-800x450.jpeg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                          <span class="badge rounded-pill bg-danger" style={{left:'50%',zIndex:'1'}}>
                            {source?source:"Unknown"}
                        
                        </span>
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem