import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./App.css";

import MovieSegment from "./components/MovieSegment";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavigationBar />
      </header>
      <main>
        <MovieSegment title={"horror"} name={"horror"} />
        <MovieSegment title={"adventure"} name={"adventure"} />
        <MovieSegment title={"comedy"} name={"comedy"} />
        <MovieSegment title={"harry potter"} name={"harry potter"} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
