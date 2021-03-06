/**
 * Created by kexiao on 17/3/9.
 */
import React,{PropTypes} from "react";
import {connect} from "react-redux";
import PickArea from "../components/PickArea";
import KTabs from "../components/KTabs";
import {bindActionCreators} from "redux";
import {browserHistory} from 'react-router'

import {getValidMatches} from '../util/MatchUtil'

import * as actions from "../actions";

class Bet extends React.PureComponent {


    static propTypes={
        matches:PropTypes.array.isRequired
    }


    continueToMatch(){
        browserHistory.push('/match')
    }


    clearItem=(id)=>{
        const {actions} = this.props;
        actions.clearItem(id);

    }


    render() {

        const {matches, actions} = this.props;

        let validMatches = getValidMatches(matches);
        let matchCount = validMatches.length;

        if(matchCount<1){
            this.continueToMatch();
        }
        return (
        <div className="slideLeft">
            <div className="bg_f5">
                <div className="tac addGames fs24" onClick={this.continueToMatch}>
                    <i className="iconfont fs24">&#xe60e;</i> 继续添加比赛（已选择<span className="red">{matchCount}</span>场赛事）
                </div>
                <KTabs matches={matches} addItem={actions.addItem} clearItem={(id)=>this.clearItem(id)}/>
            </div>
            <PickArea/>
        </div>
    )
    }

}

const mapStateToDispatch = (state) => ({
    matches: getValidMatches(state.matches)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToDispatch, mapDispatchToProps)(Bet)
