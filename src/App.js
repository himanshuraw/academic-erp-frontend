import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthLayout from './page/AuthLayout';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './page/Home';
import Form from './component/Form';
import CourseSelection from './component/CourseSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} >
          <Route path='' element={<Form />} />
          <Route path='course-selection/:email' element={<CourseSelection />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
