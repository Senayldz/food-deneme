import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';

const CartPage = () => {
  const [cart, refetch] = useCart();
  const user = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Fiyat hesaplama fonksiyonu
  const calculatePrice = (item) => item.price * item.quantity;

  // Miktarı azaltma fonksiyonu
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then(() => {
          const updatedCart = cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
          setCartItems(updatedCart);
          refetch(); // Verileri yenile
        });
    } else {
      Swal.fire('Miktar 1’den az olamaz');
    }
  };

  // Miktarı artırma fonksiyonu
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then(() => {
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCartItems(updatedCart);
        refetch(); // Verileri yenile
      });
  };

  // Ürün silme fonksiyonu
  const handleDelete = (item) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu ürünü silmek istediğinize emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, sil!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Silindi!', 'Ürün başarıyla silindi.', 'success');
              refetch(); // Verileri yenile
            }
          });
      }
    });
  };

  // toplam tutar
  const cartSubTotal = cart.reduce(
    (total, item) => total + calculatePrice(item),
    0
  );

  const orderTotal = cartSubTotal;

  return (
    <div className="section-container">
      {/* Sayfa başlığı */}
      <div className="w-full py-16 bg-light-gray">
        <div className="max-w-2xl mx-auto text-center space-y-5 my-7">
          <h2 className="text-5xl font-bold text-green my-7">Sepetim</h2>
        </div>
      </div>

      {/* Ürün tablosu */}
      <div className="overflow-x-auto mt-8">
        <table className="table-auto w-full text-center border-collapse">
          <thead className="bg-green text-white">
            <tr>
              <th>#</th>
              <th>Ürün Resmi</th>
              <th>Ürün Adı</th>
              <th>Miktar</th>
              <th>Fiyat</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>{calculatePrice(item).toFixed(2)} TL</td>
                <td>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alışveriş detayları */}
      <div className="mt-10 text-center">
        <h3 className="text-lg font-medium">Alışveriş Detayları</h3>
        <p>Toplam Ürün: {cart.length}</p>
        <p>Toplam Fiyat:{orderTotal.toFixed(2)} TL</p>
      </div>
    </div>
  );
};

export default CartPage;
