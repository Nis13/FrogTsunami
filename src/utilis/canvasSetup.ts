export const setupCanvas = (canvasId: string, width: number, height: number) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
  
    canvas.width = width;
    canvas.height = height;
  
    return { canvas, ctx };
  };
  