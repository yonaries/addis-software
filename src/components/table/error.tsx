import { Button, Flex, Heading, Text } from 'rebass'
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
                        <Text textAlign={'center'}>Please check if pocketbase server has initiated</Text>
                    </div>
                    <div className='block bg-neutral-600 bg-opacity-50 rounded-md p-3 my-3 space-y-2'>
                        <Text fontFamily={'Courier New'} className='text-neutral-500 pb-1'>// start server with</Text>
                        <code className='text-neutral-300 pb-1'>$ ./pocketbase serve</code>
                    </div>
                    <Button className={errorBtnStyle} onClick={() => tryAgainHandler()}>Try again</Button>
                </div>
            </div>
        </Flex>
    )
}

export default ErrorUI