import React from 'react'; // eslint-disable-line no-unused-vars
import './gameboard.css';

const Gameboard = (props) => {

  const cells = props.board.map((x,i) => {
    return(
      <div key={i} className={x === 0 ? 'cellOff' : 'cellOn'}></div>
    );
  });

  return (<div className="grid">{cells}</div>);
};

export default Gameboard;
