import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/", { replace: true });
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img alt="Profile" src={user.photoURL} />
              ) : (
                <img alt="Default Profile" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <a href="/update-profile">Profil</a>
            </li>
            <li>
              <a>Sipariş et</a>
            </li>
            <li>
              <a>Ayarlar</a>
            </li>
            <li>
              <button onClick={handleLogout}>Çıkış yap</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
