/* 第10章互動複習：互動資料統一由 ch0.js 提供。
   教材邊界：平分、幾分之一與大小比較；不教分數加減。 */
window.DECK=window.DECK||[];(function(){
const C='#9333ea';
const defs=[{"sec":"10-1","name":"平分","title":"平分","points":["<span class=\"k\">平分成幾份，1份就是幾分之一</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"1條彩帶平分成2份1份是幾條","ans":"1/2條","variant":0},{"sec":"10-2","name":"幾分之一","title":"幾分之一","points":["<span class=\"k\">幾分之一就是幾份中的1份</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"1條繩子平分成3份1份是幾條","ans":"1/3條","variant":0},{"sec":"10-3","name":"比大小","title":"比大小","points":["<span class=\"k\">份數少的每份大，同份數比個數</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"1/2條和1/4條哪條比較長","ans":"1/2條","variant":0}];
const slides=window.M22Activity.makeSlides(defs);
window.DECK.push({ch:10,title:"分數",color:C,sections:["10-1 平分","10-2 幾分之一","10-3 比大小"],slides});})();
