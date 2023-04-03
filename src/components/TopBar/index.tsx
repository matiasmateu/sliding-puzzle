import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent, Checkbox } from "@mui/material";
import { useGameContext } from '../../context/GameProvider';

const TopBar = () => {
    const { onShuffle, onPiecesChange, showHelp, toggleHelpMe, rows, cols, moves } = useGameContext();
    const handlePiecesChange = (event: SelectChangeEvent<string>) => {
        onPiecesChange(parseInt(event.target.value));
      };
    return (
        <TopBarContainer>
            <Moves>Moves: {moves}</Moves>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(rows * cols)}
                label="Age"
                onChange={handlePiecesChange}
            >
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
            </FormControl>
            <Helpme>
                <Checkbox aria-label='Help me' checked={showHelp} onChange={toggleHelpMe}/>
                Help me solve it
            </Helpme>
            <Button variant="contained" style={{marginTop: 24}} onClick={onShuffle}>Shuffle</Button>
        </TopBarContainer>
    )
}

export default TopBar;

const Helpme = styled.div`
    color: #000;    
    margin-top: 24px;
`

const TopBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const Moves = styled.div`
    margin-bottom: 16px;
    color: #000;
`