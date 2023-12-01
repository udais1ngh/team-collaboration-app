// 'use client'
// import '../app/globals.css'
// import { FC, useEffect, useState } from 'react'
// //import { useDraw } from '../hooks/useDraw'
// import { ChromePicker } from 'react-color'

// import { io } from 'socket.io-client'
// import { useDraw } from '../hooks/useDraw'
// import { drawLine } from '../utils/drawLine'
// //import { drawLine } from '../utils/drawLine'

// const socket = io('http://localhost:3001')

// interface pageProps {}

// type DrawLineProps = {
//   prevPoint: Point | null
//   currentPoint: Point
//   color: string
// }

// const NextPage: FC<pageProps> = ({}) => {
//   const [color, setColor] = useState<string>('#000')
//   const { canvasRef, onMouseDown, clear } = useDraw(createLine)

//   useEffect(() => {
//     const ctx = canvasRef.current?.getContext('2d')

//     socket.emit('client-ready')

//     socket.on('get-canvas-state', () => {
//       if (!canvasRef.current?.toDataURL()) return
//       console.log('sending canvas state')
//       socket.emit('canvas-state', canvasRef.current.toDataURL())
//     })

//     socket.on('canvas-state-from-server', (state: string) => {
//       console.log('I received the state')
//       const img = new Image()
//       img.src = state
//       img.onload = () => {
//         ctx?.drawImage(img, 0, 0)
//       }
//     })

//     socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLineProps) => {
//       if (!ctx) return console.log('no ctx here')
//       drawLine({ prevPoint, currentPoint, ctx, color })
//     })

//     socket.on('clear', clear)

//     return () => {
//       socket.off('draw-line')
//       socket.off('get-canvas-state')
//       socket.off('canvas-state-from-server')
//       socket.off('clear')
//     }
//   }, [canvasRef])

//   function createLine({ prevPoint, currentPoint, ctx }: Draw) {
//     socket.emit('draw-line', { prevPoint, currentPoint, color })
//     drawLine({ prevPoint, currentPoint, ctx, color })
//   }

//   return (
//     <div className='container'>
//       <div className=' subcontainer'>
       
//         <button
//           type='button'
//           className='clearcanvas'
//           onClick={() => socket.emit('clear')}>
//           Clear canvas
//         </button>
      
//         <canvas
//         ref={canvasRef}
//         onMouseDown={onMouseDown}
//         width={750}
//         height={450}
//         className='canvas'
//       />
//        <ChromePicker className=''  color={color} onChange={(e) => setColor(e.hex)} />
      
//       </div>
      
//     </div>
//   )
// }

// export default NextPage
