import React, { Component } from 'react';
import Push from 'push.js';
import rp from 'request-promise';
import SideWidget from '../SideWidget';
import Link from '../Link';
import GalleryItem from '../GalleryItem';

class Gallery extends Component<{
  email: string,
  facebook: {
    id: string,
    name: string,
    token: string
  }
}> {
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

  componentDidMount() {
    const uri = {
      uri: `https://graph.facebook.com/v2.10/${this.props.facebook.id}/albums`,
      qs: {
        access_token: this.props.facebook.token,
        limit: 1
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    rp(uri).then(resp => {
      if (resp.data !== undefined && resp.data.length !== 0) {
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
            dataSet: this.state.albums.dataSet,
            source: this.state.albums.source,
            previous: this.state.albums.previous,
            next: this.state.albums.next,
            loading: false
          }
        });
      }
    });
  }

  changeToPhotosContext = e => {
    e.stopPropagation();

    const uri = {
      uri: `https://graph.facebook.com/v2.10/${this.state.albums.dataSet[0]
        .id}?fields=photos{name,source,created_time}&access_token=${this.props.facebook.token}`,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    };

    rp(uri).then(resp => {
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
          onClick: () => {
            window.focus();
            this.close();
          }
        });
      }
    });
  };

  changeToAlbumsContext = e => {
    e.stopPropagation();
    this.setState({
      context: 'albums'
    });
  };

  previousHandler = e => {
    e.stopPropagation();
    const { context } = this.state;

    rp({
      uri: this.state[context].previous,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then(resp => {
      this.setState({
        [context]: {
          dataSet: resp.data ? resp.data : resp.photos.data,
          source: this.state[context].previous,
          previous: resp.paging ? resp.paging.previous : resp.photos.paging.previous,
          next: resp.paging ? resp.paging.next : resp.photos.paging.next,
          loading: false
        }
      });
    });
  };

  nextHandler = e => {
    e.stopPropagation();
    const { context } = this.state;

    rp({
      uri: this.state[context].next,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }).then(resp => {
      this.setState({
        [context]: {
          dataSet: resp.data ? resp.data : resp.photos.data,
          source: this.state[context].next,
          previous: resp.paging ? resp.paging.previous : resp.photos.paging.previous,
          next: resp.paging ? resp.paging.next : resp.photos.paging.next,
          loading: false
        }
      });
    });
  };

  showContent = (context, items) => {
    if (!this.state.no_albums) {
      if (this.state[context].loading) {
        return <h2>Loading...</h2>;
      }
      return <div>{items}</div>;
    }

    return <h2>This user has no albums</h2>;
  };

  render() {
    const { token } = this.props.facebook;
    const { context } = this.state;

    const galleryItems = this.state[context].dataSet.map(el => (
      <GalleryItem key={el.id} {...el} token={token} context={context} />
    ));

    return this.props.facebook.id ? (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="my-4">{this.state.context === 'albums' ? 'Albums' : 'Photos'}</h1>
            {this.showContent(context, galleryItems)}
          </div>

          <SideWidget
            {...this.props}
            context={context}
            no_albums={this.state.no_albums}
            previous={this.state[context].previous}
            next={this.state[context].next}
            previousClick={this.previousHandler}
            nextClick={this.nextHandler}
            changeToAlbums={this.changeToAlbumsContext}
            changeToPhotos={this.changeToPhotosContext}
          />
        </div>
      </div>
    ) : (
      <Link href="/auth/facebook" />
    );
  }
}

export default Gallery;
