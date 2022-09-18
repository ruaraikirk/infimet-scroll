import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { departmentClient } from '../network/clients';

const Departments = ({ getObjectsByDept }) => {
  const [departments, setDepartments] = useState([]);
  const [activeDept, setActiveDept] = useState(null);

  useEffect(() => {
    departmentClient.departments.get().then((departmentResponse) => setDepartments(departmentResponse.departments));
  }, []);

  return (
    <div className="flex justify-start lg:justify-center items-center w-screen overflow-x-auto border-b-4">
      <div
        key="x"
        className={`${
          !activeDept ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500' : ''
        } avatar placeholder p-1 rounded-full`}
      >
        <div
          className="bg-neutral-content text-neutral-content rounded-full w-16"
          onClick={() => {
            setActiveDept(null);
            getObjectsByDept();
            alert(`You are now viewing all departments.`);
          }}
        >
          <span className="text-1xl text-neutral-focus">All Dept.</span>
        </div>
      </div>
      {departments.map((dept, i) => (
        <div
          key={i}
          className={`${
            activeDept === dept.departmentId ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500' : ''
          } avatar placeholder p-1 rounded-full`}
        >
          <div
            className="bg-neutral-content text-neutral-content rounded-full w-16"
            onClick={() => {
              setActiveDept(dept.departmentId);
              getObjectsByDept(dept.departmentId);
              alert(`You are now viewing by ${dept.displayName}`);
            }}
          >
            <span className="text-1xl text-neutral-focus">{dept.displayName.match(/\b(\w)/g).join('')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

Departments.propTypes = {
  getObjectsByDept: PropTypes.func
};

export default Departments;
