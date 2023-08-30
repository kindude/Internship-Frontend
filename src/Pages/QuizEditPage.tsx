import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/api_instance";
import { QuizUpdate } from "../types/QuizResponse";
import { QuestionUpdate } from "../types/QuestionReponse";
import { OptionUpdate } from "../types/OptionResponse";


const QuizEditPage: React.FC = () => {
    const { quizId, companyId } = useParams<{ quizId: string, companyId: string }>();

    const [quiz, setQuiz] = useState<QuizUpdate | null>(null);
    const [questions, setQuestions] = useState<QuestionUpdate[]>([]);

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
    }, [quizId]);

    const handleUpdateQuiz = async () => {
        try {
            if (quiz) {
                const updatedQuiz: QuizUpdate = {
                    ...quiz,
                    questions: questions.map((question) => {
                        const updatedQuestion: QuestionUpdate = {
                            ...question,
                            options: question.options.map((option) => {
                                const updatedOption: OptionUpdate = {
                                    ...option,
                                    is_correct: option.is_correct || false,
                                    question_id: question.id,
                                };
                                return updatedOption;
                            }),
                        };
                        return updatedQuestion;
                    }),
                };
    
                const response = await axiosInstance.post(`/company/${companyId}/quiz/update`, updatedQuiz);
                console.log("Quiz updated successfully!", response.data);
            }
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    const handleQuestionChange = (questionId: number, newText: string) => {
        const updatedQuestions = questions.map(question =>
            question.id === questionId ? { ...question, text: newText } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (
        questionId: number,
        optionId: number,
        text: string
    ) => {
        console.log("Updating option:", questionId, optionId, text);

        const updatedQuestions = questions.map((question) =>
            question.id === questionId
                ? {
                    ...question,
                    options: question.options.map((option) =>
                        option.id === optionId
                            ? { ...option, question_id: questionId, text: text }
                            : option
                    ),
                }
                : question
        );
        setQuestions(updatedQuestions);
    };

    const handleOptionCorrectChange = (
        questionId: number,
        optionId: number,
        isCorrect: boolean
    ) => {
        console.log("Updating option:", questionId, optionId, isCorrect);
        const updatedQuestions = questions.map(question =>
            question.id === questionId ? {
                ...question,
                options: question.options.map(option =>
                    option.id === optionId ? { ...option, is_correct: isCorrect } : option
                ),
            } : question
        );
        setQuestions(updatedQuestions);
    };

    return (
        <div>
            {quiz ? (
                <div>
                    <h2>Edit Quiz</h2>
                    <label>
                        Title:
                        <input type="text" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={quiz.description}
                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                        />
                    </label>
                    {questions.map((question) => (
                        <div key={question.id}>
                            <h3>Question {question.id}</h3>
                            <label>
                                Question Text:
                                <input
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                />
                            </label>
                            {question.options.map((option) => (
                                <div key={option.id}>
                                    <label>
                                        Option Text:
                                        <input
                                            type="text"
                                            value={option.text}
                                            onChange={(e) =>
                                                handleOptionChange(Number(question.id), Number(option.id), e.target.value)
                                            }
                                        />
                                    </label>
                                    <label>
                                        Is Correct:
                                        <input
                                            type="checkbox"
                                            checked={option.is_correct}
                                            onChange={(e) =>
                                                handleOptionCorrectChange(question.id, option.id, e.target.checked)
                                            }
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleUpdateQuiz}>Update Quiz</button>
                </div>
            ) : (
                <p>Loading quiz...</p>
            )}
        </div>
    );
};

export default QuizEditPage;
