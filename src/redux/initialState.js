const crudState = () => ({
  list:{
    _list:[],
    loading:false,
    error:false,
    success:false
  },
  form:{
    loading:false,
    error:false,
    success:false,
  },
  update:{
    loading:false,
    error:false,
    success:false
  },
  delete:{
    loading:false,
    error:false,
    success:false
  }
})

export const initialState = {
  articles:crudState(),
  users:{...crudState(),...{
    auth:{
      user:null,
      authorized:false,
      loading:false,
      error:false
    }
  }},

}
