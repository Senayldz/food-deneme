import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);

    // Sadece kullanıcı e-posta adresi mevcutsa sorguyu etkinleştir
    const { refetch, data: cart = [], error } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    // Hata yönetimi eklemek de iyi bir fikir olabilir
    if (error) {
        console.error('Error fetching cart:', error);
    }

    return [cart, refetch];
};

export default useCart;
