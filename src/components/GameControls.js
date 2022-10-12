import React from 'react'; // eslint-disable-line no-unused-vars

const GameControls = (props) => {
  return (<div>

    <label htmlFor="width"><i className="fas fa-arrows-h"></i></label>
    <input name="width" onChange={props.onChange} value={props.width} id="boardWidth" type="number" min="3"/>
    <label htmlFor="height"><i className="fas fa-arrows-v"></i></label>
    <input name="height" onChange={props.onChange} value={props.height} id="boardHeight" type="number" min="3"/>
    <label htmlFor="delay"><i className="fas fa-stopwatch"></i> in ms</label>
    <input name="updateDelay" onChange={props.onChange} value={props.delay} id="delay" step="100" type="number" min="0"/>
    <label htmlFor="chance"><i className="fas fa-random"></i>{' '}<i className="fas fa-percent"></i></label>
    <input name="chance" onChange={props.onAttribute} value={props.chance} id="chance" max="100" type="number" min="0"/>

    <br/>
    <br/>

    <label htmlFor="over">Death by overpopulation if neighbors {'>'} </label>
    <input name="over" onChange={props.onAttribute} value={props.over} id="over" max="8" type="number" min="0"/>
    <br/>
    <label htmlFor="under">Death by underpopulation if neighbors {'<'} </label>
    <input name="under" onChange={props.onAttribute} value={props.under} id="under" max="8" type="number" min="0"/>
    <br/>
    <label htmlFor="lazarus">Rebirth by reproduction if neighbors exactly equal </label>
    <input name="lazarus" onChange={props.onAttribute} value={props.lazarus} id="lazarus" max="8" type="number" min="0"/>
    <br/>
    <button name="setDefaultRules" onClick={props.onChange} type="button" id="setDefaultRules">Reset Default Rules</button>

    <br/>
    <br/>

    <button name="startAgain" className="fas fa-random" onClick={props.onChange} type="button" id="startAgain"></button>
    <button name="playPause" className={props.shouldIterate === true ? 'fas fa-stop' : 'fas fa-play'} onClick={props.onChange} type="button" id="playPause"></button>
    <button name="step1" className="fas fa-step-forward" onClick={props.onChange} type="button" id="step1"></button>
    <button name="clearBoard" className="fas fa-eraser" onClick={props.onChange} type="button" id="clearBoard"></button>

  </div>);
};

export default GameControls;
