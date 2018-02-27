import React from 'react'; // eslint-disable-line no-unused-vars
import './gameboard.css';

const Gameboard = (props) => {
  const gridStyle = {
    width: '10px',
    height: '10px',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '2px'
  };

  const cells = props.board.map((x,i) => {
    return(
      <div key={i} className={x.getValue() === 0 ? 'cellOff' : 'cellOn'}></div>
    );
  });

  return (<div style={gridStyle} className="grid">{cells}</div>);
};

export default Gameboard;
