import { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './App.css';

import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';

import close from './imgs/close.svg';

const App = () => {
	const [newItem, setNewItem] = useState('');
	const [todoList, setTodoList] = useState([
		{ title: 'Ăn', isCompleted: false },
		{ title: 'Ngủ', isCompleted: false },
		{ title: 'Code', isCompleted: true },
	]);
	const [filterType, setFilterType] = useState('all');

	const addNewItem = (event) => {
		if (event.keyCode === 13) {
			const title = event.target.value;

			if (title.length !== 0) {
				setTodoList((todoList) =>
					todoList.concat({ title, isCompleted: false })
				);
			}
		}
	};

	const handleInputChange = (event) => {
		setNewItem(event.target.value);
	};

	const checkAllItems = () => {
		setTodoList((todoList) =>
			todoList.map((todo) => ({ ...todo, isCompleted: true }))
		);
	};

	const unCheckAllItem = () => {
		setTodoList((todoList) =>
			todoList.map((todo) => ({ ...todo, isCompleted: false }))
		);
	};

	const allItemClick = () => {
		let hasItemUncompleted = todoList.some((todo) => !todo.isCompleted);

		if (hasItemUncompleted) {
			checkAllItems();
		} else {
			unCheckAllItem();
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

	const clearCompleted = () => {
		setTodoList((todoList) => todoList.filter((todo) => !todo.isCompleted));
	};

	const changeStatus = (index) => {
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

	const deleteItem = (index) => {
		if (todoList[index]) {
			setTodoList((todoList) => [
				...todoList.slice(0, index),
				...todoList.slice(index + 1),
			]);
		}
	};

	const todoListFiltered = (type) => {
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

	const todoListCounter = (type) => {
		return todoListFiltered(type).length;
	};

	return (
		<div className="app">
			<ListGroup>
				<ListGroupItem>
					<Header
						addNewItem={addNewItem}
						newItemChange={handleInputChange}
						allItemClick={allItemClick}
						newItem={newItem}
					/>
				</ListGroupItem>
				{todoListFiltered(filterType).map((item, index) => (
					<ListGroupItem key={index}>
						<ListItem item={item} onClick={() => changeStatus(index)} />
						<img src={close} alt="" onClick={() => deleteItem(index)} />
					</ListGroupItem>
				))}
				<ListGroupItem>
					<Footer
						counter={todoListCounter('active')}
						selected={filterType}
						filterAll={() => changeFilterType('all')}
						filterActive={() => changeFilterType('active')}
						filterCompleted={() => changeFilterType('completed')}
						clearCompleted={clearCompleted}
					/>
				</ListGroupItem>
			</ListGroup>
		</div>
	);
};

export default App;
