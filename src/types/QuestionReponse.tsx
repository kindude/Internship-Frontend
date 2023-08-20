import { OptionResponse } from "./OptionResponse";

export interface QuestionResponse{
    question:string, 
    quiz_id:number, 
    options: OptionResponse[]
}