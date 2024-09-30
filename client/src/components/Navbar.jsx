import React, { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { AuthContext } from "../context/AuthProvider";
import { Link } from 'react-router-dom';
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  const { user } = useContext(AuthContext);
  const [cart, refetchCart] = useCart();

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <a href="/">Anasayfa</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menü</summary>
          <ul className="p-2 text-black">
            <li>
              <a href="/menu">Tümü</a>
            </li>
            <li>
              <a href="#">Salata</a>
            </li>
            <li>
              <a href="#">Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Hizmetler</summary>
          <ul className="p-2 text-black">
            <li>
              <a href="#">Online Sipariş</a>
            </li>
            <li>
              <a href="#">Masa Rezervasyonu</a>
            </li>
            <li>
              <a href="#">Sipariş Takibi</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="#">Kampanyalar</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 text-white ${isSticky ? "shadow-md bg-base-100 bg-drkGreen transition-all duration-300 ease-in-out" : ""
          }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
            >
              {navLinks}
            </ul>
          </div>
          <a href="/">
            <h1>Logo</h1>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link to="cart-page">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center mr-3"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
              </div>
            </div>
          </Link>

          {/* Giriş butonu */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white"
            >
              <FaRegUser /> Giriş Yap
            </button>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
