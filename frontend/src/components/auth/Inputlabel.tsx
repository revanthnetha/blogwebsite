import React, { ChangeEvent } from "react";

interface Inputs {
  type: string;
  label: string;
  placeholder: string;
  onChange : (e: ChangeEvent<HTMLInputElement>)=>void;
}

const Inputlabel = ({ type, label, placeholder,onChange }: Inputs) => {
  return (
    <div>
      <label className="block mb-2 text-sm md:text-md font-medium text-gray-900 mt-3">
        {label}
      </label>
      <input
        type={type}
        name="email"
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default Inputlabel;
