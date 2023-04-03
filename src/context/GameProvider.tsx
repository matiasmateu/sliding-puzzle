import React, { createContext, useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { shuffle, calPieceSize, canSwap, swap, isSolved } from '../utils';

interface GameContextReturn {
    rows: number;
    cols: number;
    hole: number;
    numbers: number[];
    pieceSize: number;
    isWinModalOpen: boolean;
    isSettingsModalOpen: boolean;
    moves: number;
    showHelp: boolean;
    setNumbers: (numbers: number[]) => void;
    setRows: (rows: number) => void;
    setCols: (cols: number) => void;
    onShuffle: () => void;
    onPiecesChange: (pieces: number) => void;
    onCalcPieceSize: () => void;
    onPieceClick: (index: number) => void;
    toggleWinModal: (isWinModalOpen: boolean) => void;
    toggleSettingsModal: () => void;
    toggleHelpMe: () => void;
}

const GameContext = createContext<GameContextReturn>({
    rows: 3,
    cols: 3,
    hole: 8,
    numbers: _.range(0, 3 * 3),
    pieceSize: 100,
    isWinModalOpen: false,
    moves: 0,
    isSettingsModalOpen: false,
    showHelp: false,
    setNumbers: () => {},
    setRows: () => {},
    setCols: () => {},
    onShuffle: () => {},
    onPiecesChange: () => {},
    onCalcPieceSize: () => {},
    onPieceClick: () => {},
    toggleWinModal: () => {},
    toggleSettingsModal: () => {},
    toggleHelpMe: () => {},
});

// @ts-ignore
export const GameProvider = ({ children }) => {
    const [newGame, setNewGame] = useState(true)
    const [moves, setMoves] = useState(0);
    const [hole, setHole] = useState(8);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [numbers, setNumbers] = useState(_.range(0, rows * cols))
    const [pieceSize, setPieceSize] = useState(100);
    const [isWinModalOpen, setIsWinModalOpen]  = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [showHelp, setShowhelp] = useState(false);

    const onShuffle = () => {
        setMoves(0)
        const shuffledNumbers = shuffle(numbers, hole, rows, cols)
        setNumbers(shuffledNumbers) 
    };

    const onCalcPieceSize = useCallback(() => {
        const newPieceSize = calPieceSize(rows)
        setPieceSize(newPieceSize)
      }, [rows]);

    const onPiecesChange = (pieces: number) => {
        setNewGame(true);
        setRows(Math.sqrt(pieces));
        setCols(Math.sqrt(pieces));
        setHole(pieces - 1);
        setNumbers(_.range(0, pieces));
    }

    const onPieceClick = (index: number) => {
        const holeIndex = numbers.indexOf(hole)
        if (canSwap(index, holeIndex, rows, cols)) {
          setMoves((prevState) => prevState + 1)
          setNewGame(false)
          const newNumbers = swap(numbers, index, holeIndex)
          setNumbers(newNumbers);
        }
    };

    const toggleWinModal = () => setIsWinModalOpen((prevState) => !prevState);
    const toggleSettingsModal = () => setIsSettingsModalOpen((prevState) => !prevState);
    const toggleHelpMe = () => setShowhelp((prevState) => !prevState);

    useEffect(()=>{
        if (isSolved(numbers) && !newGame) {
            toggleWinModal()
        }
    },[numbers, newGame])

    useEffect(()=>{
        if(newGame) setMoves(0)
    },[newGame])

    useEffect(()=>{
        onCalcPieceSize();
      },[rows, onCalcPieceSize])
      
      useEffect(() => {
        window.addEventListener('resize', onCalcPieceSize);
        return () => window.removeEventListener('resize', onCalcPieceSize);
      }, [onCalcPieceSize]);
    
    const value = {
        hole,
        rows,
        cols,
        numbers,
        pieceSize,
        isWinModalOpen,
        moves,
        isSettingsModalOpen,
        showHelp,
        setHole,
        setNumbers,
        setRows,
        setCols,
        onShuffle,
        onPiecesChange,
        onCalcPieceSize,
        onPieceClick,
        toggleWinModal,
        toggleSettingsModal,
        toggleHelpMe,
    };
    
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
    };

export const useGameContext = () => {
    const context = React.useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

export default GameContext;