<template>
    <div>
        <div class="HomePage">
            <form action="/">
                <van-search v-model="searchValue" show-action shape="round" background="#9fc5e8" placeholder="请输入搜索关键词">
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </form>

            <div class="HomeSidebar">
                <van-sidebar v-model="activeKey" @change="onSidebarChange">
                    <van-sidebar-item v-for="(item, index) in contents" :key="index" :title="item[0].category_name" />
                </van-sidebar>

                <div id="goodsContent" class="goods-content">
                    <div v-for="item in contents" :key="item[0].category_id" :id="'goods' + item[0].category_id">
                        <p style="text-align: left; font-size:18px; padding: 10px;">{{item[0].category_name}}</p>
                        <van-card v-for="(card, index2) in item" :key="index2"
                            :price="card.product_price"
                            :title="card.product_name"
                            :thumb="card.product_img_url"
                        >
                            <template #footer>
                                <van-button size="small" plain type="info" @click="submit(card)">上传</van-button>
                            </template>
                        </van-card>
                    </div>
                </div>  
            </div>
        </div>
        <tabbar_nav></tabbar_nav>
    </div>
</template>

<script>
import tabbar_nav from "./tabbar_nav"
import VueScrollTo from 'vue-scrollto' // 提到顶部

export default {
    components: { tabbar_nav },
    data() {
        return {
            contents: [],
            activeKey: 0,
            searchValue: '',
            userInfo: null
        };
    },
    created() {
        this.handleWechatLogin();
    },
    mounted() {
        this.getPrdDatas();
    },
    methods: {
        async handleWechatLogin() {
            const code = this.getUrlParam('code');
			console.log("handleWechatLogin code:", code); // 打印1
            const openid = localStorage.getItem("openid");
            console.log("handleWechatLogin openid:", openid); 
            // 如果本地已经有 openid，说明登录过，不再跳转
            if (openid) {
                console.log("User already logged in:", openid);
                return;
            }

            if (!code) {
                // 没登录也没 code，跳转授权
                const appid = 'yourappid';
                //const redirect_uri = encodeURIComponent(window.location.origin);
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=http://cbs.nat100.top&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            } else {
                // 拿到 code，去后端换取用户信息
                try {
					console.log("try to handle code:", code); 
            
                    const res = await this.$http.post('/dbapi/wechat_login', { code });
                    if (res.data.status === 1) {
                        this.userInfo = res.data.data;
                        localStorage.setItem("openid", this.userInfo.openid);
                        localStorage.setItem("nickname", this.userInfo.nickname);
                        localStorage.setItem("headimgurl", this.userInfo.headimgurl);
                        // 清除 URL 中的 code 参数，美化地址栏
                        const newUrl = window.location.origin + window.location.pathname + window.location.hash;
                        window.history.replaceState({}, '', newUrl);
                    }
                } catch (err) {
                    console.error("Login Error:", err);
                }
            }
        },

        getUrlParam(name) {
            const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            const r = window.location.search.substr(1).match(reg);
            return r ? unescape(r[2]) : null;
        },

        onSidebarChange(index) {
            const categoryId = this.contents[index][0].category_id;
            VueScrollTo.scrollTo("#goods" + categoryId, 500, {
                container: "#goodsContent",
                offset: 0
            });
        },

        submit(product) {
            this.$router.push({
                path: "/update", 
                query: { price: product.product_price, title: product.product_name, thumb: product.product_img_url }
            });
        },

        async getPrdDatas() {
            try {
                const res = await this.$http.get('/dbapi/contents');
                let rawData = res.data;
                if (!Array.isArray(rawData)) return;
                
                let grouped = {};
                rawData.forEach(item => {
                    if (!grouped[item.category_id]) grouped[item.category_id] = [];
                    grouped[item.category_id].push(item);
                });
                this.contents = Object.values(grouped);
            } catch (err) {
                console.error("Load Data Error:", err);
            }
        },
        onSearch() {
            // 搜索逻辑
            console.log("Searching:", this.searchValue);
        }
    }
};
</script>