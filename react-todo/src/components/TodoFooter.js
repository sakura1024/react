'use strict';
import React from "react";
export default class TodoFooter extends React.Component{

    //处理全选与全部选的状态
    handlerAllState(event){
        this.props.changeTodoState(null,event.target.checked,true);
    }

    //绑定点击事件，清除已完成
    handlerClick(){
        this.props.clearDone();
    }

    render(){
        return (
            <div className='clearfix todo-footer'>
                <input checked={this.props.isAllChecked} onChange={this.handlerAllState.bind(this)} type="checkbox" className='fl'/>
                <span className="fl">{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</span>
                <button onClick={this.handlerClick.bind(this)} className="fr">清除已完成</button>
            </div>
        )
    }
}