export interface Dish {
    _id:         string;
    name:        string;
    description: string;
    stock:       number;
    price:       number;
    status:      string;
    url_img:     string;
    created_at:  Date;
    updated_at:  Date;
    __v:         number;
}