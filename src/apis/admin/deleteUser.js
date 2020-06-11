import { success } from '../../utils/Message.jsx'
import { get } from '../../utils/request'

export default async (params, cb) => {
    const res = await get({
        url: '/admin/deleteUser',
        params
    })

    if (res.status) {
        success(`删除用户成功！`)
        cb && cb(res.data)
    }
}