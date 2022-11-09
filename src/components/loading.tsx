import { RotatingLines } from 'react-loader-spinner'
import { Box, Flex } from 'rebass'

type Props = {}

const Loading = (props: Props) => {
    return (
        <Flex width={'100%'} height={'83.33%'} justifyContent={'center'} alignItems={'center'} >
            <RotatingLines width="30px" strokeColor="gray" />
        </Flex>
    )
}

export default Loading