import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import arrowDown from "../images/arrow-down-gray.svg";
import arrowUp from "../images/arrow-up-gray.svg";

const Trash = ({ text1, text2, imageSrc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TrashContainer expanded={isExpanded} onClick={handleToggle}>
      {" "}
      <TopContainer>
        <TextWrapper>
          <Place>{text1}</Place>
          <Detail>{text2}</Detail>
        </TextWrapper>
        <img src={isExpanded ? arrowUp : arrowDown} alt="Toggle Arrow" />{" "}
      </TopContainer>
      {isExpanded && imageSrc && (
        <>
          <Line />
          <Image src={imageSrc} alt="Trash Icon" />
        </>
      )}
    </TrashContainer>
  );
};

Trash.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

export default Trash;

const TrashContainer = styled.div`
  width: 349px;
  height: ${({ expanded }) => (expanded ? "297px" : "87px")};
  border: 1px solid var(--gray04, #c1d9cc);
  background: var(--wh, #fff);
  display: flex;
  align-items: top;
  border-radius: 15px;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 15px;
`;

const TextWrapper = styled.div`
  text-align: left;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Place = styled.div`
  color: var(--bk01, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Detail = styled.div`
  color: var(--gray05, #8e8e8e);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

const Image = styled.img`
  padding: 10px;
`;

const Line = styled.div`
  width: 349.001px;
  height: 1px;
  border-top: 1px dashed #c1d9cc;
`;
