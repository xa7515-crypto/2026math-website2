/* 第9章互動複習：互動資料統一由 ch0.js 提供。
   教材邊界：月曆報讀與年月順序；不教24時制與時刻計算。 */
window.DECK=window.DECK||[];(function(){
const C='#4d7c0f';
const defs=[{"sec":"9-1","name":"認識月曆","title":"認識月曆","points":["<span class=\"k\">先找日期再看星期</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"月曆上5月1日是星期幾","ans":"星期三","variant":0},{"sec":"9-2","name":"過生日","title":"過生日","points":["<span class=\"k\">月份有先後順序</span>。","本頁先處理一個實際例子，再切換同小節題型。","用圖形、算式和完整單位一起核對。"],"q":"小明1月、小華2月，誰的生日先到","ans":"小明先","variant":0}];
const slides=window.M12Activity.makeSlides(defs);
window.DECK.push({ch:9,title:"幾月幾日星期幾",color:C,sections:["9-1 認識月曆","9-2 過生日"],slides});})();
