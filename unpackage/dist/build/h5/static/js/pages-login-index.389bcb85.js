(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-index","pages-components-Head"],{"03b4":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"segmented-control",class:["text"===t.styleType?"segmented-control--text":"segmented-control--button"],style:{borderColor:"text"===t.styleType?"":t.activeColor}},t._l(t.values,(function(e,r){return n("v-uni-view",{key:r,staticClass:"segmented-control__item",class:["text"===t.styleType?"":"segmented-control__item--button",r===t.currentIndex&&"button"===t.styleType?"segmented-control__item--button--active":"",0===r&&"button"===t.styleType?"segmented-control__item--button--first":"",r===t.values.length-1&&"button"===t.styleType?"segmented-control__item--button--last":""],style:{backgroundColor:r===t.currentIndex&&"button"===t.styleType?t.activeColor:"",borderColor:r===t.currentIndex&&"text"===t.styleType||"button"===t.styleType?t.activeColor:"transparent"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._onClick(r)}}},[n("v-uni-view",[n("v-uni-text",{staticClass:"segmented-control__text",class:"text"===t.styleType&&r===t.currentIndex?"segmented-control__item--text":"",style:{color:r===t.currentIndex?"text"===t.styleType?t.activeColor:"#fff":"text"===t.styleType?"#000":t.activeColor}},[t._v(t._s(e))])],1)],1)})),1)},o=[]},"06ce":function(t,e,n){"use strict";n.r(e);var r=n("d9ee"),a=n("e1fb");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("1809");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"45d305f8",null,!1,r["a"],i);e["default"]=s.exports},"0bdd":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={uniSegmentedControl:n("c743").default,uniForms:n("fe3b").default,uniFormsItem:n("3910").default,uniEasyinput:n("f7c2").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("Head",{attrs:{styles:"margin-top: 1rem"}}),n("v-uni-view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("uni-segmented-control",{attrs:{current:t.current,values:t.items,"style-type":"text","active-color":"#91796D"},on:{clickItem:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickItem.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"form"},[n("uni-forms",{ref:"valiForm",attrs:{rules:t.rules,modelValue:t.valiFormData,"label-align":"center"}},[n("uni-forms-item",{attrs:{label:"",required:!0,name:"account"}},[n("uni-easyinput",{attrs:{placeholder:"请输入邮箱"},model:{value:t.valiFormData.account,callback:function(e){t.$set(t.valiFormData,"account",e)},expression:"valiFormData.account"}})],1),n("uni-forms-item",{attrs:{label:"",required:!0,name:"password"}},[n("uni-easyinput",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.valiFormData.password,callback:function(e){t.$set(t.valiFormData,"password",e)},expression:"valiFormData.password"}})],1)],1),n("v-uni-button",{staticStyle:{"background-color":"#91796D"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit("valiForm")}}},[t._v(t._s(0===t.current?"登录":"注册"))])],1)],1)},o=[]},1809:function(t,e,n){"use strict";var r=n("1eb5"),a=n.n(r);a.a},"1ade":function(t,e,n){"use strict";(function(t){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("5530")),o=r(n("06ce")),i=(n("d1a1"),{components:{Head:o.default},data:function(){return{current:0,items:["登录","注册"],valiFormData:{account:"",password:""},rules:{account:{rules:[{required:!0,errorMessage:"请输入邮箱"},{format:"email",errorMessage:"邮箱格式不正确"}]},password:{rules:[{required:!0,errorMessage:"请输入密码"}]}}}},methods:{submit:function(e){var n=this;this.$refs[e].validate().then((function(t){0===n.current?n.login(t):n.register(t)})).catch((function(e){t.log("err",e)}))},register:function(e){var n=e.account,r=e.password;uni.request({url:"/api/user/register",method:"POST",data:{account:n,password:r},success:function(e){200===e.statusCode&&t.log("res",e)}})},login:function(t){var e=this,n=t.account,r=t.password;uni.request({url:"/api/user/login",method:"POST",data:{account:n,password:r},success:function(t){t.data.code?uni.showToast({title:"账号或密码不正确！",icon:"none"}):uni.request({url:"/api/user/userInfo",success:function(t){var n=t.data.data,r=n.email,o=n.id;n.count,n.total;uni.setStorageSync("uId",o),uni.setStorageSync("userName",r),uni.setStorageSync("downloadInfo",(0,a.default)({},t.data.data)),uni.showToast({title:"登录成功",icon:"none"}),setTimeout((function(){e.redirectToPage()}),1e3)}})}})},redirectToPage:function(){var t=getCurrentPages(),e=t[t.length-2];e&&"pages/center/index"!==e.route?uni.navigateBack():uni.switchTab({url:"/pages/index/index"})},onClickItem:function(t){this.current!==t.currentIndex&&(this.current=t.currentIndex)}}});e.default=i}).call(this,n("5a52")["default"])},"1c31":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.segmented-control[data-v-43a2383a]{display:flex;box-sizing:border-box;flex-direction:row;height:36px;overflow:hidden;cursor:pointer}.segmented-control__item[data-v-43a2383a]{display:inline-flex;box-sizing:border-box;position:relative;flex:1;justify-content:center;align-items:center}.segmented-control__item--button[data-v-43a2383a]{border-style:solid;border-top-width:1px;border-bottom-width:1px;border-right-width:1px;border-left-width:0}.segmented-control__item--button--first[data-v-43a2383a]{border-left-width:1px;border-top-left-radius:5px;border-bottom-left-radius:5px}.segmented-control__item--button--last[data-v-43a2383a]{border-top-right-radius:5px;border-bottom-right-radius:5px}.segmented-control__item--text[data-v-43a2383a]{border-bottom-style:solid;border-bottom-width:2px;padding:6px 0}.segmented-control__text[data-v-43a2383a]{font-size:14px;line-height:20px;text-align:center}',""]),t.exports=e},"1eb5":function(t,e,n){var r=n("b287");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("0928c294",r,!0,{sourceMap:!1,shadowMode:!1})},"2c0d":function(t,e,n){"use strict";(function(t){var r=n("4ea4");n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;r(n("de21"));function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(n,r){e.success=function(e){t.log("res",e),200!==e.data.code?(uni.showToast({icon:"none",duration:3e3,title:"".concat(e.data.msg)}),403===e.data.code&&(removeToken(),uni.reLaunch({url:"/pages/login/login"})),r(e)):n(e.data.data)},e.fail=function(t){uni.showToast({icon:"none",duration:3e3,title:"服务器错误,请稍后再试"}),r(t)},uni.request(e)}))}var o=a;e.default=o}).call(this,n("5a52")["default"])},"3ef7":function(t,e,n){"use strict";n.r(e);var r=n("0bdd"),a=n("5bca");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("c3fe");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"d90c2568",null,!1,r["a"],i);e["default"]=s.exports},4112:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"UniSegmentedControl",emits:["clickItem"],props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#2979FF"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:0}},watch:{current:function(t){t!==this.currentIndex&&(this.currentIndex=t)}},created:function(){this.currentIndex=this.current},methods:{_onClick:function(t){this.currentIndex!==t&&(this.currentIndex=t,this.$emit("clickItem",{currentIndex:t}))}}};e.default=r},"5bca":function(t,e,n){"use strict";n.r(e);var r=n("1ade"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},8373:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".container .form[data-v-d90c2568]{margin:1rem 1.6rem}",""]),t.exports=e},b218:function(t,e,n){"use strict";n.r(e);var r=n("4112"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},b287:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".head[data-v-45d305f8]{text-align:center;margin-bottom:.8rem}.head .logo[data-v-45d305f8]{height:%?200?%;width:%?200?%;margin-top:6rem;margin-left:auto;margin-right:auto;margin-bottom:%?-8?%}.head .title[data-v-45d305f8]{font-size:%?36?%;color:#8f8f94}.head .text-area[data-v-45d305f8]{display:flex;justify-content:center}",""]),t.exports=e},bfd8:function(t,e,n){var r=n("8373");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("4fbeb947",r,!0,{sourceMap:!1,shadowMode:!1})},c3fe:function(t,e,n){"use strict";var r=n("bfd8"),a=n.n(r);a.a},c743:function(t,e,n){"use strict";n.r(e);var r=n("03b4"),a=n("b218");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("e3f2");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"43a2383a",null,!1,r["a"],i);e["default"]=s.exports},d1a1:function(t,e,n){"use strict";var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.login=o;var a=r(n("2c0d"));function o(t){return(0,a.default)({url:"/user/login",method:"POST",data:t})}},d8ff:function(t,e,n){var r=n("1c31");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var a=n("4f06").default;a("99f35d8a",r,!0,{sourceMap:!1,shadowMode:!1})},d9ee:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"head"},[n("v-uni-image",{staticClass:"logo",style:t.styles,attrs:{src:"/static/koala.jpg"}}),n("v-uni-view",{staticClass:"text-area"},[n("v-uni-text",{staticClass:"title"},[t._v("考拉搜书")])],1)],1)},o=[]},de21:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={appid:"H5",baseUrl:"http://192.168.31.60:8081/"};e.default=r},e1fb:function(t,e,n){"use strict";n.r(e);var r=n("f7fb"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},e3f2:function(t,e,n){"use strict";var r=n("d8ff"),a=n.n(r);a.a},f7fb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{styles:{type:String,default:""}},data:function(){return{}},methods:{}};e.default=r}}]);