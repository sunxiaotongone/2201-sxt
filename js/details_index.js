const proMain = document.querySelector('.w-1280');
const btnCart = document.querySelector('.goods-btn');
// console.log( proMain);
let goodsId = window.localStorage.getItem('id');
// console.log(id);
class list {
  constructor() {
    this.addSp();


  }

  async addSp(eve) {
    // function getQueryVariable(variable) {
    //   var query = window.location.search.substring(1);
    //   var vars = query.split("&");
    //   for (var i = 0; i < vars.length; i++) {
    //     var pair = vars[i].split("=");
    //     if (pair[0] == variable) {
    //       return pair[1];
    //     }
    //   }
    //   return (false);
    // }
    // let res = getQueryVariable('id')

    //  console.log(res);
    // console.log(id);
    let {
      data,
      status
    } = await axios.get('http://localhost:8888/goods/item' + '?id=' + goodsId);
    if (status == 200) {
      let html = '';
      html += `  
                    <div class="box" id="box">
                        <div class="small" id="small">
                          <img src="${data.info.img_big_logo}" width="350" alt="" />
                          <div class="mask" id="mask"></div>
                        </div>
                        <div class="big" id="big">
                          <img src="${data.info.img_big_logo}" width="800" alt="" id="img" />
                        </div>
                      </div>  
       
          `
      let proMain = document.querySelector('.nb')
      // console.log(proMain);
      proMain.innerHTML = html;
      let html1 = '';
      html1 += `
          <div class="j_infos_t">
                        <p>综训鞋</p>
                        <h3 class="goods-name">${data.info.title}</h3>
                        <p class="goods-sn">款号：112217785</p>
                        <p class="goods-price">${data.info.price}</p>
                    </div> `
      let proInfo = document.querySelector('.sb')
      proInfo.innerHTML = html1;
    }
    // console.log(data,status);




  }
  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }

}
new list

// console.log(btnCart);
btnCart.onclick = async function (eve) {

  // console.log(eve.target);
  if (eve.target.nodeName === 'A') {
    // console.log(111);
    let token = window.localStorage.getItem('token');

    // console.log(token);
    if (!token) location.assign('../index/login_index.html?ReturnUrl=../index/details_index.html');
    // console.log(eve.target.classList.contains('btn-cart'));
    if (eve.target.classList.contains('btn-cart')) {
      // console.log(goodsId);

      // console.log(lisObj);
      let goodsId = window.localStorage.getItem('id')
      let userId = window.localStorage.getItem('user_id');

      if (!userId || !goodsId) throw new Error('id错了');
      axios.defaults.headers.common['authorization'] = token;
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let param = `id=${userId}&goodsId=${goodsId}`;
      // console.log(param);
      // console.log(goodsId);
      // console.log(userId);
      let {
        data,
        status
      } = await axios.post('http://localhost:8888/cart/add', param);
      console.log(data);
      if (status == 200) {
        if (data.code == 1) {
          layer.open({
            content: '加入购物成功',
            btn: ['去购物车结算', '留在当前页面'],
            yes: function (index, layero) {
              // 按钮【按钮一】的回调
              location.assign('../index/cart_index.html')
            },
            btn2: function (index, layero) {
              //按钮【按钮二】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            }
          })
        }
      }

    }


  }

}


proMain.onmousemove = function (eve) {
  // console.log(proMain);
  // console.log(eve.target);
  // if(eve.target.className ==='small'){
  // console.log(111);
  const boxObj = document.querySelector('#box'),
    smallObj = boxObj.firstElementChild,
    maskObj = smallObj.lastElementChild,

    bigObj = document.querySelector('#big'),
    bigImg = bigObj.lastElementChild;
  // console.log(maskObj);
  //绑定鼠标移入

  smallObj.onmouseenter = function () {
    //显示小黄块和大图
    maskObj.style.display = 'block';
    bigObj.style.display = 'block';
  }

  // 绑定鼠标移出
  smallObj.onmouseleave = function () {
    maskObj.style.display = 'none';
    bigObj.style.display = 'none';
  }
  // box相对于body的left和top值
  let boxT = boxObj.offsetTop;
  let boxL = boxObj.offsetLeft;
  // console.log(boxL, boxT);

  //鼠标移动事件,设置mask跟随鼠标移动
  smallObj.onmousemove = function (eve) {
    // console.log(123);
    // console.log(eve);
    // 获取鼠标相对于可视区的坐标
    // let cX = eve.clientX;
    // let cY = eve.clientY;
    let cX = eve.pageX;
    let cY = eve.pageY;
    // console.log(cX, cY);
    let maskW = maskObj.offsetWidth;
    let maskH = maskObj.offsetHeight;
    // console.log(maskH, maskW);
    // 计算mask的坐标
    let maskL = cX - boxL - maskW / 2;
    let maskT = cY - boxT - 150 - maskH / 2;
    //  console.log(maskL, maskT);
    // 计算mask的边框
    // 判断是否超出上和左边界
    if (maskL < 0) maskL = 0
    if (maskT < 0) maskT = 0

    // 计算最大值
    let maxMaskL = smallObj.offsetWidth - maskW;
    let maxMaskT = smallObj.offsetHeight - maskH;
    // console.log(maxMaskL, maxMaskT);
    if (maskL > maxMaskL) {
      maskL = maxMaskL
    }
    if (maskT > maxMaskT) maskT = maxMaskT

    // 将值 设置给 mask
    maskObj.style.left = maskL + 'px'
    maskObj.style.top = maskT + 'px'
    // 计算大图能够移动的最大left和top值
    let bigMaxLeft = bigImg.offsetWidth - bigObj.offsetWidth;
    let bigMaxTop = bigImg.offsetHeight - bigObj.offsetHeight;

    //  计算大图的实时位置
    let tmpBigImgLeft = maskL / maxMaskL * bigMaxLeft;
    let tmpBigImgTop = maskT / maxMaskT * bigMaxTop;

    // 设置大图的位置
    bigImg.style.left = -tmpBigImgLeft + 'px';
    bigImg.style.top = -tmpBigImgTop + 'px';
  }
  let cartObj = document.querySelector('.btn-cart')
  cartObj.onclick = function (eve) {
    let token = localStorage.getItem('token');
    // console.log(token);
    // 没登陆就跳转到登陆页面
    if (!token) location.assign('../index/login_index.html?ReturnUrl=../index/details_index.html');
  }
  // }    
}