import React from "react";

import CommentList from "./CommentList";
import LeaveComment from "./LeaveComment";

class CommentArea extends React.Component {
  state = {
    comments: [],
  };
  fetchComments = async () => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.movieId}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjk1ZTJkNTI2MjAwMTViNmRjOWQiLCJpYXQiOjE2Mjk5ODUyMzksImV4cCI6MTYzMTE5NDgzOX0.mS3Qwvrlsn7oJIK8hVVuKRbXkVR6kVchtAJ7C4UySkI",
          },
        }
      );
      if (response.ok) {
        let commentList = await response.json();
        this.setState({
          ...this.state,
          comments: commentList,
        });
        console.log(commentList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.fetchComments();
  };

  render() {
    return (
      <div className="comment-area">
        <h2>Comments</h2>
        <CommentList commentsToLoad={this.state.comments} />
        <LeaveComment
          commentId={this.props.movieId}
          fetchComments={this.fetchComments}
        />
      </div>
    );
  }
}

export default CommentArea;
