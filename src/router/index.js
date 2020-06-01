import React from 'react';
import Loadable from "react-loadable";

const Loading = () => <div></div>;
const timeout = 1000;

//文件按需加载批处理
// 登陆页
export const Login = Loadable({
	loader: () => import("CONTAINERS/login/index"),
	loading: Loading,
	timeout: timeout
});
// pad考试中转页面
export const ExamWait = Loadable({
	loader: () => import("CONTAINERS/examWait/index"),
	loading: Loading,
	timeout: timeout
});
// test页面
export const Test = Loadable({
	loader: () => import("CONTAINERS/test/Test.jsx"),
	loading: Loading,
	timeout: timeout
});
// TS的test页面
export const TsTest = Loadable({
	loader: () => import("CONTAINERS/tsTest/TsTest.tsx"),
	loading: Loading,
	timeout: timeout
});
// 棋盘页面
export const Board = Loadable({
    loader: () => import("COMPONENTS/Board/index.jsx"),
    loading: Loading,
    timeout: timeout,
});
// 技术胖博客页面
export const JSPang = Loadable({
    loader: () => import("COMPONENTS/JSPang/index.jsx"),
    loading: Loading,
    timeout: timeout,
});
// 高德地图组件
export const MapDemo = Loadable({
    loader: () => import("COMPONENTS/MapDemo/index.jsx"),
    loading: Loading,
    timeout: timeout,
});