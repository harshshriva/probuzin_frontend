import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helper.js/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const [showForm, setShowForm] = useState(false);
  const [dataOrder, setDataOrder] = useState({
    allProduct: [],
    name: "",
    mobileNumber: "",
    currentLocation: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setDataOrder((prevState) => ({
        ...prevState,
        allProduct: data,
      }));
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const orderSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataOrder),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");

      data.forEach((product, index) => {
        deleteCartProduct(product._id);
      });
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="my-5 flex justify-center">
        {data.length === 0 && !loading && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full sm:max-w-md p-4 sm:p-6 text-center">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-3xl sm:text-4xl text-red-500 mb-3 sm:mb-4"
            />
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              Oops! No Data Found
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              <Link to={"/"} className="text-blue-500 hover:underline">
                Please Add Your Product in Cart!
              </Link>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data?.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm pt-3">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <>
              {!showForm && totalPrice !== 0 && (
                <div className="h-36 bg-white shadow-md rounded-lg">
                  <h2 className="text-white bg-red-600 px-4 py-2 rounded-t-lg text-xl">
                    Summary
                  </h2>
                  <div className="flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQty}</p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600">
                    <p>Total Price</p>
                    <p>{displayINRCurrency(totalPrice)}</p>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 p-2 text-white w-full mt-2 rounded-b-lg"
                    onClick={() => setShowForm(true)}
                  >
                    Submit Your Details
                  </button>
                </div>
              )}
            </>
          )}
          {showForm && totalPrice !== 0 && (
            <div className="flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Order Details
                </h2>
                <form className="flex flex-col gap-4" onSubmit={orderSubmit}>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Name:</label>
                    <div className="bg-slate-100 p-3 rounded-md mt-1">
                      <input
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={dataOrder.name}
                        onChange={handleInputChange}
                        required
                        className="w-full h-full outline-none bg-transparent text-gray-800"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Mobile Number:
                    </label>
                    <div className="bg-slate-100 p-3 rounded-md mt-1">
                      <input
                        type="number"
                        placeholder="Enter mobile number"
                        name="mobileNumber"
                        value={dataOrder.mobileNumber}
                        onChange={handleInputChange}
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit mobile number"
                        required
                        className="w-full h-full outline-none bg-transparent text-gray-800"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">
                      Current Location:
                    </label>
                    <div className="bg-slate-100 p-3 rounded-md mt-1">
                      <input
                        type="text"
                        placeholder="Enter your current location"
                        name="currentLocation"
                        value={dataOrder.currentLocation}
                        onChange={handleInputChange}
                        required
                        className="w-full h-full outline-none bg-transparent text-gray-800"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all transform mx-auto mt-6"
                  >
                    Submit Order
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
