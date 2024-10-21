const backendDomin = "http://localhost:8080/api";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendDomin}/checkout`,
    method: "post",
  },
  createOrder: {
    url: `${backendDomin}/orders/create`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/orders`,
    method: "get",
  },
  allOrder: {
    url: `${backendDomin}/allOrders`,
    method: "get",
  },
 
};

export default SummaryApi;
