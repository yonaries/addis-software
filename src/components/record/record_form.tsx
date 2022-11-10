import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Card, Flex, Heading, Text } from 'rebass';
import { checkUsername, createRecord } from '../../api/users';
import { IUser } from '../../model/user';
import { inputStyle, requiredInputStyle, mainBtnStyle, closeBtnStyle } from '../../style/style';

type Props = {
    close: Function
}

const RecordForm = (props: Props) => {
    //state to track if username is taken
    const [isTaken, setIsTaken] = useState<boolean>(false)

    //error state for invalid input
    const [error, setError] = useState<boolean>(false)

    //initial record
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

    const inputHandler = (e: any) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value })
        if (e.target.name == 'user_name') {
            checkUsername(e.target.value).then((result) => result ? setIsTaken(true) : setIsTaken(false)
            )
        }
    }
    const submitHandler = async () => {
        try {
            await createRecord(newRecord)
            props.close()
        } catch (error) {
            setError(true)
        }
    }

    return (
        <Flex overflow={'hidden'} width={'100vw'} height={'100vh'} justifyContent={'center'} alignItems={'center'} className={`absolute top-0 left-0 bg-opacity-50 bg-black backdrop-blur-sm transition-all`}>
            <Card className='overflow-scroll w-1/3 m-5 h-5/6 bg-zinc-800 rounded-2xl shadow-xl px-10 py-6'>
                <div onClick={() => props.close()} className={closeBtnStyle}><p>x</p></div>
                <Heading fontFamily={'Poppins'} fontWeight={'bold'} className='text-2xl text-slate-200'>New Record</Heading>
                <Text className='py-6 text-slate-400'>Your are adding a new record into the database.</Text>
                <Box className='space-y-5 text-slate-100'>
                    <label className='font-bold'>Personal Information</label>
                    <input onChange={inputHandler} className={newRecord.full_name ? inputStyle : error ? requiredInputStyle : inputStyle} value={newRecord.full_name} name='full_name' type="text" placeholder='Full Name' />
                    <input onChange={inputHandler} className={isTaken ? requiredInputStyle : newRecord.user_name ? inputStyle : error ? requiredInputStyle : inputStyle} value={newRecord.user_name} name='user_name' type="text" placeholder='username' />
                    {isTaken && <label className='font-bold text-xs text-red-500'>username is taken</label>}
                    <input onChange={inputHandler} className={newRecord.email ? inputStyle : error ? requiredInputStyle : inputStyle} value={newRecord.email} name='email' type="email" placeholder='Email' />
                    <input onChange={inputHandler} className={newRecord.phone ? inputStyle : error ? requiredInputStyle : inputStyle} value={newRecord.phone} name='phone' type="text" placeholder='Phone' />
                    <input onChange={inputHandler} className={inputStyle} value={newRecord.state} name='state' type="text" placeholder='State' />
                    <input onChange={inputHandler} className={inputStyle} value={newRecord.city} name='city' type="text" placeholder='City' />
                    <input onChange={inputHandler} className={inputStyle} value={newRecord.street} name='street' type="text" placeholder='Street' />
                    <input onChange={inputHandler} className={inputStyle} value={newRecord.zipcode} name='zipcode' type="text" placeholder='Zip Code' />
                    <Button onClick={submitHandler} className={mainBtnStyle} type='submit' >Save Record</Button>
                </Box>
            </Card>
        </Flex>
    )
}

export default RecordForm