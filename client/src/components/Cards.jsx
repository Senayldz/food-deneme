import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'
const Cards = ({ item }) => {
  const { _id, name, recipe, image, category, price } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation();


  //add to cart button
  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: item._id,
        name: item.name,
        quantity: 1,
        image: item.image,
        category: item.category,
        price: item.price,
        email: user.email
      };
  
  
  
      fetch('http://localhost:6001/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text || 'Network response was not ok');
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log('Server Response:', data); // Yanıtı kontrol edin
          if (data._id) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Item added to cart',
              showConfirmButton: false,
              timer: 1500,
            });
          } 
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong! ${error.message}`,
          });
        });
    } else {
      Swal.fire({
        title: 'You need to sign in',
        text: 'You must be logged in to add items to the cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign In',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
  
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Item" className="hover:scale-105 transition-all duration-300 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-white">$</span> {price}
          </h5>
          <button className="btn bg-green text-white" onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

};

export default Cards;