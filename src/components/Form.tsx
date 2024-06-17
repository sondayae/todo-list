import React, { FormEventHandler, useState } from 'react'

type formProps = {
  handleSubmit: FormEventHandler,
  value: string,
  setValue: Function,
}

const Form = ({ handleSubmit, value, setValue }: formProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        className="w-full px-2 py-1 mr-4 border rounded-md"
        onChange={handleChange}
      />
      <input
        type="submit"
        value="입력"
        className="p-2 rounded-md bg-blue-400 text-white hover:bg-gray-400 cursor-pointer"
      />
    </form>
  );
};

export default Form