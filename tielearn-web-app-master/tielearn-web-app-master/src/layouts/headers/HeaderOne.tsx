'use client';
import Link from 'next/link';
import HeaderTopOne from './menu/HeaderTopOne';
import Image from 'next/image';
import NavMenu from './menu/NavMenu';
import React, { useState } from 'react';
import UseSticky from '@/hooks/UseSticky';
import MobileSidebar from './menu/MobileSidebar';
import InjectableSvg from '@/hooks/InjectableSvg';
import ti from '@/assets/img/icons/tielearn-logo.svg';
import dynamic from 'next/dynamic';
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

  const handleSelectChange = (option: React.SetStateAction<null>) => {
    setSelectedOption(option);
  };

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
                        <li className="header-btn login-btn">
                          <Link href="/contact">S’inscrire</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="mobile-login-btn">
                      <Link href="/login">
                        <InjectableSvg
                          src="/assets/img/icons/user.svg"
                          alt=""
                          className="injectable"
                        />
                      </Link>
                    </div>
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
