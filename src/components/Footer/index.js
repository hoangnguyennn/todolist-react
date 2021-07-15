import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

import { FILTER_TYPES } from '../../constants';

const Footer = ({
  counter,
  selected,
  filterAll,
  filterActive,
  filterCompleted,
  clearCompleted,
}) => {
  return (
    <div className="footer">
      <span className="todo-count">
        <span className="counter">{counter}</span>
        <span className="item">{counter < 2 ? 'item' : 'items'}</span>
        <span className="left">left</span>
      </span>
      <ul className="filter">
        <li
          className={classnames('all', {
            selected: selected === FILTER_TYPES.ALL,
          })}
          onClick={filterAll}
        >
          All
        </li>
        <li
          className={classnames('active', {
            selected: selected === FILTER_TYPES.ACTIVE,
          })}
          onClick={filterActive}
        >
          Active
        </li>
        <li
          className={classnames('completed', {
            selected: selected === FILTER_TYPES.COMPLETED,
          })}
          onClick={filterCompleted}
        >
          Completed
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

Footer.propTypes = {
  counter: PropTypes.number,
  selected: PropTypes.string,
  filterAll: PropTypes.func,
  filterActive: PropTypes.func,
  filterCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
