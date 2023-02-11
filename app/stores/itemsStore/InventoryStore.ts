import { useState } from 'react';
import { ItemBaseInfoInterface } from './entities/ItemEntity';

type SimpleInventory = Map<number, ItemBaseInfoInterface>;
type ItemFamilyInventory = { familyID: number; items: SimpleInventory; size: number };
type FractionedInventory = Map<number, ItemFamilyInventory>;

const [simpleInventory, setSimpleInventory] = useState<SimpleInventory>(new Map());
const [fractionedInventory, setFractionedInventory] = useState<FractionedInventory>(new Map());

export function addItem(item: ItemBaseInfoInterface): void {
    addItemToSimpleInventory(item);
    addItemToCompleteInventory(item);
}

function addItemToSimpleInventory(item: ItemBaseInfoInterface): void {
    const newInventory = new Map(simpleInventory);
    newInventory.set(item.productID, item);
    setSimpleInventory(newInventory);
}

function addItemToCompleteInventory(item: ItemBaseInfoInterface): void {
    const newInventory: FractionedInventory = new Map(fractionedInventory);
    const fallbackItemFamilyInventory: ItemFamilyInventory = {
        familyID: item.familyID,
        items: new Map([[item.productID, item]]),
        get size() {
            return this.items.size;
        },
    };
    const newItemFamilyInventory: ItemFamilyInventory = fractionedInventory.get(item.familyID) ?? fallbackItemFamilyInventory;
    newInventory.set(item.familyID, newItemFamilyInventory);
    setFractionedInventory(newInventory);
}

export function deleteItem(item: ItemBaseInfoInterface): void;
export function deleteItem(productID: number): void;
export function deleteItem(item: ItemBaseInfoInterface | number): void {
    deleteItemFromSimpleInventory(getProductID(item));
    deleteItemFromFractionedInventory(getProductID(item), getFamilyID(item));
}

function deleteItemFromSimpleInventory(productID: number): void {
    const newSimpleInventory = new Map(simpleInventory);
    newSimpleInventory.delete(productID);
    setSimpleInventory(newSimpleInventory);
}

function deleteItemFromFractionedInventory(productID: number, familyID: number): void {
    const newFractionedInventory = new Map(fractionedInventory);
    const itemFamilyInventory = newFractionedInventory.get(familyID);
    if (!itemFamilyInventory) {
        return;
    }
    itemFamilyInventory.items.delete(productID);
    itemFamilyInventory.size === 0 && newFractionedInventory.delete(familyID);
    setFractionedInventory(newFractionedInventory);
}

export function exists(productID: number): boolean {
    return simpleInventory.has(productID);
}

export function getAvailableProducts(familyID: number): number {
    return fractionedInventory.get(familyID)?.size ?? 0;
}

function getProductID(item: ItemBaseInfoInterface | number): number {
    return typeof item === 'number' ? item : item.productID;
}

function getFamilyID(item: ItemBaseInfoInterface | number): number {
    return typeof item === 'number' ? item : item.familyID;
}
