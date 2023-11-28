class Product {
  private id: number;
  private name: string;
  private cost: number;

  constructor(id: number, name: string, cost: number) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCost(): number {
    return this.cost;
  }
}

class ShoppingCart {
  private static instance: ShoppingCart;
  private products: Product[] = [];

  private constructor() {}

  public addProduct(product: Product) {
    this.products.push(product);
  }

  public deleteById(id: number) {
    const index = this.products.findIndex((item) => item.getId() === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  public static getInstance(): ShoppingCart {
    if (!ShoppingCart.instance) {
      ShoppingCart.instance = new ShoppingCart();
    }
    return ShoppingCart.instance;
  }

  public getProducts(): Product[] {
    return this.products;
  }
}

function shoppingApp() {
  const cart1 = ShoppingCart.getInstance();
  const cart2 = ShoppingCart.getInstance();
  const prod1 = new Product(1, "Apple", 21);
  const prod2 = new Product(2, "Orange", 29);
  const prod3 = new Product(3, "Strawberry", 94);

  cart1.addProduct(prod1);
  cart1.addProduct(prod2);
  cart2.addProduct(prod3);

  console.log(cart1 === cart2);
  console.log(cart1.getProducts());
  console.log(cart2.getProducts());

  cart1.deleteById(3);
  console.log(cart1.getProducts());
  console.log(cart2.getProducts());
}

shoppingApp();