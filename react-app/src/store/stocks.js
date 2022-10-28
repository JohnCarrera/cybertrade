import xRapidKey from '../data/xRapid.json';

const UPDATE_PRICES = 'stocks/UPDATE_PRICES';
const LOAD_ALL = 'stocks/LOAD_ALL';
const LOAD_ONE = 'stocks/LOAD_ONE';
const START_STREAM = 'stocks/START_STREAM';


const loadAll = allStocks => ({
    type: LOAD_ALL,
    allStocks
});

const loadOne = singleStock => ({
    type: LOAD_ONE,
    singleStock
});

const updatePrices = prices => ({
    type: UPDATE_PRICES,
    prices
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
        const prices = await res.json();
        dispatch(updatePrices(prices));
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

export const getStockDetailApi = (sym) => async (dispatch) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", sym);
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': xRapidKey.key,
		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
	},
	body: encodedParams
};
    const res = await fetch(
        `https://yahoo-finance97.p.rapidapi.com/stock-info`,
        options
    );

    if (res.ok) {
        const stockDetail = await res.json();
        console.log('stockDetail for ', sym, ':', stockDetail);
        dispatch(loadOne(stockDetail.data));
        return stockDetail;
    }
    return res;
}


// const encodedParams = new URLSearchParams();
// encodedParams.append("symbol", "AAPL");

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': 'bd4701dc24msh176dd5c28ae70c0p19597cjsn7862a00548ec',
// 		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
// 	},
// 	body: encodedParams
// };

// fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));



const initialState = {
                        allStocks: null,
                        prices: null,
                        singleStock: null,
                        stream: false
};
export const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            console.log(state)
            console.log(action.allStocks)
            return {...state, allStocks: action.allStocks}
        case LOAD_ONE:
            return {...state, singleStock: action.singleStock}
        case UPDATE_PRICES:
            return {...state, prices: action.prices}
        case START_STREAM:
            return {...state, stream: !action.started}
        default:
            return {...state}
    }
}
