import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from "prop-types"
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = "Sahyadri News - " + this.capitalizeFirstLetter(this.props.category);
    }

    async componentDidMount() {
        // console.log("cdm");
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&category=${this.props.category}&country=${this.props.country}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    // handlePrevClick = async () => {
    //     console.log("previous");
    //     let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);

    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    // handleNextClick = async () => {
    //     console.log("next");
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

    //         let url = `https://newsapi.org/v2/top-headlines?apiKey=3f9695aa9fd54fdc833d277fff44a046&country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({ loading: true });
    //         let data = await fetch(url);
    //         let parsedData = await data.json();


    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parsedData.articles,
    //             loading: false
    //         })
    //     }

    // }
    fetchMoreData = async () => {
        this.setState({page:this.state.page+1})
        
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        this.setState({ page: this.state.page + 1 });
    
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                // page: this.state.page + 1,
                totalResults: parsedData.totalResults,
                articles: this.state.articles.concat(parsedData.articles),
                loading: false
            });
        } catch (error) {
            console.error("Error fetching more data:", error);
            this.setState({ loading: false });
        }

        // let data = await fetch(url);
        // let parsedData = await data.json();
        
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: this.state.articles.concat(parsedData.articles),
        //     loading: false
        // })
      };

    render() {
        return (
            <>
               
                    <h2 className="text-center">Sahyadri News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                    { this.state.loading && <Spinner /> }

                    {/* <div className='container d-flex justify-content-between'>
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        <div className='container'>
                        <div className='row'>
                            {/* !this.state.loading */}
                            {this.state.articles.map((element) => {
                                return <div className='col-md-3' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>
                    {/* <div className='container d-flex justify-content-between'>
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
               
            </>
        )
    }
}

export default News