import { useParams } from "react-router-dom";
import ListQuizzes from "../components/layout/ListQuizzes";
import { useEffect } from "react";
import { useState } from "react";
import { QuizResponse } from "../types/QuizResponse";
import axiosInstance from "../api/api_instance";


const QuizzesPage: React.FC = () => {

    const { companyId } = useParams<{ companyId: string }>();
    const {quizId} = useParams <{quizId:string}>();
    const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);


    const fetchQuizzes = async () => {

        const quizzes = await axiosInstance.get(`/company/${companyId}/get-quizzes`);
        setQuizzes(quizzes.data.quizzes);
        
    }

    useEffect(() => {
        fetchQuizzes();
      }, [companyId]);


    return (
        <ListQuizzes list={quizzes}/>
    )
}


export default QuizzesPage;