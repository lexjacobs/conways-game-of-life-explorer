import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import {createBoard} from '../boardMethods';
import Gameboard from './Gameboard';

export default connect(mapPropsToState, mapDispatchToProps)(class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }
  componentDidMount() {
    console.log('GameContainer mounted');
    var timer = setInterval(() => {
      // this.props.setPreviousBoard();
      this.props.iterateBoard();
    }, 100);
    this.setState({
      timer
    });
    // this.props.setBoard([0,1,2]);
    this.props.setBoard([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    // this.props.setBoard(createBoard(this.props.width, this.props.height, 60));
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  render() {
    return ( <div className="GameContainer">
      <Gameboard board={this.props.board}/>
      hello there
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
