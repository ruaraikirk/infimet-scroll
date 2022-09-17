import React from 'react';
import logo from '../assets/infimet-scroll.svg';

const Header = () => {
  return (
    <header className="navbar bg-base-100 flex justify-center border-slate-300 border-b-2">
      <div className="w-5/6 sm:w-4/6 md:w-3/5 lg:w-2/6 xl:w-1/6 h-full">
        <img src={logo} alt="infimet scroll logo" />
      </div>
    </header>
  );
};

export default Header;
