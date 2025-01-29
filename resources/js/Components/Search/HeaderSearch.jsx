import React from 'react'

const HeaderSearch = ({Id,onChangeFunc,Value,children}) => {
    const CallFunction = (e) =>{
        const value = e.target.value
        onChangeFunc(e)
    }
    return (
        <input type="search" id={Id} onKeyUp={CallFunction}  className="block  h-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." />
    )
}
export default HeaderSearch;