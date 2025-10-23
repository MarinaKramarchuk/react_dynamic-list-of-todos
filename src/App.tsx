/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export type FieldsForSelect = boolean | null;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<FieldsForSelect>(null);
  const [query, setQuery] = useState<string>('');

  const prepareTodos = (field: FieldsForSelect, text: string): Todo[] => {
    let newArray = [...todos];

    if (field !== null) {
      newArray = newArray.filter(todo => todo.completed === field);
    }

    if (text) {
      newArray = newArray.filter(todo =>
        todo.title
          .trim()
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase()),
      );
    }

    return newArray;
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Error');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetSelectedField={setSelectedField}
                onSetQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={prepareTodos(selectedField, query)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
