import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import './index.css';
import Navbar from './navbar';
import WhiteBoard from '../../components/Whiteboard';
import * as Icon from 'react-bootstrap-icons';

const RoomPage = ({socket, user, users}) => {
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('black');
  const [brush, setBrush] = useState("4");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
    setHistory([]);
    setCurrentHistoryIndex(-1);
  };


  const addToHistory = (newElements) => {
    setCurrentHistoryIndex(currentHistoryIndex + 1);
    setHistory((prevHistory) => [...prevHistory.slice(0, currentHistoryIndex + 1), newElements]);
  };


  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setElements(history[currentHistoryIndex - 1]);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setElements(history[currentHistoryIndex + 1]);
    }
  };

  const SaveToLocal = (event) => {

    let link = event.currentTarget;

    if(event.currentTarget.id == "download_as_img"){

      link.setAttribute('download','canvas.png');
      let image = canvasRef.current.toDataURL('image/png');
      link.setAttribute('href', image);

    } else if(event.currentTarget.id == "download_as_pdf"){
      
      const canvas = canvasRef.current;
      html2canvas(canvas).then((canvasImage) => {
        const imgData = canvasImage.toDataURL('image/png');
        const pdf = new jspdf('l', 'mm', 'a4'); 
        pdf.addImage(imgData, 'PNG', 10, 10, 280, 190); 
        pdf.save('canvas.pdf');
      });
    }
  }


  return (
    <>
      <Navbar
        user={user}
        users={users} 
        SaveToLocal = {SaveToLocal}
        socket={socket}
      />
      <div className='board-styles d-flex flex-column align-items-center justify-content-between'>
      <WhiteBoard
        canvasRef={canvasRef}
        ctxRef={ctxRef}
        elements={elements}
        setElements={setElements}
        tool={tool}
        color={color}
        brush={brush}
        addToHistory={addToHistory}
        user={user}
        socket={socket}
      />

      {user?.host && (
        <div className="options-container">
              <div className="d-flex">
                <div className="option" onClick={() => setTool('pencil')}>
                  <Icon.Pencil />
                </div>
                <div className="option" onClick={() => setTool('line')}>
                  <Icon.Line />
                </div>
                <div className="option" onClick={() => setTool('rect')}>
                  <Icon.Square />
                </div>
                <div className="option" onClick={() => setTool('circle')}>
                  <Icon.Circle />
                </div>
                <div className="option" onClick={() => setTool('ellipse')}>
                  <Icon.BoundingBoxCircles />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor='color' className="mx-2"><Icon.Palette /></label>
                <input
                  type='color'
                  id='color'
                  className='spacing-between'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label htmlFor='brush' className="mx-2"><Icon.Brush /></label>
                <input
                  type='range'
                  id='brush'
                  min="0"
                  max="20"
                  step="1"
                  value={brush}
                  onChange={(e) => setBrush(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2">
                <div className="option" onClick={undo}>
                  <Icon.ArrowCounterclockwise />
                </div>
                <div className="option" onClick={redo}>
                  <Icon.ArrowClockwise />
                </div>
                <div className="option" onClick={handleClearCanvas}>
                  <Icon.Trash3 />
                </div>
              </div>
        </div>
      )}

    </div>
  </>
  );
};

export default RoomPage;