/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Tile from '../Tile';
import {getMatrixPosition, getVisualPosition} from '../../utils';
import { useGameContext } from '../../context/GameProvider';

const Puzzle = () => {
    const { numbers, rows, cols, pieceSize } = useGameContext();
    const pieceWidth = useMemo(() => Math.round(pieceSize), [pieceSize]);
    const pieceHeight = useMemo(() => Math.round(pieceSize), [pieceSize]);

    return (
        <Box>
          <UL>
            {numbers.map((number: number, index: number) => {
                const matrixPos = getMatrixPosition(index, rows, cols)
                const visualPos = getVisualPosition(matrixPos, pieceSize, pieceSize)
                return (
                    <Tile 
                      visualPos={visualPos}
                      index={index} 
                      number={number} 
                      key={number}
                      width={pieceWidth} 
                      height={pieceHeight}
                    />
                  )
            })}
          </UL>
        </Box>
      )
};

const UL = styled.ul`
  padding: 0;
  margin: 0;
`;

const Box = styled.div`
  width: 500px;
  height: 500px;
`;

export default Puzzle;