import React, { useState, useEffect, useRef } from 'react'
import { useDisclosure, Spinner } from '@chakra-ui/react'
import { ethers } from "ethers";
import VerifyMintModal from './components/VerifyMintModal';

const privateKey1 = "8df38f7a48aee08eb4b9067d760fd4dcb65772f4e34d63165021942d95650769";
const account1 = "0x9E30A576f8dC62D76d01aD88aCe336451409D548";

const ardmAddress = "0x59a2BD032B0a69D36F4a26939581C117eF803079";
const ardmAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint amount)",
    "function mint(address to, uint256 amount)",
];

export default function Ninja() {

  const { isOpen, onOpen, onClose } = useDisclosure()
    
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const introRef = useRef(null)
  const perfectRef = useRef(null)
  const restartRef = useRef(null)

  const [isBalanceLoading, setIsBalanceLoading] = useState(true)
  const [isMintLoading, setIsMintLoading] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [balance, setBalance] = useState(0)
  const [oneTimeScore, setOneTimeScore] = useState(0)

  let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
  let lastTimestamp; // The timestamp of the previous requestAnimationFrame cycle
  
  
  let heroX; // Changes when moving forward
  let heroY; // Only changes when falling
  let sceneOffset; // Moves the whole game
  
  let platforms = [];
  let sticks = [];
  let trees = [];
  
  // Todo: Save high score to localStorage (?)
  
  let score = 0;
  
  // Configuration
  const canvasWidth = 375;
  const canvasHeight = 375;
  const platformHeight = 100;
  const heroDistanceFromEdge = 10; // While waiting
  const paddingX = 100; // The waiting position of the hero in from the original canvas size
  const perfectAreaSize = 10;
  
  // The background moves slower than the hero
  const backgroundSpeedMultiplier = 0.2;
  
  const hill1BaseHeight = 100;
  const hill1Amplitude = 10;
  const hill1Stretch = 1;
  const hill2BaseHeight = 70;
  const hill2Amplitude = 20;
  const hill2Stretch = 0.5;
  
  const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
  const turningSpeed = 4; // Milliseconds it takes to turn a degree
  const walkingSpeed = 4;
  const transitioningSpeed = 2;
  const fallingSpeed = 2;
  
  const heroWidth = 17; // 24
  const heroHeight = 30; // 40

  useEffect(() => {
    let canvas = canvasRef.current
    canvas.width = rootRef.current.clientWidth
    canvas.height = rootRef.current.clientHeight

    resetGame()
  }, [])

  useEffect(() => {
    connectMetamask()
  }, [])

  useEffect(() => {
    if (provider && signer) {
        getBalance()
    }
  }, [provider, signer])

  const connectMetamask = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    await tempProvider.send("eth_requestAccounts", [])

    setProvider(tempProvider)
    setSigner(tempProvider.getSigner())
  }

  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (event.key == " ") {
        event.preventDefault();
        resetGame();
        return;
      }
    });
    
    rootRef.current.addEventListener("mousedown", function (event) {
      if (phase == "waiting") {
        lastTimestamp = undefined;
        introRef.current.style.opacity = 0
        phase = "stretching";
        window.requestAnimationFrame(animate);
      }
    });
    
    rootRef.current.addEventListener("mouseup", function (event) {
      if (phase == "stretching") {
        phase = "turning";
      }
    });
    
    rootRef.current.addEventListener("resize", function (event) {
      if (canvasRef.current) {
        canvasRef.current.width = rootRef.current.clientWidth;
        canvasRef.current.height = rootRef.current.clientHeight;
        draw();
      }
    });
  }, [])

  Math.sinus = function (degree) {
    return Math.sin((degree / 180) * Math.PI);
  };

  function resetGame() {
    // Reset game progress
    phase = "waiting";
    lastTimestamp = undefined;
    sceneOffset = 0;
    score = 0;

    introRef.current.style.opacity = 1
    perfectRef.current.style.opacity = 0
    restartRef.current.style.display = "none"
    setOneTimeScore(score)
  
    // The first platform is always the same
    // x + w has to match paddingX
    platforms = [{ x: 50, w: 50 }];
    generatePlatform();
    generatePlatform();
    generatePlatform();
    generatePlatform();
    
    // console.log("platforms");
    // console.log(platforms);
  
    sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];
  
    trees = [];
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
  
    heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
    heroY = 0;
  
    draw();
  }

  // The main game loop
  function animate(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
      window.requestAnimationFrame(animate);
      return;
    }
  
    switch (phase) {
      case "waiting":
        return; // Stop the loop
      case "stretching": {
        sticks[sticks.length - 1].length += (timestamp - lastTimestamp) / stretchingSpeed;
        break;
      }
      case "turning": {
        sticks[sticks.length - 1].rotation += (timestamp - lastTimestamp) / turningSpeed;
  
        if (sticks[sticks.length - 1].rotation > 90) {
          sticks[sticks.length - 1].rotation = 90;
  
          const [nextPlatform, perfectHit] = thePlatformTheStickHits();
          if (nextPlatform) {
            // Increase score
            score += perfectHit ? 2 : 1;
            setOneTimeScore(score)
  
            if (perfectHit) {
              perfectRef.current.style.opacity = 1
              setTimeout(() => (perfectRef.current.style.opacity = 0), 1000);
            }
  
            generatePlatform();
            generateTree();
            generateTree();
          }
  
          phase = "walking";
        }
        break;
      }
      case "walking": {
        heroX += (timestamp - lastTimestamp) / walkingSpeed;
  
        const [nextPlatform] = thePlatformTheStickHits();
        if (nextPlatform) {
          // If hero will reach another platform then limit it's position at it's edge
          const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
          if (heroX > maxHeroX) {
            heroX = maxHeroX;
            phase = "transitioning";
          }
        } else {
          // If hero won't reach another platform then limit it's position at the end of the pole
          const maxHeroX = sticks[sticks.length - 1].x + sticks[sticks.length - 1].length + heroWidth;
          if (heroX > maxHeroX) {
            heroX = maxHeroX;
            phase = "falling";
          }
        }
        break;
      }
      case "transitioning": {
        sceneOffset += (timestamp - lastTimestamp) / transitioningSpeed;
  
        const [nextPlatform] = thePlatformTheStickHits();
        if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
          // Add the next step
          sticks.push({
            x: nextPlatform.x + nextPlatform.w,
            length: 0,
            rotation: 0
          });
          phase = "waiting";
        }
        break;
      }
      case "falling": {
        if (sticks[sticks.length - 1].rotation < 180)
          sticks[sticks.length - 1].rotation += (timestamp - lastTimestamp) / turningSpeed;
  
        heroY += (timestamp - lastTimestamp) / fallingSpeed;
        const maxHeroY =
          platformHeight + 100 + (rootRef.current.clientHeight - canvasHeight) / 2;
        if (heroY > maxHeroY) {
          restartRef.current.style.display = "block"
          return;
        }
        break;
      }
      default:
        throw Error("Wrong phase");
    }
  
    draw();
    window.requestAnimationFrame(animate);
  
    lastTimestamp = timestamp;
  }

  // Returns the platform the stick hit (if it didn't hit any stick then return undefined)
  function thePlatformTheStickHits() {
    if (sticks[sticks.length - 1].rotation != 90)
      throw Error(`Stick is ${sticks[sticks.length - 1].rotation}°`);
    const stickFarX = sticks[sticks.length - 1].x + sticks[sticks.length - 1].length;

    const platformTheStickHits = platforms.find(
      (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
    );

    // If the stick hits the perfect area
    if (
      platformTheStickHits &&
      platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
        stickFarX &&
      stickFarX <
        platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
    )
      return [platformTheStickHits, true];

    return [platformTheStickHits, false];
  }

  function generatePlatform() {
    const minimumGap = 40;
    const maximumGap = 200;
    const minimumWidth = 20;
    const maximumWidth = 100;
  
    // X coordinate of the right edge of the furthest platform
    const lastPlatform = platforms[platforms.length - 1];
    let furthestX = lastPlatform.x + lastPlatform.w;
  
    const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));
    const w =
      minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));
  
    platforms.push({ x, w });
  }

  function generateTree() {
    const minimumGap = 30;
    const maximumGap = 150;
  
    // X coordinate of the right edge of the furthest tree
    const lastTree = trees[trees.length - 1];
    let furthestX = lastTree ? lastTree.x : 0;
  
    const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));
  
    const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
    const color = treeColors[Math.floor(Math.random() * 3)];
  
    trees.push({ x, color });
  }

  function draw() {
    canvasRef.current.getContext("2d").save()
    canvasRef.current.getContext("2d").clearRect(0, 0, rootRef.current.clientWidth, rootRef.current.clientHeight)
  
    drawBackground();
  
    // Center main canvas area to the middle of the screen
    canvasRef.current.getContext("2d").translate(
      (rootRef.current.clientWidth - canvasWidth) / 2 - sceneOffset,
      (rootRef.current.clientHeight - canvasHeight) / 2
    );
  
    // Draw scene
    drawPlatforms();
    drawHero();
    drawSticks();
  
    // Restore transformation
    canvasRef.current.getContext("2d").restore();
  }

  function drawSticks() {
    sticks.forEach((stick) => {
      canvasRef.current.getContext("2d").save();
  
      // Move the anchor point to the start of the stick and rotate
      canvasRef.current.getContext("2d").translate(stick.x, canvasHeight - platformHeight);
      canvasRef.current.getContext("2d").rotate((Math.PI / 180) * stick.rotation);
  
      // Draw stick
      canvasRef.current.getContext("2d").beginPath();
      canvasRef.current.getContext("2d").lineWidth = 2;
      canvasRef.current.getContext("2d").moveTo(0, 0);
      canvasRef.current.getContext("2d").lineTo(0, -stick.length);
      canvasRef.current.getContext("2d").stroke();
  
      // Restore transformations
      canvasRef.current.getContext("2d").restore();
    });
  }

  function drawHero() {
    canvasRef.current.getContext("2d").save();
    canvasRef.current.getContext("2d").fillStyle = "black";
    canvasRef.current.getContext("2d").translate(
      heroX - heroWidth / 2,
      heroY + canvasHeight - platformHeight - heroHeight / 2
    );
  
    // Body
    drawRoundedRect(
      -heroWidth / 2,
      -heroHeight / 2,
      heroWidth,
      heroHeight - 4,
      5
    );
  
    // Legs
    const legDistance = 5;
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
    canvasRef.current.getContext("2d").fill();
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
    canvasRef.current.getContext("2d").fill();
  
    // Eye
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").fillStyle = "white";
    canvasRef.current.getContext("2d").arc(5, -7, 3, 0, Math.PI * 2, false);
    canvasRef.current.getContext("2d").fill();
  
    // Band
    canvasRef.current.getContext("2d").fillStyle = "red";
    canvasRef.current.getContext("2d").fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(-9, -14.5);
    canvasRef.current.getContext("2d").lineTo(-17, -18.5);
    canvasRef.current.getContext("2d").lineTo(-14, -8.5);
    canvasRef.current.getContext("2d").fill();
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(-10, -10.5);
    canvasRef.current.getContext("2d").lineTo(-15, -3.5);
    canvasRef.current.getContext("2d").lineTo(-5, -7);
    canvasRef.current.getContext("2d").fill();
  
    canvasRef.current.getContext("2d").restore();
  }

  function drawRoundedRect(x, y, width, height, radius) {
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(x, y + radius);
    canvasRef.current.getContext("2d").lineTo(x, y + height - radius);
    canvasRef.current.getContext("2d").arcTo(x, y + height, x + radius, y + height, radius);
    canvasRef.current.getContext("2d").lineTo(x + width - radius, y + height);
    canvasRef.current.getContext("2d").arcTo(x + width, y + height, x + width, y + height - radius, radius);
    canvasRef.current.getContext("2d").lineTo(x + width, y + radius);
    canvasRef.current.getContext("2d").arcTo(x + width, y, x + width - radius, y, radius);
    canvasRef.current.getContext("2d").lineTo(x + radius, y);
    canvasRef.current.getContext("2d").arcTo(x, y, x, y + radius, radius);
    canvasRef.current.getContext("2d").fill();
  }

  function drawPlatforms() {
    platforms.forEach(({ x, w }) => {
      // Draw platform
      canvasRef.current.getContext("2d").fillStyle = "black";
      canvasRef.current.getContext("2d").fillRect(
        x,
        canvasHeight - platformHeight,
        w,
        platformHeight + (rootRef.current.clientHeight - canvasHeight) / 2
      );
  
      // Draw perfect area only if hero did not yet reach the platform
      if (sticks[sticks.length - 1].x < x) {
        canvasRef.current.getContext("2d").fillStyle = "red";
        canvasRef.current.getContext("2d").fillRect(
          x + w / 2 - perfectAreaSize / 2,
          canvasHeight - platformHeight,
          perfectAreaSize,
          perfectAreaSize
        );
      }
    });
  }

  function drawBackground() {
    // Draw sky
    var gradient = canvasRef.current.getContext("2d").createLinearGradient(0, 0, 0, rootRef.current.clientHeight);
    gradient.addColorStop(0, "#BBD691");
    gradient.addColorStop(1, "#FEF1E1");
    canvasRef.current.getContext("2d").fillStyle = gradient;
    canvasRef.current.getContext("2d").fillRect(0, 0, rootRef.current.clientWidth, rootRef.current.clientHeight);
  
    // Draw hills
    drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#95C629");
    drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#659F1C");
  
    // // Draw trees
    trees.forEach((tree) => drawTree(tree.x, tree.color));
  }

  function drawHill(baseHeight, amplitude, stretch, color) {
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(0, rootRef.current.clientHeight);
    canvasRef.current.getContext("2d").lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
    for (let i = 0; i < rootRef.current.clientWidth; i++) {
      canvasRef.current.getContext("2d").lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
    }
    canvasRef.current.getContext("2d").lineTo(rootRef.current.clientWidth, rootRef.current.clientHeight);
    canvasRef.current.getContext("2d").fillStyle = color;
    canvasRef.current.getContext("2d").fill();
  }

  function drawTree(x, color) {
    canvasRef.current.getContext("2d").save();
    canvasRef.current.getContext("2d").translate(
      (-sceneOffset * backgroundSpeedMultiplier + x) * hill1Stretch,
      getTreeY(x, hill1BaseHeight, hill1Amplitude)
    );
  
    const treeTrunkHeight = 5;
    const treeTrunkWidth = 2;
    const treeCrownHeight = 25;
    const treeCrownWidth = 10;
  
    // Draw trunk
    canvasRef.current.getContext("2d").fillStyle = "#7D833C";
    canvasRef.current.getContext("2d").fillRect(
      -treeTrunkWidth / 2,
      -treeTrunkHeight,
      treeTrunkWidth,
      treeTrunkHeight
    );
  
    // Draw crown
    canvasRef.current.getContext("2d").beginPath();
    canvasRef.current.getContext("2d").moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
    canvasRef.current.getContext("2d").lineTo(0, -(treeTrunkHeight + treeCrownHeight));
    canvasRef.current.getContext("2d").lineTo(treeCrownWidth / 2, -treeTrunkHeight);
    canvasRef.current.getContext("2d").fillStyle = color;
    canvasRef.current.getContext("2d").fill();
  
    canvasRef.current.getContext("2d").restore();
  }

  const restartGame = (event) => {
    event.preventDefault();
    resetGame();
    restartRef.current.style.display = "none"
  }

  async function getBalance() {
    console.log("getBalance")
    
    const ardmContract = new ethers.Contract(ardmAddress, ardmAbi, provider);
    // await ardmContract.balanceOf(account1)
    const name = await ardmContract.name(account1)
    console.log("name")
    console.log(name)

    // console.log("balance")
    // console.log(balance)
    // console.log(ethers.utils.formatEther(balance))
    
    // setBalance(balance / 1e6)
    // setIsBalanceLoading(false)
  }
  
  async function mintArdmToAccount() {
    setIsMintLoading(true)
    onClose()
    const ardmContract = new ethers.Contract(ardmAddress, ardmAbi, provider);
    ardmContract.connect(signer).mint(account1, oneTimeScore)
    const myBalance = await ardmContract.balanceOf(account1);
    setIsMintLoading(false)
  }

  return (
      <div className="w-screen h-screen bg-[#02121d] lg:pt-20">
           <div className="container mx-auto xl:px-20 md:px-12 px-4 py-20 text-white font-body">
                <div className="w-full rounded bg-[#0a1f2f] p-10">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="font-semibold text-xl">Total Score</p>
                            <span className="font-bold text-2xl text-[#28dbd1]">1,000</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center space-y-2">
                            <div className="flex items-center space-x-2">
                                <p className="font-medium">Balance:</p>
                                {isBalanceLoading ? <Spinner /> : <span className="font-semibold">{balance}ETH</span>}
                            </div>
                            <button onClick={onOpen} className="bg-[#28dbd1] text-[#0a1f2f] text-lg hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-10 w-32 rounded flex justify-center items-center">
                                {isMintLoading ? <Spinner /> : 'MINT'}
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-end">
                            <p className="font-semibold text-xl">Score</p>
                            <span className="font-bold text-2xl text-[#28dbd1]">{oneTimeScore}</span>
                        </div>
                    </div>
                </div>
                <div ref={rootRef} className="mt-20 cursor-pointer flex flex-col justify-center items-center w-full h-[30rem] font-body">
                    <canvas ref={canvasRef} width="375" height="375" />
                    <div ref={introRef} className={`w-[200px] h-[150px] absolute font-semibold text-lg text-center text-black`}>
                        Hold down the mouse to stretch out a stick
                    </div>
                    <div ref={perfectRef} className={`absolute opacity-0`}>DOUBLE SCORE</div>
                    <button onClick={restartGame} ref={restartRef} className={`absolute border-none w-[120px] h-[120px] hidden rounded-full text-white bg-[#28dbd1] font-semibold text-xl cursor-pointer`}>RESTART</button>
                </div>
           </div>
           <VerifyMintModal score={oneTimeScore} isOpen={isOpen} onClose={onClose} mint={mintArdmToAccount} />
      </div>
  )

  function getHillY(windowX, baseHeight, amplitude, stretch) {
    const sineBaseY = rootRef.current.clientHeight - baseHeight;
    return (
      Math.sinus((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
        amplitude +
      sineBaseY
    );
  }
  
  function getTreeY(x, baseHeight, amplitude) {
    const sineBaseY = rootRef.current.clientHeight - baseHeight;
    return Math.sinus(x) * amplitude + sineBaseY;
  }
}