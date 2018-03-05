import React from 'react'; // eslint-disable-line no-unused-vars
// import './gameControls.css';

const GameControls = (props) => {
  return (<div>

    <label htmlFor="width">width</label>
    <input name="width" onChange={props.onChange} value={props.width} id="boardWidth" type="number" min="3"/>
    <label htmlFor="height">height</label>
    <input name="height" onChange={props.onChange} value={props.height} id="boardHeight" type="number" min="3"/>
    <label htmlFor="delay">Delay in ms</label>
    <input name="updateDelay" onChange={props.onChange} value={props.delay} id="delay" step="100" type="number" min="0"/>
    <label htmlFor="chance">Initial randomness in %</label>
    <input name="chance" onChange={props.onAttribute} value={props.chance} id="chance" max="100" type="number" min="0"/>

    <br/>
    <br/>

    <label htmlFor="over">Death by overpopulation if neighbors {'>'} </label>
    <input name="over" onChange={props.onAttribute} value={props.over} id="over" max="8" type="number" min="0"/>
    <br/>
    <label htmlFor="under">Death by underpopulation if neighbors {'<'} </label>
    <input name="under" onChange={props.onAttribute} value={props.under} id="under" max="8" type="number" min="0"/>
    <br/>
    <label htmlFor="lazarus">Rebirth by reproduction if neighbors == </label>
    <input name="lazarus" onChange={props.onAttribute} value={props.lazarus} id="lazarus" max="8" type="number" min="0"/>
    <br/>
    <button name="setDefaultRules" onClick={props.onChange} type="button" id="setDefaultRules">Reset Default Rules</button>

    <br/>
    <br/>

    <button name="startAgain" onClick={props.onChange} type="button" id="startAgain">Randomize Board</button>
    <button name="playPause" onClick={props.onChange} type="button" id="playPause">{props.shouldIterate === true ? 'Stop Iteration' : 'Start Iteration'}</button>
    <button name="step1" onClick={props.onChange} type="button" id="step1">Step Once</button>
    <button name="clearBoard" onClick={props.onChange} type="button" id="clearBoard">Clear Board</button>

  </div>);
};

export default GameControls;
