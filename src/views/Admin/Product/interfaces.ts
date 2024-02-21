
export type IBodyUser = {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    avatar?: string;
    birthday?: string;
};
export type IProduct={
    id:string
    name:string;
    price:number;
    quantity:number;
    description:string;
}
export type  IProductGetAll= {
    items: [];
    totalItems: number;
}