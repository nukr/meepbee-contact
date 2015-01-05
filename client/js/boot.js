var React = require('react');
var MainApp = React.createFactory(require('./components/MainApp.jsx'));

// 啟動 root view 時要傳入假資料
React.render( MainApp(), document.getElementById('main') );
