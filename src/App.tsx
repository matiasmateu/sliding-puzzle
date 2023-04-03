import React from 'react';
import './App.css';
import Puzzle from './components/Puzzle';
import styled from 'styled-components';
import { useGameContext } from './context/GameProvider';
import { Fab } from '@mui/material';
import IconSettings from './components/IconSettings';
import SettingsModal from './components/SettingsModal';
import WinModal from './components/WinModal';

function App() {
  const { toggleSettingsModal } = useGameContext();

  return (
    <AppContainer>
      <Puzzle />
      <SettingsButtonContainer>
        <Fab color="secondary" aria-label="edit" onClick={toggleSettingsModal}>
          <IconSettings />
        </Fab>
      </SettingsButtonContainer>      
      <SettingsModal />
      <WinModal />
    </AppContainer>
  )
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  padding-top: 50px;
  background-color: #282c34;
  justify-content: center;
`;

const SettingsButtonContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
`