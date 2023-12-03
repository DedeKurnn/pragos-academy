import { useNavigate } from "react-router-dom";
import {
	ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import './OTP.css';

const Otp = () => {
  const navigate = useNavigate();
  const OTPinputs = useRef([]);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [otpValues, setOTPValues] = useState(['', '', '', '']);

  const hasilKode = otpValues.join('');
  const tipe = Number(hasilKode);
  console.log(tipe);
  
  useEffect(() => {
    OTPinputs.current[0].focus();
  }, []);

  const handleInputChange = (index, value) => {
    const currentInput = OTPinputs.current[index];
    const nextInput = OTPinputs.current[index + 1];

    if (value.length > 1 && value.length === 2) {
      currentInput.value = '';
    }

    if (nextInput && value !== '') {
      nextInput.removeAttribute('disabled');
      nextInput.focus();
    }

    if (!OTPinputs.current[3].hasAttribute('disabled') && OTPinputs.current[3].value !== '') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  };

  const handleInputKeyUp = (index, e) => {
    if (e.key === 'Backspace') {
      const currentInput = OTPinputs.current[index];
      const previousInput = OTPinputs.current[index - 1];

      if (previousInput !== undefined) {
        currentInput.value = '';
        currentInput.setAttribute('disabled', true);
        previousInput.focus();
      }
    }
  };

  return (
    <div className="sm:w-[452px] w-[352px] h-[458px]">
      <button onClick={() => navigate("/auth/register")} className="h-10"><ArrowLeftIcon className="w-6 h-6"/></button>
      <h1 className="font-Montserrat text-[24px] font-bold leading-[36px] text-darkblue-05 mb-[24px] mt-4">Masukkan OTP</h1>
      <p className="font-poppins text-center text-[14px] mb-1 font-bold leading-[18px] text-black">Ketik 4 digit kode yang dikirimkan ke J*****@gmail.com</p>
      <form action="#" className="formulir">
        <div className="input_fields">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="number"
              value={otpValues[index]}
              ref={(input) => (OTPinputs.current[index] = input)}
              onChange={(e) => {
                handleInputChange(index, e.target.value);
                setOTPValues((prevValues) => {
                  const newValues = [...prevValues];
                  newValues[index] = e.target.value;
                  return newValues;
                });
              }}
              onKeyUp={(e) => handleInputKeyUp(index, e)}
              className='isi'
            />
          ))}
        </div>
      </form>
        <p className="font-poppins text-center text-[14px] mt-[24px] font-normal leading-[18px] text-black">Masukkan Kode OTP dengan Benar!</p>
      {/* <div className="flex justify-center mt-[48px]"> */}
        <Button className={`tombol ${isButtonActive ? 'active' : ''}`} disabled={!isButtonActive}>Simpan</Button>
      {/* </div> */}
    </div>
  )
}

export default Otp