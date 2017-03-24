import React from 'react';
import { NavBar,DatePicker, List,Icon } from 'antd-mobile';

class FrameComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }


    render() {
        return (
            <div>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="可选,小于结束日期"
                >
                    <List.Item arrow="horizontal">日期</List.Item>
                </DatePicker>
            </div>
        )
    }
}

export default FrameComponent;