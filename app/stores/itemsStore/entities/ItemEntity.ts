export interface ItemBaseInfoInterface {
    productID: number;
    familyID: number;
    name: string;
    imgPath?: string;
    color?: string;
    dtValidity?: string;
    dtCreation?: string;
}

class ItemEntity implements ItemBaseInfoInterface {
    public readonly productID: number;
    public readonly familyID: number;
    public readonly name: string;
    public imgPath?: string | undefined;
    public color?: string | undefined;
    public dtValidity?: string | undefined;
    public dtCreation?: string | undefined;

    constructor({ productID, familyID, name }: ItemBaseInfoInterface) {
        this.productID = productID;
        this.familyID = familyID;
        this.name = name;
    }

    public setImage(imgPath: string): ItemEntity {
        this.imgPath = imgPath;
        return this;
    }

    public setColor(color: string): ItemEntity {
        this.color = color;
        return this;
    }

    public setCreationDate(dtValidity: string): ItemEntity {
        this.dtValidity = dtValidity;
        return this;
    }

    public setValidityDate(dtCreation: string): ItemEntity {
        this.dtCreation = dtCreation;
        return this;
    }

    public freeze(): ItemEntity {
        Object.freeze(this);
        return this;
    }
}

export default ItemEntity;
