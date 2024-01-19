import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function Test() {
    const [username, setUsername] = useState<string|null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData) {
                setUsername(userData.sub+'');
            }
        }
    }, []);

    return (
        <div>
            {
                username && <h1>Chào mừng {username} đến với Bookstore!</h1>
            }
        </div>
    )
    
}

export default Test;