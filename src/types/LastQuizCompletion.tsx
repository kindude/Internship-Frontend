export interface LastQuizCompletion{
    quiz_id: number
    last_completion_time: string
}

export interface ListLastQuizCompletion{
    completions : LastQuizCompletion[];
}