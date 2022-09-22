interface Product {
    title: string|undefined,
    id: number,
    description?: string|undefined,
    price: number|undefined,
    discountPercentage?: number,
    rating?: number,
    stock?: number,
    brand?: string,
    category?: string,
    thumbnail?: string,
    images?: string[]

}
export default Product;
