import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (authCode) {
            fetchAccessToken(authCode);
        }
    }, [authCode]);


    const fetchAccessToken = async (code) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8082/api/auth/callback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch access token");
            }
            const data = await response.json();
            console.log("Access Token:", data.accessToken);
            setAccessToken(data.accessToken); 
        } catch (error) {
            console.error("Error fetching access token:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : accessToken ? (
                <p>Access Token: {accessToken}</p>
            ) : (
                <p>OAuth Callback Page</p>
            )}
        </div>
    );
}
