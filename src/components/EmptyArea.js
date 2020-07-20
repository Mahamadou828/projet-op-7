import React from 'react';
import PropTypes from 'prop-types';
import ramdomNumber from '../function/ramdomNumber';

export default function EmptyArea() {
  const renderLi = () => {
    const li = [];
    for (let i = 0; i < 10; i++) {
      li.push(<li key={ramdomNumber()} />);
    }
    return li;
  };
  return (
    <div className="area">
      <ul className="circles">{renderLi()}</ul>
    </div>
  );
}
EmptyArea.propTypes = {
  text: PropTypes.string.isRequired,
};
