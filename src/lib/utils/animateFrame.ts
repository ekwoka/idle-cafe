export const animateFrame = (func: (v: number) => void) => {
  const frame = (v: number) => {
    func(v);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};
