import { useState } from 'react';

import { Platform } from 'react-native';

type LoginResponse = {
    message: string;
    user?: {
        id: string;
        name?: string;
        email: string;
    };
};

const API_URL =

    Platform.OS === 'android'

        ? 'http://10.0.2.2:4000'

        : 'http://localhost:4000';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {

        setLoading(true);
        setError(null);

        // Simulate network delay for better UX during development
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data: LoginResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
}

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        // Simulate network delay for better UX during development
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            console.log('Signup process completed');
            setLoading(false);
        }
    };

    return {
        signup,
        loading,
        error,
    };
}