import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage'; 
import AccountNav from '../AccountNav';
import AdminPage from './AdminPage';

export default function ProfilePage() {

    const [redirect, setRedirect] = useState(null);  
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    // useEffect(() => {
    //     console.log('Subpage:', subpage);
    //     console.log('User isAdmin:', user?.isAdmin);
    // }, [subpage, user]);

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/log in'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} <br />
                    {user.isAdmin ? (
                        <div className='flex h-6'>
                            <AdminPage />
                        </div>
                    ) : (
                        <button onClick={logout} className='primary max-w-sm mt-2'>LogOut</button>
                    )}
                </div>
            )}
            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    );
}
