const issuance = {
  state: {
    issuanceQueryData: {
      isTable: false,
      pageNum: 1,
      pageSize: 10,
      ownerAddress: '',
      currency: '',
      type: '',
    },
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    issuanceQueryData: state => state.issuanceQueryData,
  }
}

export default issuance

