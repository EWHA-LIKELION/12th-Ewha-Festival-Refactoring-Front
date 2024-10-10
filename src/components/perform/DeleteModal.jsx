import styled from "styled-components";

const DeleteModal = ({ setModal, confirmDelete }) => {
  const toggleModal = () => {
    setModal(false);
  };

  return (
    <Wrapper>
      <ModalBackground onClick={toggleModal} />
      <ModalWrapper>
        <ModalTop>공지 삭제</ModalTop>
        <ModalDiv>
          <p>공지를 삭제하시겠습니까?</p>
          <p
            style={{
              color: "#928D8D",
              fontSize: "10px",
              margin: "0",
              paddingBottom: "20px",
              paddingTop: "6px",
            }}
          >
            삭제된 내용은 되돌릴 수 없습니다.
          </p>
          <Button>
            <NoBtn onClick={toggleModal}>아니오</NoBtn>
            <YesBtn onClick={confirmDelete}>예</YesBtn> {/* 예 버튼 클릭 시 삭제 실행 */}
          </Button>
        </ModalDiv>
      </ModalWrapper>
    </Wrapper>
  );
};

export default DeleteModal;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

const ModalWrapper = styled.div`
  width: 286px;
  height: 186px;
  border-radius: 10px;
  background: #fff;
  z-index: 10;
`;

const ModalTop = styled.div`
  background: #1ef380;
  width: 286px;
  height: 52px;
  color: #fff;
  text-align: center;
`;

const ModalDiv = styled.div`
  padding: 20px;
  text-align: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const YesBtn = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  cursor: pointer;
`;
