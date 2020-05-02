mkdir react_workspace
cd react_workspace
mkdir -p src/js
npm init

npm install --save-dev webpack webpack-cli webpack-dev-server
npm install -g webpack webpack-cli
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

npm install --save-dev react react-dom
npm install -S react-router-dom
npm install -S react-bootstrap
npm install axios --save
npm install -S styled-components

react_workspace/webpack.config.js 作成
src/index.html 作成
src/js/client.js 作成

package.json に "start": "webpack-dev-server --content-base src --mode development --inline", 追記

npm start で起動



MySQLセットアップ
brew install mysql

CREATE TABLE user_data (
    email varchar(255) unique,
    name varchar(50),
    password varchar(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


react基礎
https://qiita.com/TsutomuNakamura/items/72d8cf9f07a5a30be048
APIコール
https://qiita.com/gcyagyu/items/4d186df2e90c53228951