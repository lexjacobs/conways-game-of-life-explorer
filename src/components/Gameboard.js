import React from 'react'; // eslint-disable-line no-unused-vars
import './gameboard.css';

const Gameboard = (props) => {
  const gridStyle = {
    width: '10px',
    height: '10px',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.width}, 1fr)`,
    gridGap: '0px'
  };
  const cellStyle = {
    width: '10px',
    height: '10px',
    boxSizing: 'borderBox',
    border: '1px solid rgba(0, 0, 0, .3)',
    color: '#eee'
  };

  // refactor from higher order function for speed
  const cells = [];
  for (var i = 0; i < props.board.length; i++) {
    let x = props.board[i];
    cells.push(<div style={cellStyle} data-num={i} key={i} className={x === 0 ? 'cellOff' : 'cellOn'}></div>
    );
  }

  return (<div onClick={props.onClick} style={gridStyle} className="grid">{cells}</div>);
};

export default Gameboard;
