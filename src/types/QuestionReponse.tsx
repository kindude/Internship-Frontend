import { OptionResponse, OptionRequest, OptionUpdate } from "./OptionResponse";

export interface QuestionResponse{
    id:number,
    text:string, 
    quiz_id:number, 
    options: OptionResponse[]
}

export interface QuestionUpdate{
    id:number,
    text:string, 
    quiz_id:number, 
    options: OptionUpdate[]
}


export interface QuestionRequest{
    question:string, 
    options: OptionRequest[]
}