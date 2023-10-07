import React, { useState, useEffect, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements, tool, color, brush, addToHistory, user, socket}) => {

  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.on("whiteboardDataRes", (data) => {
      setImage(data.imgUrl);
    })
  }, []);

  if(!user?.host){
    return(
      <div className='h-100 w-100 overflow-hidden'>
        <img src={image} alt="Host Sharing!!" style={{
          height: window.innerHeight*2,
          width: "200%"
        }}/>
      </div>
    )
  }

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight*2;
    canvas.width = window.innerWidth*2;
    const ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = color;
    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
    ctxRef.current.strokeWidth = brush;
  }, [color, brush]);

  useLayoutEffect(() => {

    if(canvasRef){
      const roughCanvas = rough.canvas(canvasRef.current);

      if(elements.length > 0){
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
  
      elements.forEach((element) => {
        if(element.type === "pencil") roughCanvas.linearPath(element.path, { stroke: element.stroke, strokeWidth: element.brushSize, roughness: 0 });
        else if(element.type === "line"){
          roughCanvas.draw(
            roughGenerator.line(element.startX, element.startY, element.endX, element.endY, { stroke: element.stroke, strokeWidth: element.brushSize, roughness: 0 })
          );
        }
        else if(element.type === "rect"){
          roughCanvas.draw(
            roughGenerator.rectangle(element.startX, element.startY, element.endX, element.endY, { stroke: element.stroke, strokeWidth: element.brushSize, roughness: 0 })
          );
        }
        else if(element.type === "circle"){
          roughCanvas.draw(
            roughGenerator.circle(element.centerX, element.centerY, element.radius, { stroke: element.stroke, strokeWidth: element.brushSize, roughness: 0 })
          );
        }
        else if(element.type === "ellipse"){
          roughCanvas.draw(
            roughGenerator.ellipse(element.centerX, element.centerY, element.width, element.height, { stroke: element.stroke, strokeWidth: element.brushSize, roughness: 0 })
          );
        }
      });

      const canvasImg = canvasRef.current.toDataURL();
      socket.emit("whiteboardData", canvasImg);
    }

  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if(tool === "pencil"){
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          path: [[offsetX, offsetY]],
          stroke: color,
          brushSize: brush,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          startX: offsetX,
          startY: offsetY,
          endX: offsetX,
          endY: offsetY,
          stroke: color,
          brushSize: brush,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          startX: offsetX,
          startY: offsetY,
          endX: 0,
          endY: 0,
          stroke: color,
          brushSize: brush,
        },
      ]);
    } else if (tool === "circle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "circle",
          centerX: offsetX,
          centerY: offsetY,
          radius: 0,
          stroke: color,
          brushSize: brush,
        },
      ]);
    } else if (tool === "ellipse") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "ellipse",
          centerX: offsetX,
          centerY: offsetY,
          width: 0,
          height: 0,
          stroke: color,
          brushSize: brush,
        },
      ]);
    }

    setDrawing(true);
  }

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (elements && elements.length > 0 && drawing) {
      if(tool === "pencil"){
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];

        setElements((prevElements) =>
          prevElements.map((ele, index) =>
            index === elements.length - 1 ? { ...ele, path: newPath } : ele
          )
        );
      } else if(tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) =>
            index === elements.length - 1 ? { ...ele, endX: offsetX, endY: offsetY } : ele
          )
        );
      } else if(tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) =>
            index === elements.length - 1 ? { ...ele, endX: offsetX - ele.startX, endY: offsetY - ele.startY} : ele
          )
        );
      } else if(tool === "circle") {
        const centerX = elements[elements.length - 1].centerX;
        const centerY = elements[elements.length - 1].centerY;
        const radius = Math.hypot(offsetX - centerX, offsetY - centerY);

        setElements((prevElements) =>
          prevElements.map((ele, index) =>
            index === elements.length - 1 ? { ...ele, radius: radius } : ele
          )
        );
      } else if(tool === "ellipse") {
        const centerX = elements[elements.length - 1].centerX;
        const centerY = elements[elements.length - 1].centerY;
        const width = Math.abs(offsetX - centerX) * 2;
        const height = Math.abs(offsetY - centerY) * 2;

        setElements((prevElements) =>
          prevElements.map((ele, index) =>
            index === elements.length - 1 ? { ...ele, width: width, height: height } : ele
          )
        );
      }
    }
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
    addToHistory([...elements]);
  }

  return (  
      <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className='h-100 w-100 overflow-hidden'>
        <canvas ref={canvasRef} />
      </div>
  )
}

export default WhiteBoard;
