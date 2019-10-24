import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './App.css';

import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';

import close from './imgs/close.svg';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newItem: '',
			todoList: [
				{title: "Ăn", isComplete: false},
				{title: "Ngủ", isComplete: false},
				{title: "Code", isComplete: true}
			],
			selected: 'all'
		};

		this.addNewItem = this.addNewItem.bind(this);
		this.newItemChange = this.newItemChange.bind(this);
		this.allItemClick = this.allItemClick.bind(this);

		this.filterAll = this.filterAll.bind(this);
		this.filterActive = this.filterActive.bind(this);
		this.filterCompleted = this.filterCompleted.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
	}

	changeStatus(item) {
		return () => {
			console.log('Change status of item');
			let index = this.state.todoList.indexOf(item);
			let todoList = this.state.todoList;

			this.setState({
				todoList: [
					...todoList.slice(0, index),
					{
						...item,
						isComplete: !item.isComplete
					},
					...todoList.slice(index + 1)
				]
			})
		}
	}

	deleteItem(index) {
		return () => {
			console.log('Delete an item');
			let todoList = this.state.todoList;
			todoList.splice(index, 1);

			this.setState({ todoList: todoList });
		}
	}

	addNewItem(event) {
		if(event.keyCode === 13) {
			console.log('Add new item to todoList');
			let text = event.target.value;
			text = text.trim();

			if(text.length !== 0) {
				this.setState({
					newItem: '',
					todoList: [
						...this.state.todoList,
						{
							title: text,
							isComplete: false
						}
					]
				});
			}
		}
	}

	newItemChange(event) {
		this.setState({ newItem: event.target.value });
	}
	
	allItemClick() {
		let hasItemNotComplete = !this.state.todoList.every((item) => {
			return item.isComplete;
		});

		if(hasItemNotComplete) {
			this.checkAllItem();
		} else {
			this.uncheckAllItem();
		}
	}

	checkAllItem() {
		let todoList = this.state.todoList;
		todoList = todoList.map((item) => {
			return {...item, isComplete: true};
		});

		this.setState({ todoList: todoList });
	}

	uncheckAllItem() {
		let todoList = this.state.todoList;
		todoList = todoList.map((item) => {
			return {...item, isComplete: false};
		});

		this.setState({ todoList: todoList });
	}

	filterItem() {
		let { selected } = this.state;
		
		switch(selected) {
			case 'active':
				return this.activeItem();
			case 'completed':
				return this.completedItem();
			default:
				return this.state.todoList;
		}
	}

	activeItem() {
		return this.state.todoList.filter((item) => {
			return !item.isComplete;
		});
	}

	completedItem() {
		return this.state.todoList.filter((item) => {
			return item.isComplete;
		});
	}

	filterAll() {
		this.setState({ selected: 'all' });
	}
	
	filterActive() {
		this.setState({ selected: 'active' });
	}

	filterCompleted() {
		this.setState({ selected: 'completed' });
	}

	clearCompleted() {
		this.setState({ todoList: this.activeItem() });
	}

	render() {
		const { newItem } = this.state;
		const filter = this.filterItem();
		const counter = this.activeItem().length;

		return (
			<div className="app">
				<ListGroup>
					<ListGroupItem>
						<Header
							addNewItem={this.addNewItem}
							newItemChange={this.newItemChange}
							allItemClick={this.allItemClick}
							newItem={newItem} />
					</ListGroupItem>
					{
						filter.map((item, index) => (
							<ListGroupItem key={index} >
								<ListItem
									item={item}
									onClick={this.changeStatus(item)} />
								<img
									src={close}
									alt=''
									onClick={this.deleteItem(index)} />
							</ListGroupItem>
						))
					}
					<ListGroupItem>
						<Footer
							counter={counter}
							selected={this.state.selected}
							filterAll={this.filterAll}
							filterActive={this.filterActive}
							filterCompleted={this.filterCompleted}
							clearCompleted={this.clearCompleted} />
					</ListGroupItem>
				</ListGroup>
			</div>
		);
	}
}

export default App;
