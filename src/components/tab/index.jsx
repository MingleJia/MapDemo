import React, { Component } from 'react';
import styles from './index.scss';
// import { home, attendance, studentStyle, campusStyle, personalCenter } from 'ASSETS/tab';
import { home, attendance, newIconAttendance, newIconSchool, newTeacherAttendance } from 'ASSETS/tab';
import indexMoreIcon from '../../assets/indexMore/indexMoreicon.png';
import { NavLink } from 'react-router-dom'
import axios from 'UTILS/axios';
// const dic = {
//     '首页': {
//         to: '/home',
//         src: home,
//         title: '首页'
//     },
//     '考勤': {
//         to: '/campusstyle',
//         src: attendance,
//         title: '考勤'22
//     },
//     '学生风采': {
//         to: '/campusStyle',
//         src: studentStyle,
//         title: '学生风采'
//     },
//     '校园风采': {
//         to: '/campusStyle',
//         src: campusStyle,
//         title: '校园风采'
//     },
//     '个人中心': {
//         to: '/campusStyle',
//         src: personalCenter,
//         title: '个人中心'
//     },
// }
const defaultTab = [
    {
        "base_name": "首页",
        "url": "/home",
        "icon": home
    },
    // {
    //     "base_name": "校园风采",
    //     "url": "/campusStyle",
    //     "icon": campusStyle
    // },
    // {
    //     "base_name": "学生风采",
    //     "url": "/studentsStyle",
    //     "icon": studentStyle
    // },
]
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: JSON.parse(window.localStorage.getItem('tabList')) || defaultTab,
            isSpecialClass: true,
        }
    }
    componentDidMount() {
        //返回数据不好看暂时先写死
        setInterval(() => {
            const myDate = new Date();
            //在每天早6点晚6点自动刷新
            if ((myDate.getHours() == 6 && myDate.getMinutes() == 0) || (myDate.getHours() == 18 && myDate.getMinutes() == 0)) {
                window.localStorage.removeItem('tabList');
                this.setState({
                    tabList: JSON.parse(window.localStorage.getItem('tabList')) || defaultTab
                }, () => {
                    // this.getNavBar()
                    this.getIsSpecialClass();
                })
            }
        }, 59000);
        // this.getNavBar();
        // this.props.getTabList && this.props.getTabList( [{
        //     "base_name": "学生风采",
        //     "url": "/studentsStyle",
        //     "icon": studentStyle
        // },]);
        this.getIsSpecialClass();
    }
    componentWillUnmount() { this.setState = () => { return } }
    getIsSpecialClass() {
        axios('get', '/api/eboard/identity', {
        }, 'form').then((json) => {
            this.setState({
                //json.data.isBindClass == 1未绑定《=》不是特殊班级
                isSpecialClass: json.data.isBindClass == 1 ? false : true
                // isSpecialClass: false
            }, () => {
                this.getNavBar();
            })
        })
    }
    getNavBar() {
        axios('get', '/api/index/nav').then(json => {
            let tabList = json.data.nav_bar.filter(item => item.level == 1);
            //如果没有首页先默认加一个首页
            if (tabList.findIndex(item => item.base_name == '首页') == -1) {
                tabList.unshift({
                    "base_name": "首页",
                    "url": "/home",
                    "icon": home
                })
            }
            tabList.push({
                "base_name": "更多",
                "url": "/indexMore",
                "icon": indexMoreIcon
            })
            // console.log(tabList)
            if (this.state.isSpecialClass) {
                let specialClassList = [
                    {
                        "base_name": "考勤",
                        "url": "/attendance",
                        "icon": newIconAttendance
                    }, {
                        "base_name": "校园风采",
                        "url": "/campusstyle",
                        "icon": newIconSchool
                    }, {
                        "base_name": "更多",
                        "url": "/indexMore",
                        "icon": indexMoreIcon
                    },
                ]
                // 如果导航中配置了老师考勤，那么在未绑定行政班的情况下也要显示老师考勤
                if (tabList.find((item => item.base_name == '老师考勤'))) {
                    specialClassList.splice(1, 0, {
                        "base_name": "老师考勤",
                        "url": "/teacherAttendance",
                        "icon": newTeacherAttendance
                    })
                }
                this.setState({
                    tabList: specialClassList
                }, () => {
                    window.localStorage.setItem("tabList", JSON.stringify(this.state.tabList));
                })
            } else {
                window.localStorage.setItem("tabList", JSON.stringify(tabList))
                this.setState({
                    // tabList: JSON.parse(window.localStorage.getItem('tabList')) || [
                    tabList: JSON.parse(window.localStorage.getItem('tabList')) || [
                        ...this.state.tabList,
                        ...tabList
                    ]
                }, () => {
                    window.localStorage.setItem("tabList", JSON.stringify(this.state.tabList));
                })
            }
            //这句要不要拆分看情况
            this.props.getTabList && this.props.getTabList(json.data.nav_bar || []);
        })
    }
    render() {
        let { tabList } = this.state;
        const tab = (
            <div className={styles['tab']}>
                {/* 写固定的内容 */}
                {/* <NavLink to='/home' activeClassName={styles['tab-active']}>
                    <img src={ home }></img>
                    <div className={styles['title']}>首页</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ attendance }></img>
                    <div className={styles['title']}>考勤</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ studentStyle }></img>
                    <div className={styles['title']}>学生风采</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ campusStyle }></img>
                    <div className={styles['title']}>校园风采</div>
                </NavLink>
                <NavLink to='/campusstyle' activeClassName={styles['tab-active']}>
                    <img src={ personalCenter }></img>
                    <div className={styles['title']}>个人中心</div>
                </NavLink> */}
                {
                    //动态生成tab
                    tabList.map(
                        (item, index) => <NavLink key={index} to={item.url || '/home'} activeClassName={styles['tab-active']}>
                            <img src={item.icon || attendance}></img>
                            <div className={styles['title']}>{item.base_name}</div>
                        </NavLink>)
                }
            </div>
        )
        return tab;
    }
}

export default Tab;
Tab.propTypes = function () { };