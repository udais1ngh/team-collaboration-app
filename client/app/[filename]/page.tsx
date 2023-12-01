"use client";
import "../globals.css";
import { FC, useEffect, useState } from "react";

import { ChromePicker } from "react-color";

import { io } from "socket.io-client";
import { useDraw } from "../../hooks/useDraw";
import { drawLine } from "../../utils/drawLine";
import { usePathname, useRouter } from "next/navigation";
import Room from "../components/room";

interface pageProps {}
const socket = io(`http://localhost:3001`);
type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

function submit() {
  socket.emit("clear");
}

const page: FC<pageProps> = ({}) => {
  
  const pathName = usePathname();
  const lastSegment = pathName.substring(pathName.lastIndexOf("/") + 1);
  

  function submit() {
    socket.emit("clear");
    
  }

  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  // useEffect(() => {

  //   console.log(router.query);
  // }, [router]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      console.log("sending canvas state");
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      console.log("I received the state");
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return console.log("no ctx here");
        drawLine({ prevPoint, currentPoint, ctx, color });
      }
    );

    socket.on("clear", clear);

    return () => {
      socket.off("draw-line");
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("clear");
    };
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  return (
    <div className="container">
      <div className=" subcontainer">
        <div className="flex">
          <button type="button" className="clearcanvas" onClick={submit}>
            Clear canvas
          </button>

          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            width={450}
            height={750}
            className="canvas"
          />
          <ChromePicker
            className=""
            color={color}
            onChange={(e) => setColor(e.hex)}
          />
        </div>
        <div>
          <Room roomId={lastSegment}/>
        </div>
      </div>
    </div>
  );
};

export default page;
