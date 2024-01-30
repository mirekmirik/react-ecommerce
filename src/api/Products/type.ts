export type ImageOfProduct = string;

export type CategoryOfProduct = {
    "id": number,
      "name": string,
      "image": ImageOfProduct
      "creationAt": Date,
      "updatedAt": Date
}

export type Product = {
    "id": number,
    "title": string,
    "price": number,
    "description": string,
    "images": ImageOfProduct[],
    "creationAt": Date,
    "updatedAt": Date,
    "category": {
      "id": 2,
      "name": "Electronics",
      "image": "https://i.imgur.com/ZANVnHE.jpeg",
      "creationAt": "2024-01-23T02:52:35.000Z",
      "updatedAt": "2024-01-23T02:52:35.000Z"
    }
}
