import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './TaskList';
import TaskCreate from './TaskCreate';
import TaskDetail from './TaskDetail';
import TaskEdit from './TaskEdit';

function App() {
  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList />}></Route>
          <Route path='/task/create' element={<TaskCreate />}></Route>
          <Route path='/task/detail/:taskid' element={<TaskDetail />}></Route>
          <Route path='/task/edit/:taskid' element={<TaskEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
