import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllStocks } from '../../store/stocks';
import { Link } from 'react-router-dom';
import './searchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const stocks = useSelector(state => state.stocks.allStocks);
    const srMenuRef = useRef();

    const [srDiv, setSrDiv] = useState();
    const [renderSrDiv, setRenderSrDiv] = useState(false);

    useEffect(() => {
        dispatch(getAllStocks())
    }, [dispatch])

    const openForm = () => {
        console.log('opening', renderSrDiv)
        // setRenderSrDiv(true);
        srDiv.style.height = 'fit-content'
        srDiv.style.border = '1px solid #00da86'
        if (!renderSrDiv) {
            setRenderSrDiv(true);
            console.log('cond', renderSrDiv)
            document.addEventListener('click', closeForm)
        }
        console.log(renderSrDiv)
    }

    const closeForm = (e) => {
        console.log('closing', renderSrDiv)
        setRenderSrDiv(false);
        srDiv.style.height = '0px';
        srDiv.style.border = 'none'
        document.removeEventListener('click', closeForm);
        console.log(renderSrDiv)
    }

    const srClickHandler = (e) => {
        closeForm();
        setSearchInput('');
        if (srMenuRef.current && !srMenuRef.current.contains(e.target)) {
            setRenderSrDiv(false);
            document.removeEventListener('click', closeForm);
        }
    }

    useEffect(() => {
        setSrDiv(document.getElementById(`sr-dropdown-menu`));
        if (srDiv) {
            srDiv.style.height = '0px';
            srDiv.style.border = 'none'
        }

        console.log(renderSrDiv, srDiv, srMenuRef)
    }, [srMenuRef]);

    useEffect(() => {
        console.log(renderSrDiv, srDiv, srMenuRef)


        if (searchInput) {

            if (!renderSrDiv) openForm()

            if (stocks) {
                let sr = Object.values(stocks).filter((stock) => {
                    return stock.symbol.toLowerCase().includes(searchInput.toLowerCase())
                        || stock.name.toLowerCase().includes(searchInput.toLowerCase())
                })
                console.log(sr)
                setSearchResults(sr)
            }

        } else if (!searchInput && renderSrDiv) {
            setSearchResults([]);
            closeForm();
        }
        // if (searchInput && searchResults.length) {
        //     if (!renderSrDiv) {
        //         openForm()
        //     }
        // }

    }, [searchInput]);


    return (
        <div className='nav-search-container'>
            <div className='nav-search-pseudo-input'>
                <i class="fa-solid fa-terminal nav-search-icon"></i>
                    <input
                        className='nav-search-input'
                        id='search-input-field'
                        type='text'
                        placeholder='Enter stock name or symbol...'
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                    />
            </div>
            <div
                className='nav-search-results-menu-div'
                ref={srMenuRef}
                id='sr-dropdown-menu'
            >
                {searchResults.length > 0
                    ? searchResults.map(r => (
                        <Link
                            className='sr-link-wrap'
                            to={`/app/stocks/${r.symbol}`}
                            onClick={srClickHandler}
                        >
                            <div className='sr-item-div'>
                                <pre>
                                    {'> ' + r.symbol.padEnd(4) + ' | ' + r.name}
                                </pre>
                            </div>
                        </Link>
                    ))
                    : <div className='sr-nr-div'>
                        No matching results...
                    </div>
                }
            </div>
        </div>
    )
}
