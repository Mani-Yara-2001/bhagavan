import React, { Component } from "react";
import Nwesitem from "./Nwesitem";
import Bomguram from "./Bomguram";
import PropTypes from 'prop-types'



export class Nwes extends Component {
  static defaultProps = {
    country:"in",
    pageSize: 8,
    category:"general"
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    console.log("cdm");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=832c490f4dfd4624b90381da9988bb29&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedDate = await data.json();
    console.log(parsedDate);
    this.setState({
      articles: parsedDate.articles,
      totalResults: parsedDate.totalResults,loading:false
    });
  }
  handlePrvClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=832c490f4dfd4624b90381da9988bb29&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedDate = await data.json();
    console.log(parsedDate);
    this.setState({
      page: this.state.page - 1,
      articles: parsedDate.articles,
      loading:false
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    } 
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=832c490f4dfd4624b90381da9988bb29&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedDate = await data.json();
      console.log(parsedDate);
      this.setState({
        page: this.state.page + 1,
        articles: parsedDate.articles,
        loading: false
      });
    
  };
  render() {
    return (
      <div>
        <div className="container my-3">
          <h3 className="text-center" style={{margin: '30px,0px'}}>Top business headlines in the INDIA right now</h3>
          {this.state.loading && <Bomguram/>}
          
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Nwesitem
                    title={element.title ? element.title : ""}
                    discription={!element.title ? element.description.slice(0,120) : ""}
                    imageUrl={element.urlToImage}
                    nwesUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrvClick}
            >
              &larr;Previous
            </button>
            <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Nwes;