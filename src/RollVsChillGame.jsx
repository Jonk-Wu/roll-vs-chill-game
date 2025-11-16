import React, { useState, useEffect } from 'react';

const RollVsChillGame = () => {
  const [gameState, setGameState] = useState('start'); // start, character, story, ending
  const [character, setCharacter] = useState(null); // 'roll' or 'chill'
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [scene, setScene] = useState(0);
  const [choices, setChoices] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // 游戏开始
  const startGame = () => {
    setGameState('character');
  };

  // 选择角色
  const selectCharacter = (char) => {
    setCharacter(char);
    setGameState('story');
    setScene(0);
    setChoices([]);
    if (char === 'roll') {
      setEnergy(80);
      setHappiness(40);
    } else {
      setEnergy(30);
      setHappiness(70);
    }
  };

  // 做出选择
  const makeChoice = (choice) => {
    setChoices([...choices, choice]);
    
    // 根据选择调整属性
    if (choice.energy) setEnergy(Math.min(100, Math.max(0, energy + choice.energy)));
    if (choice.happiness) setHappiness(Math.min(100, Math.max(0, happiness + choice.happiness)));
    
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      if (scene < 3) {
        setScene(scene + 1);
      } else {
        setGameState('ending');
      }
    }, 2000);
  };

  // 重新开始
  const restart = () => {
    setGameState('start');
    setCharacter(null);
    setEnergy(50);
    setHappiness(50);
    setScene(0);
    setChoices([]);
    setShowResult(false);
  };

  // 故事场景
  const storyScenes = {
    roll: [
      {
        title: "早晨 6:00",
        description: "闹钟响了！今天有重要的考试...",
        emoji: "⏰",
        choices: [
          { text: "立刻起床复习！", energy: -10, happiness: -5, result: "你精神饱满地开始了一天！" },
          { text: "再睡5分钟...", energy: +5, happiness: +10, result: "虽然晚了点，但心情不错！" }
        ]
      },
      {
        title: "中午 12:00",
        description: "室友约你一起吃饭逛街...",
        emoji: "🍔",
        choices: [
          { text: "去！放松一下", energy: +10, happiness: +15, result: "你充了电，心情愉快！" },
          { text: "不了，继续学习", energy: -5, happiness: -10, result: "你很有毅力，但有点累..." }
        ]
      },
      {
        title: "下午 15:00",
        description: "发现一个新的实习机会...",
        emoji: "💼",
        choices: [
          { text: "马上投简历！", energy: -15, happiness: -5, result: "简历投出去了，但好累..." },
          { text: "先休息，晚点再说", energy: +5, happiness: +5, result: "你给自己放了个假！" }
        ]
      },
      {
        title: "晚上 22:00",
        description: "还有作业没做完...",
        emoji: "📚",
        choices: [
          { text: "通宵也要做完！", energy: -20, happiness: -15, result: "做完了！但精疲力尽..." },
          { text: "明天早起做吧", energy: +10, happiness: +10, result: "你选择了好好休息！" }
        ]
      }
    ],
    chill: [
      {
        title: "早晨 10:00",
        description: "自然醒了，看到室友在疯狂做作业...",
        emoji: "😴",
        choices: [
          { text: "起来帮帮忙吧", energy: -10, happiness: +10, result: "你是个好室友！" },
          { text: "继续睡...", energy: +15, happiness: +5, result: "睡饱了精神好！" }
        ]
      },
      {
        title: "中午 14:00",
        description: "有个志愿者活动，去吗？",
        emoji: "🤝",
        choices: [
          { text: "去！认识新朋友", energy: -5, happiness: +20, result: "你收获了友谊和快乐！" },
          { text: "算了，在宿舍玩游戏", energy: +5, happiness: +10, result: "游戏真好玩！" }
        ]
      },
      {
        title: "下午 17:00",
        description: "导师发来邮件，催交论文...",
        emoji: "📧",
        choices: [
          { text: "赶紧动手写！", energy: -15, happiness: -10, result: "终于写了点，虽然很累..." },
          { text: "明天再说吧", energy: 0, happiness: -5, result: "拖延了，但今天还是很放松..." }
        ]
      },
      {
        title: "晚上 21:00",
        description: "朋友约你看电影...",
        emoji: "🎬",
        choices: [
          { text: "走！出去玩", energy: -5, happiness: +20, result: "电影超好看！心情大好！" },
          { text: "不了，躺平看手机", energy: +10, happiness: +5, result: "在床上刷手机也挺爽！" }
        ]
      }
    ]
  };

  // 获取结局
  const getEnding = () => {
    const avgEnergy = energy;
    const avgHappiness = happiness;

    if (avgEnergy > 60 && avgHappiness > 60) {
      return {
        title: "🌟 完美平衡结局",
        description: "你找到了努力与快乐的平衡点！既有充实的生活，又保持了愉悦的心情。这就是最好的状态！",
        emoji: "🎉",
        color: "from-purple-400 to-pink-400"
      };
    } else if (avgEnergy > 60) {
      return {
        title: "⚡️ 拼搏燃烧结局",
        description: "你非常努力，成就了很多事情！但别忘了偶尔停下来，享受生活哦~",
        emoji: "🔥",
        color: "from-orange-400 to-red-400"
      };
    } else if (avgHappiness > 60) {
      return {
        title: "☁️ 快乐至上结局",
        description: "你活得很开心！但偶尔也要努力一下，为未来做些准备呢~",
        emoji: "😊",
        color: "from-blue-400 to-cyan-400"
      };
    } else {
      return {
        title: "🌈 重新出发结局",
        description: "你经历了一些挣扎，但这都是成长的一部分。调整一下节奏，找到属于你的方式！",
        emoji: "💪",
        color: "from-green-400 to-teal-400"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        
        {/* 开始界面 */}
        {gameState === 'start' && (
          <div className="p-12 text-center animate-fadeIn">
            <div className="text-6xl mb-6 animate-bounce">🎮</div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
              卷王与躺神的日常
            </h1>
            <p className="text-xl text-gray-600 mb-8">一个关于选择与平衡的互动故事</p>
            <div className="space-y-4 mb-8 text-left max-w-md mx-auto bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡️</span>
                <span>体验不同的生活方式</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>做出你的选择</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <span>找到属于你的平衡</span>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              开始游戏 🚀
            </button>
          </div>
        )}

        {/* 角色选择 */}
        {gameState === 'character' && (
          <div className="p-12 animate-fadeIn">
            <h2 className="text-4xl font-bold text-center mb-4">选择你的角色</h2>
            <p className="text-center text-gray-600 mb-12">你会成为哪一种人？</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 卷卷 */}
              <div
                onClick={() => selectCharacter('roll')}
                className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all group"
              >
                <div className="text-center">
                  <div className="text-8xl mb-4 group-hover:animate-bounce">🔥</div>
                  <h3 className="text-3xl font-bold text-orange-600 mb-4">卷卷</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⚡️</span>
                      <span>初始精力：80%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">😊</span>
                      <span>初始快乐：40%</span>
                    </div>
                    <div className="bg-orange-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-orange-800">
                        "效率至上！我要充实每一天！"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 平平 */}
              <div
                onClick={() => selectCharacter('chill')}
                className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all group"
              >
                <div className="text-center">
                  <div className="text-8xl mb-4 group-hover:animate-float">😴</div>
                  <h3 className="text-3xl font-bold text-blue-600 mb-4">平平</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⚡️</span>
                      <span>初始精力：30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">😊</span>
                      <span>初始快乐：70%</span>
                    </div>
                    <div className="bg-blue-200 rounded-lg p-3 mt-4">
                      <p className="text-sm text-blue-800">
                        "慢慢来，享受生活才重要！"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 故事场景 */}
        {gameState === 'story' && character && (
          <div className="p-8 animate-fadeIn">
            {/* 属性栏 */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">⚡️ 精力值</span>
                  <span>{energy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-400 h-full transition-all duration-500"
                    style={{ width: `${energy}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">😊 快乐值</span>
                  <span>{happiness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${happiness}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 场景进度 */}
            <div className="flex justify-center gap-2 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-2 rounded-full transition-all ${
                    i <= scene ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* 当前场景 */}
            {!showResult ? (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4 animate-bounce">
                    {storyScenes[character][scene].emoji}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {storyScenes[character][scene].title}
                  </h3>
                  <p className="text-xl text-gray-700">
                    {storyScenes[character][scene].description}
                  </p>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {storyScenes[character][scene].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => makeChoice(choice)}
                      className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold group-hover:text-purple-600">
                          {choice.text}
                        </span>
                        <div className="flex gap-3 text-sm">
                          {choice.energy !== 0 && (
                            <span className={choice.energy > 0 ? "text-green-600" : "text-red-600"}>
                              ⚡️ {choice.energy > 0 ? '+' : ''}{choice.energy}
                            </span>
                          )}
                          {choice.happiness !== 0 && (
                            <span className={choice.happiness > 0 ? "text-green-600" : "text-red-600"}>
                              😊 {choice.happiness > 0 ? '+' : ''}{choice.happiness}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-12 text-center animate-scaleIn">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-2xl font-bold text-green-700">
                  {storyScenes[character][scene].choices.find(c => choices[choices.length - 1] === c)?.result}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 结局 */}
        {gameState === 'ending' && (
          <div className="p-12 text-center animate-fadeIn">
            {(() => {
              const ending = getEnding();
              return (
                <>
                  <div className="text-8xl mb-6 animate-bounce">{ending.emoji}</div>
                  <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${ending.color} text-transparent bg-clip-text`}>
                    {ending.title}
                  </h2>
                  <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                    {ending.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
                    <div className="bg-orange-100 rounded-2xl p-6">
                      <div className="text-3xl mb-2">⚡️</div>
                      <div className="text-2xl font-bold text-orange-600">{energy}%</div>
                      <div className="text-sm text-gray-600">最终精力</div>
                    </div>
                    <div className="bg-blue-100 rounded-2xl p-6">
                      <div className="text-3xl mb-2">😊</div>
                      <div className="text-2xl font-bold text-blue-600">{happiness}%</div>
                      <div className="text-sm text-gray-600">最终快乐</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                    <p className="text-lg font-bold mb-2">💫 记住</p>
                    <p>愿你在努力时不失快乐</p>
                    <p>愿你在休息时不失方向</p>
                  </div>

                  <button
                    onClick={restart}
                    className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    🔄 再玩一次
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-float { animation: float 2s ease-in-out infinite; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default RollVsChillGame;