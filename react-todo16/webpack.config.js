'use strict';
var path=require('path');

module.exports={
    entry:[
        "./src/entry.js"
    ],
    devtool: 'source-map',
    output: {                                  //输出文件
        path: path.join(__dirname, 'out'),
        publicPath: './out/',
        filename: "bundle.js"
    },
    externals: {
        'react': 'React'              //这个属性是告诉webpack当遇到require('react')的时候，不去处理并且默认为全局的React变量。这样子，我们就需要在index.html单独用src去加载js。    
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: "style!css"},
            { test: /\.scss$/, loader: "style!css!sass"},
            { test: /\.svg$/, loader: "url?limit=8192"}
        ]
    }
}