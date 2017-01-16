package.json是执行npm init之后自动生成的
out/bundel.js是执行webpack之后自动生成的


src是源码
entry.js是入口，里面要引入相应的css样式和总组件js
out/bundel.js是出口
webpack.config.js是配置哪个文件是出口，那个是入口



###### 14. 给todolist增加了修改功能

```
//修改当前的任务，传递给todoItem组件的方法
    modifyTodo(index) {
        var isDone=this.state.todos[index].isDone;
        var value=prompt("请修改您的任务","第n条记录");

        var modifyItem={
            text: value,
            isDone:isDone
        }
        
        this.state.todos.splice(index,1,modifyItem);
        this.setState({todos:this.state.todos});
        this.db.set('todos',this.state.todos); 
    }
```

>  出现的问题：当点击弹框取消按钮时，原有记录为空，修改后的代码：

```
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
```

