import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from "./components/Main";
import Detailed from "./components/Detailed";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Switch>
          <Route path="/:id" component={Detailed} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
