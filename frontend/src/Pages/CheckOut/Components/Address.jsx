import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressForm from "../../Address/Components/AddressForm";
import { setAddress } from "../../../Store/Checkout";

const Address = () => {
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [selectedAddress, setSelectedAddress] = useState(user.myAddresses[0]);
  const dispatch = useDispatch();
  // const selectedCheckoutAddress = useSelector(
  //   (state) => state.checkout.selectedAddress
  // );

  const handleSelectAddress = (address) => {
    // You can handle selecting an address here
    console.log("Selected Address:", address);
    setSelectedAddress(address);
    dispatch(setAddress(address));
  };

  const handleAddAddress = () => {
    setShowForm(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {!showForm && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Select Shipping/Billing Address
          </h2>
          <button
            className="mb-4 px-4 py-2 border border-dashed rounded-md text-blue-600 cursor-pointer"
            onClick={handleAddAddress}
          >
            + Add New Delivery Address
          </button>
          <div className="flex flex-wrap gap-4 sm:flex-col md:flex-row">
            {user.myAddresses.map((address, index) => (
              <div
                key={index}
                className={`border border-gray-400 p-4 rounded-md w-full md:w-1/2 lg:w-1/3 ${
                  selectedAddress?._id === address?._id
                    ? "border-green-600"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  onChange={() => handleSelectAddress(address)}
                  className="mr-2"
                  checked={selectedAddress?._id === address?._id}
                />
                <strong>{address.name}</strong>
                <p className="mt-2 w-full sm:w-auto">Shipping Address</p>
                <p className="w-full sm:w-auto">
                  {address.AreaoRLocality}, {address.city}, {address.state} -{" "}
                  {address.postalCode}, {address.country}
                </p>
                <p className="mt-4 w-full sm:w-auto">Billing Address</p>
                <p className="w-full sm:w-auto">
                  {address.AreaoRLocality}, {address.city}, {address.state} -{" "}
                  {address.postalCode}, {address.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div>
          <AddressForm onCancel={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Address;
