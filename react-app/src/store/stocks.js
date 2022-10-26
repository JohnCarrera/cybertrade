const UPDATE_PRICES = 'stocks/UPDATE_PRICES';
const LOAD_ALL = 'stocks/LOAD_ALL';
const LOAD_ONE = 'stocks/LOAD_ONE';
const START_STREAM = 'stocks/START_STREAM';


const loadAll = allStocks => ({
    type: LOAD_ALL,
    allStocks
});

const loadOne = stock => ({
    type: LOAD_ALL,
    stock
});

const updatePrices = allStocks => ({
    type: LOAD_ALL,
    allStocks
});

const startStream = started => ({
    type: START_STREAM,
    started
})


export const getAllStocks = () => async (dispatch) => {
    const res = await fetch('/api/stocks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const allStocks = await res.json();
        dispatch(loadAll(allStocks));
        return res;
    }
    return res;
}

export const getSingleStock = (id) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const allStocks = await res.json();
        dispatch(loadAll(allStocks));
        return res;
    }
    return res;
}

export const updateStockPrices = () => async (dispatch) => {
    console.log('updating stock prices');
    const res = await fetch('/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    console.log('res:', res)

    if(res.ok) {
        const allStocks = await res.json();
        dispatch(loadAll(allStocks));
        return res;
    }
    return res;
}

export const startDataStream = (id) => async (dispatch) => {
    const res = await fetch(`/start-stream`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    console.log('starting stream')

    if(res.ok) {
        const allStocks = await res.json();
        dispatch(startStream(true));
        return ;
    }
    return res;
}


const initialState = {
                        allStocks: null,
                        stocks: null,
                        stream: false
};
export const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
        case LOAD_ONE:
        case UPDATE_PRICES:
            return {...state, allStocks: action.allStocks}
        case START_STREAM:
            return {...state, stream: !action.started}
        default: return initialState
    }
}
