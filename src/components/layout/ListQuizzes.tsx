import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { QuizResponse } from '../../types/QuizResponse';
import Button from './Button';
import { RootState } from '../../types/types';
import axiosInstance from '../../api/api_instance';
import { deleteQuiz } from '../../pages/QuizzesPage';
import { useNavigate } from 'react-router-dom';

interface ListQuizzesProps {
  list: QuizResponse[];
}

const ListQuizzes: React.FC<ListQuizzesProps> = ({ list }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  return (
    <ul className="quiz-list">
      {list.map((item) => (
        <li key={item.id} className="quiz-item">
          <div>
            {currentUser?.id === item.company_id && <span>✓ </span>}
            <div>
              <Link to={`/company/${item.company_id}/quiz/${item.id}`}>{item.title}</Link>
              <div className="quiz-details">
                {item.description}
                <Button text="Edit Quiz" type="button" className="edit-button" onClick={()=> navigate(`/companyPage/${item.company_id}/quiz/${item.id}/update`)} />
                <Button text="Delete Quiz" type="button" className="delete-button" onClick={() => deleteQuiz(item.company_id, item.id)} />
            </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListQuizzes;
