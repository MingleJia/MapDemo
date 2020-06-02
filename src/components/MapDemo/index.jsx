import React, { Component } from 'react';
import { Map, Marker } from 'react-amap';
// import axios from 'UTILS/axios';
import styles from './index.scss';

// 参考文档
//高德地图API示例 https://lbs.amap.com/api/javascript-api/example/map/click-to-get-lnglat/
// react-amap的接口文档：https://github.com/ElemeFE/react-amap/blob/next/components/map/index.md
// 10009报错：https://blog.csdn.net/m0_37355951/article/details/77775287
const mapKey = '95ec96754bf60a30b455de751e2e2ac4';
export default class MapDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        // 设置坐标点，就会在地图上显示一个 标记点
            markerPosition: { longitude: 120, latitude: 35 },
            inputValue: '',
        }
        // 高德地图 Marker 实例
        this.markerInstance = undefined
        // 高德地图 Map 实例
        this.mapInstance = undefined

        this.amapEvents = {
            created: mapInstance => {
              console.log('高德地图 Map 实例创建成功');
              console.log('缩放级别：', mapInstance.getZoom());
              this.mapInstance = mapInstance
      
              // 搜索定位
              AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.CitySearch'], () => { //eslint-disable-line
                // 实例化Autocomplete
                const autoOptions = {
                  // input 为绑定输入提示功能的input的DOM ID
                  input: 'amapInput',
                }
                const autoComplete = new AMap.Autocomplete(autoOptions);//eslint-disable-line
                // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      
                const placeSearch = new AMap.PlaceSearch({//eslint-disable-line
                  map: mapInstance,
                })
      
                // 注册监听，监听下拉框选中事件
                AMap.event.addListener(autoComplete, 'select', e => { // eslint-disable-line 
                  // TODO 针对选中的poi实现自己的功能
                  console.log('e:', e);
                  placeSearch.setCity(e.poi.adcode)
                  placeSearch.search(e.poi.name)
                })
      
      
                const citySearch = new AMap.CitySearch();//eslint-disable-line
                citySearch.getLocalCity((status, result) => {
                    
                  if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    if (result && result.city && result.bounds) {
                      // 当前城市名称
                      const cityinfo = result.city;
      
                      // 当前城市位置信息
                      const citybounds = result.bounds;
                      document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;

                      // 地图显示当前城市
                      mapInstance.setBounds(citybounds);
                      // 需要在设置坐标成功后，重新设置 缩放级别
                    //   mapInstance.setZoom(15)
                    }
                  }
                })
              })
      
              // 点击实例地点，在input输入框回显地点名字
              mapInstance.on('click', e => {
                const lngLat = `${e.lnglat.getLat()},${e.lnglat.getLng()}`
                console.log('坐标位置:', lngLat);
                const self = this;
                // this.mapInstance.setCenter([e.lnglat.getLat(), e.lnglat.getLng()]); //设置地图中心点
                AMap.plugin('AMap.Geocoder', function() { //eslint-disable-line
                    const geocoder = new AMap.Geocoder({});//eslint-disable-line
                    geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status, result) => {
                        console.log('status, result:', status, result);
                        if (status === 'complete' && result.info === 'OK') {
                            console.log(result.regeocode.formattedAddress);
                            self.setState({inputValue: result.regeocode.formattedAddress})
                        }
                    })
                })
              });
            },
        };

        this.markerEvents = {
            created: markerInstance => {
                console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log('1111', markerInstance.getPosition());
        
                this.markerInstance = markerInstance
            },
        }
    }

    render() {
        return (
          <>
            <div style={{ width: '100%', height: '400px', position: 'relative' }}>
                <div className={styles.infoBox}>
                    <span className={styles.inputText}>请输入关键字:</span>
                    <input id="amapInput" value={this.state.inputValue} onChange={(e) => this.setState({inputValue: e.target.value})} className={styles.input} type="text" />
                </div>
                <div id='info' style={{marginBottom: 10, fontSize: 14}}></div>
                <Map zoom={15} plugins={['ToolBar']} events={this.amapEvents} amapkey={mapKey} center={this.state.markerPosition}>
                    <Marker position={this.state.markerPosition} events={this.markerEvents} />
                </Map>
              
            </div>
          </>
        )
    }
}
