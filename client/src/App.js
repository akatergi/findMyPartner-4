import './App.css';
import AllUsers from './AllUsers';
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateUser from './CreateUser';
import DisplayUser from "./DisplayUser"
import LoginUser from "./LoginUser"
import Matches from "./Matches"
import Navbar from './Navbar'
import UpdateUser from './UpdateUser'
//Y
function App() {
  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:id" element={<DisplayUser />} />
        <Route path="/edit" element={<UpdateUser />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </div>
  );
}

export default App;
