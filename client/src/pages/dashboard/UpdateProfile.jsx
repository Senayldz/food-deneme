import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const { updateUserProfile, currentUser } = useContext(AuthContext); // currentUser'ı ekleyin
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // State for holding the photo URL
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');

    useEffect(() => {
        // Sync the photoURL with currentUser's photoURL
        setPhotoURL(currentUser?.photoURL || '');
    }, [currentUser]);

    const onSubmit = (data) => {
        const name = data.name;
        const newPhotoURL = data.photoURL;

        updateUserProfile(name, newPhotoURL)
            .then(() => {
                // Profile updated!
                navigate(from, { replace: true });
            })
            .catch((error) => {
                // An error occurred
                console.error("Error updating profile:", error);
            });
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='font-bold'>Update Your Profile</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="your name"
                            className="input input-bordered text-black"
                            defaultValue={currentUser?.displayName || ''}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo URL</span>
                        </label>
                        <input
                            type="text"
                            {...register("photoURL")}
                            placeholder="photoURL"
                            className="input input-bordered text-black"
                            defaultValue={photoURL}
                            required
                        />
                        {/* TODO: Uploading image will be handled later */}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
