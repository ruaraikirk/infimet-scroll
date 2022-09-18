import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { departmentClient } from '../network/clients';

const Departments = ({ getObjectsByDept }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    departmentClient.departments.get().then((departmentResponse) => setDepartments(departmentResponse.departments));
  }, []);

  return (
    <div className="flex justify-start lg:justify-center items-center w-screen overflow-x-auto">
      {departments.map((dept, i) => (
        <div key={i} className="avatar placeholder p-1">
          <div
            className="bg-neutral-content text-neutral-content rounded-full w-16"
            onClick={() => {
              getObjectsByDept(dept.departmentId);
              alert(`You are now viewing by ${dept.displayName}`);
            }}
          >
            <span className="text-1xl text-neutral-focus">{dept.displayName.match(/\b(\w)/g).join('')}</span>
          </div>
        </div>
      ))}
      <div key="x" className="avatar placeholder p-1">
        <div
          className="bg-neutral-content text-neutral-content rounded-full w-16"
          onClick={() => {
            getObjectsByDept();
            alert(`You are now viewing all departments.`);
          }}
        >
          <span className="text-1xl text-neutral-focus">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

Departments.propTypes = {
  getObjectsByDept: PropTypes.func
};

export default Departments;
