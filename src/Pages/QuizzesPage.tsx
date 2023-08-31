import { useParams } from "react-router-dom";
import ListQuizzes from "../components/layout/ListQuizzes";
import { useEffect } from "react";
import { useState } from "react";
import { QuizResponse } from "../types/QuizResponse";
import axiosInstance from "../api/api_instance";


export const deleteQuiz = async (company_id:number, quiz_id:number) => {
    try
    {
      const response = await axiosInstance.post(`/company/${company_id}/quiz/${quiz_id}/delete`);
      window.location.reload();
    }
    catch(error){
      console.log(error);
    }

  };

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