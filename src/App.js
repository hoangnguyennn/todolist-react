import { useMemo, useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './App.css';

import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';

import close from './assets/images/close.svg';

import { initialTodos, FILTER_TYPES, KEYS } from './constants';

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [filterType, setFilterType] = useState(FILTER_TYPES.ALL);

  const addTodo = event => {
    if (event.key === KEYS.ENTER) {
      const title = event.target.value;
      const titleTrimed = title.replace(/\s+/g, ' ').trim();

      if (titleTrimed.length !== 0) {
        setTodos(todos => [
          ...todos,
          { title: titleTrimed, isCompleted: false },
        ]);

        setNewItem('');
      }
    }
  };

  const newTodoTitleChange = event => {
    setNewItem(event.target.value);
  };

  const changeTodosStatus = isCompleted => {
    setTodos(todos => todos.map(todo => ({ ...todo, isCompleted })));
  };

  const allItemClick = () => {
    let hasItemUncompleted = todos.some(todo => !todo.isCompleted);
    changeTodosStatus(hasItemUncompleted);
  };

  const clearTodosCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.isCompleted));
  };

  const changeTodoStatus = index => {
    setTodos(todos => [
      ...todos.slice(0, index),
      {
        ...todos[index],
        isCompleted: !todos[index].isCompleted,
      },
      ...todos.slice(index + 1),
    ]);
  };

  const deleteTodo = index => {
    setTodos(todos => [...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  const todosFiltered = type => {
    switch (type) {
      case FILTER_TYPES.ALL:
        return todos;
      case FILTER_TYPES.ACTIVE:
        return todosUnCompleted;
      case FILTER_TYPES.COMPLETED:
        return todosCompleted;
      default:
        return todos;
    }
  };

  const todosCompleted = useMemo(
    () => todos.filter(todo => todo.isCompleted),
    [todos]
  );

  const todosUnCompleted = useMemo(
    () => todos.filter(todo => !todo.isCompleted),
    [todos]
  );

  const todosFilteredCounter = type => {
    return todosFiltered(type).length;
  };

  return (
    <div className="app">
      <ListGroup>
        <ListGroupItem>
          <Header
            addTodo={addTodo}
            newTodoTitleChange={newTodoTitleChange}
            allItemClick={allItemClick}
            newItem={newItem}
          />
        </ListGroupItem>
        {todosFiltered(filterType).map((item, index) => (
          <ListGroupItem key={index}>
            <ListItem
              item={item}
              changeTodoStatus={() => changeTodoStatus(index)}
            />
            <img src={close} alt="" onClick={() => deleteTodo(index)} />
          </ListGroupItem>
        ))}
        <ListGroupItem>
          <Footer
            counter={todosFilteredCounter(FILTER_TYPES.ACTIVE)}
            selected={filterType}
            filterAll={() => setFilterType(FILTER_TYPES.ALL)}
            filterActive={() => setFilterType(FILTER_TYPES.ACTIVE)}
            filterCompleted={() => setFilterType(FILTER_TYPES.COMPLETED)}
            clearTodosCompleted={clearTodosCompleted}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default App;
