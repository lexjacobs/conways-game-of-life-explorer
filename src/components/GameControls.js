import React from 'react'; // eslint-disable-line no-unused-vars
// import './gameControls.css';

const GameControls = (props) => {
  return (<div>

    <form>
      <label htmlFor="width">width</label>
      <input name="width" onChange={props.onChange} value={props.width} id="boardWidth" type="number" min="3"/>
      <label htmlFor="height">height</label>
      <input name="height" onChange={props.onChange} value={props.height} id="boardHeight" type="number" min="3"/>
      <button name="startAgain" onClick={props.onChange} type="button" id="startAgain">Start Again</button>
    </form>

  </div>);
};

export default GameControls;
