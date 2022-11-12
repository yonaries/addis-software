import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { deleteRecord } from '../../api/users'
import editIcon from '../../assets/Edit_fill.svg'
import removeIcon from '../../assets/Remove.svg'
import { IUser } from '../../model/user'
import { selectUid } from '../../redux/uid_slice'
import Delete from '../record/delete'
import View from '../record/view'

type Props = {
}

const TableList = (props: Props) => {
    const list = useSelector<RootState>(state => state.records.list) as IUser[]
    const [deleteId, setDeleteId] = useState<string>('')
    const [viewModal, setViewModal] = useState<boolean>(false)
    const [readOnly, setReadOnly] = useState<boolean>(true)
    const dispatch = useDispatch()

    function closeModal() {
        setReadOnly(true)
        setViewModal(false)
        setDeleteId('')
    }
    function updateHandler(uid: string) {
        dispatch(selectUid(uid))
        setReadOnly(false)
        setViewModal(true)
    }
    function viewHandler(uid: string) {
        dispatch(selectUid(uid))
        setReadOnly(true)
        setViewModal(true)
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
                    {list.map((user: IUser, index) => <tr onDoubleClick={() => viewHandler(user.id!)} className='h-11 cursor-pointer hover:bg-zinc-700 transition-all' key={user.id}>
                        <td className="px-5">{index + 1}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td className='md:w-48'>{user.phone}</td>
                        <td className="flex justify-evenly pt-2">
                            <img className='border-2 border-transparent rounded-md hover:bg-zinc-800 transition-all' src={editIcon} onClick={() => updateHandler(user.id!)} />
                            <img className='border-2 border-transparent rounded-md hover:bg-zinc-800 transition-all' src={removeIcon} onClick={() => setDeleteId(user.id!)} />
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            {viewModal && <View readonly={readOnly} close={closeModal} />}
            {deleteId && <Delete uid={deleteId} close={closeModal} />}
        </>
    )
}

export default TableList