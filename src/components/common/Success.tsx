import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';



const strokeAnimation = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkContainer = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkmark = styled.svg`
  width: 100%;
  height: 100%;
`;

const CheckmarkCircle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4CAF50;
  fill: none;
  animation: ${strokeAnimation} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CheckmarkCheck = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 2;
  stroke: #4CAF50;
  fill: none;
  animation: ${strokeAnimation} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
`;

const Success = () => {
    const navigate =useNavigate()
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigate('/viewplan')
        },3000)
        return ()=>clearTimeout(timer)
    },[navigate])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center">
          <CheckmarkContainer>
            <Checkmark xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <CheckmarkCircle cx="26" cy="26" r="25" />
              <CheckmarkCheck d="M14 27l7 7 16-16" />
            </Checkmark>
          </CheckmarkContainer>
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">Success!</h2>
        <p className="text-center text-gray-600 mt-2">Payment Successed</p>
        <div className="flex items-center justify-center mt-6">
          
        </div>
      </div>
    </div>
  );
};

export default Success;
