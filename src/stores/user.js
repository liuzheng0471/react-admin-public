import { observable, action } from 'mobx'

export class User {
	@observable
	list = [
		{
			userId: 1,
      		userName: "test",
      		age: 20,
			gender: true,
			introduction: "",
		},
	]

	@action
	setList = (list) => {
		this.list = list
	}

	@action
	deleteUser = (key) => {
		this.list = this.list.filter(e => e.userId !== key)
	}
}

export default new User()

