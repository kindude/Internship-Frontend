import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { QuizResponse } from '../../types/QuizResponse';
import Button from './Button';
import { RootState } from '../../types/types';


interface ListQuizzesProps {
  list: QuizResponse[];
}

const ListQuizzes: React.FC<ListQuizzesProps> = ({ list }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);


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
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListQuizzes;
