export interface OptionResponse{
    id:number
    text:string,
    question_id:number,
    is_correct:boolean
}




export interface OptionUpdate{
    id:number
    text:string,
    question_id:number,
    is_correct?:boolean;
}

export interface OptionRequest{
    text:string,
    is_correct:boolean
}
