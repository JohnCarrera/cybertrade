import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Nav from './components/Nav/Nav';
import Dashboard from './components/dashboard/Dashboard';
import StockDetail from './components/stockDetail/StockDetail';
import LoginFormPage from './components/auth/LoginFormPage/login';
import SignupFormPage from './components/auth/SignupFormPage/signup';
import { authenticate } from './store/session';

import { updateStockPrices, startDataStream } from './store/stocks';
import './app.css'

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const prices = useSelector(state => state.stocks.prices)
    const stream = useSelector(state => state.stocks.stream)

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
            // dispatch(updateStockPrices());
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    const btnClick = () => {
        dispatch(startDataStream());
    }

    const otherBtnClick = () => {
        dispatch(updateStockPrices());
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginFormPage />
                </Route>
                <Route path='/signup' exact={true}>
                    <SignupFormPage />
                </Route>

                <ProtectedRoute path='/app'>
                    <Nav />
                    <Route path='/app/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route path='/app/stocks/:symbol'>
                        <StockDetail />
                    </Route>
                </ProtectedRoute>
                {/* <ProtectedRoute path='/' exact={true} >
                    <div className='main-body'>
                        <div className='upper'>
                            <h1>My Home Page</h1>
                            <h1> STATUS: {stream ? 'Online' : 'Offline'}</h1>
                            <button onClick={btnClick}>Start Stream</button>
                            <button onClick={otherBtnClick}>Update Prices</button>
                        </div>
                        <div className='stock-chart'>
                            {prices && Object.keys(prices).map(key => (
                                <div className='stock-element'>
                                    <div className='stock-symbol'>
                                        {key}
                                    </div>
                                    <div className='stock-price'>
                                        {prices[key]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ProtectedRoute> */}
            </Switch >
        </BrowserRouter >
    );
}

export default App;
