import axios from "axios"
import { useEffect, useState } from 'react'
import { RotatingLines } from "react-loader-spinner"
import { Button, Box } from "rebass"
import { fetchRecords } from "../../api/users"
import { IUser } from '../../model/user'
import { selectedColor } from "../../style/style"
import Loading from "../loading"
import RecordForm from "../record/record_form"
import SearchBar from "../search_bar"
import TableList from "./table_data"
import PocketBase from 'pocketbase';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../.."
import ErrorUI from "./error"

type Props = {}

const Table = (props: Props) => {
    const isLoaded = useSelector<RootState>(state => state.records.isLoaded) as boolean
    const [modal, setModal] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    function closeModal() {
        fetchRecords()
        setModal(false)
    }

    useEffect(() => {
        return () => {
            fetchRecords()
                .catch(() => {
                    setError(true)
                })
        }
    }, [error])

    return (
        <div className='bg-zinc-800 m-5 rounded-md w-2/3 overflow-scroll shadow-xl'>
            <Box className='sticky top-0 py-4 px-4 bg-zinc-700  h-16 items-center justify-between w-full flex'>
                <SearchBar />
                <Button className={selectedColor} onClick={() => setModal(true)}>Add Record</Button>
            </Box>
            {error ? <ErrorUI setError={setError} /> : <>
                {isLoaded ? <TableList />
                    : <Loading />}
                {modal && <RecordForm close={closeModal} />}</>
            }
        </div>
    )
}

export default Table