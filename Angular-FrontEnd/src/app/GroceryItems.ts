import { Category } from "./Category"

export class GroceryItems{
    id:number
    name:string
    category:number | null
    quantity:number | null
    categories: Category | null
}