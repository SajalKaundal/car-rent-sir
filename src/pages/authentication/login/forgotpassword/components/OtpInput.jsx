import { useRef } from "react";

export default function OtpInput() {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  return (
    <div className="otp-container">
      <input
        className="otp-input"
        maxLength={1}
        ref={ref1}
        onChange={(e) => handle(e, ref2)}
      />
      <input
        className="otp-input"
        maxLength={1}
        ref={ref2}
        onChange={(e) => handle(e, ref3)}
      />
      <input
        className="otp-input"
        maxLength={1}
        ref={ref3}
        onChange={(e) => handle(e, ref4)}
      />
      <input className="otp-input" maxLength={1} ref={ref4} />
    </div>
  );
}

const handle = (e, nextRef) => {
  if (/^[0-9]$/.test(e.target.value)) {
    nextRef.current.focus();
  } else {
    e.target.value = "";
  }
};
