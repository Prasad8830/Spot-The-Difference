import { useEffect, useRef, useState } from 'react'
import config from '../game-config.json'
import image1 from '../assets/forest-scene1.jpg'
import image2 from '../assets/forest-scene2.jpg'

const Game = () => {
  const [foundDifferences, setFoundDifferences] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [timer, setTimer] = useState('00:00')
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
  if (!startTime) {
    setStartTime(new Date());
  }
}, []);

  const imageRef = useRef(null)
  const timerIntervalRef = useRef(null);
  const successMessageRef = useRef(null);

  useEffect(() => {
  if (!startTime) return;

  if (timerIntervalRef.current) {
    clearInterval(timerIntervalRef.current);
  }

  timerIntervalRef.current = setInterval(() => {
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    setTimer(`${minutes}:${seconds}`);
  }, 1000);

  return () => clearInterval(timerIntervalRef.current);
}, [startTime]);


  useEffect(() => {
    if (foundDifferences.length === config.differences.length) {
      clearInterval(timerIntervalRef.current)
      setGameOver(true)

    setTimeout(() => {
        createConfetti();
    }, 100);
    }
  }, [foundDifferences])

  const handleImageClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const scaleX = imageRef.current.clientWidth / imageRef.current.naturalWidth
    const scaleY = imageRef.current.clientHeight / imageRef.current.naturalHeight

    const clickBuffer = 20

    config.differences.forEach((diff, idx) => {
      if (foundDifferences.includes(idx)) return

      const scaledX = diff.x * scaleX
      const scaledY = diff.y * scaleY
      const scaledWidth = diff.width * scaleX
      const scaledHeight = diff.height * scaleY

      if (
        x >= (scaledX - clickBuffer) &&
        x <= (scaledX + scaledWidth + clickBuffer) &&
        y >= (scaledY - clickBuffer) &&
        y <= (scaledY + scaledHeight + clickBuffer)
      ) {
        setFoundDifferences([...foundDifferences, idx])
      }
    })
  }
  const createConfetti = () => {
  const colors = ['#ff5722', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0', '#e91e63'];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    const left = Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const delay = Math.random() * 3;

    confetti.style.left = `${left}%`;
    confetti.style.backgroundColor = color;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.animationDelay = `${delay}s`;

    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '50%';
    } else {
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    successMessageRef.current?.appendChild(confetti);
  }
};


 const restartGame = () => {
  clearInterval(timerIntervalRef.current);
  setFoundDifferences([]);
  setTimer('00:00');
  setGameOver(false);
  setStartTime(new Date());

  const confettiElements = successMessageRef.current?.querySelectorAll('.confetti');
  confettiElements?.forEach((el) => el.remove());
};
  return (
    <>
      <header>
        <h1 id="game-title">{config.gameTitle}</h1>
        <div className="game-info">
          <div className="score-container">
            <span>Score: </span>
            <span>{foundDifferences.length}</span>
            <span>/</span>
            <span>{config.differences.length}</span>
          </div>
          <div className="timer-container">
            <span>Time: </span>
            <span>{timer}</span>
          </div>
        </div>
      </header>

      <div className="images-container">
        {[image1, image2].map((img, i) => (
          <div className="image-wrapper" key={i}>
            <div className="image-container" onClick={handleImageClick}>
              <img ref={imageRef} src={img} alt={`Image ${i + 1}`} />
              <div className="markers-container">
                {foundDifferences.map((idx) => {
                  const diff = config.differences[idx]
                  const scaleX = imageRef.current?.clientWidth / imageRef.current?.naturalWidth || 1
                  const scaleY = imageRef.current?.clientHeight / imageRef.current?.naturalHeight || 1
                  return (
                    <div
                      key={idx}
                      className="marker"
                      style={{
                        left: `${diff.x * scaleX}px`,
                        top: `${diff.y * scaleY}px`,
                        width: `${diff.width * scaleX}px`,
                        height: `${diff.height * scaleY}px`
                      }}
                    ></div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div id="success-message" className="visible" ref={successMessageRef}>
          <div className="success-content">
            <h2>Congratulations!</h2>
            <p>You found all the differences!</p>
            <p>Time: <span>{timer}</span></p>
            <button id="play-again" onClick={restartGame}>Play Again</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Game
