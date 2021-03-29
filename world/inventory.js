class Inventory{
    constructor(size, type = null){
        this.inventory = [];
        this.size = size;
        this.type = type;
    }

    find(item){
        return this.inventory.find(inventoryItem => inventoryItem.name == item);
    }

    addItems(items){
        if(this.inventory.length >= this.size) return null;
        items.forEach(item => {
            if(this.inventory.type && this.inventory.type !== item.type) return [item];
            var inventoryItem = this.find(item)
            if(inventoryItem){
                inventoryItem.quantity += item.quantity
            }
            else{
                this.inventory.concat(item);
            }
        });
        return items;
    }

    removeItems(items){
        items.forEach(item => {
            var inventoryItem = this.find(item)
            if(inventoryItem){
                var calc = inventoryItem.quantity - item.quantity
                if(calc === 0){
                    this.removeItem(inventoryItem)
                }
                else if(calc < 0) return [item];
            }
        });
        return items;
    }

    removeItem(item)
    {
        this.inventory = this.inventory.filter(inventoryItem => inventoryItem.name !== item.name)
    }

    displayInventory(){
        return 0;
    }
}

module.exports = Inventory;