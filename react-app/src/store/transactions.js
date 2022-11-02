const CREATE = 'transactions/CREATE'
const LOAD = 'transactions/LOAD'

const create = transaction => ({
    type: CREATE,
    transaction
})

const load = transactions => ({
    type: LOAD,
    transactions
})


export const createTransaction = (transaction) => async (dispatch) => {
    const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });

    if(res.ok) {
        const transaction = await res.json();
        dispatch(create(transaction));
        return res;
    }
    return res;
}

export const loadTransactions = () => async (dispatch) => {
    const res = await fetch('/api/transactions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if(res.ok) {
        const transactions = await res.json();
        dispatch(load(transactions));
        return res;
    }
    return res;
}

const initialState = null;

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return action.transactions
        case CREATE:
            return {...state, [action.transaction.id]: action.transaction}
        default:
            return state
    }
}
