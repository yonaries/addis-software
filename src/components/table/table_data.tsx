import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { deleteRecord } from '../../api/users'
import editIcon from '../../assets/Edit_fill.svg'
import removeIcon from '../../assets/Remove.svg'
import { IUser } from '../../model/user'
import { selectUid } from '../../redux/uid_slice'
import View from '../record/view'

type Props = {
}

const TableList = (props: Props) => {
    const list = useSelector<RootState>(state => state.records.list) as IUser[]
    const [modal, setModal] = useState<boolean>(false)
    const [readOnly, setReadOnly] = useState<boolean>(true)
    const dispatch = useDispatch()

    function closeModal() {
        setReadOnly(true)
        setModal(false)
    }
    function updateHandler() {
        setReadOnly(false)
        setModal(true)
    }
    function viewHandler(uid: string) {
        dispatch(selectUid(uid))
        setReadOnly(true)
        setModal(true)
    }

    return (
        <>
            <table className='w-full text-center'>
                <thead className='bg-zinc-700 text-white font-semibold h-10 sticky top-14'>
                    <th className='w-10'>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </thead>
                <tbody className='text-slate-50 px-5'>
                    {list.map((user: IUser) => <tr onDoubleClick={() => viewHandler(user.id!)} className='h-11 cursor-pointer hover:bg-zinc-700 transition-all' key={user.id}>
                        <td className="px-5">{user.id}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td className='md:w-48'>{user.phone}</td>
                        <td className="flex justify-evenly pt-2">
                            <img className='z-10 border-2 border-transparent rounded-md hover:bg-zinc-800 transition-all' src={editIcon} onClick={updateHandler} />
                            <img className='z-10 border-2 border-transparent rounded-md hover:bg-zinc-800 transition-all' src={removeIcon} onClick={() => deleteRecord(user.id!)} />
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            {modal && <View readonly={readOnly} close={closeModal} />}
        </>
    )
}

export default TableList