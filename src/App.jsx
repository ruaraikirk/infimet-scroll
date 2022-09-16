import React, { useEffect, useState } from 'react';
import { departmentClient } from './network/clients';
import logo from './assets/infimet-scroll.svg';

const { departments } = departmentClient;

const App = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    departments.get().then((resp) => setResponseData(resp));
  }, []);

  const handleClick = () => {
    console.info(responseData);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="flex justify-center w-full border-b border-grey p-4 bg-amber-700">
        <div className="w-5/6 sm:w-4/6 md:w-3/5 lg:w-2/6 xl:w-1/6 h-full">
          <img src={logo} alt="infimet scroll logo" />
        </div>
      </header>
      <main className="flex-1 overflow-y-scroll bg-amber-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full text-center border-t border-grey p-4 bg-amber-700">Footer</footer>
    </div>
  );
};

export default App;
