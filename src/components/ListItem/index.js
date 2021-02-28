import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

import check from '../../assets/images/check.svg';
import checked from '../../assets/images/checked.svg';

const ListItem = ({ item, changeTodoStatus }) => {
	const img = item.isCompleted ? checked : check;

	return (
		<div
			className={classnames('item', {
				'item-complete': item.isCompleted,
			})}
		>
			<img src={img} alt="" onClick={changeTodoStatus} />
			<div>{item.title}</div>
		</div>
	);
};

ListItem.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		isCompleted: PropTypes.bool,
	}),
	changeTodoStatus: PropTypes.func,
};

export default ListItem;
