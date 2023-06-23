import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/errors/NotFound';
import Error from './pages/errors/Error';

function App() {
  return (
    <div className="App">
   <NavigationBar/>
   <Routes>

    <Route path={"/"} element={<Home/>}/>   

    <Route path={"*"} element={<NotFound/>}/>
    <Route path ={"/error"} element ={<Error />}/>

   </Routes>
    </div>
  );
}

export default App;
