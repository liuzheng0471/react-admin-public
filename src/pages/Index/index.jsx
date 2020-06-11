import React from 'react'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import './index.styl'

import bookIcon from '../../asserts/book.png'
import userIcon from '../../asserts/users.png'
import reviewIcon from '../../asserts/review.png'

import Container from '../../utils/Container'
import appState from '../../stores/appState.js'
import Book from '../../stores/book'
import getUserRecommend from '../../apis/recommend/user.js'
import getHotRank from '../../apis/recommend/hotRank.js'
import getHotTag from '../../apis/recommend/hotTag.js'

import 'ant-design-pro/dist/ant-design-pro.css';
import { ChartCard, yuan, Field , TagCloud, MiniArea, MiniBar, MiniProgress, Pie, Bar} from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo'
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import { isMoment } from 'moment'
import moment from 'moment';
import { Link } from 'react-router-dom'


const App = observer((props) => {
	// const { isLoading } = appState
	// appState.setLoading(true)

	

	const tags = [];
	for (let i = 0; i < 50; i += 1) {
	tags.push({
		name: `TagClout-Title-${i}`,
		value: Math.floor(Math.random() * 50) + 20,
	});
	}

	const visitData = [];
	const beginDay = new Date().getTime();
	for (let i = 0; i < 20; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay - 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
		y: Math.floor(Math.random() * 100) + 10,
	});
	}

	const salesPieData = [
		{
		  x: '男',
		  y: 789,
		},
		{
		  x: '女',
		  y: 323,
		}
	  ];
	  
	const salesData = [{x:"爱与尊严", y:9.8}, {x:"战争的果实", y:9.2}, {x:"查理曼大帝的桌布", y:8.5}, {x:"争做精神富有的人", y:9.8}, {x:"海德格尔", y:9.2},
	{x:"窃听", y:9.1}, {x:"界上逸事", y:9}, {x:"人的预感", y:8.5}, {x:"散文菁华", y:8}, {x:"蹉跎岁月", y:7}];
	// for (let i = 0; i < 12; i += 1) {
	// salesData.push({
	// 	x: `${i + 1}月`,
	// 	y: Math.floor(Math.random() * 1000) + 200,
	// });
	// }	  

	const params = {
		page: 1,
		size: 10,
		userID: appState.user['userId'],
	}

	const params1 = {
		page: 1,
		size: 11,
	}

	// useEffect(() => {
	// 	appState.setLoading(true)
	// 	const fetchData = async () => {
	// 		Promise.all([
	// 			getUserRecommend(params, Book.setLike),
	// 			getHotRank(params1, Book.setTop),
	// 			getHotTag(params1, Book.setTag)
	// 		]).then(() => {
    //             appState.setLoading(false)
    //         })
			
	// 	}
	// 	fetchData()
	// }, [])

	return (
		<Container className="App" > 
		{/* isLoading={isLoading} */}
		<Row>
		<div className="total-info">
			<ChartCard
				title="用户总数"
				avatar={
					<img
						style={{ width: 56, height: 56 }}
						src={userIcon}
						alt="indicator"
					/>
				}
				action={
				<Tooltip title="用户总数">
					<Icon type="info-circle-o" />
				</Tooltip>
				}
				total={
					<Link to={`/adminUser`}>1121</Link>
				}
			/>
		</div>
		<div className="total-info">
			<ChartCard
				title="书籍总数"
				avatar={
				<img
					style={{ width: 56, height: 56 }}
					src={bookIcon}
					alt="indicator"
				/>
				}
				action={
				<Tooltip title="书籍总数">
					<Icon type="info-circle-o" />
				</Tooltip>
				}
				total={
					<Link to={`/admin`}>17342</Link>
				}
			/>
		</div>
		<div className="total-info">
				<ChartCard
				title="评论总量"
				avatar={
					<img
						style={{ width: 56, height: 56 }}
						src={reviewIcon}
						alt="indicator"
					/>
					}
				action={
				<Tooltip title="评论总数">
					<Icon type="info-circle-o" />
				</Tooltip>
				}
				total={5781}
			/>
		</div>
	
		<div className="total-info">
				<ChartCard
				title="订单总量"
				avatar={
					<img
						style={{ width: 56, height: 56 }}
						src={reviewIcon}
						alt="indicator"
					/>
					}
				action={
				<Tooltip title="订单总数">
					<Icon type="info-circle-o" />
				</Tooltip>
				}
				total={
					<Link to={`/adminOrder`}>1121</Link>
				}
			/>
		</div>

		<div className="comment">
			<ChartCard title="评论总数" total={numeral(5781).format('0,0')} contentHeight={134}>
				<NumberInfo
				subTitle={<span>本日评论数</span>}
				total={numeral(21).format('0,0')}
				status="up"
				//subTotal={17.1}
				/>
				<MiniArea line height={45} data={visitData} />
			</ChartCard>
	  </div>
	  <TagCloud data={tags} height={150} />
	  <div className="gender">
		<Pie
			hasLegend
			title="用户性别"
			subTitle="用户性别"
			total={1121}
			data={salesPieData}
			// valueFormat={}
			height={200}
		/>
	</div>

	<div className="hot">
	<Bar height={200} title="热度趋势" data={salesData} />
	</div>
	  </Row>		
		</Container>

	)
})

export default App
