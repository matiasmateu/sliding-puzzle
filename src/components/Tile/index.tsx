/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSpring, animated } from '@react-spring/web'
import styled from 'styled-components';
import image from './ardilla.png';
import { useGameContext } from '../../context/GameProvider';

interface PieceProps {
  width: number;
}

interface PieceNumberProps {
  height: number;
}

interface TileProps {
  number: number;
  width: number;
  height: number;
  index: number;
  visualPos: {x: number, y: number};
}

const Tile = (props: TileProps) => {
    const { cols, hole, onPieceClick, showHelp } = useGameContext();
    const { number, width, height, index, visualPos } = props;
    const [springs, api] = useSpring(() => ({
        from: {
          x: 0,
          y: 0,
        },
        to: {
          x: visualPos.x,
          y: visualPos.y,
        },
    }));

    useEffect(()=>{
        api.start({
          to: {
            x: visualPos.x,
            y: visualPos.y,
          },
        })
    },[visualPos, api])

      const style = {
        boxShadow: 'inset 0 0 1px 0 black',
        boxSizing: 'border-box',
        display: 'block',
        padding: 6,
        position: 'absolute',
        width,
        height,
        overflow: 'hidden',
        ...(number === hole ? { opacity: 0 } : {}),
        ...springs,
      }
    const handleClick = () => onPieceClick(index)
  
    const calculatePosition = (n: number) => {
        const row = Math.floor(n / cols);
        const col = n % cols;
        const top = -width * row;
        const left = -width * col;
        return { top, left };
    }

    return (
        <div>
          {/* @ts-ignore TO DO: Check Style mismatch*/ }
          <animated.div style={style} onClick={handleClick}>
            <Piece width={width}>
            <Image 
                  src={image} 
                  style={calculatePosition(number)} 
                  width={cols * width} 
                  height={cols * width}
                />
            </Piece>
            { 
              showHelp && <PieceNumber height={height}>{number + 1}</PieceNumber>
            }
          </animated.div>
        </div>
    )
}

const PieceNumber = styled.div<PieceNumberProps>`
  position: absolute;
  line-height: ${props => props.height}px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  color: white;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  color: #000

`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`

const Piece = styled.div<PieceProps>`
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  overflow: hidden;
  overflowX: hidden;
`

export default Tile;