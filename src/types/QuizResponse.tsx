import { QuestionResponse, QuestionUpdate } from "./QuestionReponse";

export interface QuizResponse{
    id:number;
    title:string,
    description:string,
    frequency:number,
    company_id:number,
}

export interface QuizRequest{
    title:string,
    description:string,
    frequency:number,
    company_id:number,
}


export interface QuizUpdate{
    id:number;
    title:string,
    description:string,
    frequency:number,
    company_id:number,
    questions: QuestionUpdate[]
}