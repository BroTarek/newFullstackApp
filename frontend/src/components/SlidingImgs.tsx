import React, { useEffect, useState } from 'react';

const SlidingImgs = () => {
  const [indexOfImg, setIndexOfImg] = useState<number>(1);
  const [freeze, setFreeze] = useState<boolean>(false);

  useEffect(() => {
    if (freeze) return;

    const interval = setInterval(() => {
      setIndexOfImg((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [freeze]);

  return (
    <div
      onMouseEnter={() => setFreeze(true)}
      onMouseLeave={() => setFreeze(false)}
    >
      <img src={`OP${indexOfImg}.jpg`} alt={`Slide ${indexOfImg}`} />
    </div>
  );
};

export default SlidingImgs;
