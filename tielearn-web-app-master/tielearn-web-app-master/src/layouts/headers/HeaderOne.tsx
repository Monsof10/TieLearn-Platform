'use client';
import Link from 'next/link';
import HeaderTopOne from './menu/HeaderTopOne';
import Image from 'next/image';
import NavMenu from './menu/NavMenu';
import React, { useState, useEffect } from 'react';
import UseSticky from '@/hooks/UseSticky';
import MobileSidebar from './menu/MobileSidebar';
import InjectableSvg from '@/hooks/InjectableSvg';
import ti from '@/assets/img/icons/tielearn-logo.svg';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';
const TotalCart = dynamic(() => import('@/components/common/TotalCart'), {
  ssr: false,
});
const TotalWishlist = dynamic(
  () => import('@/components/common/TotalWishlist'),
  { ssr: false }
);
const CustomSelect = dynamic(() => import('@/ui/CustomSelect'), { ssr: false });

import logo from '@/assets/img/logo/logo.svg';

const HeaderOne = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const handleSelectChange = (option: React.SetStateAction<null>) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <header>
        <HeaderTopOne />
        <div id="header-fixed-height"></div>
        <div
          id="sticky-header"
          className={`tg-header__area ${sticky ? 'sticky-menu' : ''}`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <Link
                      href="/"
                      className=""
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        gap: 0,
                        // border: '1px solid red',
                        position: 'relative',
                        marginLeft: '50px',
                      }}
                    >
                      <Image
                        src={ti}
                        width="21"
                        height="21"
                        alt="logo"
                        style={{
                          alignSelf: 'start',
                          marginRight: '6px',
                          marginBottom: '10px',
                        }}
                      />
                      <h1
                        className=""
                        style={{
                          lineHeight: 1,
                          fontSize: '1.3em',
                        }}
                      >
                        <span
                          style={
                            {
                              // color: '#5651E3',
                            }
                          }
                        >
                          Tie
                        </span>
                        Learn
                      </h1>
                    </Link>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <NavMenu />
                    </div>
                    {/* <div className="tgmenu__search d-none d-md-block">
                      <CustomSelect
                        value={selectedOption}
                        onChange={handleSelectChange}
                      />
                    </div> */}
                    <div className="tgmenu__action">
                      <ul className="list-wrap">
                        {/* <li className="wishlist-icon">
                          <Link href="/wishlist" className="cart-count">
                            <InjectableSvg
                              src="/assets/img/icons/heart.svg"
                              className="injectable"
                              alt="img"
                            />
                            <TotalWishlist />
                          </Link>
                        </li> */}
                        {/* <li className="mini-cart-icon">
                          <Link href="/cart" className="cart-count">
                            <InjectableSvg
                              src="/assets/img/icons/cart.svg"
                              className="injectable"
                              alt="img"
                            />
                            <TotalCart />
                          </Link>
                        </li> */}
                        <li className={`header-btn ${isAuthenticated && user ? 'user-profile' : 'login-btn'}`}>
                          <div>
                            {mounted ? (
                              isAuthenticated && user ? (
                                <div className="dropdown">
                                  <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    <InjectableSvg
                                      src="/assets/img/icons/user.svg"
                                      className="injectable user-icon"
                                      alt="user"
                                    />
                                    <span>{user.username}</span>
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <Link className="dropdown-item" href={user.role === 'admin' ? '/admin/profile' : '/user/profile'}>
                                        Profile
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                                        Dashboard
                                      </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                      <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              ) : (
                                <Link href="/login">Se connecter</Link>
                              )
                            ) : (
                              <div style={{ width: 80, height: 18 }} />
                            )}
                          </div>
                        </li>
                      </ul>
                    </div>
                    {isAuthenticated && user ? (
                      <div className="mobile-login-btn">
                        <Link href={user.role === 'admin' ? '/admin/profile' : '/user/profile'}>
                          <InjectableSvg
                            src="/assets/img/icons/user.svg"
                            alt="profile"
                            className="injectable"
                          />
                        </Link>
                      </div>
                    ) : (
                      <div className="mobile-login-btn">
                        <Link href="/login">
                          <InjectableSvg
                            src="/assets/img/icons/user.svg"
                            alt=""
                            className="injectable"
                          />
                        </Link>
                      </div>
                    )}
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                    >
                      <i className="tg-flaticon-menu-1"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
    </>
  );
};

export default HeaderOne;
