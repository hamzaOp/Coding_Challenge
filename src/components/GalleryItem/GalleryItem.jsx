import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import rp from 'request-promise';

class GalleryItem extends Component<{
  context: string,
  token: string,
  id: string,
  name: string,
  created_time: string,
  source: string
}> {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      height: null,
      width: null,
      alt: null
    };
  }

  componentDidMount() {
    if (this.props.context === 'albums') {
      this.source(this.props.id, this.props.token);
    }
  }

  componentWillReceiveProps(props) {
    if (props.context === 'albums') {
      this.source(props.id, props.token);
    }
  }

  source = (id, token) => {
    rp({
      uri: `https://graph.facebook.com/v2.10/${id}`,
      qs: {
        access_token: token,
        fields: 'cover_photo'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then(resp => {
      if (resp.cover_photo) {
        return rp({
          uri: `https://graph.facebook.com/v2.10/${resp.cover_photo.id}`,
          qs: {
            access_token: this.props.token,
            fields: 'height, width, images'
          },
          headers: {
            'User-Agent': 'Request-Promise'
          },
          json: true
        }).then(response => {
          const imageData = response.images;
          const widthArray = [];
          let width;
          let img = {};
          for (let i = 0; i < imageData.length; i += 1) {
            widthArray.push(imageData[i].width);
          }

          const res = widthArray.filter(el => el < 700);

          if (res.length !== 0) {
            width = res.reduce((a, b) => Math.max(a, b));
          }

          for (let i = 0; i < imageData.length; i += 1) {
            if (imageData[i].width === width) {
              img = imageData[i];
            }
          }

          this.setState({
            src: img.source,
            height: img.height,
            width: img.width
          });
        });
      }
      this.setState({
        alt: 'This album has no photos.',
        src: ''
      });

      return null;
    });
  };

  render() {
    const style = {
      height: this.state.height,
      width: this.state.width
    };

    return (
      <div className="card mb-4 text-center">
        <h5 className="card-header">
          {`${this.props.name ? this.props.name : 'No caption'}, Posted `}
          <TimeAgo date={Date.parse(this.props.created_time)} />
        </h5>
        {!this.props.source ? (
          <div className="card-block">
            <img
              className="card-img-top img-thumbnail"
              style={style}
              src={this.state.src}
              alt={this.state.alt ? this.state.alt : 'Loading...'}
            />
          </div>
        ) : (
          <div className="card-block">
            <img className="card-img-top img-thumbnail" src={this.props.source} alt="Loading..." />
          </div>
        )}
      </div>
    );
  }
}

export default GalleryItem;
