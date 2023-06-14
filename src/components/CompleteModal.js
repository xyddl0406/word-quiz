import { Modal, Button } from 'flowbite-react';

import React from 'react';

const CompleteModal = ({reset, modalShow, count, setModalShow}) => {
    return (
        <Modal
            show={modalShow}
        >
            <Modal.Body>
                <div className="space-y-6">
                    <p style={{textAlign: "center", fontSize: "2em"}}>👍👍👍 정답 수 : <span style={{fontSize : "4em"}}>{count}</span> 👍👍👍</p>
                </div>
            </Modal.Body>
            <Modal.Footer style={{justifyContent : "center"}}>
                <Button onClick={() => reset()}>
                    다시하기
                </Button>
                <Button
                    color="light"
                    onClick={() => setModalShow(false)}
                >
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompleteModal;

