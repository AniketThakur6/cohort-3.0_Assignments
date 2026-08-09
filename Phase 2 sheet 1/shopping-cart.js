class ShoppingCart {
    constructor(){
        this.items = [];
    }

    //AddItem
    addItem(name,price,quantity=1){
        const existingItem = this.items.find(item => item.name === name)
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            this.items.push(
                {
                    name,
                    price,
                    quantity
                }
            );
        }
    }

    //Remove Item
    removeItem(name){
        this.items = this.items.filter(item => item.name !== name)
    }

    //update Item

    updateQuantity(name,quantity){
        const item  = this.items.find(item => item.name === name)

        if(!item){
            console.log("Item not found")
            return;
        }
        
        if(quantity <= 0){
            this.removeItem(name);
        } else{
            item.quantity = quantity;
        }
    }

    // calculate total
    calculateTotal(){
        return this.items.reduce((total,item) => total+item.price*item.quantity, 0)
    }

    // to-show 

    showItem(){
        console.table(this.items)
        console.log(`Total Price: ${this.calculateTotal()}`)
    }

}

const cart = new ShoppingCart();

cart.addItem("Laptop", 50000, 1);
cart.addItem("Mouse", 800, 2);
cart.addItem("Keyboard", 1500, 1);

cart.showItem();

cart.updateQuantity("Mouse", 3);

cart.removeItem("Keyboard");

cart.showItem();