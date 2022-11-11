import App from './App.vue';
import router from './router';

// 引入vant部分函数式组件样式，按需开启（unplugin-vue-components无法自动引入）
// Toast
import 'vant/es/toast/style';
// Dialog
import 'vant/es/dialog/style';
// Notify
// import "vant/es/notify/style";
// ImagePreview
// import "vant/es/image-preview/style";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
