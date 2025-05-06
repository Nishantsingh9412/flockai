import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { PlusCircle, UserPlus, Edit, Trash2, LogOut, Menu, X } from 'lucide-react';
import { MdOutlineMenu } from "react-icons/md";
import {
  FaCircle,
  FaCross,
  FaEdit,
  FaFireExtinguisher,
  FaPlus,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";
import {
  createMyWishListAction,
  getMyWishListAction,
  updateMyWishlistAction,
} from "../../redux/action/myWishList";
import {
  deleteWishListAction,
  updateWishListAction,
} from "../../redux/action/wishList";
import { createWishListAction } from "../../redux/action/wishList";

const WishlistDashboard = () => {
  const dispatch = useDispatch();

  const loggedInUserData = JSON.parse(localStorage.getItem("Profile"));
  // Get WishListsts

  useEffect(() => {
    dispatch(getMyWishListAction(loggedInUserData._id));
  }, []);

  const myWishLists = useSelector((state) => state.myWishlist.myWishList);
  console.log("My WishLists: ", myWishLists);

  useEffect(() => {
    if (myWishLists.length > 0) {
      dispatch({ type: "ACTIVE_MY_WISH_LIST", data: myWishLists[0] });
    }
  }, [myWishLists, dispatch]);

  const ReducerActiveWishList = useSelector(
    (state) => state.myWishlist.activeWishList
  );
  console.log("ReducerActiveWishList: ", ReducerActiveWishList);

  //   const [currentUser, setCurrentUser] = useState({
  //     email: "user@example.com",
  //     name: "John Doe",
  //   });

  // State for wishlists
  //   const [wishlists, setWishlists] = useState([
  //     {
  //       id: 1,
  //       name: "Birthday Wishlist",
  //       items: [
  //         {
  //           id: 1,
  //           name: "Headphones",
  //           price: 199.99,
  //           imageUrl: "https://picsum.photos/200/300.jpg",
  //           addedBy: "John Doe",
  //         },
  //         {
  //           id: 2,
  //           name: "Book: React Patterns",
  //           price: 39.99,
  //           imageUrl: "https://picsum.photos/200/300.jpg",
  //           addedBy: "Jane Smith",
  //         },
  //       ],
  //       members: ["John Doe", "Jane Smith"],
  //     },
  //     {
  //       id: 2,
  //       name: "Home Decor",
  //       items: [
  //         {
  //           id: 3,
  //           name: "Plant Pot",
  //           price: 24.99,
  //           imageUrl: "/api/placeholder/100/100",
  //           addedBy: "John Doe",
  //         },
  //       ],
  //       members: ["John Doe"],
  //     },
  //   ]);

  //   const [activeWishlist, setActiveWishlist] = useState();
  const [showNewWishlistModal, setShowNewWishlistModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  // Create new wishlist
  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) return;

    const newWishlist = {
      wishListName: newWishlistName,
      userId: loggedInUserData._id,
    };

    dispatch(createMyWishListAction(newWishlist))
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          console.log("New Wishlist Created: ", res?.result);
          //   setWishlists([...wishlists, res.result]);
          dispatch({ type: "ACTIVE_MY_WISH_LIST", data: ReducerActiveWishList });
        } else {
          console.error("Error creating wishlist: ", res.message);
        }
      })
      .catch((error) => {
        console.error("Error creating wishlist: ", error.message);
      })
      .finally(() => {
        console.log("New Wishlist API Called :");
        setNewWishlistName("");
        setShowNewWishlistModal(false);
      });
  };

  // Add new item to active wishlist
  const handleAddItem = () => {
    // if (!newItemName.trim() || !newItemPrice) return;
    const newItem = {
      productName: newItemName,
      productPrice: parseFloat(newItemPrice),
      productImage: newItemImage || undefined,
      createdBy: loggedInUserData._id,
      updatedBy: loggedInUserData._id,
    };

    dispatch(createWishListAction(newItem))
      .then((res) => {
        console.log("res---------------------------------------", res);
        if (res.success) {
          const updatedData = {
            // ...ReducerActiveWishList,
            items: [...ReducerActiveWishList.items, res.data._id],
          };
          dispatch(
            updateMyWishlistAction(ReducerActiveWishList._id, updatedData)
          );
          //   console.log("New Item Created: ", res?.data);
          //   console.log("-----------------------------------------------------------------------")
          //   console.log(res?.data?._id);
          // setWishlists([...wishlists, res.result]);
          dispatch({
            type: "ACTIVE_MY_WISH_LIST",
            data: ReducerActiveWishList,
          });
        } else {
          console.error("Error creating item: ", res.message);
        }
      })
      .catch((error) => {
        console.error("Error creating item: ", error.message);
      })
      .finally(() => {
        console.log("New Item API Called :");
        setNewItemName("");
        setNewItemPrice("");
        setNewItemImage("");
        setShowAddItemModal(false);
      });

    // const updatedWishlist = {
    //   ...activeWishlist,
    //   items: [...activeWishlist.items, newItem],
    // };
    // const updatedWishlists = myWishLists.map((list) =>
    //   list.id === activeWishlist.id ? updatedWishlist : list
    // );
    // setWishlists(updatedWishlists);
    // setActiveWishlist(updatedWishlist);
    // dispatch({ type: "ACTIVE_MY_WISH_LIST", data: updatedWishlist });
    // setNewItemName("");
    // setNewItemPrice("");
    // setNewItemImage("");
    // setShowAddItemModal(false);
  };

  // Remove item from active wishlist
  const handleRemoveItem = (itemId) => {
    dispatch(
      updateMyWishlistAction(
        ReducerActiveWishList._id,
        ReducerActiveWishList.items.filter((item) => item._id !== itemId)
      )
    )
      .then((res) => {
        console.log("-------------------------------- -----------------");
        console.log("res", res);
        if (res.success) {
          console.log("res", res);
          console.log("Item removed from wishlist: ", res?.result);
          dispatch(deleteWishListAction(itemId));
          dispatch(getMyWishListAction(loggedInUserData._id));
          dispatch({ type: "UPDATE_MY_WISH_LIST", data: res.result });
        } else {
          console.error("Error updating wishlist: ", res.message);
        }
      })
      .catch((error) => {
        console.error("Error updating wishlist: ", error.message);
      })
      .finally(() => {
        console.log("Remove Item API Called :");
      });
    // const updatedItems = activeWishlist.items.filter(
    //   (item) => item.id !== itemId
    // );
    // const updatedWishlist = { ...activeWishlist, items: updatedItems };
    // const updatedWishlists = wishlists.map((list) =>
    //   list.id === activeWishlist.id ? updatedWishlist : list
    // );
    // setWishlists(updatedWishlists);
    // setActiveWishlist(updatedWishlist);
    // dispatch({ type: "ACTIVE_MY_WISH_LIST", data: updatedWishlist });
  };

  // Edit item
  const handleEditItem = () => {
    const updatedData = {
      productName: newItemName,
      productPrice: parseFloat(newItemPrice),
      productImage: newItemImage || undefined,
      updatedBy: loggedInUserData._id,
    };

    dispatch(updateWishListAction(currentItem._id, updatedData)).then((res) => {
      if (res.success) {
        console.log("Item updated successfully: ", res?.result);
        dispatch(getMyWishListAction(loggedInUserData._id)).then((res) => {
          if (res.success) {
            setNewItemName("");
            setNewItemPrice("");
            setNewItemImage("");
            setCurrentItem(null);
            setShowEditItemModal(false);
          } else {
            console.error("Error updating item: ", res.message);
          }
        });
        // dispatch(getMyWishListAction(loggedInUserData._id));
        // // dispatch({ type: "UPDATE_MY_WISH_LIST", data: res.result });
      }
    });
  };

  // Open edit modal with item data
  const openEditModal = (item) => {
    setCurrentItem(item);
    setNewItemName(item.productName);
    setNewItemPrice(item.productPrice.toString());
    setNewItemImage(item.productImage || "");
    setShowEditItemModal(true);
  };

  //   Invite user to wishlist
  const handleInviteUser = () => {
    if (!inviteEmail.trim()) return;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail);
    if (!isValidEmail) {
      console.error("Invalid email format");
      return;
    }

    const updatedSharedData = {
      members: [...ReducerActiveWishList.members, inviteEmail],
    };

    dispatch(
      updateMyWishlistAction(ReducerActiveWishList._id, updatedSharedData)
    ).then((res) => {
      if (res.success) {
        console.log("User invited successfully: ", res);
        dispatch(getMyWishListAction(loggedInUserData._id))
          .then((res) => {
            if (res.success) {
              setInviteEmail("");
              setShowInviteModal(false);
            } else {
              console.error("Error inviting user: ", res.message);
            }
          })
          .catch((error) => {
            console.error("Error inviting user: ", error.message);
          })
          .finally(() => {
            console.log("Invite User API Called :");
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Wishlist App</h1>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="bg-indigo-700 px-3 py-1 rounded-full text-sm">
                {loggedInUserData.email}
              </span>
            </div>
            {/* <button className="flex items-center space-x-1 bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800 transition duration-200">
              <FaFireExtinguisher size={16} />
              <span className="hidden md:inline">Logout</span>
            </button> */}
            <button
              className="md:hidden bg-indigo-700 p-1 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FaCross size={24} />
              ) : (
                <MdOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 text-white shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <div className="py-2 border-b border-indigo-600 mb-2">
              {loggedInUserData.email}
            </div>
            <div className="py-2 border-t border-indigo-600">
              {myWishLists?.map((list) => (
                <div
                  key={list._id}
                  className={`py-2 px-2 rounded-md mb-1 ${
                    ReducerActiveWishList._id === list._id
                      ? "font-bold bg-indigo-800"
                      : "hover:bg-indigo-600"
                  }`}
                  onClick={() => {
                    // setActiveWishlist(list);
                    dispatch({ type: "ACTIVE_MY_WISH_LIST", data: list });
                    setMobileMenuOpen(false);
                  }}
                >
                  {list.wishListName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-lg mr-6 sticky top-4 self-start">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              My Wishlists
            </h2>
            <ul className="space-y-2">
              {myWishLists?.map((list) => (
                <li
                  key={list._id}
                  className={`px-3 py-2 rounded cursor-pointer transition duration-150 ${
                    ReducerActiveWishList?._id === list._id
                      ? "bg-indigo-100 text-indigo-800 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    // setActiveWishlist(list);
                    dispatch({ type: "ACTIVE_MY_WISH_LIST", data: list });
                  }}
                >
                  {list.wishListName}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 hover:cursor-pointer transition duration-200 shadow-sm"
            onClick={() => setShowNewWishlistModal(true)}
          >
            <FaPlus size={16} />
            <span>New Wishlist</span>
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {ReducerActiveWishList?.wishListName || "My Wishlist"}
            </h2>
            <div className="flex space-x-2">
              <button
                className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700  transition duration-200 shadow-sm hover:cursor-pointer"
                onClick={() => setShowAddItemModal(true)}
              >
                <FaPlus size={16} />
                <span>Add Item </span>
              </button>
              <button
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition duration-200 shadow-sm"
                onClick={() => setShowInviteModal(true)}
              >
                <FaUserPlus size={16} />
                <span>Invite</span>
              </button>
            </div>
          </div>

          {/* Items grid */}
          {!ReducerActiveWishList ||
          !ReducerActiveWishList.items ||
          ReducerActiveWishList.items.length === 0 ? (
            <div className="text-center py-16 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-400 mb-2">
                <FaCircle size={36} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">
                No items in this wishlist yet. Add your first item!
              </p>
              <button
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 hover:cursor-pointer"
                onClick={() => setShowAddItemModal(true)}
              >
                Add Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ReducerActiveWishList.items.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                    <img
                      src={item?.productImage}
                      alt={item?.productName}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-sm font-bold m-2 rounded">
                      {item?.productPrice?.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.productName}
                    </h3>
                    <p className="text-green-600 font-bold">
                      {item?.productPrice?.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Added by: {item?.createdBy?.fname}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Last Updated by: {item?.updatedBy?.fname}
                    </p>

                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition duration-150 hover:cursor-pointer"
                        onClick={() => openEditModal(item)}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-150 hover:cursor-pointer"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Shared</h3>
            <div className="flex flex-wrap">
              {ReducerActiveWishList?.members &&
              ReducerActiveWishList?.members?.length > 0 ? (
                ReducerActiveWishList?.members?.map((member, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm m-1"
                  >
                    {member}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">
                  No members added yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* New Wishlist Modal */}
      {showNewWishlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex justify-between">
              <span>Create New Wishlist</span>
              <button
                onClick={() => setShowNewWishlistModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </h3>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
              placeholder="Wishlist Name"
              value={newWishlistName}
              onChange={(e) => setNewWishlistName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-150"
                onClick={() => setShowNewWishlistModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150"
                onClick={handleCreateWishlist}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex justify-between">
              <span>Add New Item</span>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="0.00"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="https://example.com/image.jpg"
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-150 hover:cursor-pointer"
                onClick={() => setShowAddItemModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150 hover:cursor-pointer "
                onClick={() => {
                  handleAddItem(ReducerActiveWishList);
                }}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex justify-between">
              <span>Edit Item</span>
              <button
                onClick={() => setShowEditItemModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="0.00"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="https://example.com/image.jpg"
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-150"
                onClick={() => setShowEditItemModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150"
                onClick={handleEditItem}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex justify-between">
              <span>Invite Someone to This Wishlist</span>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                placeholder="email@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-150 hover:cursor-pointer"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-150 hover:cursor-pointer"
                onClick={handleInviteUser}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistDashboard;
