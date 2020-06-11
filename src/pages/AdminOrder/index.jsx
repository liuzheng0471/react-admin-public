import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { observer } from 'mobx-react'
import './index.styl'

import Container from '../../utils/Container'
import appState from '../../stores/appState.js'

import Book from '../../stores/book'
import deleteBook from '../../apis/admin/delete.js'
import {getBook} from '../../apis/book/list.js'

import User from '../../stores/user.js'
import { getUser } from '../../apis/admin/userList.js'
import deleteUser from '../../apis/admin/deleteUser.js'

import MOrder from '../../stores/adminOrder.js'
import { getOrder } from '../../apis/admin/order.js'

import { Popconfirm, Table, Button, Space, Popover, Input } from 'antd'
import { Link } from 'react-router-dom'


const AdminOrder = observer(({ children, history }) => {
	const params = {
		page: 1,
		size: 10,
	}

	useEffect(() => {
		appState.setLoading(true)
		const fetchData = async () => {
			await getOrder(params, MOrder.setList)
			appState.setLoading(false)
		}
		fetchData()
	}, [])

	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [loading, setLoading] = useState(false)

	const start = () => {
		setLoading(true)
		setTimeout(() => {
			setSelectedRowKeys([])
			setLoading(false)
		}, 1000)
	}

	const onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys)
		setSelectedRowKeys(selectedRowKeys)
	}

	// const handleDelete = (userId) => {
	// 	const deleteBar = () => {
	// 		User.deleteUser(userId)
	// 	}

	// 	const deleteFoo = async () => {
	// 		const param = {
	// 			userID: userId,
	// 		}
	// 		await deleteUser(param, deleteBar)
	// 	}

	// 	deleteFoo()
	// }

    const [visible, setVisible] = useState(false)
    // const handleVisibleChange = (visible) => {
    //     setVisible(!visible)
    // }

    const handleClick = () => {
        setVisible(!visible)
    }

    
    // const hide = () => {
    //     setVisible(false)
    // };
    
    
    const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	}
	const hasSelected = selectedRowKeys.length > 0

	const columns = [
		{   
			title: '订单ID',
            dataIndex: 'orderId',
		},
		{
			title: '订单编号',
            dataIndex: 'orderNo',
		},
		{
			title: '金额',
			dataIndex: 'totalPrice',
		},
		{
			title: '订单状态',
			dataIndex: 'orderStatus',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) =>
				
                <Link to={`/order/detail?orderNo=${record.orderNo}`}>
                    <Button
                        type="primary" ghost
                        size="small"
                        onClick={handleClick}
                    >
                    查看详情
                </Button>
                </Link>
                
        },
        
    ]
    
    const { Search } = Input;
    // const handleOnSearch = (value) = useMemo(
	// 	() => () => {
	// 		history.push(`/search?query=${value}`)
	// 	},
	// 	[value]
    // )
    const { query: { query = '' } = {} } = history
    const [search, setSearch] = useState(query)
    const handleSearchChange = useMemo(
		() => (e) => {
			setSearch(e.target.value)
		},
		[]
	)

	const handleOnSearch = useMemo(
		() => () => {
			history.push(`/msearch?query=${search}`)
		},
		[search]
	)

	return (
		<Container className="Search">
			{/* <div style={{ marginBottom: 16 }}>
				<Button
					type="primary"
					onClick={start}
					disabled={!hasSelected}
                    loading={loading}
				>
					Reload
				</Button>
			</div> */}
            <div>
            <div>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    //value={search}
                    //onSearch={()=>handleOnSearch(value)}
                    onChange={handleSearchChange}
					onSearch={handleOnSearch}
				    value={search}
                />
            </div>
            
			<Table
				//rowSelection={rowSelection}
				columns={columns}
                dataSource={MOrder.list}
                style={{width: '100%'}}
			/>
            </div>
		</Container>
	)
})

export default AdminOrder
