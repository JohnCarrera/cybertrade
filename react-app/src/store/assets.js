const ADD = 'assets/ADD';
const UPDATE = 'assets/UPDATE';
const REMOVE = 'assets/REMOVE';
const LOAD = 'assets/LOAD';

const load = assets => ({
    type: LOAD,
    assets
});

const update = asset => ({
    type: UPDATE,
    asset
});

const add = asset => ({
    type: ADD,
    asset
});

const remove = asset => ({
    type: REMOVE,
    asset
})

export const loadAssets = () => async (dispatch) => {
    const res = await fetch('/api/assets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const assets = await res.json();
        dispatch(load(assets));
        return res;
    }
    return res;
}

export const updateAsset = (id, asset) => async (dispatch) => {
    const res = await fetch(`/api/assets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
    });

    if(res.ok) {
        const asset = await res.json();
        dispatch(update(asset));
        return res;
    }
    return res;
}

export const updateCashBalance = (newBalance) => async (dispatch) => {
    const res = await fetch(`/api/assets/_CASH`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: parseFloat(newBalance)})
    });

    if(res.ok) {
        const asset = await res.json();
        dispatch(update(asset));
        return res;
    }
    return res;
}

export const addAsset = (asset) => async (dispatch) => {
    const res = await fetch('/api/assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(asset)
    });

    if(res.ok) {
        const asset = await res.json();
        dispatch(add(asset));
        return res;
    }
    return res;
}

export const removeAsset = (id) => async (dispatch) => {
    const res = await fetch(`/api/assets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const asset = await res.json();
        dispatch(remove(asset));
        return res;
    }
    return res;
}

const initialState = {
    _CASH:{
        quantity: 0
    }
};

export const assetReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD:
        case UPDATE:
            return {...state, [action.asset.symbol]: action.asset}
        case LOAD:
            return action.assets
        case REMOVE:
            const newState = {...state}
            delete newState[action.asset.symbol]
            return newState
        default:
            return state
    }
}
