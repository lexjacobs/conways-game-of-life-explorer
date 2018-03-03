import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import GameControls from './GameControls';
import Gameboard from './Gameboard';
import NudgeControls from './NudgeControls';
import {arrayFromWidthHeightWeight} from '../helpers/boardMethods.js';

export default connect(mapPropsToState, mapDispatchToProps)(class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      shouldIterate: true,
      iterationDelay: 200
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleNudge = this.handleNudge.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.updateNumericalAttribute = this.updateNumericalAttribute.bind(this);
  }
  componentDidMount() {
    var timer = setInterval(() => {
      if (this.state.shouldIterate) {
        this.props.iterateBoard();
      }
    }, this.state.iterationDelay);
    this.setState({
      timer
    });
    this.resetBoard();
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  resetBoard() {
    this.props.setBoard(arrayFromWidthHeightWeight(this.props.width, this.props.height, this.props.chance));
  }
  updateNumericalAttribute(e) {
    this.props.updateNumericalAttribute(e.target.name, e.target.value);
  }
  handleCellClick(e) {
    let cell = e.target.getAttribute('data-num');
    e.preventDefault();
    // in the case of clicking the grid itself
    if (cell === null) {
      return;
    }
    this.props.flipCell(cell);
  }
  handleNudge(e) {
    this.props.nudgeBoard(e.target.value);
  }
  handleChange(e) {
    if (e.target.name === 'width') {
      this.props.setWidth(+e.target.value);
    }
    if (e.target.name === 'height') {
      this.props.setHeight(+e.target.value);
    }
    if (e.target.name === 'startAgain') {
      this.resetBoard();
    }
    if (e.target.name === 'setDefaultRules') {
      this.props.setDefaultRules();
    }
    if (e.target.name === 'clearBoard') {
      this.props.setBoard(arrayFromWidthHeightWeight(this.props.width, this.props.height, 0));
    }
    if (e.target.name === 'updateDelay') {

      this.setState({iterationDelay: +e.target.value}, () => {
        clearInterval(this.state.timer);
        var timer = setInterval(() => {
          if (this.state.shouldIterate) {
            this.props.iterateBoard();
          }
        }, this.state.iterationDelay);
        this.setState({
          timer
        });
      });

    }
    if (e.target.name === 'playPause') {
      this.setState({
        shouldIterate: !this.state.shouldIterate
      });
    }
    if (e.target.name === 'step1') {
      this.props.iterateBoard();
    }
    e.preventDefault();
  }

  render() {
    return ( <div className='GameContainer'>

      <a href='https://github.com/lexjacobs/conways-game-of-life-explorer'><img style={{position: 'absolute', top: 0, right: 0, border: 0, width: '10%', height: 'auto'}} src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png' alt='Fork me on GitHub'/></a>

      <GameControls width={this.props.width} height={this.props.height} onAttribute={this.updateNumericalAttribute} onChange={this.handleChange} delay={this.state.iterationDelay} chance={this.props.chance} over={this.props.over} under={this.props.under} lazarus={this.props.lazarus}/>
      <NudgeControls onClick={this.handleNudge}/>
      <Gameboard height={+this.props.height} width={+this.props.width} board={this.props.board} onClick={this.handleCellClick}/>
    </div>
    );
  }

});

function mapPropsToState(state) {
  return state.boardState;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actions), dispatch);
}
