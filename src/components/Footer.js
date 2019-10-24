import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Footer.css';

class Footer extends Component {
    render() {
        const { counter,
            selected,
            filterAll,
            filterActive,
            filterCompleted,
            clearCompleted } = this.props;
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
                            'selected': selected === 'all'
                        })}
                        onClick={filterAll} >
                        All
                    </li>
                    <li
                        className={classnames('active', {
                            'selected': selected === 'active'
                        })}
                        onClick={filterActive} >
                        Active
                    </li>
                    <li
                        className={classnames('completed', {
                            'selected': selected === 'completed'
                        })}
                        onClick={filterCompleted} >
                        Completed
                    </li>
                </ul>
                <button
                    className={classnames('clear-completed')}
                    onClick={clearCompleted} >
                    Clear completed
                </button>
            </div>
        )
    }
}

Footer.propTypes = {
    counter: PropTypes.number,
    selected: PropTypes.string,
    filterAll: PropTypes.func,
    filterActive: PropTypes.func,
    filterCompleted: PropTypes.func,
    clearCompleted: PropTypes.func
}

export default Footer;