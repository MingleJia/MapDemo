// import React from 'react';
// import styles from './index.less';
// import img from '../../assets/a.png';
// export default () => {
//   return (
//     <div>
//       1111
//     </div>
//   );
// }
import React, { Component } from 'react';
import styles from './index.scss';
import { getAction } from '../../utils/method.js';
import examWaitApi from '../../service/examWait.js';
// const UA = navigator.userAgent;
// const isAndroid = /android|adr/gi.test(UA);
class ExamWait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      m: '00',
      s: '00',
    };
  }

  getUrlSearch(name) {
    // 未传参，返回空
    if (!name) return null;
    // 查询参数：先通过search取值，如果取不到就通过hash来取
    var after = window.location.search;
    after = after.substr(1) || window.location.hash.split('?')[1];
    // 地址栏URL没有查询参数，返回空
    if (!after) return null;
    // 如果查询参数中没有"name"，返回空
    if (after.indexOf(name) === -1) return null;

    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 当地址栏参数存在中文时，需要解码，不然会乱码
    var r = decodeURI(after).match(reg);
    // 如果url中"name"没有值，返回空
    if (!r) return null;

    return r[2];
  }

  componentDidMount() {
    document.title = '等待开考';
    this.getNowTime();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getNowTime = () => {
    examWaitApi.getCurrentTime().then((json) => {
      let currentTime = parseInt(json.datas.currentTime / 1000) * 1000
      this.firstInit(currentTime);
      this.goStart(currentTime);
    })
  }
  firstInit = (currentTime) => {
    let diffTime = this.getUrlSearch('startTime') - currentTime;
    let m = parseInt(diffTime / 1000 / 60);
    let s = parseInt((diffTime / 1000) % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    if (diffTime <= 0) {
      this.setState({
        m: '00',
        s: '00',
      })
    } else {
      this.setState({ m, s });
    }
  }
  goStart = (currentTime) => {
    const schoolId = this.getUrlSearch('schoolid') - 0;
    const hwdtlId = this.getUrlSearch('homeworkDtlId') - 0;
    const hwId = this.getUrlSearch('homeworkId') - 0;
    let diffTime = this.getUrlSearch('startTime') - currentTime;
    // const hwViewStatus = this.getUrlSearch('hwViewStatus');
    // 去掉判断考试结束就去列表页
    // if (diffTime <= 0) {
    //   window.location.href = 'https://homework.leke.cn/auth/hd/student/exam/stuExamList.htm';
    // }
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      let m = parseInt(diffTime / 1000 / 60);
      let s = parseInt((diffTime / 1000) % 60);
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      if (parseInt(diffTime / 1000) <= 0) {
        // 去考试页面1
        if (window.LeKeBridge) {
          var message = {
            'schoolId': schoolId,
            'paperId': null,
            'homeworkDtlId': hwdtlId,
            'questionId': null,
            'homeworkId': hwId,
          };
          const HOMEWORKMODE = "homework_mode";
          message.homework_type = getAction(true, '40');
          window.LeKeBridge.sendMessage2Native(HOMEWORKMODE, JSON.stringify(message));
        }
        // 重置成初始值
        this.setState({
          m: '00',
          s: '00',
        })
        clearInterval(this.timer);
        return;
      }
      // 倒计时
      diffTime = diffTime - 1000;
      this.setState({ m, s });
    }, 1000);
  }
  render() {
    return (
      <div className={styles['box']}>
        <div className={styles['center']}>
          <div className={styles['title']}>
            <div className={styles['bar']}></div>
            <div className={styles['text']}> 考 试 须 知 </div>
            <div className={`${styles['bar']} ${styles['bar2']}`}></div>
          </div>
          <p className={styles['info']}>
            - 请预留好时间来拍照并上传线下作答的图片
          </p>
          <p className={styles['info']}>
            - 请在开考前检查触控笔、网络和平板电源的状况，保证考试顺利进行
          </p>
          <p className={styles['info']}>
            -
            拍照上传时，请竖持平板进行拍照，保证作答图片方便批改
          </p>
        </div>

        <div className={styles['clock']}>
          <div className={styles['clockTitle']}>距 离 考 试 开 始 还 有</div>
          <div className={styles['clockInfo']}>
            {this.state.m} <span> : </span> {this.state.s}
          </div>
          <div className={styles['showText']}>倒计时结束后将自动进入考试</div>
        </div>
      </div>
    );
  }
}

export default ExamWait;
