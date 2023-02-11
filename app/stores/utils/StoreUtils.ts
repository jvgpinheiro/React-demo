let uniqueProductID: number = 1;
export function generateProductID(): number {
    return uniqueProductID++;
}

let uniquePersonID: number = 1;
export function generatePersonID(): number {
    return uniquePersonID++;
}
