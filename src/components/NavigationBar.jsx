import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import MovieSegment from "./MovieSegment";

class NavigationBar extends React.Component {
  state = {
    query: "",
    results: [],
  };

  search = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?apikey=131a9fa6&s=${this.state.query
          .toLowerCase()
          .split(" ")
          .join("+")}`
      );
      if (response.ok) {
        let searchResult = await response.json();
        this.setState({
          ...this.state,
          results: searchResult,
        });
        console.log(searchResult);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <>
        <Navbar sticky="top" bg="dark" expand="lg">
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={this.search}>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={this.state.query}
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    query: e.target.value,
                  })
                }
              />
              <Button variant="outline-success" type="Submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {this.state.results != 0 && (
          <MovieSegment
            title={"Search Results"}
            name={this.state.query.toLowerCase().split(" ").join("+")}
          />
        )}
      </>
    );
  }
}
export default NavigationBar;
