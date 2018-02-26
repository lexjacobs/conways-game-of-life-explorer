import React from 'react'; // eslint-disable-line no-unused-vars
import './gameboard.css';

const Gameboard = (props) => {
  const gridStyle = {
    width: '500px',
    height: '500px',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '3px',
  };

  const cells = props.board.map((x,i) => {
    return(
      <div key={i} className={x.getValue() === 0 ? 'cellOff' : 'cellOn'}></div>
    );
  });

  return (<div style={gridStyle} className="grid">{cells}</div>);
};

export default Gameboard;
