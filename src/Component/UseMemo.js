import React, { useState, useMemo } from 'react';

const UseMemo= () => {
  const [inputValue, setInputValue] = useState('');
  
  // Memoized result of transforming the input value
  const transformedValue = useMemo(() => {
    // Simulating a transformation function (e.g., uppercase conversion)
    console.log('Transforming...');
    return inputValue.toUpperCase();
  }, [inputValue]);
  
  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter text"
      />
      <p>Transformed Value: {transformedValue}</p>
    </div>
  );
};

export default UseMemo;
