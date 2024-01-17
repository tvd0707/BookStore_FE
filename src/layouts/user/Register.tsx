import { useState } from 'react';
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");

    const [message, setMessage] = useState("");

    const [invalidUsername, setInvalidUsername] = useState("");
    const [invalidEmail, setInvalidEmail] = useState("");
    const [invalidPassword, setInvalidPassword] = useState("");
    const [invalidConfirmPassword, setInvalidConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        if(gender === "") {
            setGender("O");
        }

        console.log(gender);

        setInvalidUsername('');
        setInvalidEmail('');
        setInvalidPassword('');
        setInvalidConfirmPassword('');

        e.preventDefault();

        const isUsernameValid = !await checkExistsUsername(username);
        const isEmailValid = !await checkExistsEmail(email);
        const isPasswordValid = !checkValidPassword(password);
        const isConfirmPasswordValid = !checkValidConfirmPassword(confirmPassword);

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            try {
                const url = "http://localhost:8080/account/register";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        gender: gender,
                        actived: 0,
                        activeCode: ""
                    })
                }
                );

                if(response.ok) {
                    setMessage("Đăng ký thành công!");
                } else {
                    setMessage("Xảy ra lỗi trong quá trình đăng ký tài khoản!");
                }
            } catch (error) {

            }
        }
    }

    const checkExistsUsername = async (username: string) => {
        // end-point
        const url = `http://localhost:8080/users/search/existsByUsername?username=${username}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setInvalidUsername("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setInvalidUsername("");
        return checkExistsUsername(e.target.value);
    }

    const checkValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setInvalidPassword("Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 chữ hoa, 1 chữ thường và 1 số!");
            return true;
        } else {
            setInvalidPassword("");
            return false;
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setInvalidPassword("");
        return checkValidPassword(e.target.value);
    }

    const checkValidConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setInvalidConfirmPassword("Mật khẩu không khớp!");
            return true;
        } else {
            setInvalidConfirmPassword("");
            return false;
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setInvalidConfirmPassword("");
        return checkValidConfirmPassword(e.target.value);
    }

    const handleSelectGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    }

    const checkExistsEmail = async (email: string) => {
        // end-point
        const url = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setInvalidEmail("Email đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setInvalidEmail("");
        return checkExistsEmail(e.target.value);
    }

    return (
        <div className='container'>
            <h1 className='mt-5 text-center'>Đăng ký</h1>
            <div className='mb-3 col-md-6 col-12 mx-auto'>
                <form onSubmit={handleSubmit} className='form'>
                    {/* username */}
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Tên đăng nhập</label>
                        <input type='text' className='form-control' id='username' value={username} onChange={handleUsernameChange} />
                        <div style={{ color: "red" }}>{invalidUsername}</div>
                    </div>

                    {/* password */}
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Mật khẩu</label>
                        <input type='password' className='form-control' id='password' value={password} onChange={handlePasswordChange} />
                        <div style={{ color: "red" }}>{invalidPassword}</div>
                    </div>

                    {/* Confirm password */}
                    <div className='mb-3'>
                        <label htmlFor='confirmPassword' className='form-label'>Nhập lại mật khẩu</label>
                        <input type='password' className='form-control' id='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        <div style={{ color: "red" }}>{invalidConfirmPassword}</div>
                    </div>

                    {/* Tên */}
                    <div className='mb-3'>
                        <label htmlFor='firstName' className='form-label'>Tên</label>
                        <input type='text' className='form-control' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    {/* Họ */}
                    <div className='mb-3'>
                        <label htmlFor='lastName' className='form-label'>Họ</label>
                        <input type='text' className='form-control' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    {/* Số điện thoại */}
                    <div className='mb-3'>
                        <label htmlFor='phone' className='form-label'>Số điện thoại</label>
                        <input type='text' className='form-control' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    {/* Giới tính */}
                    <div className='mb-3'>
                        <label htmlFor='gender' className='form-label'>Giới tính</label>
                        {/* <input type='text' className='form-control' id='gender' value={gender} onChange={(e) => setGender(e.target.value)} /> */}
                        <select className="form-select" id='gender' onChange={handleSelectGender}>
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option selected value="O">Khác</option>
                        </select>
                    </div>

                    {/* email */}
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' className='form-control' id='email' value={email} onChange={handleEmailChange} />
                        <div style={{ color: "red" }}>{invalidEmail}</div>
                    </div>

                    {/* submit */}
                    <div className='text-center' >
                        <button type="submit" className='btn btn-primary'>Đăng ký</button>
                        <div style={{ color: "green" }}>{message}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;