import React from 'react';
import css from './footer.module.css';
import Logo from '../../assets/logo.png';
import { HiOutlinePhone, HiOutlineLocationMarker, HiOutlineLogin, HiOutlineUsers, HiOutlineLink, HiOutlineInbox } from 'react-icons/hi';

const Footer = () => {
  return (
    <div className={css.cFooterWrapper}>
        <hr/>
        <div className={css.cFooter}>
            <div className={css.logo}>
                <img src={Logo} alt="" />
                <span>Awear</span>
            </div>
            <div className={css.block}>
                <div className={css.detail}>
                    <span>Contact Us</span>
                    <span className={css.pngLine}>
                        <HiOutlineLocationMarker className={css.icon} />
                        <span>SRM Institute of Science & Technology, Kattankulathur, 603202  </span>
                    </span>
                    <span className={css.pngLine}>
                        {" "}
                        <HiOutlinePhone className={css.icon} />
                        <a href="tel:999999999">9999999999</a>
                    </span>
                    <span className={css.pngLine}>
                        {" "}
                        <HiOutlineInbox className={css.icon} />
                        <a href="mailto:support@reactshop.com">support@awear.com</a>
                    </span>
                </div>
            </div>
            <div className={css.block}>
                <div className={css.detail}>
                    <span>Account</span>
                    <span className={css.pngLine}>
                        <HiOutlineLogin className={css.icon} />
                        Sign In
                    </span>
                </div>
            </div>
            <div className={css.block}>
                <div className={css.detail}>
                    <span>Company</span>
                    <span className={css.pngLine}>
                        <HiOutlineUsers className={css.icon} />
                        <a href="/about">
                            <p>About us</p>
                        </a>
                    </span>
                </div>
            </div>
            <div className={css.block}>
                <div className={css.detail}>
                    <span>Resources</span>
                    <span className={css.pngLine}>
                        <HiOutlineLink className={css.icon} />
                        <span>Safety & Privacy Terms</span>
                    </span>
                </div>
            </div>
        </div>
        <div className={css.copyRight}>
            <span>Copyright ©2023 by Awear Inc.</span>
            <span>All rights reserved.</span>
        </div>
    </div>
  )
}

export default Footer;