import { useEffect, useState } from "react";
import { fetchProducts } from "../rtk/slices/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/slices/cart-slice";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts());
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [dispatch]);

  const filterItems = (curItem) => {
    const filteredItem = products.filter((newItem) => {
      return newItem.category === curItem;
    });
    setItems(filteredItem);
  };

  useEffect(() => {
    setItems(products);
  }, [products]);


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setItems(searchResults);
  };


  if (loading) {
    return (
      <div className="container mx-auto flex flex-row flex-wrap justify-center items-center gap-4 pt-10">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 w-96 shadow-xl border border-gray-600 mb-4 min-h-96"
          >
            <div className="skeleton h-40 w-full"></div>
            <div className="card-body">
              <div className="skeleton h-6 w-3/4 mb-2"></div>
              <div className="skeleton h-4 w-full mb-4"></div>
              <div className="card-actions justify-between items-center">
                <div className="skeleton h-4 w-1/4"></div>
                <div className="skeleton h-10 w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }



  return (
    <>
      <div className="container mx-auto flex flex-col-reverse md:flex-row md:justify-around md:items-center mt-12">
        <div className="breadcrumbs text-sm mx-auto mt-5">
          <ul>
            <li>
              <a
                onClick={() => {
                  setItems(products);
                }}
              >
                All Products
              </a>
            </li>
            <li>
              <a onClick={() => filterItems("men's clothing")}>Mens Clothing</a>
            </li>
            <li>
              <a onClick={() => filterItems("women's clothing")}>
                Womens Clothing
              </a>
            </li>
            <li>
              <a onClick={() => filterItems("electronics")}>Electronics</a>
            </li>
            <li>
              <a onClick={() => filterItems("jewelery")}>Jewelery</a>
            </li>
          </ul>
        </div>

        <label className="input input-bordered flex items-center gap-2 max-w-xs mx-auto">
          <input type="text" className="grow" placeholder="Search" onInput={handleSearch}/>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="container mx-auto flex flex-row flex-wrap justify-center items-center gap-4 pt-10">
        {items.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 w-96 shadow-xl border border-gray-600 mb-4 min-h-96"
          >
            <figure>
              <img
                className="w-full max-h-44"
                src={
                  product.image ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={product.title || "Product Image"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.title.split(" ").slice(0, 3).join(" ") ||
                  "Product Name"}
              </h2>
              <p>
                {product.description.split(" ").slice(0, 15).join(" ") ||
                  "No description available"}
              </p>
              <div className="card-actions justify-between items-center">
                <span className="text-base font-bold">{product.price} $</span>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(addToCart(product));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
