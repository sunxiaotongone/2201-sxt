class Login {
    constructor() {
        // 登录按钮
        this.$('.login-main .btnadpt').addEventListener('click', this.clickFn.bind(this))
    }
    clickFn() {
        // console.log(location.search.split('=')[1]);
        let forms = document.forms[0].elements;
        // console.log(forms);
        // console.log(forms[0],forms[2]);
        let username = forms[0].value;
        let password = forms[2].value;
        if (!username.trim() || !password.trim()) throw new Error("不能为空");
        // console.log(username,password);
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let data = `username=${username}&password=${password}`;
        // let param = `id=${goodsId}`;
        // console.log(param);
        axios.post('http://localhost:8888/users/login', data).then(res => {
            // console.log(data);
           let {status,data}=res;
        //    console.log(data);
           if(status==200){
            //    判断是否登录成功
            if(data.code==1){
                localStorage.setItem('token',data.token);
                localStorage.setItem('user_id',data.user.id);
                console.log(data.user.id,data.token);
                //    登录成功完成后转回原来的页面
               location.assign(location.search.split('=')[1])
            }else{
                // 登录失败弹出框、
               layer.open({
                   title:'他喵的，输错了',
                   content:'能不能记住账号密码了'
               });
            }
               
            

               
           }
        })

    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new Login