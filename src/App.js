import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import TodoListing from './pages/TodoList';
import AddTodo from './pages/AddTodo';
function App() {
  return (
    <Router>
     <Switch>
       <Route path="/" exact component={TodoListing} />
       <Route path="/register" component={Register} />
       <Route path="/login" component={Login} />
       <Route path="/create" component={AddTodo} />
     </Switch> 
    </Router>
  );
}

export default App;
