export const animate = (draw: () => void, { limit, reset }) => {
  let count = 0;

  const timer = setInterval(() => {
    count++;
    draw();

    if (count === limit) {
      clearInterval(timer);
      reset();
    }
  }, 250);

  return timer;
};
