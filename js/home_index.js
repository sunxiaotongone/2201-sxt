class Home{
    constructor(){
         this.$('body').addEventListener('click',this.allA.bind(this));
    }
    allA(eve){
        if(eve.target.tagName=='A'){
            location.assign('../index/list_index copy.html')
        }
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
    
}
new Home