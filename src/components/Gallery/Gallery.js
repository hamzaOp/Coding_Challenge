import React, { Component } from 'react';
import { render } from 'react-dom';
import SideWidget from '../SideWidget';
import Link from '../Link';
import rp from 'request-promise';
import GalleryItem from '../GalleryItem';
import Push from 'push.js';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      context: 'albums',
      no_albums: false,
      albums: {
        dataSet: [],
        source: null,
        previous: null,
        next: null,
        loading: true
      },
      photos: {
        dataSet: [],
        source: null,
        previous: null,
        next: null,
        loading: true
      }
    };
  }

  changeToPhotosContext(e) {
    e => e.stopPropagation();

    let uri = {
      uri:
        'https://graph.facebook.com/v2.10/' +
        this.state.albums.dataSet[0].id +
        '?fields=photos{name,source,created_time}&' +
        'access_token=' +
        this.props.facebook.token,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    rp(uri)
      .then(
        function(resp) {
          if (resp.photos) {
            this.setState({
              context: 'photos',
              photos: {
                dataSet: resp.photos.data,
                source: uri,
                previous: resp.photos.paging.previous,
                next: resp.photos.paging.next,
                loading: false
              }
            });
          } else {
            Push.create('This album has no photos...', {
              body: ':(',
              timeout: 3000,
              onClick: function() {
                window.focus();
                this.close();
              }
            });
          }
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
      });
  }

  changeToAlbumsContext(e) {
    e => e.stopPropagation();
    this.setState({
      context: 'albums'
    });
  }

  previousHandler(e) {
    e => e.stopPropagation();
    let context = this.state.context;

    rp({
      uri: this.state[context].previous,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then(
      function(resp) {
        this.setState({
          [context]: {
            dataSet: resp.data ? resp.data : resp.photos.data,
            source: this.state[context].previous,
            previous: resp.paging ? resp.paging.previous : resp.photos.paging.previous,
            next: resp.paging ? resp.paging.next : resp.photos.paging.next,
            loading: false
          }
        });
      }.bind(this)
    );
  }

  nextHandler(e) {
    e => e.stopPropagation();
    let context = this.state.context;

    rp({
      uri: this.state[context].next,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then(
      function(resp) {
        this.setState({
          [context]: {
            dataSet: resp.data ? resp.data : resp.photos.data,
            source: this.state[context].next,
            previous: resp.paging ? resp.paging.previous : resp.photos.paging.previous,
            next: resp.paging ? resp.paging.next : resp.photos.paging.next,
            loading: false
          }
        });
      }.bind(this)
    );
  }

  componentDidMount() {
    let uri = {
      uri: 'https://graph.facebook.com/v2.10/' + this.props.facebook.id + '/albums',
      qs: {
        access_token: this.props.facebook.token,
        limit: 1
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    rp(uri).then(
      function(resp) {
        if (resp.data.length != 0) {
          this.setState({
            albums: {
              dataSet: resp.data,
              source: uri,
              previous: resp.paging.previous,
              next: resp.paging.next,
              loading: false
            }
          });
        } else {
          this.setState({
            no_albums: true,
            albums: {
              dataSet: this.state['albums'].dataSet,
              source: this.state['albums'].source,
              previous: this.state['albums'].previous,
              next: this.state['albums'].next,
              loading: false
            }
          });
        }
      }.bind(this)
    );
  }

  render() {
    let token = this.props.facebook.token;
    let context = this.state.context;

    var galleryItems = this.state[context].dataSet.map(function(el) {
      return <GalleryItem {...el} token={token} context={context} />;
    });

    return this.props.facebook.id ? (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="my-4">{this.state.context == 'albums' ? 'Albums' : 'Photos'}</h1>

            {!this.state.no_albums ? (
              this.state[context].loading ? (
                <h2>Loading...</h2>
              ) : (
                <div>{galleryItems}</div>
              )
            ) : (
              <h2>This user has no albums</h2>
            )}
          </div>

          <SideWidget
            {...this.props}
            previous={this.state[context].previous}
            next={this.state[context].next}
            previousClick={this.previousHandler.bind(this)}
            nextClick={this.nextHandler.bind(this)}
            changeToAlbums={this.changeToAlbumsContext.bind(this)}
            context={context}
            changeToPhotos={this.changeToPhotosContext.bind(this)}
            no_albums={this.state.no_albums}
          />
        </div>
      </div>
    ) : (
      <Link />
    );
  }
}

export default Gallery;
