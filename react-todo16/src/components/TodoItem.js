'use strict';
export default class TodoItem extends React.Component{


    //处理任务是否完成状态
    handlerChange(){
        let isDone=!this.props.isDone;
        this.props.changeTodoState(this.props.index,isDone);
    }

    //鼠标移入
    handlerMouseOver(){
        React.findDOMNode(this.refs.deleteBtn).style.display='inline';
        React.findDOMNode(this.refs.modifyBtn).style.display='inline';
    }

    //鼠标移出
    handlerMouseOut(){
        React.findDOMNode(this.refs.deleteBtn).style.display='none';
        React.findDOMNode(this.refs.modifyBtn).style.display='none';
    }

    //删除当前任务
    handlerDelete(){
        this.props.deleteTodo(this.props.index);
    }

    //修改当前任务
    handlerModify(){
        this.props.modifyTodo(this.props.index);
    }

    render(){
        let doneStyle=this.props.isDone?{textDecoration: 'line-through'}:{textDecoration: 'none'};
        
        return (
            <li onMouseOver={this.handlerMouseOver.bind(this)}
                onMouseOut={this.handlerMouseOut.bind(this)}
            >
                <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
                <span style={doneStyle}>{this.props.text}</span>
                <button ref="deleteBtn" onClick={this.handlerDelete.bind(this)} style={{'display':'none'}} className='fr'>删除</button>
                <button ref="modifyBtn" onClick={this.handlerModify.bind(this)} style={{'display':'none'}} className='fr'>修改</button>
            </li>
        )
    }
}