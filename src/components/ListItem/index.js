import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

import check from '../../imgs/check.svg';
import checked from '../../imgs/checked.svg';

const ListItem = ({ item, onClick }) => {
	const img = item.isCompleted ? checked : check;

	return (
		<div
			className={classnames('item', {
				'item-complete': item.isCompleted,
			})}
		>
			<img src={img} alt="" onClick={onClick} />
			<div>{item.title}</div>
		</div>
	);
};

ListItem.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		isCompleted: PropTypes.bool,
	}),
	onClick: PropTypes.func,
};

export default ListItem;
