import React from 'react';
import { Modal, Box } from '@mui/material';
import { useGameContext } from '../../context/GameProvider';
import TopBar from '../TopBar';

const SettingsModal = () => {
    const { isSettingsModalOpen, toggleSettingsModal } = useGameContext();
    return (
        <Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={isSettingsModalOpen}
        onClose={toggleSettingsModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400, backgroundColor: 'white'}}>
          <TopBar />
        </Box>
      </Modal>
    )
}

export default SettingsModal;