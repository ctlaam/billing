// middleware/auth.js
export default function ({ store, redirect, route }) {
  console.log('chạy vào đây');
    // Kiểm tra trạng thái xác thực isAuthenticated trong Vuex Store
    const isAuthenticated = store.state.auth.isAuthenticated;
    console.log(route.path);
    // Nếu trạng thái isAuthenticated là false và route khác /auth và /auth/login
    if (!isAuthenticated && route.path !== '/auth' && route.path !== '/auth/signup') {
      // Chuyển hướng đến /auth/signup
      return redirect('/auth');
    }
  }


