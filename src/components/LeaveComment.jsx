import React from "react";
import { Container, Button, Form } from "react-bootstrap";

class LeaveComment extends React.Component {
  state = {
    comment: {
      comment: "",
      rate: 1,
      elementId: this.props.commentId,
    },
  };

  sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjk1ZTJkNTI2MjAwMTViNmRjOWQiLCJpYXQiOjE2Mjk5ODUyMzksImV4cCI6MTYzMTE5NDgzOX0.mS3Qwvrlsn7oJIK8hVVuKRbXkVR6kVchtAJ7C4UySkI",
          },
        }
      );
      if (response.ok) {
        console.log("comment was sent");
        {
          this.props.fetchComments();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Form className="comment-form" onSubmit={this.sendComment}>
        <Form.Group className="mb-3" controlId="leave-comment">
          <Form.Control
            className="comment-item"
            as="textarea"
            rows={3}
            placeholder="Comment"
            value={this.state.comment.comment}
            onChange={(e) =>
              this.setState({
                comment: {
                  ...this.state.comment,
                  comment: e.target.value,
                },
              })
            }
          />
        </Form.Group>
        <Button className="submit-comment" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default LeaveComment;
