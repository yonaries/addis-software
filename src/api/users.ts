import axios from "axios";
import PocketBase from 'pocketbase';
import { store } from "..";
import { IUser } from "../model/user";
import { setList, onLoad } from "../redux/users_list_slice";

//using pocketbase JS client SDK
const client = new PocketBase('http://127.0.0.1:8090');

//Fetching data using REST API
export const fetchRecords = async () => {
    try {
        const result = await axios.get('http://127.0.0.1:8090/api/collections/users_data/records?sort=-created')
        store.dispatch(setList(result.data.items))
    } catch (error: any) {
        throw new Error(error);
    }
}
export const searchRecords = async (keyword: string) => {
    try {
        store.dispatch(onLoad())
        const result = await axios.get(`http://127.0.0.1:8090/api/collections/users_data/records?filter=(full_name~'${keyword}'||user_name~'${keyword}'||email~'${keyword}')`)
        store.dispatch(setList(result.data.items))
    } catch (error: any) {
        throw new Error(error);
    }
}

//Fetching data with pocketbase client SDK
export const getOneRecord = async (id: string, setState: Function) => {
    try {
        const result: unknown = await client.records.getOne('users_data', id);
        setState(result as IUser)
    } catch (error: any) {
        throw new Error(error);
    }
}

export const updateRecord = async (id: string, record: IUser) => {
    try {
        await client.records.update('users_data', id, record);
        fetchRecords()
    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteRecord = async (id: string) => {
    try {
        await client.records.delete('users_data', id);
        fetchRecords()
    } catch (error: any) {
        throw new Error(error);
    }
}