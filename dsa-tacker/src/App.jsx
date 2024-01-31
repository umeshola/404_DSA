import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import {userstate} from './atoms/atom';
import Decision from './Decision';
import axios from 'axios';

//admin
import Home from './component/Home';
import Signup from './component/Signup';
import Add from './component/Add';
import DataAR from './component/Data';
import DataAD from './component/DataAD';
import DataG from './component/DataG';
import DataLL from './component/DataLL';
import DataT from './component/DataT';

//user
import Homeu from './Com_user/Home';
import Signupu from './Com_user/Signup';
import DataA from './Com_user/DataA';
import DataAdu from './Com_user/DataAd';
import DataGu from './Com_user/DataG';
import DataLLu from './Com_user/DataLL';
import DataTu from './Com_user/DataT';
import { useEffect } from 'react';

function App() {
  return (
    <RecoilRoot>
      <Router>
      <div>
        <div>
          <div>
          <InitUser/> 
            <Routes>
            <Route path="/" element={<Decision />} />
            {/* admin */}
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/signup" element={<Signup />} />
              <Route path="/admin/Data/array" element={<DataAR />} />
              <Route path="/admin/Data/ll" element={<DataLL />} />
              <Route path="/admin/Data/tree" element={<DataT />} />
              <Route path="/admin/Data/graph" element={<DataG />} />
              <Route path="/admin/Data/adv" element={<DataAD />} />
              <Route path="/admin/add" element={<Add />} />
              {/* user */}
              <Route path="/user/home" element={<Homeu />} />
              <Route path="/user/signup" element={<Signupu />} />
              <Route path="/user/Data/array" element={<DataA />} />
              <Route path="/user/Data/adv" element={<DataAdu />} />
              <Route path="/user/Data/graph" element={<DataGu />} />
              <Route path="/user/Data/ll" element={<DataLLu />} />
              <Route path="/user/Data/tree" element={<DataTu />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userstate);
  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      if (response.data.username) {
        setUser(response.data.username); 
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}


export default App;
