// import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
// import FunctionComp from './functionComp';
// import FunctionComp from './tabledisplay';
// import { addValue, addValueAsync, decrement, increment } from './store/counter/counterSlice';
// import { useState } from 'react';
// import Test from './test';
// import {data} from './data';
// import User from './callapi';
// import Userdetail from './apiDynamicCall';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './store/counter/home/home';
import { store } from './store';
import Login from './store/counter/home/login';
import ProductDetail from './store/counter/home/Productdetail'
import { Dashboard } from './store/counter/home/Dashboard';


function App() {
  // const dispatch = useDispatch()
  // const count = useSelector((state) => state.counter.value)
  // const disable = useSelector((state) => state.counter.disable)
  // const [numberval, setNumberVal] = useState(0)

  const Privateroute = ({ children }) => {
    let token =  localStorage.getItem("token") 
    return token ? children : <Navigate to="/login" />
  }

  return (
    <>
    {/* <FunctionComp /> */}
       {/* <Test />
      <FunctionComp /> */}
    <Provider store = {store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element= {<Login/>} />
                <Route path='/dashboard' element= { <Privateroute> <Dashboard/> </Privateroute> } />
                <Route path='/product/:productId' element={< ProductDetail />} />
                <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    </Provider>
    
      {/* <div className="btn">
          <button onClick={() => dispatch(decrement())} disabled={disable}>Minus (-)</button>
          <h1> {count} </h1>
          <button onClick={() => dispatch(increment())} disabled={disable}>Plus (+)</button>
          <div>
              <input type='number' name='value' value={numberval} onChange={ (e) => setNumberVal(e.target.value)} disabled={disable}/>
          </div>

          <button onClick={() => {
            let nVal = Number(numberval)
            dispatch(addValue(nVal))
          }} disabled={disable}>Submit</button>

          <button onClick={() => {
            let nVal = Number(numberval)
            dispatch(addValueAsync(nVal))
          }}disabled={disable}>Submit Async</button>
      </div>  */}
    </>
  );

}

export default App;
