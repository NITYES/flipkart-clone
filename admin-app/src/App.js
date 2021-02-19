import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import  {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
function App() {
  return (
    <div className="App">
    {/* <Layout>
      <h1>i M CHILDRN</h1>
    </Layout> */}
    <Router>
      <Switch>
         <Route path="/"  exact component={Home} />
         <Route path="/signin" exact component={Signin} />
         <Route path="/signup" exact  component={Signup} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
