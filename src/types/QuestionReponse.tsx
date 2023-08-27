import { OptionResponse } from "./OptionResponse";

export interface QuestionResponse{
    id:number,
    text:string, 
    quiz_id:number, 
    options: OptionResponse[]
}