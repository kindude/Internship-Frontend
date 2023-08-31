import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuizResponse } from "../types/QuizResponse";
import axiosInstance from "../api/api_instance";
import { QuestionResponse } from "../types/QuestionReponse";
import Button from "../components/layout/Button";
import { useNavigate } from "react-router-dom";

const QuizPage: React.FC = () => {
    const navigate = useNavigate();
    const { quizId, companyId } = useParams<{ quizId: string; companyId: string }>();
    const [quiz, setQuiz] = useState<QuizResponse | undefined>();
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedOptions, setSelectedOptions] = useState<{ [questionId: number]: { id: number | null; text: string | null } }>({});

    const fetchQuizAndQuestions = async () => {
        try {
            const [quizResponse, questionsResponse] = await Promise.all([
                axiosInstance.get(`/company/${companyId}/get-quiz/${quizId}`),
                axiosInstance.get(`/company/${companyId}/quiz/${quizId}/questions`),
            ]);

            setQuiz(quizResponse.data);
            setQuestions(questionsResponse.data.questions);
        } catch (error) {
            console.error("Error fetching quiz and questions:", error);
        }
    };

    useEffect(() => {
        fetchQuizAndQuestions();
    }, [companyId]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionSelect = (questionId: number, optionText: string, optionId: number) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [questionId]: {
                id: optionId,
                text: optionText,
            },
        }));
    };

    const handleSubmitQuiz = async () => {
        const selectedAnswers = questions.map((question) => ({
            id: question.id,
            text: question.text,
            quiz_id: quizId,
            option: {
                id: selectedOptions[question.id]?.id || null,
                text: selectedOptions[question.id]?.text || null,
            },
        }));
    
        try {
            const response = await axiosInstance.post(`/company/${companyId}/quiz/${quizId}/take-quiz`, selectedAnswers);
            console.log("Quiz submitted successfully!", response.data);
            navigate(`/companyPage/${companyId}`);

        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };
    

    return (
        <div>
            {questions.length > 0 && currentQuestionIndex >= 0 && (
                <div>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <p>{questions[currentQuestionIndex].text}</p>
                    <ul>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`answer_${questions[currentQuestionIndex].id}`}
                                        value={option.text}
                                        checked={
                                            selectedOptions[questions[currentQuestionIndex].id]?.id === option.id &&
                                            selectedOptions[questions[currentQuestionIndex].id]?.text === option.text
                                        }
                                        onChange={() =>
                                            handleOptionSelect(
                                                questions[currentQuestionIndex].id,
                                                option.text,
                                                option.id
                                            )
                                        }
                                    />
                                    {option.text}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <Button
                        text="Previous Question"
                        type="button"
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                    />
                    <Button
                        text="Next Question"
                        type="button"
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                    />
                    {currentQuestionIndex === questions.length - 1 && (
                        <Button
                            type="button"
                            text="Submit Quiz"
                            onClick={handleSubmitQuiz}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizPage;
