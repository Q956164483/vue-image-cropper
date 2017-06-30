export const actions = {
  // 改变是否正在加载状态
	CHANGE_ISLOADING ({commit}, flag) {
		commit('SET_ISLOADING', flag);
	}
}