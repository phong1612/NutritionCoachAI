import { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseCli';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../../context/AuthContext'
import { getProfile, updateProfile, saveProfile } from '../../services/profileServices';
import styles from './UserProfile.module.css';

export default function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const navigate = useNavigate();
    const { session, signInUser } = userAuth()
    const user = session?.user

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getProfile();
                console.log("Fetched user profile:", profile);
                setUserProfile(profile);
                setEditProfile(profile); // Initialize editProfile with fetched profile
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    async function handleSaveProfile() {
        try {
            await saveProfile(editProfile);

            // Update the displayed profile only after save succeeds
            setUserProfile(editProfile);

            console.log("Profile saved successfully");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    }

    async function handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return ;
        try {
            const userId = user.id;

            const filePath = `${userId}/${Date.now()}-${file.name}`;

            // Upload file
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) {
                console.error("Error uploading avatar:", uploadError);
                return;
            }

            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);
            const publicUrl = data.publicUrl;

            // Update Profile with new avatar URL
            const {error: updateError} = await supabase
                .from("profiles")
                .update({ avatar_url: data.publicUrl })
                .eq("id", userProfile.id);

            if (updateError) {
                console.error("Error updating profile:", updateError);
                return;
            }
            console.log("Avatar updated successfully:", publicUrl);

            setUserProfile((prev) => ({
                ...prev,
                avatar_url: publicUrl,
            }));
        } catch (error) {
            console.error("Error handling avatar upload:", error);
        }
    }

    return (
        <div className={styles["userProfile-container"]}>
            <p onClick={() => navigate('/dashboard')}>← Back to Dashboard</p>
            
            <div className={styles["profile-container"]}>
                {/* Display User Profile Information */}
                <div className={styles["profile-display-container"]}>
                    <img src={userProfile.avatar_url || 'https://placehold.net/avatar.png'} alt="User Avatar" className={styles["avatar"]} />
                    <label htmlFor="avatar-upload">⬆ Upload Avatar</label>
                    <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        style={{ display: 'none' }}
                    />

                    <p>Username: {userProfile.username || 'Not specified'}</p>
                    <p>Full Name: {userProfile.full_name || 'Not specified'}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Date of Birth: {userProfile.dob || 'Not specified'}</p>
                    <p>Gender: {userProfile.gender || 'Not specified'}</p>
                </div>

                {/* Update User Profile Form */}
                <div className={styles["profile-update-container"]}>
                    
                    <h1>Update Profile</h1>
                    <p>Email: {userProfile.email}</p>
                    <div className={styles["Username-container"]}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={editProfile.username}
                            onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
                        />
                    </div>

                    <div className={styles["Fullname-container"]}>
                        <label htmlFor="full_name">Full Name:</label>
                        <input
                            type="text"
                            id="full_name"
                            value={editProfile.full_name}
                            onChange={(e) => setEditProfile({ ...editProfile, full_name: e.target.value })}
                        />
                    </div>

                    <div className={styles["Dob-container"]}>
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" id="dob" value={editProfile.dob} onChange={(e) => setEditProfile({ ...editProfile, dob: e.target.value })} />
                    </div>

                    <div className={styles["gender-container"]}>
                        <label htmlFor="gender-select">What's your gender:</label>
                        <select name="gender" id="gender-select" value={editProfile.gender} onChange={(e) => setEditProfile({ ...editProfile, gender: e.target.value })}>
                            <option value="">--Please choose an option--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <button onClick={handleSaveProfile}>Save Profile</button>
                </div>
            </div>

            
            
        {/* Add more user profile details as needed */}
        </div>
    );
}