import { FocusEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Card, Flex, Heading, Text } from "rebass";
import { RootState } from "../..";
import { checkUsername, getOneRecord, updateRecord } from "../../api/users";
import { IUser } from "../../model/user";
import {
  mainBtnStyle,
  errorBtnStyle,
  inputStyle,
  closeBtnStyle,
  requiredInputStyle,
} from "../../style/style";
import Loading from "../loading";

type Props = {
  readonly: boolean;
  close: Function;
};

const View = (props: Props) => {
  const uid = useSelector<RootState>((state) => state.uid.current) as string;
  const [readOnly, setReadOnly] = useState<boolean>(props.readonly);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [record, setRecord] = useState<IUser>({
    full_name: "",
    user_name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    street: "",
    zipcode: "",
  });

  const inputHandler = (e: any) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
    if (e.target.name == "user_name") {
      checkUsername(e.target.value).then((result) => {
        !result
          ? setIsTaken(false)
          : result == uid
          ? setIsTaken(false)
          : setIsTaken(true);
      });
    }
  };
  const submitHandler = async () => {
    try {
      //update record and close modal
      await updateRecord(uid, record);
      props.close();
    } catch (error) {
      //trigger input error
      setError(true);
    }
  };

  //get selected record data
  const fetchRecord = () => {
    getOneRecord(uid, setRecord).then(() => setIsLoaded(true));
  };

  useEffect(() => {
    return () => {
      fetchRecord();
    };
  }, []);

  return (
    <Flex
      overflow={"hidden"}
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      className={`absolute top-0 left-0 bg-opacity-50 bg-black backdrop-blur-sm transition-all`}
    >
      {isLoaded ? (
        <Card className="overflow-scroll w-1/3 m-5 h-5/6 bg-zinc-800 rounded-2xl shadow-xl px-10 py-6">
          <div onClick={() => props.close()} className={closeBtnStyle}>
            <p>x</p>
          </div>
          <Heading
            fontFamily={"Poppins"}
            className="pb-4 font-bold text-2xl text-slate-200"
          >
            {readOnly ? "Record Detail" : "Update Record"}
          </Heading>
          <Box className="space-y-5 text-slate-100">
            <label className="font-bold">Personal Information</label>
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={
                record.full_name
                  ? inputStyle
                  : error
                  ? requiredInputStyle
                  : inputStyle
              }
              name="full_name"
              value={record.full_name}
              type="text"
              placeholder="Full Name"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={
                isTaken
                  ? requiredInputStyle
                  : record.user_name
                  ? inputStyle
                  : error
                  ? requiredInputStyle
                  : inputStyle
              }
              name="user_name"
              value={record.user_name}
              type="text"
              placeholder="username"
            />
            {isTaken && (
              <label className="font-bold text-xs text-red-500">
                username is taken
              </label>
            )}
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={
                record.email
                  ? inputStyle
                  : error
                  ? requiredInputStyle
                  : inputStyle
              }
              name="email"
              value={record.email}
              type="email"
              placeholder="Email"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={
                record.phone
                  ? inputStyle
                  : error
                  ? requiredInputStyle
                  : inputStyle
              }
              name="phone"
              value={record.phone}
              type="text"
              placeholder="Phone"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={inputStyle}
              name="state"
              value={record.state}
              type="text"
              placeholder="State"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={inputStyle}
              name="city"
              value={record.city}
              type="text"
              placeholder="City"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={inputStyle}
              name="street"
              value={record.street}
              type="text"
              placeholder="Street"
            />
            <input
              readOnly={readOnly}
              onChange={inputHandler}
              className={inputStyle}
              name="zipcode"
              value={record.zipcode}
              type="text"
              placeholder="Zip Code"
            />
            {readOnly ? (
              <Button
                onClick={() => setReadOnly(false)}
                className={mainBtnStyle}
              >
                Update Record
              </Button>
            ) : (
              <Flex className="space-x-3" justifyContent={"space-between"}>
                <Button onClick={() => props.close()} className={errorBtnStyle}>
                  Cancel
                </Button>
                <Button
                  onClick={submitHandler}
                  className={mainBtnStyle}
                  type="submit"
                >
                  Save Record
                </Button>
              </Flex>
            )}
          </Box>
        </Card>
      ) : (
        <Loading />
      )}
    </Flex>
  );
};

export default View;
