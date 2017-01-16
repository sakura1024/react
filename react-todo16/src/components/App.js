'use strict';
import React from "react";
import LocalDb from "localDb"; //加载的本地数据库(自己写的)

import TodoHeader from "./TodoHeader.js";
import TodoMain from "./TodoMain.js";
import TodoFooter from "./TodoFooter.js";


class App extends React.Component {
    constructor() {
        super();
        this.db = new LocalDb('React-Todos');
        this.state = {
            todos: this.db.get('todos') || [],
            isAllChecked: false
        };
    }

    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });

    }

    //添加任务 传给Header组件
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.allChecked();
        this.db.set('todos', this.state.todos);
    }

    // 改变任务状态，传递给TodoItem和TodoFooter组件的方法
    changeTodoState(index,isDone,isAllChecked=false){
        if(isAllChecked){
            this.setState({ 
                todos: this.state.todos.map(todo=>{
                    todo.isDone=isDone;
                    return todo;
                }), 
                isAllChecked :isDone
        });
        }else{
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }

    //清除已完成的任务，传递给Footer组件的方法
    clearDone(){
        let todos=this.state.todos.filter(todo=>!todo.isDone);  //f返回的都是未完成的
        this.setState({todos:todos,isAllChecked:false});
        this.db.set('todos',this.state.todos);   //等价 this.setState({ todos: this.state.todos });
    }

     //删除当前的任务，传递给todoItem组件的方法
    deleteTodo(index) {
        this.state.todos.splice(index,1);
        this.setState({todos:this.state.todos});
        this.allChecked();   
        this.db.set('todos',this.state.todos);
    }

    //修改当前的任务，传递给todoItem组件的方法
    modifyTodo(index) {
        var isDone=this.state.todos[index].isDone;
        var value=prompt("请修改您的任务","第n条记录");

        var modifyItem={
            text: value,
            isDone:isDone
        }
        if(value){
            this.state.todos.splice(index,1,modifyItem);
            this.setState({todos:this.state.todos});
            this.db.set('todos',this.state.todos); 
        }
         
    }

    render(){
        var props={
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0
        }
        return (
            <div className="panel">
               <TodoHeader addTodo={this.addTodo.bind(this)}/>
               <TodoMain modifyTodo={this.modifyTodo.bind(this)} deleteTodo={this.deleteTodo.bind(this)} todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)}/>
               <TodoFooter isAllChecked={this.state.isAllChecked} {...props} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
            </div>
        )
    }
}
React.render(<App/>, document.getElementById("app"));

