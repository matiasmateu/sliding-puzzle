import React from 'react';
import { Modal, Box } from '@mui/material';
import { useGameContext } from '../../context/GameProvider';


const WinModal = () => {
    const { isWinModalOpen, toggleWinModal, moves } = useGameContext();
    return (
        <Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={isWinModalOpen}
        onClose={toggleWinModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400, backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', alignItems: 'center', display: 'flexs' }}>
          You Won in {moves} moves !
        </Box>
      </Modal>
    )

}

export default WinModal;