import React from "react";
import styles from './Serch.module.scss'

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.root}>
            <svg className={styles.icon} id="Layer_1_1_" version="1.1" viewBox="0 0 16 16"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5,10c1.198,0,2.284-0.441,3.147-1.146l7,7l0.707-0.707l-7-7C9.559,7.284,10,6.198,10,5c0-2.757-2.243-5-5-5S0,2.243,0,5  S2.243,10,5,10z M5,1c2.209,0,4,1.791,4,4c0,2.209-1.791,4-4,4S1,7.209,1,5C1,2.791,2.791,1,5,1z"/>
            </svg>
            <input onChange={(event) => setSearchValue(event.target.value)}
                   value={searchValue}
                   className={styles.input}
                   placeholder="Пошук піцци...."/>
            {searchValue &&
                <svg onClick={() => {setSearchValue('')}}
                     className={styles.clearIcon} height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512"
                     width="512px" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                </svg>}

        </div>
    )
}

export default Search