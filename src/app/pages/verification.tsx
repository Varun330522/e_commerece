import React, { useRef, useState, useEffect } from 'react';

export function Verification({reset}) {
  const [code, setCode] = useState('');
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const resetCode = () => {
    inputRefs.forEach((ref) => {
      if (ref.current) ref.current.value = '';
    });
    inputRefs[0].current.focus();
    setCode('');
  };

  useEffect(() => {
    resetCode();
  }, [reset]);

  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 8) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  const handleInput = (e, index) => {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = [...code];
    const value = input.value.toUpperCase();
    newCode[index] = value;

    inputRefs[index].current.value = value;
    setCode(newCode.join(''));

    input.select();

    if (input.value === '') {
      if (previousInput) previousInput.current.focus();
    } else if (nextInput) {
      nextInput.current.select();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleKeyDown = (e, index) => {
    const input = e.target;
    const previousInput = inputRefs[index - 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
      e.preventDefault();
      setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
      if (previousInput) previousInput.current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="mt-3 w-[500px] h-[400px] border-[#c1c1c1] rounded-lg border-[1px]">
        <h2 className="mt-6 text-2xl font-semibold text-center">Verify your email</h2>
        <p className="text-center mt-6 font-normal">Enter the 8 digit code you have received on</p>
        <p className="text-center mt-3 font-normal">varuns*******@gmail.com</p>

        <form className="px-10 py-3">
          <div className="mb-6">
            <label className="block my-3 mx-2 text-sm font-bold text-gray-700" htmlFor="password">
              Code
            </label>
            <div className="flex gap-2 relative m-3">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <input
                  className="text-2x w-10 flex p-2 text-center border"
                  key={index}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleInput(e, index)}
                  ref={inputRefs[index]}
                  autoFocus={index === 0}
                  onFocus={handleFocus}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => callback(code)}
            >
              VERIFY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
