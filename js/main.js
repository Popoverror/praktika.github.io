var app = new Vue ({
    el:'#app',
    data:{
        products:[
            {id:1,title:"Pepper 1",short_text:'Pepper',image:'pepper-1.jpg',desc:"Full desc"},
            {id:2,title:"Pepper 2",short_text:'Pepper',image:'pepper-2.png',desc:"Full desc"},
            {id:3,title:"Pepper 3",short_text:'Pepper',image:'pepper-3.png',desc:"Full desc"},
            {id:4,title:"Pepper 4",short_text:'Pepper',image:'pepper-4.png',desc:"Full desc"},
            {id:5,title:"Pepper 5",short_text:'Pepper',image:'pepper-5.png',desc:"Full desc"}
        ],
        product:[{}],
        cart: [],
        contactFields: [
            { caption: 'Name', text: '' },
            { caption: 'Company Name', text: '' },
            { caption: 'Position', text: '' },
            { caption: 'City', text: '' },
            { caption: 'Country', text: '' },
            { caption: 'Telephone', text: '' },
            { caption: 'Email', text: '' },
            { caption: 'You are a', text: '' },
            { caption: 'If other, please specify', text: '' },
            { caption: 'You are interested in', text: '' },
        ],
        btnVisible: 0,
        formVisible: 1, 
    },
    methods:{
        addItem:function(id){
            window.localStorage.setItem('prod',id);
        },

        getProduct: function() {
            if(window.location.hash){
                var id = window.location.hash.replace('#','');
                if(this.product && this.products.length>0){
                    for(i in this.products){
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) 
                        this.product=this.products[i];
                        }
                    }
                }
            } ,
  
        addToCart:function(id){
            var cart = [];
            if(window.localStorage.getItem('cart')){
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))==-1){
                cart.push(id);
                window.localStorage.setItem('cart',cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function(){
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id))!=-1) this.btnVisible=1
            },
        getCart:function () {
            var storage = [];
            storage = localStorage.getItem('cart').split(',')
            for (i in this.products) {
                if (storage.indexOf(String(this.products[i].id)) != -1) {
                    this.cart.push(this.products[i])
                }
            }
        },
        
        removeFromCart: function (id) {
            var storage = [];
            storage = window.localStorage.getItem('cart').split(',')

            storage = storage.filter(storageId => storageId != id)
            window.localStorage.setItem('cart', storage.join())

            this.cart = this.cart.filter(item => item.id != id)
        },

        makeOrder: function () {
            localStorage.clear();
            this.cart.splice(0, this.cart.length)
            this.formVisible = 0
        }
    },

    mounted:function(){
        this.getProduct();
        this.checkInCart();
        this.getCart();
        }
});
fetch('https://restcountries.eu/rest/v2/regionalbloc/eu')
.then(res => res.json())
.then(data => {
    const Capitals = document.createElement('ul');
    Capitals.classList.add("category-items");
    data.forEach(function(item){
        const viewItem=document.createElement('li');
        viewItem.appendChild(document.createTextNode(item.capital));
        Capitals.appendChild(viewItem);            
    });
    document.getElementsByClassName("list")[0].getElementsByClassName("capitals")[0].appendChild(Capitals);     
    
});
