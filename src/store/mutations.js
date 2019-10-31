import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  //mutations唯一的目的就是修改state的状态，所以其中的每个方法功能要尽量单一一点,方便程序跟踪
  /*addCart(state,payload){
    /!*let oldProduct=null;
    for(let item of state.cartList){
      if(item.iid===payload.iid){
        oldProduct=item;
      }
    }*!/
    //1.查找之前数组中是否有该商品
    let oldProduct=state.cartList.find(item=>item.iid===payload.iid)
    //count是同类产品的数量
    if(oldProduct){
      oldProduct.count+=1;
    }else{
      payload.count=1;
      state.cartList.push(payload)
    }
  }*/
  [ADD_COUNTER](state,payload){
    payload.count++;
  },
  [ADD_TO_CART](state,payload){
    payload.checked=false;
    state.cartList.push(payload);
  }
}
