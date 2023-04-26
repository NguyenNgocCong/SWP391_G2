const KEY_CART = "LOCAL_KEY_CART_13123122892";
export class CartStore {
  static setCartLocal({ packages, combos }) {
    localStorage.setItem(KEY_CART, JSON.stringify({ packages, combos }));
  }
  static getCartLocal() {
    const data = localStorage.getItem(KEY_CART);
    if (!data) return { packages: [], combos: [] };

    const { packages, combos } = JSON.parse(data);
    return { packages, combos };
  }
}
