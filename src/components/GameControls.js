import React from 'react'; // eslint-disable-line no-unused-vars
// import './gameControls.css';

const GameControls = (props) => {
  return (<div>

    <form>
      <label htmlFor="width">width</label>
      <input name="width" onChange={props.onChange} value={props.width} id="boardWidth" type="number" min="3"/>
      <label htmlFor="height">height</label>
      <input name="height" onChange={props.onChange} value={props.height} id="boardHeight" type="number" min="3"/>
      <label htmlFor="delay">Delay in ms</label>
      <input name="updateDelay" onChange={props.onChange} value={props.delay} id="delay" step="100" type="number" min="0"/>
      <label htmlFor="chance">Initial randomness in %</label>
      <input name="chance" onChange={props.onChange} value={props.chance} id="chance" max="100" type="number" min="0"/>

      <br/>

      <label htmlFor="over">Over</label>
      <input name="over" onChange={props.onChange} value={props.over} id="over" max="8" type="number" min="0"/>
      <label htmlFor="under">Under</label>
      <input name="under" onChange={props.onChange} value={props.under} id="under" max="8" type="number" min="0"/>
      <label htmlFor="lazarus">Lazarus</label>
      <input name="lazarus" onChange={props.onChange} value={props.lazarus} id="lazarus" max="8" type="number" min="0"/>
      <button name="setDefaultRules" onClick={props.onChange} type="button" id="setDefaultRules">Set Default Rules</button>

      <br/>

      <button name="startAgain" onClick={props.onChange} type="button" id="startAgain">Start Again</button>
      <button name="playPause" onClick={props.onChange} type="button" id="playPause">Play,Pause</button>
      <button name="step1" onClick={props.onChange} type="button" id="step1">Step Once</button>
    </form>

  </div>);
};

export default GameControls;
