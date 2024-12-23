import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Text, Image, Transformer } from "react-konva";

const CanvasEditor = () => {
  const [canvases, setCanvases] = useState([]);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null); // 선택된 요소 ID
  const [uploadedImages, setUploadedImages] = useState([]);
  const transformerRef = useRef(null);

  // 명함 추가
  const addCanvas = () => {
    setCanvases((prev) => [
      ...prev,
      { id: `canvas-${prev.length + 1}`, elements: [] },
    ]);
  };

  // 새로운 요소 추가
  const addElement = (canvasId, type, additionalProps = {}) => {
    const newElement = {
      id: `element-${Date.now()}`,
      canvasId,
      type,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: type === "rect" ? "blue" : type === "circle" ? "red" : "#000",
      draggable: true,
      opacity: 1,
      flipX: false,
      flipY: false,
      ...additionalProps,
    };

    setElements((prev) => [...prev, newElement]);
  };

  // 요소 선택
  const handleSelect = (id) => {
    setSelectedElementId(id);
  };

  // 선택된 요소 삭제
  const deleteElement = () => {
    if (!selectedElementId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedElementId));
    setSelectedElementId(null);
  };

  // 요소 속성 업데이트
  const updateElement = (id, newProps) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  // Transformer 업데이트
  useEffect(() => {
    const stage = transformerRef.current?.getStage();
    const selectedNode = stage?.findOne(`#${selectedElementId}`);

    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedElementId]);

  // 이미지 업로드
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        setUploadedImages((prev) => [...prev, { src: reader.result, image: img }]);
        addElement("image", { src: reader.result });
      };
    };
    reader.readAsDataURL(file);
  };


  // 반전 적용
  const flipElement = (axis) => {
    if (!selectedId) return;
    const selectedElement = elements.find((el) => el.id === selectedId);
    if (axis === "x") {
      updateElement(selectedId, { flipX: !selectedElement.flipX });
    } else {
      updateElement(selectedId, { flipY: !selectedElement.flipY });
    }
  };

  // 정렬 기능
  const alignElement = (alignment) => {
    if (!selectedId) return;
    const stageWidth = 340; // 캔버스 너비
    const stageHeight = 220; // 캔버스 높이
    const selectedElement = elements.find((el) => el.id === selectedId);

    const newProps = {};
    if (alignment === "left") newProps.x = 0;
    if (alignment === "center") newProps.x = (stageWidth - selectedElement.width) / 2;
    if (alignment === "right") newProps.x = stageWidth - selectedElement.width;
    if (alignment === "top") newProps.y = 0;
    if (alignment === "middle") newProps.y = (stageHeight - selectedElement.height) / 2;
    if (alignment === "bottom") newProps.y = stageHeight - selectedElement.height;

    updateElement(selectedId, newProps);
  };


 // 요소 렌더링
 const renderElement = (el) => {
  const commonProps = {
    key: el.id,
    id: el.id,
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    draggable: el.draggable,
    fill: el.fill,
    opacity: el.opacity,
    scaleX: el.flipX ? -1 : 1,
    scaleY: el.flipY ? -1 : 1,
    onClick: () => handleSelect(el.id),
    onTransformEnd: (e) => {
      const node = e.target;
      updateElement(el.id, {
        x: node.x(),
        y: node.y(),
        width: node.width() * node.scaleX(),
        height: node.height() * node.scaleY(),
      });
    },
  };

  if (el.type === "rect") return <Rect {...commonProps} />;
  if (el.type === "circle") return <Circle {...commonProps} radius={el.width / 2} />;
  if (el.type === "text") return <Text {...commonProps} text="텍스트" />;
  if (el.type === "image") {
    return <Image {...commonProps} image={el.image} />;
  }
  return null;
};

  return (
    <div style={{ display: "flex" }}>
      {/* 사이드바 */}
      <div style={{ width: "200px", padding: "10px", borderRight: "1px solid #ddd" }}>
        <button onClick={addCanvas}>명함 생성</button>
        <button onClick={() => addElement(canvases[0]?.id, "rect")}>사각형 추가</button>
        <button onClick={() => addElement(canvases[0]?.id, "circle")}>원 추가</button>
        <button onClick={() => addElement(canvases[0]?.id, "text")}>텍스트 추가</button>
        <button onClick={deleteElement}>선택 삭제</button>
        <button onClick={() => alignElement("center")}>가운데 정렬</button>
        <button onClick={() => flipElement("x")}>좌우 반전</button>
        <input type="file" onChange={handleUpload} />
      </div>

      {/* 메인 편집 영역 */}
      <div style={{ flex: 1, padding: "10px" }}>
        {canvases.map((canvas) => (
          <div
            key={canvas.id}


            
            onDrop={(e) => handleUpload(e, canvas.id)}
            onDragOver={(e) => e.preventDefault()}
            style={{
              width: "340px",
              height: "220px",
              border: "1px solid black",
              margin: "10px",
              background: "#f8f8f8",
              position: "relative",
            }}
          >
            <Stage
              key={canvas.id}
              width={340}
              height={220}
              onClick={(e) => setSelectedId(e.target.attrs.id)}
              onDrop={(e) => handleUpload(e, canvas.id)}
              onDragOver={(e) => e.preventDefault()}
            >
              <Layer>
              {elements
                .filter((el) => el.canvasId === canvas.id)
                .map((el) => renderElement(el))}
              <Transformer ref={transformerRef} />
            </Layer>
          
            </Stage>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasEditor;
