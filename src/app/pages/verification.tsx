/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useRef, useState, useEffect, type RefObject } from 'react';
import { api } from '~/trpc/react';
import Cookies from 'js-cookie';

interface VerificationProps {
  reset: undefined;
  data: {
    email: string;
    name: string;
    password: string;
  };
  onVerified: () => void;
}

export function Verification({ reset, data, onVerified }: VerificationProps) {
  const [code, setCode] = useState<string>('');
  const inputRefs: RefObject<HTMLInputElement>[] = Array.from({ length: 8 }, () => useRef<HTMLInputElement>(null));

  const resetCode = () => {
    inputRefs.forEach((ref) => {
      if (ref.current) ref.current.value = '';
    });
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
    setCode('');
  };

  useEffect(() => {
    resetCode();
  }, [reset]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = e.clipboardData.getData('text');
    if (pastedCode.length === 8) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = code.split('');
    const value = input.value;
    newCode[index] = value;

    setCode(newCode.join(''));

    if (input.value === '' && previousInput?.current) {
      previousInput.current.focus();
    } else if (nextInput?.current) {
      nextInput.current.select();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      e.preventDefault();
      setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
      if (previousInput?.current) previousInput.current.focus();
    }
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (localPart && localPart.length > 4) {
      return `${localPart.slice(0, 4)}***@${domain}`;
    }
    return email;
  };

  const verifyOtp = api.verify_otp.create.useMutation({
    onSuccess: (data:{token: string}) => {
      Cookies.set('jwt_token', data.token, { expires: 1 });
      onVerified();
    },
    onError: (error: object) => {
      alert(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyOtp.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      key: code,
    });
  };

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="mt-3 w-[500px] h-[400px] border-[#c1c1c1] rounded-lg border-[1px]">
        <h2 className="mt-6 text-2xl font-semibold text-center">Verify your email</h2>
        <p className="text-center mt-6 font-normal">Enter the 8 digit code you have received on</p>
        <p className="text-center mt-3 font-normal">{maskEmail(data.email)}</p>

        <form className="px-10 py-3" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block my-3 mx-2 text-sm font-bold text-gray-700" htmlFor="code">
              Code
            </label>
            <div className="flex gap-2 relative m-3">
              {inputRefs.map((ref, index) => (
                <input
                  className="text-2x w-10 flex p-2 text-center border"
                  key={index}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleInput(e, index)}
                  ref={ref}
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
              type="submit"
            >
              VERIFY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
