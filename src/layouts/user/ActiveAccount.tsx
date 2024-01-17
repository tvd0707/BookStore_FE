import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ActiveAccount() {
    const { email } = useParams();
    const { activeCode } = useParams();
    const [isActived, setIsActived] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const handleActived = async () => {
            try {
                const url: string = `http://localhost:8080/account/active?email=${email}&activeCode=${activeCode}`;
                const response = await fetch(url, { method: "GET" });
                if (response.ok) {
                    setIsActived(true);
                } else {
                    setMessage(response.text + "");
                }
            } catch (error) {
                console.log("Lỗi khi kích hoạt: ", error);
            }
        }

        if (email && activeCode) {
            handleActived();
        }
    }, [activeCode, email]);

    // const handleActived = async () => {
    //     try {
    //         const url: string = `http://localhost:8080/account/active?email=${email}&activeCode=${activeCode}`;
    //         const response = await fetch(url, { method: "GET" });
    //         if (response.ok) {
    //             setIsActived(true);
    //         } else {
    //             setMessage(response.text + "");
    //         }
    //     } catch (error) {
    //         console.log("Lỗi khi kích hoạt: ", error);
    //     }
    // }

    return (
        <div>
            <h1 className="text-center">Kích hoạt tài khoản</h1>
            {isActived ? (<p className="text-center"> Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!</p>)
                : (<p className="text-center">{message}</p>)}
        </div>
    )
}

export default ActiveAccount;