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
        if (this.state.todos.every((todo) => todo.isDone)) { // every()是用来测试数组中的每一项是否满足条件 当所有的项都满足条件时返回true
            isAllChecked = true;
        }
        this.setState({ todos: this.state.todos, isAllChecked });
    }

    // 添加任务，是传递给Header组件的方法
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.allChecked();
        this.db.set('todos', this.state.todos); 
    }

    // 改变任务状态，传递给TodoItem和TodoFooter组件的方法
    changeTodoState(index, isDone, isChangeAll = false) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;    //????
                }),
                isAllChecked: isDone
            });
        } else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }

    //清除已完成的任务，传递给Footer组件的方法
    clearDone() {                                                 //filter 未完成的就是filter新生成的数组
        let todos = this.state.todos.filter(todo => !todo.isDone); //filter方法会创建一个新数组，新数组的元素是符合条件的元素，此处return true---->todo.isDone=false;就是符合条件的
        this.setState({
            todos: todos,
            isAllChecked: false //剩下的全是未完成未选中的
        });
        this.db.set('todos', todos);
    }

    //删除当前的任务，传递给todoItem组件的方法
    deleteTodo(index) {
        this.state.todos.splice(index, 1); //todos数组中从下标为index的位置删除一个数组元素
        this.setState({ todos: this.state.todos }); 
        this.db.set('todos', this.state.todos);
    }

    render(){
        var props = {
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0
        };
        return (
            <div className="panel">
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain deleteTodo={this.deleteTodo.bind(this)} todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)}/>
                <TodoFooter isAllChecked={this.state.isAllChecked} clearDone={this.clearDone.bind(this)} {...props} changeTodoState={this.changeTodoState.bind(this)}/>
            </div>
        )
    }
}
React.render(<App/>, document.getElementById("app"));




