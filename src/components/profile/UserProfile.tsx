import React from 'react';
import UpdateUserDetails from './UpdateUserDetails';
import UpdateProfileImage from './UpdateProfileImage';
import ChangePasswordForm from './ChangePasswordForm';

const UserProfile = () => {
    return (
        <div className='p-3 space-y-6'>
            <UpdateProfileImage></UpdateProfileImage>
            <UpdateUserDetails></UpdateUserDetails>
            <ChangePasswordForm></ChangePasswordForm>
        </div>
    );
};

export default UserProfile;