import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token');
            // Trong tình huống chưa đăng nhập
            if (!token) {
                navigate("/login");
                return;
            } else {
                // Giải mã token
                const decodedToken = jwtDecode(token) as JwtPayload;
                console.log(decodedToken);

                // Lấy thông tin cụ thể
                const isAdmin = decodedToken.isAdmin;

                // Kiểm tra không phải là admin
                if (!isAdmin) {
                    navigate("/error-403");
                    return;
                } 
            }
        }, [navigate]);
        return <WrappedComponent  {...props} />
    }
    return WithAdminCheck;
}

export default RequireAdmin;