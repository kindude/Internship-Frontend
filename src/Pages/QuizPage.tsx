import { useParams } from "react-router-dom";
import ListQuizzes from "../components/layout/ListQuizzes";
import { useEffect } from "react";
import { useState } from "react";
import { QuizResponse } from "../types/QuizResponse";
import axiosInstance from "../api/api_instance";
import { QuestionResponse } from "../types/QuestionReponse";



const QuizPage: React.FC = () => {

    const {quizId} = useParams <{quizId:string}>();
    const {companyId} = useParams<{companyId:string}>();
    const [quiz, setQuiz] = useState<QuizResponse[]>([]);
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);

    const fetchQuizzes = async () => {

        const quizzes = await axiosInstance.get(`/company/${companyId}/get-quiz/${quizId}`);
        setQuiz(quizzes.data);
        const questions =await axiosInstance.get(`/company/${companyId}/quiz/${quizId}/questions`);
        setQuestions(questions.data.questions);
        
    }

    useEffect(() => {
        fetchQuizzes();
      }, [companyId]);


    return (
        <div>
            
        </div>
    )
}


export default QuizPage;