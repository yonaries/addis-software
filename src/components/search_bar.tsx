import React from 'react'
import { searchRecords, fetchRecords } from '../api/users'

type Props = {
}

const SearchBar = (props: Props) => {

    function searchInputHandler(e: any) {
        e.target.value ? searchRecords(e.target.value)
            : fetchRecords()
    }

    return (
        <div className="bg-neutral-800 rounded-md px-4 py-2">
            <form>
                <input onChange={searchInputHandler} className="bg-transparent text-slate-200 outline-none" type="search" placeholder="Search for record" />
            </form>
        </div>
    )
}

export default SearchBar