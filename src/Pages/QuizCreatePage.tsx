import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/layout/Button";
import axiosInstance from "../api/api_instance";
import { QuizRequest } from "../types/QuizResponse";
import { QuestionRequest } from "../types/QuestionReponse";
import { OptionRequest } from "../types/OptionResponse";
import { useNavigate } from "react-router-dom";
import "../styles/QuizCreatePage.css";


const QuizCreatePage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionRequest[]>([
    { question: "", options: [{ text: "", is_correct: false }] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [{ text: "", is_correct: false }] },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({
      text: "",
      is_correct: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    if (questions[questionIndex].options.length > 2) {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSaveQuiz = async () => {
    if (questions.length < 2) {
      console.error("Error creating quiz: Minimum 2 questions required");
      return;
    }

    const quizRequest: QuizRequest = {
      title: quizTitle,
      description: quizDescription,
      frequency: 0,
      company_id: Number(companyId),
    };

    const questionsRequest: QuestionRequest[] = questions.map((question) => {
      const optionsRequest: OptionRequest[] = question.options.map((option) => ({
        text: option.text,
        is_correct: option.is_correct,
      }));

      return {
        question: question.question,
        options: optionsRequest,
      };
    });

    try {
      const response = await axiosInstance.post(`/company/create/quiz`, {
        ...quizRequest,
        questions: questionsRequest,
      });

      console.log("Quiz created successfully!", response.data);
      navigate(`/company/${companyId}/quizzes`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    updatedOption: OptionRequest
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = updatedOption;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="quiz-create-page">
      <h2>Create Quiz</h2>
      <div className="quiz-form">
        <label>
          Quiz Title:
          <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Quiz Description:
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          />
        </label>
      </div>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h3>Question {questionIndex + 1}</h3>
          {questions.length > 2 && (
            <Button
              type="button"
              text="Remove Question"
              onClick={() => handleRemoveQuestion(questionIndex)}
              className="remove-button"
            />
          )}
          <label>
            Question Text:
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            />
          </label>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, {
                        ...option,
                        text: e.target.value,
                      })
                    }
                  />
                  <input
                    type="checkbox"
                    checked={option.is_correct}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, {
                        ...option,
                        is_correct: e.target.checked,
                      })
                    }
                  />
                  {question.options.length > 2 && (
                    <Button
                      type="button"
                      text="Remove Option"
                      onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                      className="add-option-button"
                    />
                  )}
                </label>
              </li>
            ))}
          </ul>
          {question.options.length < 6 && (
            <Button type="button" text="Add Option" onClick={() => handleAddOption(questionIndex)} className="add-option-button" />
          )}
        </div>
      ))}
      {questions.length < 10 && (
        <Button type="button" text="Add Question" onClick={handleAddQuestion} className="add-question-button"/>
      )}
      <Button type="button" text="Save Quiz" onClick={handleSaveQuiz}   className="save-quiz-button"/>
    </div>
  );
};

export default QuizCreatePage;
