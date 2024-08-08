import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { useAuth } from './context/AuthContext';
import Link from 'next/link';

const Navbar = () => {
    const { isLoggedIN, decodedToken, logout } = useAuth();
    const imgurl = decodedToken?.image;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <img src="https://icons.veryicon.com/png/o/miscellaneous/simple-line-icon/authentication-16.png" alt="" width="30" height="30" className="d-inline-block align-text-top" />
                    Authentication App
                </Link>
                <b onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${styles.profile1}`}>
                    <img src={imgurl} alt="profile" width="35" height="35" className={`d-inline-block align-text-top ${styles.accountImg} ${styles.account1}`} />
                    {isHovered && (
                        <ul className={`${styles.accdrop}`} style={{ display: isHovered ? 'block' : 'none' }}>
                            <Link href={'/'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>My Account</li></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>Settings</li></Link>
                            <li className={`nav-item ${styles.nav_item}`} onClick={logout}>Logout</li>
                        </ul>
                    )}
                </b>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <div className={`${styles.logo}`}>
                            <b onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${styles.profile}`}>
                                <img src={imgurl} alt="profile" width="35" height="35" className={`d-inline-block align-text-top ${styles.accountImg} ${styles.account}`} />
                                {isHovered && (
                                    <ul className={`${styles.accdrop}`} style={{ display: isHovered ? 'block' : 'none' }}>
                                        <Link href={'/'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>My Account</li></Link>
                                        <Link href={'/'} style={{ textDecoration: 'none' }}><li className={`nav-item ${styles.nav_item}`}>Settings</li></Link>
                                        <li className={`nav-item ${styles.nav_item}`} onClick={logout}>Logout</li>
                                    </ul>
                                )}
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar