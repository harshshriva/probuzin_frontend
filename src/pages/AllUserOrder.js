import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";

const AllUsersOrder = () => {
  const [allUserOrder, setAllUsersOrder] = useState([]);

  console.log("allUserOrder", allUserOrder);

  const fetchAllUsersOrder = async () => {
    const fetchData = await fetch(SummaryApi.allUserOrder.url, {
      method: SummaryApi.allUserOrder.method,
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsersOrder(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsersOrder();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Product/quantity/price</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="">
          {allUserOrder.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.mobileNumber}</td>
                <td>
                  {el?.allProduct?.map((product, index) => (
                    <div key={index}>
                      <p>product Name-{product?.productId?.productName},{" "}Brand Name-{product?.productId?.brandName},{" "}Quantity-{product?.quantity},{" "}Prices-{product?.productId?.sellingPrice}</p>
                    </div>
                  ))}
                </td>
                <td>{el?.currentLocation}</td>
                <td>{moment(el?.createdAt).format("LLL")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersOrder;
