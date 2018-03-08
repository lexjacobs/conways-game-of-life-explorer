import React from 'react'; // eslint-disable-line no-unused-vars

const NudgeControls = (props) => {
  return (<div>
    <button type="button" onClick={props.onClick} className="moveUp fas fa-arrow-alt-up" value="up"></button>
    <button type="button" onClick={props.onClick} className="moveDown fas fa-arrow-alt-down" value="down"></button>
    <button type="button" onClick={props.onClick} className="moveLeft fas fa-arrow-alt-left" value="left"></button>
    <button type="button" onClick={props.onClick} className="moveRight fas fa-arrow-alt-right" value="right"></button>
  </div>);
};

export default NudgeControls;
