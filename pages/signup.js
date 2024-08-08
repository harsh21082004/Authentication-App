import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Signup.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { TbFingerprint, TbFingerprintOff } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { SiNamebase } from "react-icons/si";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function Signup() {

    const [isLoggedIN, setIsLoggedIN] = useState(false)
    const [key, setKey] = useState(0)

    const [textType, setTextType] = useState("password");

    const [visible, setVisible] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [error4, setError4] = useState(false);
    const [error5, setError5] = useState(false);

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
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
    }
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
    }
    const handleChange1 = (e) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value)
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
    }

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        if (error1 && error2 && error3 && error4 && error5) {
            const data = { name, email, password }
            try {
                let res = await fetch('api/signup', {
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
                setEmail('');
                setPassword('');
                setError1(false);
                setError2(false);
                setError3(false);
                setError4(false);
                setError5(false);
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
                    setTimeout(() => {
                        window.location.href = '/verify'
                    }, 2000);
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
            toast.error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character', {
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
                <title>Signup - AuthenticationApp</title>
                <meta name="description" content="An authentication app created by using Next.js." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <form className={`${styles.form} container `} onSubmit={handleSubmit} method='POST' >
                    <h3 className={`mb-5 text-center text-white`}>Signup</h3>
                    <div className="form-group">
                        <label htmlFor="name" className={`text-white  mx-1`}>Name</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange0} value={name} type="text" className={`${styles.input} m-1`} name='name' id="name" aria-describedby="emailHelp" placeholder="" required />
                            <i className={`${styles.eye}`}>
                                <SiNamebase />
                            </i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className={`text-white  mx-1`}>Email address</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange} value={email} type="email" className={`${styles.input} m-1`} name='email' id="email" aria-describedby="emailHelp" placeholder="" required />
                            <i className={`${styles.eye}`}>
                                <MdAlternateEmail />
                            </i>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className={`text-white mx-1 `}>Password</label>
                        <div className={`${styles.eyeinput}`}>
                            <input onChange={handleChange1} value={password} type={textType} className={`${styles.input} m-1`} name='password' id="password" placeholder="" required />
                            <i onClick={handleTextType} className={`${styles.eye}`}>
                                {visible ? <TbFingerprint /> : <TbFingerprintOff />}
                            </i>
                        </div>
                        <div className={`${styles.alert} my-2`}>
                            <ul>
                                <span>
                                    {!error1 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                    <li>Password must be at least 8 characters long</li></span>
                                <span>
                                    {!error2 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                    <li>Password must contain at least one lowercase letter</li></span>
                                <span>
                                    {!error3 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                    <li>Password must contain at least one uppercase letter</li></span>
                                <span>
                                    {!error4 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                    <li>Password must contain at least one digit</li></span>
                                <span>
                                    {!error5 ? <RxCross2 className={`${styles.wrongCheck}`} /> : <FaCheck className={`${styles.rightCheck}`} />}
                                    <li>Password must contain at least one special character</li></span>
                            </ul>
                        </div>
                    </div>
                    <span className={`${styles.buttons}`}>
                        {isLoading ? (<button type="submit" className={`${styles.button} btn m-2`}><span>
                            ...Loading
                        </span></button>) : (<button type="submit" className={`${styles.button} btn m-2`}>Signup</button>)}</span>
                    <div className={`mt-5 ${styles.already}`}>
                        <p className={`text-white text-center`}>Already have an account <Link href={'/login'} className={`${styles.button} btn m-2`}>Login</Link></p>
                    </div>
                </form>
            </main>
        </>
    );
}
