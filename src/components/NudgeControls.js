import React from 'react'; // eslint-disable-line no-unused-vars
// import './gameControls.css';

const NudgeControls = (props) => {
  return (<div>
    <button type="button" onClick={props.onClick} className="moveUp" value="up">nudge up</button>
    <button type="button" onClick={props.onClick} className="moveDown" value="down">nudge down</button>
    <button type="button" onClick={props.onClick} className="moveLeft" value="left">nudge left</button>
    <button type="button" onClick={props.onClick} className="moveRight" value="right">nudge right</button>
  </div>);
};

export default NudgeControls;
