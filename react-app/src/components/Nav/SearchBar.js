import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStocks } from '../../store/stocks';
import './searchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const stocks = useSelector(state => state.stocks.allStocks);

    const [srDiv, setSrDiv] = useState();
    const [renderSrDiv, setRenderSrDiv] = useState(false);

    useEffect(() => {
        dispatch(getAllStocks())
    }, [dispatch])

    const openForm = () => {
        setRenderSrDiv(true);
        srDiv.style.height = '20px'
        // createDiv.style.border = '1px solid #00da86'
    }

    const closeForm = () => {
        setRenderSrDiv(false);
        srDiv.style.height = '0px';
        // createDiv.style.border = 'none'
    }

    useEffect(() => {

        if (searchInput) {
            if(stocks){
                let sr = Object.values(stocks).filter((stock) => {
                    return stock.symbol.includes(searchInput) || stock.name.includes(searchInput)
                } )
                console.log(sr)
                setSearchResults(sr)
            }
        }

        if(searchInput && searchResults.length){

        }

    }, [searchInput]);

    return (
        <div className='nav-search-container'>
            <div className='nav-search-pseudo-input'>
                <i class="fa-solid fa-terminal nav-search-icon"></i>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    // history.push()
                    // document.getElementById('search-input-field').blur();
                }}>
                    <input
                        className='nav-search-input'
                        id='search-input-field'
                        type='text'
                        placeholder='Enter stock name or symbol...'
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                    // onFocus={() => { setSearchIconFocusStyle('tan-search-icon-focus-style') }}
                    // onBlur={() => { setSearchIconFocusStyle('') }}
                    />
                </form>
                {/* <img
                        className={`tan-search-down-caret-icon tan-search-icon-style ${searchIconFocusStyle}`}
                        src={downCaret}
                    /> */}
            </div>
            <div
                className='nav-search-results-menu-div'
            >
                {searchResults.map(r => (
                    <div>
                     {r.symbol + ' | ' + r.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
