export class Productdetail {
    id: number
    description: string
    price: number

    constructor(id=0, description='', price=0 )
    {
    this.id = id
    this.description = description
    this.price = price
    }
}
