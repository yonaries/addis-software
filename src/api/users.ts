import axios from "axios";
import PocketBase from 'pocketbase';
import { store } from "..";
import { IUser } from "../model/user";
import { onLoad, setList } from "../redux/users_list_slice";

//using pocketbase JS client SDK
const client = new PocketBase('http://127.0.0.1:8090');

//API Requests to pocketbase using REST API
export const createRecord = async (record: IUser) => {
    try {
        await axios.post(`http://127.0.0.1:8090/api/collections/users_data/records`, record)
    } catch (error: any) {
        throw new Error(error);
    }
}
export const fetchRecords = async ():Promise<IUser[]> => {
    try {
        const result = await axios.get('http://127.0.0.1:8090/api/collections/users_data/records?sort=-created')
        return result.data.items
    } catch (error: any) {
        throw new Error(error);
    }
}
export const searchRecords = async (keyword: string):Promise<IUser[]> => {
    try {
        store.dispatch(onLoad())
        const result = await axios.get(`http://127.0.0.1:8090/api/collections/users_data/records?filter=(full_name~'${keyword}'||user_name~'${keyword}'||email~'${keyword}')`)
        store.dispatch(setList(result.data.items))
        return result.data.items
    } catch (error: any) {
        throw new Error(error);
    }
}

export const checkUsername = async (username: string) => {
    try {
        const result = await axios.get(`http://127.0.0.1:8090/api/collections/users_data/records?filter=(user_name='${username}')`)
        return result.data.items[0].id
    } catch (error: any) {
        return null
    }
}

//API Requests to pocketbase with client SDK
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
        fetchRecords() // update list After updating record
    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteRecord = async (id: string) => {
    try {
        await client.records.delete('users_data', id);
        fetchRecords() // update list After deleting record
    } catch (error: any) {
        throw new Error(error);
    }
}