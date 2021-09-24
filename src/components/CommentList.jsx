import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

class CommentList extends React.Component {
  render() {
    this.props.commentsToLoad.map((comment) => console.log(comment.comment));
    return (
      <Splide
        className="comment-slider"
        options={{
          type: "loop",
          rewind: true,
          width: "60%",
          perPage: 1,
          perMove: 1,
          pagination: false,
          autoplay: true,
          pauseOnFocus: true,
          focus: "center",
        }}
      >
        {this.props.commentsToLoad.map((comment) => (
          <SplideSlide className="comment-slide" key={comment._id}>
            <p className="comment-text">{comment.comment}</p>
          </SplideSlide>
        ))}
      </Splide>
    );
  }
}
export default CommentList;
