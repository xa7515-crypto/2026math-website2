/* 第1章互動複習：互動資料統一由 ch0.js 提供。
   教材邊界：10以內數的認識、讀寫與點數；不教加減。 */
window.DECK=window.DECK||[];(function(){
const C='#2563eb';
const defs=[{"sec":"1-1","name":"認識1到5","title":"認識1到5","points":["<span class=\"k\">1到5照順序數，幾個就是幾</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"圖中有幾隻小鳥","ans":"3隻","variant":0},{"sec":"1-2","name":"認識6到10","title":"認識6到10","points":["<span class=\"k\">6到10接著數，一個一個點清楚</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"圖中有幾朵花","ans":"6朵","variant":0},{"sec":"1-3","name":"認識0","title":"認識0","points":["<span class=\"k\">什麼都沒有就是0</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"盤子空空的，是多少","ans":"0","variant":0},{"sec":"1-4","name":"點數數量","title":"點數數量","points":["<span class=\"k\">一個一個數，不跳過不重複</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"圖中有幾片餅乾","ans":"8片","variant":0}];
const slides=window.M11Activity.makeSlides(defs);
window.DECK.push({ch:1,title:"10以內的數",color:C,sections:["1-1 認識1到5","1-2 認識6到10","1-3 認識0","1-4 點數數量"],slides});})();
