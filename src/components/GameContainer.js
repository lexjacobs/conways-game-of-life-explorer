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
      shouldIterate: true,
      iterationDelay: 200
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);
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
    this.props.setBoard(initializeBoard(this.props.width, this.props.height, this.props.chance));
  }
  updateAttribute(e) {
    this.props.updateAttribute(e.target.name, e.target.value);
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
    return ( <div className="GameContainer">
      <GameControls width={this.props.width} height={this.props.height} onAttribute={this.updateAttribute} onChange={this.handleChange} delay={this.state.iterationDelay} chance={this.props.chance} over={this.props.over} under={this.props.under} lazarus={this.props.lazarus}/>
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
