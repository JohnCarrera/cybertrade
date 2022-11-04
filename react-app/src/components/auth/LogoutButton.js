import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({ classProp }) => {
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return <div
        className={classProp}
        onClick={onLogout}
        >
            /logout
        </div>;
};

export default LogoutButton;
