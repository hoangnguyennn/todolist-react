import { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './App.css';

import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';

import close from './assets/images/close.svg';

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todoList, setTodoList] = useState([
    { title: 'Ăn', isCompleted: false },
    { title: 'Ngủ', isCompleted: false },
    { title: 'Code', isCompleted: true },
  ]);
  const [filterType, setFilterType] = useState('all');

  const addTodo = (event) => {
    if (event.keyCode === 13) {
      const title = event.target.value;

      if (title.length !== 0) {
        setTodoList((todoList) =>
          todoList.concat({ title, isCompleted: false })
        );
      }
    }
  };

  const newTodoTitleChange = (event) => {
    setNewItem(event.target.value);
  };

  const changeTodosStatus = (isCompleted) => {
    setTodoList((todoList) =>
      todoList.map((todo) => ({ ...todo, isCompleted }))
    );
  };

  const allItemClick = () => {
    let hasItemUncompleted = todoList.some((todo) => !todo.isCompleted);

    if (hasItemUncompleted) {
      changeTodosStatus(true);
    } else {
      changeTodosStatus(false);
    }
  };

  const changeFilterType = (type) => {
    switch (type) {
      case 'all':
        setFilterType('all');
        break;
      case 'active':
        setFilterType('active');
        break;
      case 'completed':
        setFilterType('completed');
        break;
      default:
        setFilterType('all');
    }
  };

  const clearTodosCompleted = () => {
    setTodoList((todoList) => todoList.filter((todo) => !todo.isCompleted));
  };

  const changeTodoStatus = (index) => {
    if (todoList[index]) {
      setTodoList((todoList) => [
        ...todoList.slice(0, index),
        {
          ...todoList[index],
          isCompleted: !todoList[index].isCompleted,
        },
        ...todoList.slice(index + 1),
      ]);
    }
  };

  const deleteTodo = (index) => {
    if (todoList[index]) {
      setTodoList((todoList) => [
        ...todoList.slice(0, index),
        ...todoList.slice(index + 1),
      ]);
    }
  };

  const todosFiltered = (type) => {
    return todoList.filter((todo) => {
      switch (type) {
        case 'all':
          return todo;
        case 'active':
          return !todo.isCompleted;
        case 'completed':
          return todo.isCompleted;
        default:
          return true;
      }
    });
  };

  const todosFilteredCounter = (type) => {
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
            counter={todosFilteredCounter('active')}
            selected={filterType}
            filterAll={() => changeFilterType('all')}
            filterActive={() => changeFilterType('active')}
            filterCompleted={() => changeFilterType('completed')}
            clearTodosCompleted={clearTodosCompleted}
          />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default App;
