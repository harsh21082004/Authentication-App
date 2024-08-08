import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Signup.module.css";
import { useEffect, useState } from "react";
import { TbFingerprint, TbFingerprintOff } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function VerifyOTP() {

    const [isLoggedIN, setIsLoggedIN] = useState(false)
    const [key, setKey] = useState(0)

    const [textType, setTextType] = useState("password");

    const [visible, setVisible] = useState(true);

    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleTextType = () => {
        setVisible(!visible)
        if (visible) {
            setTextType('text')
        }
        else {
            setTextType('password')
        }
    }

    const handleChange0 = (e) => {
        if (e.target.name === 'otp') {
            setOtp(e.target.value)
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const data = { email, otp }
        try {
            let res = await fetch('api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                setIsLoading(false)
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
            }
            else {
                setIsLoading(false)
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
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000);
            }
        } catch (error) {
            console.log(error)
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
        }
        setIsLoading(false)
    }


    return (
        <>
            <ToastContainer />
            <Head>
                <title>Login - AuthenticationApp</title>
                <meta name="description" content="An authentication app created by using Next.js." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <form className={`${styles.form} container `} onSubmit={handleSubmit} method='POST' >
                    <h3 className={`mb-5 text-center text-white`}>Verify</h3>
                    <div className="form-group">
                        <label htmlFor="email" className={`text-white mx-1 `}>Enter Email</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange0} value={email} type="email" className={`${styles.input} m-1`} name='email' id="email" required />
                            <i onClick={handleTextType} className={`${styles.eye}`}>
                                <MdAlternateEmail />
                            </i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="otp" className={`text-white mx-1 `}>Enter OTP Recieved in your Email</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange0} value={otp} type={textType} className={`${styles.input} m-1`} name='otp' id="otp" required maxLength={6} />
                            <i onClick={handleTextType} className={`${styles.eye}`}>
                                {visible ? <TbFingerprint /> : <TbFingerprintOff />}
                            </i>
                        </div>
                    </div>
                    <span className={`${styles.buttons}`}>
                        {isLoading ? (<button type="submit" className={`${styles.button} btn m-2`}><span>
                            ...Loading
                        </span></button>) : (<button type="submit" className={`${styles.button} btn m-2`}>Verify and Procceed</button>)}</span>
                </form>
            </main>
        </>
    );
}
