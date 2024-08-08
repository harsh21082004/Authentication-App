import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import style from '@/styles/Home.module.scss';
import Link from 'next/link';
import Navbar from './navbar';

const Home = () => {
  const { decodedToken, logout } = useAuth();
  const imgurl = decodedToken?.image;

  return (
    <>
      <Head>
        <title>Home - AuthenticationApp</title>
        <meta name="description" content="An authentication app created by using Next.js." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Navbar />
        <div className={`${styles.accContainer} container`}>
          <h3 className="text-center text-white">Profile Settings</h3>
          <div className="container rounded mt-5 mb-5">
            <div className={`${styles.forms} ${style.forms}`}>
              <div className="d-flex flex-column align-items-center justify-content-between text-center p-5">
                <img className="rounded-circle" width="150px" src={imgurl} alt='Profile' />
                <span className="text-white font-weight-bold mt-2">{decodedToken?.name}</span>
                <span className="text-white">{decodedToken?.email}</span>
              </div>
              <form className="p-3 py-5">
                <div className="row mt-3">
                  <div className="col-md-12 my-3"><label className="labels text-white">Name</label><input type="text" className={`${style.input} m-1`} placeholder="name" name='name' value={decodedToken?.name} readOnly /></div>
                  <div className="col-md-12 my-3"><label className="labels text-white">Email ID (Can't be changed)</label><input type="text" className={`${style.input} m-1`} value={decodedToken?.email} readOnly /></div>
                </div>
                <button type="submit" onClick={logout} className={`btn-primary btn m-2`}>Logout</button>
                <Link href={'/forgotpassword'} type="submit" className={`btn-primary btn m-2`}>Change Password</Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
