17.1.8
1. 用webpack+bable+react搭建环境
2. 基于上面的环境写了一个增删的demo
3. 学会使用React Devtools调试工具进行react调试


遇到的问题：
###### 1.  ./component/App.js   加载模块出问题
    1. node_modules/localDb/index.js文件有问题
    2. 新建一个对象时，对象名称应该首字母大写，例如this.db = new LocalDb('React-Todos');
    3. pakeage.json 加载的模块有问题。有些不用加载 （主要问题还是1和2）
###### 2. this.setState({ todos: this.state.todos, isAllChecked });
    1. 只有setState()函数才能自动调用render函数，渲染ui洁面；
    2. this.state.todos.push(todoItem);会改变todos,但是不会自动调用render函数，渲染ui界面
###### 3. 一旦数据增加和删除，都应该记得修改数据库
     this.db.set('todos', this.state.todos); 
###### 4.  todoDoneCount: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0
    1. 逻辑与和逻辑或只有当在if语句中时，返回的才是布尔类型，在其他情况下，其实相当于条件语句
    2. 例如：var a=3||4;    //结果a=3.  (短路运算)
    3. 例如：var a=2&&3;  //结果a=3   （前面为真，才会走后面，相当于if语句，为真时走后面）
###### 5. 导出组件的两种方式
    1. class TodoHeader extends React.Component {}    export default TodoHeader;
    2. export default class TodoItem extends React.Component{}
###### 6. 最外层父组件
    1. class App extends React.Component {}    
    2. React.render(<App/>, document.getElementById("app"));
###### 7. 组件
    1. 父组件：管理和控制数据
    2. 子组件：显示和操作数据
###### 8. state和props的区别
    1. State：控制组件内部的数据——————（变化的）———（类似标志位）
    2. Props：控制外部对内部传递的数据———（不变化的）———（类似自定义属性）
    3. 解释：对于父组件来说，要存储todoList的数据，那就是内部信息，要用state来存储；而如果父组件要将todolist数据传递给子组件，对子组件来说，那就是传递来的外部信息
###### 9. 新学到的函数
    1. filter():filter方法会创建一个新数组，新数组的元素是符合条件的元素，此处return true---->todo.isDone=false;就是符合条件的, 未完成的就是filter新生成的数组
        1. let todos = this.state.todos.filter(todo => !todo.isDone);
    2. every():// every()是用来测试数组中的每一项是否满足条件 当所有的项都满足条件时返回true
        1. if (this.state.todos.every((todo) => todo.isDone)) {isAllChecked = true;}
###### 10. React里面写样式
    1. <span style={doneStyle}>{this.props.text}</span>
    2.  <button ref="deleteBtn" onClick={this.handlerDelete.bind(this)} style={{'display':'none'}} className='fr'>删除</button>
    3. 类名要用className
###### 11. 获取真实的dom节点，要使用ref属性
    1. <button ref="deleteBtn" onClick={this.handlerDelete.bind(this)} style={{'display':'none'}} className='fr'>删除</button>
    2. React.findDOMNode(this.refs.deleteBtn).style.display='inline';
###### 12. 扩展运算符的使用：
    var props = {todoCount: this.state.todos.length || 0, todoDoneCount: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0}
    1. 下面两句话等价
        <TodoFooter {...props} /> // spread操作符
        <TodoFooter todoCount={props.todoCount} todoDoneCount={props.todoDoneCount} />
###### 13. React Developer Tools不能使用时，解决办法：设置-扩展程序-react-devtools-允许访问文件地址-前面☑️



参考文献：
1. [React-Todos入门例子](http://www.reqianduan.com/2297.html)
2. [使用React并做一个简单的to-do-list](http://www.cnblogs.com/wangfupeng1988/p/5302738.html)
3. [React创建组件的三种方式及其区别](http://www.cnblogs.com/wonyun/p/5930333.html)
4. [从头创建一个基于 React, webpack, babel 的模板项目](http://blog.csdn.net/sinat_17775997/article/details/52592772)
5. [React Developer Tools调试工具](https://github.com/facebook/react-devtools)
6. [ZSN分享的webpack搭建react项目环境一](http://note.youdao.com/noteshare?id=3731f492f309b37a59485c82fd86621f)