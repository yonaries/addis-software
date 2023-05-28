import { Card, Flex, Heading, Text } from "rebass";
import { deleteRecord } from "../../api/users";
import { DangerButton, Button } from "../../style/style";
import { useDispatch } from "react-redux";
import { REQUEST_API_RECORD } from "../../redux/sagaActions";

type Props = {
  uid: string;
  close: Function;
};

const Delete = (props: Props) => {
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    await deleteRecord(props.uid);
    dispatch({ type: REQUEST_API_RECORD });
    props.close();
  };
  return (
    <Flex
      overflow={"hidden"}
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      className={`absolute top-0 left-0 bg-opacity-50 bg-black backdrop-blur-sm transition-all`}
    >
      <Card className="overflow-scroll w-2/5 m-5 h-1/3 bg-zinc-800 rounded-2xl shadow-xl px-10 py-6">
        <div>
          <Heading
            fontFamily={"Poppins"}
            className="pb-4 font-bold text-2xl text-slate-200"
          >
            Delete Record
          </Heading>
          <Text className="text-slate-400">
            By confirming, the record will be deleted permanently. this action
            cannot be undone.
          </Text>
        </div>
        <Flex
          className="space-x-3"
          justifyContent={"space-between"}
          marginTop={"1.75rem"}
        >
          <Button onClick={() => props.close()}>Cancel</Button>
          <DangerButton onClick={() => deleteHandler()} type="submit">
            Delete Record
          </DangerButton>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Delete;
