class list {
    constructor() {
        this.getDate();
        this.$('.goods-list').addEventListener('click',this.addCarFn.bind(this))
        // console.log(this.$('.goods-list'));
    }
    async getDate() {
        let {
            data,
            status
        } = await axios.get('http://localhost:8888/goods/list')
        // console.log(res);
        // console.log(data,status);
        if (status == 200) {
            //  console.log(data);
            let html = '';
            data.list.forEach(val => {
                // console.log(val);
                html += `<li class="goods-item" data-id="${val.goods_id}">
                 <div class="goods-body">
            <a href="javascript:;" >
                <img src="${val.img_big_logo}">
            </a>
            <a href="javascript:;" class="goods-name">${val.title}</a>
            <a href="javascript:;" class="goods-price">
                <span>${val.price} </span>
            </a>
        </div>
        </li>`
            });
            this.$('.goods-list').innerHTML=html;
        }
    }
    // 跳详情
    async addCarFn(eve){
        // 跳转到详情页
        let lisObj=eve.target.parentNode.parentNode.parentNode;
        // console.log(lisObj);
        let goodsId=lisObj.dataset.id;
        window.localStorage.setItem('id',goodsId)
        // console.log(localStorage.getItem('id'));
        // console.log(goodsId);
        // if ( !goodsId) throw new Error('id存在问题');
        // axios.defaults.headers.common['authorization'] = token;
        // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let param = `id=${goodsId}`;
        // console.log(param);
        let {data,status} = await axios.get('http://localhost:8888/goods/item/'+'?'+param);
        if(status==200){
            // let html='';
            location.assign('../index/details_index.html'+'?'+param);
           /*  html+=`
            <div class="box" id="box">
                        <div class="small" id="small">
                          <img src="${data.img_big_logo}" width="350" alt="" />
                          <div class="mask" id="mask"></div>
                        </div>
                        <div class="big" id="big">
                          <img src="${data.img_big_logo}" width="800" alt="" id="img" />
                        </div>
                      </div>
                </div>
                <div class="pro-info fl" style="width: 485px;">
                    <div class="j_infos_t">
                        <p>综训鞋</p>
                        <h3 class="goods-name">${data.title}</h3>
                        <p class="goods-sn">款号：112217785</p>
                        <p class="goods-price">${data.price}</p>
                    </div>
                    <div class="j_infos_b">
                        <p class="goods-color"></p>
                        <ul class="color-list">
                            <li class="color-code">
                                <img src="https://img.fishfay.com/shopgoods/21/112217785/112217785-2-1/26ed3b03951c397d397f489c7cb6e5e0.jpg?x-image-process=image/resize,w_80,h_80" alt="">
                            </li>
                            <li class="color-code">
                                <img src="https://img.fishfay.com/shopgoods/21/112217785/112217785-8-1/4612b7a5f17d7d0e1b0373a13bf08b6f.jpg?x-image-process=image/resize,w_80,h_80" alt="">
                            </li>
                        </ul>

                        <div class="infos-pane">
                            <div class="infos-cell clearfix">
                                <div class="half-cell goods-size-cell" style="position: relative;">
                                    <div class="chima">
                                        <ul>
                                            <p>请选择符合您的码数</p>
                                            <span>X</span>
                                            <li><a href="#none">38</a></li>
                                            <li><a href="#none">39</a></li>
                                            <li><a href="#none">40</a></li>
                                            <li><a href="#none">41</a></li>
                                            <li><a href="#none">42</a></li>
                                            <li><a href="#none">42.5</a></li>
                                            <li><a href="#none">43</a></li>
                                            <li><a href="#none">44</a></li>
                                        </ul>
                                    </div>
                                    <span>尺码:</span>
                                    <a href="#none">选择尺码</a>
                                    <i class="icon-right aa-cm"></i>
                                </div>
                                <i class="line"></i>
                                <div class="half-cell goods-num-cell">
                                    <div class="goods-num">
                                        <ul>
                                            <p>请选择符合您的码数</p>
                                            <span>X</span>
                                            <li><a href="#none">1</a></li>
                                            <li><a href="#none">2</a></li>
                                            <li><a href="#none">3</a></li>
                                            <li><a href="#none">4</a></li>
                                            <li><a href="#none">5</a></li>
                                        </ul>
                                    </div>
                                    <span>数量:</span>
                                    <a href="#none">购买数量</a>
                                    <i class="icon-right"></i>
                                </div>
                            </div>

                            <div class="infos-cell clearfix infos-dis">
                                <div class="half-cell half-cell-b">
                                    <span>领取优惠券:</span>
                                    <i class="icon-right"></i>
                                </div>
                            </div>
                        </div>

                        <div class="goods-btn">
                            <a href="#none" class="btn-cart fl">加入购物车</a>
                            <a href="#none" class="btn-buy fr">立即购买</a>
                        </div>
                    </div>
            ` */
            // let proMain=document.querySelector('.pro-main')
            // console.log(proMain);
        }
        // console.log(data,status);


        

    }
        $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new list