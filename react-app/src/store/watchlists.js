const LOAD = 'watchlists/LOAD';
const CREATE = 'watchlists/CREATE';
const UPDATE = 'watchlists/UPDATE';
const DELETE = 'watchlists/DELETE'


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

const del = watchlist => ({
    type: DELETE,
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
    const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: watchlist
    });

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
        const deletedWatchlist = await res.json();
        dispatch(del(deleteWatchlist));
        return res;
    }
    return res;
}


const initialState = null;

export const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return action.watchlists
        case CREATE:
        case UPDATE:
            return {
                ...state,
                [action.watchlist.id]: action.watchlist
            }
        case DELETE:
            const newState ={...state}
            delete newState[action.id]
            return newState

        default: return initialState
    }
}
