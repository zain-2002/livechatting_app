'use client'
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '../config/firebase';
import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';


const auth = getAuth(firebase_app);


export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const router=useRouter();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if (user) {
            setUser(user)
            router.replace('/dashboard')
            } else {
                setUser(null);
                router.replace('/login')
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Auth0Provider
        domain="dev-7e1ndy7h2g2aiocu.us.auth0.com"
        clientId="OBuBNjVvz4kPkcoDPuLCDbqEpLKA0Ix7"
       
      >
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
        </Auth0Provider>
    );
};