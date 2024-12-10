import React, { useRef, useState, useImperativeHandle, useEffect, forwardRef } from "react";

// /*-----------------------------------------------*/
// const ForwardRefMyInput = forwardRef<HTMLInputElement>((props, ref) => {
//   return <input { ...props } ref={ref} type="text" />
// })
// export default function App() {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   return <div className='App'>
//     <ForwardRefMyInput ref={inputRef} />
//   </div>
// }
/*-----------------------------------------------*/

interface RefType {
  aaa: () => void;
}

const ForwardRefMyInput = forwardRef<RefType>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      aaa() {
        inputRef.current?.focus();
      },
    };
  });
  return <input {...props} ref={inputRef} type="text" />;
});

export default function App() {
  const apiRef = useRef<RefType>(null);

  useEffect(() => {
    apiRef.current?.aaa();
  }, [])

  return (
    <div className="App">
      <ForwardRefMyInput ref={apiRef} />
    </div>
  );
}
