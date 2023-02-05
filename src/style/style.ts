import styled from "styled-components"

//for reusability purpose some of tailwind css styles are declared here
export const inputStyle = 'p-2 w-full border-zinc-700 focus:border-green-500 outline-none rounded-md border-2 bg-transparent transition-all'
export const requiredInputStyle = 'p-2 w-full border-red-500 outline-none rounded-md border-2 bg-transparent transition-all'
export const selectedColor = 'border-2 border-green-500 bg-green-500 text-white rounded-md px-3 py-1 transition-all'
export const closeBtnStyle = 'absolute cursor-pointer mr-9 hover:shadow-md hover:shadow-red-400 transition-all right-1/3 bg-red-500 text-white top-auto rounded-full text-center flex items-center justify-center w-8 h-8'

export const DangerButton = styled.button`
    width:100%;
    background-color:#FF0032;
    border:none;
    padding:7px 3px;
    color:white;
    border-radius:5px;
    transition: 0.2s ease-in-out;

    :hover{
        background-color:#FF1E1E;
    }
`
export const Button = styled.button`
    width:100%;
    background-color:#03C988;
    border:none;
    padding:7px 3px;
    color:white;
    border-radius:5px;
    transition: 0.2s ease-in-out;

    :hover{
        background-color:#00FFAB;
    }
`