import React, { Component } from "react";

export class Nwesitem extends Component {
 
  render() {
    let {title , discription,imageUrl,nwesUrl} = this.props
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl?"https://i.ytimg.com/vi/rggnGlGrncE/maxresdefault.jpg":imageUrl}className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
            {discription}
            </p>
            <a href={nwesUrl} target="blank" className="btn btn-sm btn-dark">
             Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Nwesitem;