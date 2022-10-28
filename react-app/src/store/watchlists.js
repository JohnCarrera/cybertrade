const LOAD = 'watchlists/LOAD';
const CREATE = 'watchlists/CREATE';
const UPDATE = 'watchlists/UPDATE';
const DELETE = 'watchlists/DELETE';
const ADD_STOCK = 'watchlists/ADD_STOCK';
const REMOVE_STOCK = 'watchlists/REMOVE_STOCK';


const load = watchlists => ({
    type: LOAD,
    watchlists
});

const create = watchlist=> ({
    type: CREATE,
    watchlist
});

const update = watchlist => ({
    type: UPDATE,
    watchlist
});

const del = id => ({
    type: DELETE,
    id
})

const addStock = (watchlist) =>({
    type: ADD_STOCK,
    watchlist
})

const removeStock = (watchlist) =>({
    type: REMOVE_STOCK,
    watchlist
})

export const getWatchlists = () => async (dispatch) => {
    const res = await fetch('/api/watchlists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const watchlists = await res.json();
        dispatch(load(watchlists));
        return res;
    }
    return res;
}

export const createWatchlist = (watchlist) => async (dispatch) => {
    console.log(JSON.stringify(watchlist))
    const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(watchlist)
    });

    console.log(res);
    if(res.ok) {
        const watchlist = await res.json();
        dispatch(create(watchlist));
        return res;
    }
    return res;
}

export const updateWatchlist = (id, watchlist) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: watchlist
    });

    if(res.ok) {
        const watchlist = await res.json();
        dispatch(update(watchlist));
        return res;
    }
    return res;
}

export const deleteWatchlist = (id) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const resJson = await res.json();
        dispatch(del(id));
        return resJson;
    }
    return res;
}

export const addStockToWatchlist = (id, sym) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}/${sym}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const watchlist = await res.json();
        dispatch(addStock(watchlist));
        return res;
    }
    return res;
}

export const removeStockFromWatchlist = (id, sym) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${id}/${sym}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const watchlist = await res.json();
        dispatch(removeStock(watchlist));
        return res;
    }
    return res;
}



const initialState = null;

export const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return action.watchlists
        case ADD_STOCK:
        case REMOVE_STOCK:
        case CREATE:
        case UPDATE:
            return {
                ...state,
                [action.watchlist.id]: action.watchlist
            }
        case DELETE:
            const newState={...state}
            delete newState[action.id]
            return newState

        default:
            return {...state}
    }
}
