import React, { Component } from "react";
import UserAvatar from "react-user-avatar";
import Push from "push.js";
import Pager from "../Pager";

class SideWidget extends Component {
  componentDidMount() {
    Push.create("Welcome !", {
      body: "You can now view all your albums & photos :)",
      timeout: 4000,
      onClick: () => {
        window.focus();
        this.close();
      }
    });
  }

  render() {
    const style = {
      cursor: "pointer"
    };

    return (
      <div className="col-md-4">
        <div className="card my-4">
          <div className="card-header">
            <UserAvatar
              size="35"
              name={this.props.facebook.name}
              src={`https://graph.facebook.com/v2.10/${this.props.facebook
                .id}/picture?access_token=${this.props.facebook.token}`}
            />
          </div>
          <div className="card-body">
            <Pager {...this.props} />
          </div>
          <div className="card-footer text-muted">
            {this.props.context == "photos" ? (
              <button
                style={style}
                type="button"
                onClick={this.props.changeToAlbums}
                className="btn btn-primary"
              >
                Go back
              </button>
            ) : (
              <button
                style={style}
                type="button"
                className={
                  this.props.no_albums
                    ? "btn btn-primary disabled"
                    : "btn btn-primary"
                }
                onClick={
                  !this.props.no_albums ? this.props.changeToPhotos : () => {}
                }
              >
                View photos
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SideWidget;
