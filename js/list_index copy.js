class list {
    constructor() {
        this.getDate();
    }
    async getDate() {
        let {
            data,
            status
        } = await axios.get('http://localhost:3000/ANTA1')
        // console.log(res);
        // console.log(data,status);
        if (status == 200) {
            //  console.log(data);
            let html = '';
            data.forEach(val => {
                // console.log(val);
                html += ` <div class="goods-body">
            <a href="#none" >
                <img src="${val.src}">
            </a>
            <a href="#none" class="goods-name">${val.name}</a>
            <a href="#none" class="goods-price">
                <span>${val.price} </span>
            </a>
        </div>`
            });
            this.$('.goods-item').innerHTML=html;
        }
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new list