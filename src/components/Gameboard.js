import React from 'react'; // eslint-disable-line no-unused-vars
import './gameboard.css';

const Gameboard = (props) => {
  const gridStyle = {
    width: '10px',
    height: '10px',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '1px'
  };
  const cellStyle = {
    width: '10px',
    height: '10px',
    boxSizing: 'borderBox',
    border: '1px solid rgba(0, 0, 0, .3)',
    color: '#eee'
  };

  const cells = props.board.map((x,i) => {
    return(
      <div style={cellStyle} key={i} className={x.getValue() === 0 ? 'cellOff' : 'cellOn'}></div>
    );
  });

  return (<div style={gridStyle} className="grid">{cells}</div>);
};

export default Gameboard;
