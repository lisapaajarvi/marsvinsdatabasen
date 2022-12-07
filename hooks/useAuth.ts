import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from '../firebaseConfig';

const useAuth = () => {
    const [user, setUser] = useState({} as User | null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user && user.uid ? true : false);
            setUser(user);
        });
    });
    return { user, isLoggedIn };
};

export default useAuth;
