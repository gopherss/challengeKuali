class Item {
    public name: string;
    public sellIn: number;
    public quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

abstract class ItemStrategy {
    protected item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    abstract update(): void;

    protected decreaseQuality(amount: number = 1): void {
        this.item.quality = Math.max(0, this.item.quality - amount);
    }

    protected increaseQuality(amount: number = 1): void {
        if (this.item.quality < 50) {
            this.item.quality = Math.min(50, this.item.quality + amount);
        }
    }
}

class NormalItemStrategy extends ItemStrategy {
    update(): void {
        this.decreaseQuality();
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.decreaseQuality();
        }
    }
}

class AgedBrieStrategy extends ItemStrategy {
    update(): void {
        this.increaseQuality();
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.increaseQuality();
        }
    }
}

class SulfurasStrategy extends ItemStrategy {
    update(): void {
    }
}

class BackstagePassesStrategy extends ItemStrategy {
    update(): void {
        if (this.item.sellIn > 10) {
            this.increaseQuality();
        } else if (this.item.sellIn > 5) {
            this.increaseQuality(2);
        } else if (this.item.sellIn > 0) {
            this.increaseQuality(3);
        } else {
            this.item.quality = 0;
        }
        this.item.sellIn--;
    }
}

class ConjuredItemStrategy extends ItemStrategy {
    update(): void {
        this.decreaseQuality(2);
        this.item.sellIn--;
        if (this.item.sellIn < 0) {
            this.decreaseQuality(2);
        }
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private getStrategy(item: Item): ItemStrategy {
        const itemsName = Object.freeze({
            aged: 'Aged Brie',
            sulfuras: 'Sulfuras, Hand of Ragnaros',
            backstage: 'Backstage passes to a TAFKAL80ETC concert',
        });

        if (item.name === itemsName.aged) {
            return new AgedBrieStrategy(item);
        }
        if (item.name === itemsName.sulfuras) {
            return new SulfurasStrategy(item);
        }
        if (item.name === itemsName.backstage) {
            return new BackstagePassesStrategy(item);
        }
        if (item.name.indexOf('Conjured') === 0) {
            return new ConjuredItemStrategy(item);
        }
        return new NormalItemStrategy(item);
    }

    updateQuality(): Array<Item> {
        this.items.forEach(item => {
            const strategy = this.getStrategy(item);
            strategy.update();
        });
        return this.items;
    }
}

