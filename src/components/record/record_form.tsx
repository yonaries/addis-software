import axios from 'axios';
import { useState } from 'react';
import { IUser } from '../../model/user';
import { buttonStyle } from '../../style/style';
import { Card, Box, Button, Heading, Text, Flex } from 'rebass'

type Props = {
    close: Function
}

const RecordForm = (props: Props) => {
    const [newRecord, setNewRecord] = useState<IUser>({
        full_name: '',
        user_name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        street: '',
        zipcode: '',
    })

    function handleInputs(e: any) {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value })
    }
    const submitHandler = async () => {
        try {
            await axios.post(`http://127.0.0.1:8090/api/collections/users_data/records`, newRecord)
            props.close()
        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <Flex overflow={'hidden'} width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'} className={`absolute top-0 left-0 bg-opacity-50 bg-black backdrop-blur-sm transition-all`}>
            <Card className='overflow-scroll w-1/3 m-5 h-5/6 bg-zinc-800 rounded-2xl shadow-xl px-10 py-6'>
                <div onClick={() => props.close()} className='absolute cursor-pointer mr-9 hover:shadow-md hover:shadow-red-400 transition-all right-1/3 bg-red-500 text-white top-auto rounded-full text-center flex items-center justify-center w-8 h-8'><p>x</p></div>
                <Heading fontFamily={'Poppins'} className='font-bold text-2xl text-slate-200'>New Record</Heading>
                <Text className='py-6 text-slate-400'>Your are adding a new record into the database.</Text>
                <Box className='space-y-5 text-slate-100'>
                    <label className='font-bold'>Personal Information</label>
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='full_name' type="text" placeholder='Full Name' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='user_name' type="text" placeholder='username' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='email' type="email" placeholder='Email' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='phone' type="text" placeholder='Phone' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='state' type="text" placeholder='State' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='city' type="text" placeholder='City' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='street' type="text" placeholder='Street' />
                    <input onChange={handleInputs} className='p-2 w-full border-zinc-700 outline-none rounded-md border-2 bg-transparent' name='zipcode' type="text" placeholder='Zip Code' />
                    <button onClick={submitHandler} className={buttonStyle} type='submit' >Save Record</button>
                </Box>
            </Card>
        </Flex>
    )
}

export default RecordForm