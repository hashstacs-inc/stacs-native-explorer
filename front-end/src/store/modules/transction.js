const transction = {
  state: {
    tasQueryData: {
      pageSize: 10,
      pageNo: 1,
      blockHeight: '',
      txId: ''
    },
    tasTableDesc: [
      {label: 'TX ID', prop: 'txId', width: 227},
      {label: 'Time Stamp +UTC', prop: 'blockTime', width: '200'},
      {label: 'Sender', prop: 'sender', width: ''},
      {label: 'Action', prop: 'actionDatas', width: '110', template: true},
      {label: '\xa0' + 'Credentials ' + '\xa0' + 'Information', prop: 'bizModel', width: '220', template: true},
      {label: 'Block', prop: 'blockHeight', width: '100'},
      {label: 'Transaction Status', prop: 'executeResult', width: 166},
    ],
  },
  mutations: {
    setQueryData: (state, val) => {
      state.tasQueryData.txId = val.id
      state.tasQueryData.blockHeight = val.height
    },
  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    },
  },
  getters: {
    tasQueryData: state => state.tasQueryData,
    tasTableDesc: state => state.tasTableDesc,
  }
}

export default transction

