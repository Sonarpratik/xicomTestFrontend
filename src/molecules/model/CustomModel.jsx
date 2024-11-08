import React from 'react';
import styled from 'styled-components';
import LoadingHV from './LoadingHV';
import CrossButton from './CrossButton';

const ModelConUltimate = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '90vh'};
  background-color: white;
  position: relative;
  border-radius: 10px;
`;

const ModelContainer = styled.div`
  width: ${({ containerWidth }) => containerWidth || '100%'};
  height: ${({ containerHeight }) => containerHeight || '100vh'};
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const ModelCon = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 15px;
  border: none;
  margin-top: ${({ marginTop }) => marginTop || '0'};
`;

const CustomModel = ({ children, performCancel, fetch, width, height, containerWidth, containerHeight, marginTop }) => {
  return (
    <ModelContainer containerWidth={containerWidth} containerHeight={containerHeight}>
      <ModelConUltimate width={width} height={height}>
        <CrossButton performCancel={performCancel} />
        <ModelCon marginTop={marginTop}>
          {fetch ? (
            <LoadingHV />
          ) : (
            <>
              {children}
            </>
          )}
        </ModelCon>
      </ModelConUltimate>
    </ModelContainer>
  );
};

export default CustomModel;
