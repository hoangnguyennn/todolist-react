import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.css';

import checkAll from '../imgs/check-all.svg';

class TopSearch extends Component {
	constructor(props) {
		super(props);

		this.inputElement = React.createRef();
	}

	componentDidMount() {
		this.inputElement.current.focus();
	}

	render() {
		let { addNewItem, newItemChange, allItemClick, newItem } = this.props;
		return (
			<div className="top-search">
				<img src={checkAll} alt="" onClick={allItemClick} />
				<input
					type="text"
					placeholder="Điều gì bạn muốn làm?"
					value={newItem}
					onChange={newItemChange}
					onKeyUp={addNewItem}
					ref={this.inputElement}
				/>
			</div>
		);
	}
}

TopSearch.propTypes = {
	addNewItem: PropTypes.func,
	newItemChange: PropTypes.func,
	allItemClick: PropTypes.func,
	newItem: PropTypes.string,
};

export default TopSearch;
