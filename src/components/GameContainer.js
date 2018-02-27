import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import GameControls from './GameControls';
import Gameboard from './Gameboard';
import {initializeBoard} from '../helpers/boardMethods.js';

export default connect(mapPropsToState, mapDispatchToProps)(class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      shouldIterate: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }
  componentDidMount() {
    var timer = setInterval(() => {
      if (this.state.shouldIterate) {
        this.props.iterateBoard();
      }
    }, 250);
    this.setState({
      timer
    });
    // this.props.setBoard([
    //   0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 1, 1, 0, 0, 0, 0,
    //   0, 1, 1, 0, 0, 0, 0, 0,
    //   0, 0, 1, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0,
    //   0, 0, 0, 0, 0, 0, 0, 0,
    // ]);
    this.props.setBoard([
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    // this.props.setBoard([
    //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    // ]);
    // this.props.setBoard(initializeBoard(this.props.width, this.props.height, 50));
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  resetBoard() {
    this.props.setBoard(initializeBoard(this.props.width, this.props.height, 50));
  }
  handleChange(e) {
    if (e.target.name === 'width') {
      this.props.setWidth(+e.target.value);
      this.resetBoard();
    }
    if (e.target.name === 'height') {
      this.props.setHeight(+e.target.value);
      this.resetBoard();
    }
    if (e.target.name === 'startAgain') {
      this.resetBoard();
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
    return ( <div className="GameContainer">
      <GameControls width={this.props.width} height={this.props.height} onChange={this.handleChange}/>
      <Gameboard height={+this.props.height} width={+this.props.width} board={this.props.board}/>
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
