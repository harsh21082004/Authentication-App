import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Signup.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { TbFingerprint, TbFingerprintOff } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });

export default function ForgotPassword() {

    const { isLoggedIN, decodedToken } = useAuth();



    console.log(isLoggedIN)

    const [textType, setTextType] = useState("password");
    const [textType1, setTextType1] = useState("password");

    const [visible, setVisible] = useState(true);
    const [visible1, setVisible1] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);
    const [error6, setError6] = useState(false);

    useEffect(() => {
        if (isLoggedIN) {
            setEmail(decodedToken?.email)
        }
    }, [isLoggedIN])

    console.log(email)

    const handleTextType = () => {
        setVisible(!visible)
        if (visible) {
            setTextType('text')
        }
        else {
            setTextType('password')
        }
    }

    const handleTextType1 = () => {
        setVisible1(!visible1)
        if (visible1) {
            setTextType1('text')
        }
        else {
            setTextType1('password')
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
    }
    const handleChange0 = (e) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }
    const handleChange1 = (e) => {
        if (e.target.name === 'newpassword') {
            setNewPassword(e.target.value)
        }

        const lower = new RegExp('^(?=.*[a-z])');
        const upper = new RegExp('^(?=.*[A-Z])');
        const number = new RegExp('^(?=.*[0-9])');
        const special = new RegExp('^(?=.*[!@#$%^&*])');
        const length = new RegExp('^(?=.{8,})');

        if (lower.test(e.target.value)) {
            setError2(true);
        } else {
            setError2(false);
        }
        if (upper.test(e.target.value)) {
            setError3(true);
        } else {
            setError3(false);
        }
        if (number.test(e.target.value)) {
            setError4(true);
        } else {
            setError4(false);
        }
        if (special.test(e.target.value)) {
            setError5(true);
        } else {
            setError5(false);
        }
        if (length.test(e.target.value)) {
            setError1(true);
        } else {
            setError1(false);
        }
        if (newPassword === password && isLoggedIN) {
            setError6(false);
        } else {
            setError6(true);
        }
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        if (error1 && error2 && error3 && error4 && error5 && error6) {
            const data = { email, password, newPassword, isLoggedIN }
            try {
                let res = await fetch('api/forgotpassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                if (!res.ok) {
                    toast.error(res.error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setIsLoading(false)
                }
                setIsLoading(false)
                let response = await res.json();
                if (response.error) {
                    toast.error(response.error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(response.error)
                }
                else if (response.success) {
                    toast.success(response.success, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    if (isLoggedIN) {
                        localStorage.removeItem('token')
                        setTimeout(() => {
                            window.location.href = '/login'
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            window.location.href = '/login'
                        }, 2000);
                    }
                    console.log(response)
                }
                else {
                    toast.error(response.error, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(response.error)
                }
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(error)
            }
        } else {
            toast.error('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit and one special character', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsLoading(false)
        }
    }


    return (
        <>
            <ToastContainer />
            <Head>
                <title>Forgot Password - AuthenticationApp</title>
                <meta name="description" content="An authentication app created by using Next.js." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isLoggedIN && <Navbar />}
            <main className={`${styles.main} ${inter.className}`}>
                <form className={`${styles.form} container `} onSubmit={handleSubmit} method='POST' >
                    <h3 className={`mb-5 text-center text-white`}>{isLoggedIN ? 'Change Password' : 'Forgot Password'}</h3>
                    {isLoggedIN ? (<><div className="form-group">
                        <label htmlFor="password" className={`text-white mx-1 `}>Current Password</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange0} value={password} type={textType} className={`${styles.input} m-1`} name='password' id="password" placeholder="" required />
                            <i onClick={handleTextType} className={`${styles.eye}`}>
                                {visible ? <TbFingerprint /> : <TbFingerprintOff />}
                            </i>
                        </div>
                    </div>
                        <div className="form-group">
                            <label htmlFor="newpassword" className={`text-white mx-1 `}>New Password</label>
                            <div className={`${styles.eyeinput}`}>
                                <input onChange={handleChange1} value={newPassword} type={textType1} className={`${styles.input} m-1`} name='newpassword' id="newpassword" required />
                                <i onClick={handleTextType1} className={`${styles.eye}`}>
                                    {visible1 ? <TbFingerprint /> : <TbFingerprintOff />}
                                </i>
                            </div>
                        </div></>) : (<><div className="form-group">
                            <label htmlFor="email" className={`text-white  mx-1`}>Email address</label>
                            <div className={`${styles.eyeinput}`}>
                                <input onChange={handleChange} value={email} type="email" className={`${styles.input} m-1`} name='email' id="email" aria-describedby="emailHelp" placeholder="" required />
                                <i className={`${styles.eye}`}>
                                    <MdAlternateEmail />
                                </i>
                            </div>
                        </div>
                            <div className="form-group">
                                <label htmlFor="newpassword" className={`text-white mx-1 `}>New Password</label>
                                <div className={`${styles.eyeinput}`}>
                                    <input onChange={handleChange1} value={newPassword} type={textType1} className={`${styles.input} m-1`} name='newpassword' id="newpassword" required />
                                    <i onClick={handleTextType1} className={`${styles.eye}`}>
                                        {visible1 ? <TbFingerprint /> : <TbFingerprintOff />}
                                    </i>
                                </div>
                            </div></>)}
                    <div className={`${styles.alert} my-2`}>
                        <ul>
                            <span>
                                {!error1 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password must be at least 8 characters long</li></span>
                            <span>
                                {!error2 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password must contain at least one lowercase letter</li></span>
                            <span>
                                {!error3 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password must contain at least one uppercase letter</li></span>
                            <span>
                                {!error4 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password must contain at least one digit</li></span>
                            <span>
                                {!error5 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password must contain at least one special character</li></span>
                            {isLoggedIN && (<span>
                                {!error6 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                <li>New Password and Current Password must be different</li></span>)}
                        </ul>
                    </div>
                    <span className={`${styles.buttons}`}>
                        {isLoading ? (<button type="submit" className={`${styles.button} btn m-2`}><span>
                            ...Loading
                        </span></button>) : (<button type="submit" className={`${styles.button} btn m-2`}>{isLoggedIN ? 'Change Password' : 'Forgot Password'}</button>)}</span>
                    <div className={`mt-5 ${styles.already}`}>
                        <p className={`text-white text-center`}><Link href={'/login'} className={`${styles.button} btn m-2`}>Go To Login</Link></p>
                    </div>
                </form>
            </main>
        </>
    );
}
