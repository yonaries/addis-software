import React from 'react'
import { Flex, Heading, Text, Button } from 'rebass'
import { fetchRecords } from '../../api/users'
import { errorBtnStyle } from '../../style/style'

type Props = {
    setError: Function
}

const ErrorUI = (props: Props) => {
    const tryAgainHandler = () => {
        props.setError(false)
    }
    return (
        <Flex width={'100%'} height={'83.33%'} justifyContent={'center'} alignItems={'center'}  >
            <div className='flex text-white justify-center items-center bg-red-500 bg-opacity-20 border-2 border-red-500 w-2/3 h-3/5 rounded-md' >
                <div className='space-y-7'>
                    <div>
                        <Heading fontFamily={'Poppins'} fontSize={'1.5rem'} textAlign={'center'} fontWeight={'bold'}>Something is not right.</Heading>
                        <Text textAlign={'center'}>Please check if pocketbase server is started.</Text>
                    </div>
                    <div className='block bg-neutral-600 bg-opacity-50 rounded-md p-3 my-3 space-y-2'>
                        <Text fontFamily={'Courier New'} className='text-neutral-400 pb-1'>// start server with</Text>
                        <code >$ ./pocketbase serve</code>
                    </div>
                    <Button className={errorBtnStyle} onClick={() => tryAgainHandler()}>Try again</Button>
                </div>
            </div>
        </Flex>
    )
}

export default ErrorUI