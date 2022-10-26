import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Nav from './components/nav/Nav';
import Dashboard from './components/dashboard/Dashboard';
import { authenticate } from './store/session';

import { updateStockPrices, startDataStream } from './store/stocks';
import './app.css'

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const allStocks = useSelector(state => state.stocks.allStocks)
    const stream = useSelector(state => state.stocks.stream)

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
            dispatch(updateStockPrices());
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
            <Nav />
            <Switch>
                <Route path='/login' exact={true}>
                    <LoginForm />
                </Route>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <ProtectedRoute path='/users' exact={true} >
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute path='/users/:userId' exact={true} >
                    <User />
                </ProtectedRoute>
                <ProtectedRoute path='/dashboard'>
                    <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute path='/' exact={true} >
                    <div className='main-body'>
                        <div className='upper'>
                            <h1>My Home Page</h1>
                            <h1> STATUS: {stream ? 'Online' : 'Offline'}</h1>
                            <button onClick={btnClick}>Start Stream</button>
                            <button onClick={otherBtnClick}>Update Prices</button>
                        </div>
                        <div className='stock-chart'>
                            {allStocks && Object.values(allStocks).map(stock => (
                                <div className='stock-element'>
                                    <div className='stock-symbol'>
                                        {stock.symbol}
                                    </div>
                                    <div className='stock-price'>
                                        {stock.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ProtectedRoute>
            </Switch >
        </BrowserRouter >
    );
}

export default App;
