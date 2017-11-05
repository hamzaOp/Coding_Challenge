import React, { Component } from 'react';
import { render } from 'react-dom';
import TimeAgo from 'react-timeago'
import rp from 'request-promise';

class GalleryItem extends Component {

    constructor(props) {

        super(props);
        this.state = {
            src: '',
            height: null,
            width: null,
            alt : null
        }

    }

    find_image_width(arr) {

        let width_array = [];

        for (var i = 0; i < arr.length; i++) {
            width_array.push(arr[i].width);
        }

        let res = width_array.filter(function (el) {
            return el < 700;
        })

        if (res.length != 0) {
            return res.reduce(function (a, b) {
                return Math.max(a, b);
            });
        }
    }

    source(id, token) {

        rp({
            uri: "https://graph.facebook.com/v2.10/" + id,
            qs: {
                access_token: token,
                fields: 'cover_photo'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        }).then(function (resp) {

            
            if(resp.cover_photo){

            return rp({
                uri: "https://graph.facebook.com/v2.10/" + resp.cover_photo.id,
                qs: {
                    access_token: this.props.token,
                    fields: 'height, width, images'
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            }).then(function (resp) {

                let width = this.find_image_width(resp.images);
                let img = {};

                for (var i = 0; i < resp.images.length; i++) {
                    if (resp.images[i].width == width) {
                        img = resp.images[i];
                    }
                }

                this.setState({
                    src: img.source,
                    height: img.height,
                    width: img.width
                });

            }.bind(this))

        }else{

            this.setState({
                alt: 'This album has no photos.',
                src : ''
            });
        }

        }.bind(this)).catch(function(err){

            console.log(err);
        
        })

    }

    componentDidMount() {

        if(this.props.context == 'albums'){
            this.source(this.props.id, this.props.token);
        }
    }

    componentWillReceiveProps(props) {


        if(props.context == 'albums'){
            this.source(props.id, props.token);
        }

    }


    render() {

        let style = {
            height: this.state.height,
            width: this.state.width
        }

        return (
            <div className="card mb-4 text-center">
                <h5 class="card-header">{(this.props.name ? this.props.name : 'No caption') + ', Posted '}<TimeAgo date={Date.parse(this.props.created_time)} /></h5>
                {!this.props.source ? <div class="card-block">
                    <img className="card-img-top img-thumbnail" style={style} src={this.state.src} alt={this.state.alt ? this.state.alt : 'Loading...'} />
                </div> : <div class="card-block">
                        <img className="card-img-top img-thumbnail" src={this.props.source} alt="Loading..." />
                    </div>}
            </div>
        )
    }
}

export default GalleryItem;