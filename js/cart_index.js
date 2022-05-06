class Cart {
    constructor() {
        this.dl();
        this.getCartGoods();
        this.eveFn();

    }
    // 绑定事件
    eveFn() {
        this.$('.sun').addEventListener('click', this.distributeEve.bind(this));
        this.$('.qx').addEventListener('click', this.clickAllChecked.bind(this))
    }
    async dl() {
        const token = localStorage.getItem('token');
        // console.log(token);
        axios.defaults.headers.common['authorization'] = token;
        let userId = localStorage.getItem('user_id');
        let {
            data,
            status
        } = await axios.get('http://localhost:8888/users/info/' + userId);
        if (!token || data.code == 401) {
            location.assign('../index/login_index.html?ReturnUrl=../index/cart_index.html')
        }
    }
    // 购物车渲染
    async getCartGoods() {
        const token = localStorage.getItem('token');
        let userId = localStorage.getItem('user_id');
        axios.defaults.headers.common['authorization'] = token;
        let {
            data,
            status
        } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
        if (status == 200) {
            // console.log(data);
            if (data.code == 1) {
                console.log(data.cart);

                let html = '';

                data.cart.forEach(goods => {
                    // console.log(goods.price, goods.cart_number);
                    // console.log((goods.price.slice(1))*(goods.cart_number-0));
                    html += `
                    <table class="cart-table " data-id="${goods.goods_id}">
                    <tr class="goods-item">
                        <td class="td-check">
                            <label for="" class="checkbox-label dx">
                                <input type="checkbox" class="checkbox-input">
                                
                            </label>
                        </td>
                        <td class="td-img">
                            <a href="#none">
                                <img src="${goods.img_small_logo}" alt="">
                            </a>
                        </td>
                        <td class="td-infos">
                            <div class="td-infos-top">
                                <div class="fl">
                                    <h5>${goods.title}</h5>
                                    <p>
                                        <span>颜色:荧光亮深红/油彩黄;尺码:40</span>
                                    </p>
                                </div>
                                <div class="fr">
                                    <span class="infos-price">${(goods.price.slice(1))*goods.cart_number}</span>
                                </div>
                            </div>
    
                            <div class="td-infos-bot">
                                <p class="fl">
                                    <span>数量:</span>
                                    <a href="#none" class="num-minus">-</a>
                                    <input type="text" class="num-input" value="${goods.cart_number}">
                                    <a href="#none" class="num-plus">+</a>
                                </p>
                                <p class="fr">
                                    <a href="#none" class="delete-one">删除</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
                    `;


                });

                this.$('.sun').innerHTML = html;



            }
        }


    }
    //   单个商品数据委托给父级
    async distributeEve({
        target
    }) {
        // console.log(target);
        if (target.parentNode.classList.contains('fr')) {
            this.delGoods(target);
        }
        if (target.parentNode.classList.contains('checkbox-label')) {
            // console.log(target);
            this.getOneGoodsCheck(target);
            this.getNumPriceGoods();
        }

    }
    delGoods(target) {
        let that = this;
        //确认是否删除
        let layerIndex = layer.confirm('你要残忍抛弃我吗?', {
            title: '删除提示'
        }, function () {
            // console.log('确定了...');
            // 获取商品id
            let ulObj = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            console.log(ulObj);

            let id = ulObj.dataset.id;
            // console.log(id);
            // 获取用户id
            let userId = localStorage.getItem('user_id');
            //发送ajax删除商品数据
            // console.log(id, userId);
            axios.get('http://localhost:8888/cart/remove?id=' + userId + '&goodsId=' + id)
                .then(res => {
                    let {
                        data,
                        status
                    } = res;
                    // console.log(data, status);
                    if (data.code == 1) { // 删除成功,则关闭弹出框,删除页面中的商品对应的ul
                        // 关闭确认框
                        layer.close(layerIndex);
                        // 提示删除成功
                        layer.msg('商品删除成功');
                        //在页面中删除节点
                        ulObj.remove();
                        // 统计商品数量和价格的方法
                        // console.log(this);
                        that.getNumPriceGoods()
                    }

                });
        })
    }
    getOneGoodsCheck(target) {
        //如果是取消,则直接让全选取消
        // console.log(target.checked);
        if (!target.checked) {
            this.$('.qx').checked = false;
            return;
        }

        // console.log(target.checked);
        // 如果点击的是选中,则返回true
        if (target.checked) {
            // 选中页面中,没有被选中的商品
            // console.log(this.$('.good-checkbox'));

            let res = Array.from(this.$('.dx .checkbox-input')).find(checkbox => {
                // 没有被选中,状态为false
                // console.log(checkbox.checked);
                return !checkbox.checked

            });
            //   console.log(res);
            // 如果返回undefined,则是页面中都被选中
            if (!res) this.$('.qx').checked = true;

        }
    }
    getNumPriceGoods() {
        let goods = document.querySelectorAll('.cart-table')
        let totalNum = 0;
        let totalPrice = 0;
        goods.forEach(val => {
            // console.log(val.querySelector('.infos-price'));
            // console.log(val.firstElementChild.firstElementChild.firstElementChild.firstElementChild);
            if (val.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.checked) {
                totalNum = val.querySelector('.num-input').value - 0 + totalNum;
                totalPrice = val.querySelector('.infos-price').innerHTML- 0 + totalPrice;
            }

        });
        // console.log(totalNum,totalPrice);
        this.$('.total-num').innerHTML = totalNum;
        this.$('.price').innerHTML = totalPrice;
    }
    clickAllChecked(eve) {
        // console.log(eve.target);
        // 获取全选按钮的状态
        let checked = eve.target.checked;
        // console.log(checked);
        this.oneGoodsCheck(checked);
        // 统计数量和价格的方法
        this.getNumPriceGoods();
    }
    oneGoodsCheck(checkStatus) {
        let goodsList = this.$('.cart-table');
        // console.log(goodsList, checkStatus);
        goodsList.forEach(ul => {
            //   console.log(ul);
            // 找到单个商品的复选框
            //   console.log(ul.firstElementChild.firstElementChild.firstElementChild.firstElementChild);
            ul.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.checked = checkStatus;

        })
    }



    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new Cart