import { observable, action } from 'mobx'

export class mOrder {
    @observable
    list = [
        
    ]

    @action
    setList = (list) => {
        this.list = list.list
    }

    @action
	deleteOrder = (key) => {
		this.list = this.list.filter(e => e.orderId !== key)
	}
}
export default new mOrder()
	

