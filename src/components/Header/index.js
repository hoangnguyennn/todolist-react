import { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import checkAll from '../../assets/images/check-all.svg';

const inputRef = createRef();

const Header = ({ addNewItem, newTodoTitleChange, allItemClick, newItem }) => {
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="top-search">
      <img src={checkAll} alt="" onClick={allItemClick} />
      <input
        type="text"
        placeholder="Điều gì bạn muốn làm?"
        value={newItem}
        onChange={newTodoTitleChange}
        onKeyUp={addNewItem}
        ref={inputRef}
      />
    </div>
  );
};

Header.propTypes = {
  addNewItem: PropTypes.func,
  newTodoTitleChange: PropTypes.func,
  allItemClick: PropTypes.func,
  newItem: PropTypes.string,
};

export default Header;
