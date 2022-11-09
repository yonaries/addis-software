import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Card, Flex, Heading } from 'rebass';
import { RootState } from '../..';
import { getOneRecord, updateRecord } from '../../api/users';
import { IUser } from '../../model/user';
import { buttonStyle } from '../../style/style';
import Loading from '../loading';

type Props = {
    readonly: boolean
    close: Function
}

const View = (props: Props) => {
    const uid = useSelector<RootState>(state => state.uid.current) as string
    const [readOnly, setReadOnly] = useState<boolean>(props.readonly)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [record, setRecord] = useState<IUser>({
        full_name: '',
        user_name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        street: '',
        zipcode: '',
    })

    const handleInputs = (e: any) => {
        setRecord({ ...record, [e.target.name]: e.target.value })
    }
    const submitHandler = async () => {
        await updateRecord(uid, record)
        props.close()
    }
    const fetchRecord = async () => {
        try {
            await getOneRecord(uid, setRecord)
            setIsLoaded(true)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        return () => {
            fetchRecord()
        }
    }, [])

    return (
        <Flex overflow={'hidden'} width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'} className={`absolute top-0 left-0 bg-opacity-50 bg-black backdrop-blur-sm transition-all`}>
            {
                isLoaded ? <Card className='overflow-scroll w-1/3 m-5 h-5/6 bg-zinc-800 rounded-2xl shadow-xl px-10 py-6'>
                    <div onClick={() => props.close()} className='absolute cursor-pointer mr-9 hover:shadow-md hover:shadow-red-400 transition-all right-1/3 bg-red-500 text-white top-auto rounded-full text-center flex items-center justify-center w-8 h-8'><p>x</p></div>
                    <Heading fontFamily={'Poppins'} className='font-bold text-2xl text-slate-200 pb-3'>{readOnly ? 'Record' : 'Update Record'}</Heading>
                    <Box className='space-y-5 text-slate-100'>
                        <label className='font-bold'>Personal Information</label>
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='full_name' value={record.full_name} type="text" placeholder='Full Name' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='user_name' value={record.user_name} type="text" placeholder='username' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='email' value={record.email} type="email" placeholder='Email' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='phone' value={record.phone} type="text" placeholder='Phone' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='state' value={record.state} type="text" placeholder='State' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='city' value={record.city} type="text" placeholder='City' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='street' value={record.street} type="text" placeholder='Street' />
                        <input readOnly={readOnly} onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='zipcode' value={record.zipcode} type="text" placeholder='Zip Code' />
                        {readOnly ?
                            <Button onClick={() => setReadOnly(false)} className={buttonStyle} >Update Record</Button>
                            : <Flex justifyContent={'space-between'}>
                                <Button onClick={() => props.close()} className={buttonStyle}>Cancel</Button>
                                <Button onClick={submitHandler} className={buttonStyle} type='submit'>Save Record</Button>
                            </Flex>
                        }
                    </Box>
                </Card> : <Loading />
            }
        </Flex>
    )
}

export default View