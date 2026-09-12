/* 第1章：小數與分數的計算
   依六下教冊：1-1小數四則計算、1-2分數四則計算、1-3小數與分數的混合計算、1-4簡化計算。
   範圍：二至三步驟四則問題與運算性質；不使用未知數列方程式。 */
window.DECK = window.DECK || [];
(function () {
  const C='#2563eb',G='#059669',A='#d97706',R='#e11d48';
  const svg=(vb,s)=>`<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${s}</svg></div>`;
  const t=(x,y,s,c='#172033',z=16,a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${z}" font-weight="700" fill="${c}">${s}</text>`;
  const b=(x,y,w,h,f,st='#cbd5e1')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}" stroke="${st}" stroke-width="2"/>`;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rich=s=>esc(s).replace(/(\d+)\/(\d+)/g,'\\(\\dfrac{$1}{$2}\\)');
  const flow=(left,op,right,answer)=>`<div class="calc-flow" style="display:grid;grid-template-columns:1fr auto 1fr;gap:.65rem;align-items:stretch;width:100%">
    <div style="padding:1rem;border:2px solid ${C};border-radius:14px;background:#eff6ff;text-align:center;font-weight:800">${rich(left)}</div>
    <div style="align-self:center;color:${A};font-size:1.35rem;font-weight:900">→</div>
    <div style="padding:1rem;border:2px solid ${A};border-radius:14px;background:#fff7ed;text-align:center;font-weight:800">${rich(op)}</div>
    <div style="grid-column:1/-1;padding:1rem;border:2px solid ${G};border-radius:14px;background:#dcfce7;text-align:center;font-weight:900;color:${G}">${rich(right)}<br>${rich(answer)}</div>
    <div style="grid-column:1/-1;text-align:center;color:${C};font-weight:800">算完每一步，再核對最後答案</div></div>`;
  const rows=[
    ['1-1','小數四則計算','沒有括號時，先乘除、後加減',['乘法和除法先算。','加法和減法後算。','同一層級由左往右計算。'],'12.4-2.9\\times2','12.4','－2.9×2','6.6','12.4－2.9×2＝？',['先算2.9×2＝5.8。','12.4－5.8＝6.6。'],'6.6'],
    ['1-1','小數四則計算','有括號時，要先算括號裡面',['括號表示要優先處理。','算完括號，再依乘除、加減順序。','每一步只改正在計算的部分。'],'20-(2.9+3.5)','2.9＋3.5','先算括號','20－6.4','20－(2.9＋3.5)＝？',['2.9＋3.5＝6.4。','20－6.4＝13.6。'],'13.6'],
    ['1-1','小數四則計算','先取概數，可以估計答案是否合理',['把數取成容易計算的接近值。','估算用來檢查，不取代精確答案。','精算結果應接近估算值。'],'19.8\\times3.1\\approx20\\times3','19.8×3.1','估成20×3','約60','19.8×3.1大約是多少？',['19.8約20，3.1約3。','20×3＝60。'],'約60'],
    ['1-1','小數四則計算','總量除以一份量，可反求有幾份',['拖動每份量，觀察份數改變。','先確認總量與每份量單位相同。','除法結果要配合情境判讀。'],'\\text{份數}=\\text{總量}\\div\\text{每份量}','總量24','拖動每份量','份數同步','24公升，每桶裝3公升，可裝幾桶？',['24÷3。','剛好裝滿8桶。'],'8桶'],
    ['1-2','分數四則計算','分數加減要先通分，再算分子',['找分母的公倍數作共同分母。','只加減分子，分母保持不變。','最後約成最簡分數。'],'\\frac{2}{3}+\\frac{1}{4}=\\frac{8}{12}+\\frac{3}{12}','2/3＋1/4','通分：8/12＋3/12','最後答案','2/3＋1/4＝？',['2/3＝8/12，1/4＝3/12。','8/12＋3/12＝11/12。'],'11/12'],
    ['1-2','分數四則計算','分數乘除混合要由左往右計算',['除以分數改成乘它的倒數。','乘除同一層級，依原順序進行。','乘之前可先約分。'],'\\frac{3}{4}\\div\\frac{1}{2}\\times\\frac{2}{3}','3/4÷1/2×2/3','改成3/4×2/1×2/3','最後答案','3/4÷1/2×2/3＝？',['3/4×2/1＝3/2。','3/2×2/3＝1。'],'1'],
    ['1-2','分數四則計算','括號會改變分數算式的計算順序',['先完成括號中的加減。','再處理括號外的乘除。','括號內也要遵守四則順序。'],'\\frac{4}{5}\\div(\\frac{1}{2}+\\frac{3}{10})','1/2＋3/10','括號內＝4/5','4/5÷4/5','4/5÷(1/2＋3/10)＝？',['括號內1/2＋3/10＝4/5。','4/5÷4/5＝1。'],'1'],
    ['1-2','分數四則計算','分數乘法可用面積模型看出乘積',['拖動取用份數，觀察重疊區域。','先取四分之幾，再取它的二分之一。','重疊格數占全部的分率就是乘積。'],'\\frac{a}{4}\\times\\frac{1}{2}=\\frac{a}{8}','四等分中取3份','再取其中的1/2','重疊占全部','3/4的1/2是多少？',['3/4×1/2。','分子分母相乘得3/8。'],'3/8'],
    ['1-3','小數與分數的混合計算','小數與分數混合前，先統一表示方式',['可把小數化成分數。','也可把能除盡的分數化成小數。','選擇計算較簡單的方式。'],'0.25=\\frac{1}{4}','0.25＋1/2','化成1/4＋1/2','最後答案','0.25＋1/2＝？',['0.25＝1/4。','1/4＋1/2＝3/4。'],'3/4（或0.75）'],
    ['1-3','小數與分數的混合計算','最簡分數的分母只含2或5，才能化成有限小數',['先把分數約成最簡分數。','分母的質因數只有2或5時，小數會除盡。','否則改把小數化成分數，保留精確值。'],'\\frac{3}{8}=0.375','1.2－3/8','3/8＝0.375','最後答案','1.2－3/8＝？',['3/8＝0.375。','1.2－0.375＝0.825。'],'0.825'],
    ['1-3','小數與分數的混合計算','不容易化成有限小數時，改用分數較準確',['例如1/3化成小數會除不盡。','把小數化成分數可保留精確值。','計算後再約分。'],'0.6\\times\\frac{1}{3}=\\frac{3}{5}\\times\\frac{1}{3}','0.6×1/3','化成3/5×1/3','最後答案','0.6×1/3＝？',['0.6＝3/5。','3/5×1/3＝1/5。'],'1/5（或0.2）'],
    ['1-3','小數與分數的混合計算','一位小數可寫成分母是10的分數，再約分',['拖動十分位數字，觀察等值分數。','小數點後的數字是分子，10是分母。','最後要約成最簡分數。'],'0.4=\\frac{4}{10}=\\frac{2}{5}','0.4','寫成4/10','約成最簡分數','0.4化成最簡分數是多少？',['0.4＝4/10。','4/10約分成2/5。'],'2/5'],
    ['1-4','簡化計算','加法可利用交換律和結合律湊整數',['交換加數位置不改變和。','先把容易湊成整數的數相加。','所有加數都必須保留。'],'a+b+c=a+c+b','1.3＋2.7','先湊成4','再加0.6','1.3＋0.6＋2.7＝？',['交換成1.3＋2.7＋0.6。','4＋0.6＝4.6。'],'4.6'],
    ['1-4','簡化計算','乘法可利用交換律和結合律湊整數',['調整因數順序不改變積。','先找能相乘成整數的因數。','除法不能任意交換位置。'],'a\\times b\\times c=a\\times c\\times b','0.25×8×4','先算0.25×4','再乘8','0.25×8×4＝？',['交換成0.25×4×8。','1×8＝8。'],'8'],
    ['1-4','簡化計算','共同因數可用分配律提出來',['兩項都有相同因數時先提出。','括號內做加法或減法。','可減少重複乘法。'],'a\\times b+a\\times c=a\\times(b+c)','2.5×3＋2.5×7','提出2.5','2.5×10','2.5×3＋2.5×7＝？',['提出共同因數2.5。','2.5×(3＋7)＝25。'],'25'],
    ['1-4','簡化計算','簡化前先確認運算性質可以使用',['拖動共同因數，觀察兩種算法結果相同。','只有真正共同的因數才能提出。','括號與運算符號不能漏寫。'],'k\\times3+k\\times7=k\\times10','拖動k','展開式','簡化式','當k＝4時，4×3＋4×7＝？',['提出共同因數4。','4×(3＋7)＝40。'],'40']
  ];
  const slides=rows.map(r=>({sec:r[0],secName:r[1],title:r[2],points:r[3],formula:{label:'重點算式',tex:r[4]},visual:h=>{h.innerHTML=flow(r[5],r[6],r[7],r[10]);if(window.MJ)window.MJ(h);},caption:'每一步都保留原本的運算關係，算完再檢查。',example:{q:rich(r[8]),steps:r[9].map(rich),ans:rich(r[10])}}));
  slides[3].visual=h=>{h.innerHTML='<div><div id="fig"></div><div class="ictrl"><label>每桶 <span class="ival" id="pv">3</span> 公升</label><input id="ps" type="range" min="2" max="8" value="3"></div></div>';const draw=()=>{const p=+h.querySelector('#ps').value,n=24/p;h.querySelector('#pv').textContent=p;h.querySelector('#fig').innerHTML=svg('0 0 440 200',`${b(35,55,150,72,'#eff6ff',C)}${t(110,98,'總量 24 公升',C,19)}${t(220,92,'÷',A,25)}${b(270,55,135,72,'#dcfce7',G)}${t(337,85,Number.isInteger(n)?`${n} 桶`:`${n.toFixed(1)} 桶`,G,18)}${t(337,109,Number.isInteger(n)?'剛好裝完':'不能剛好裝完',Number.isInteger(n)?G:R,14)}`);};h.querySelector('#ps').oninput=draw;draw();};
  slides[7].visual=h=>{h.innerHTML='<div><div id="fig"></div><div class="live-frac" style="text-align:center;font-size:1.2rem;font-weight:800;color:#059669"></div><div class="ictrl"><label>取四分之 <span class="ival" id="fv">3</span></label><input id="fs" type="range" min="1" max="4" value="3"></div></div>';const draw=()=>{const n=+h.querySelector('#fs').value;h.querySelector('#fv').textContent=n;let cells='';for(let y=0;y<2;y++)for(let x=0;x<4;x++){const active=x<n&&y===0;cells+=`<rect x="${80+x*60}" y="${35+y*60}" width="60" height="60" fill="${active?'#60a5fa':'#e2e8f0'}" stroke="white" stroke-width="3"/>`;}h.querySelector('#fig').innerHTML=svg('0 0 440 165',cells);h.querySelector('.live-frac').innerHTML=`重疊部分是 \\(\\dfrac{${n}}{8}\\)`;if(window.MJ)window.MJ(h);};h.querySelector('#fs').oninput=draw;draw();};
  slides[11].visual=h=>{h.innerHTML='<div><div id="fig"></div><div class="live-convert" style="text-align:center;font-size:1.35rem;font-weight:800;color:#059669"></div><div class="ictrl"><label>十分位數字 <span class="ival" id="dv">4</span></label><input id="ds" type="range" min="1" max="9" value="4"></div></div>';const gcd=(a,b)=>b?gcd(b,a%b):a;const draw=()=>{const n=+h.querySelector('#ds').value,d=gcd(n,10);h.querySelector('#dv').textContent=n;h.querySelector('#fig').innerHTML=svg('0 0 440 145',`${b(80,35,110,70,'#eff6ff',C)}${t(135,78,`0.${n}`,C,24)}${t(220,72,'＝',A,24)}${b(250,35,110,70,'#dcfce7',G)}${t(305,78,'等值分數',G,18)}`);h.querySelector('.live-convert').innerHTML=`\\(0.${n}=\\dfrac{${n}}{10}=\\dfrac{${n/d}}{${10/d}}\\)`;if(window.MJ)window.MJ(h);};h.querySelector('#ds').oninput=draw;draw();};
  slides[15].visual=h=>{h.innerHTML='<div><div id="fig"></div><div class="ictrl"><label>共同因數 k＝<span class="ival" id="kv">4</span></label><input id="ks" type="range" min="1" max="8" value="4"></div></div>';const draw=()=>{const k=+h.querySelector('#ks').value;h.querySelector('#kv').textContent=k;h.querySelector('#fig').innerHTML=svg('0 0 440 200',`${b(20,45,175,75,'#eff6ff',C)}${t(108,77,`${k}×3＋${k}×7`,C,18)}${t(108,103,`＝${k*10}`,G,19)}${t(220,86,'＝',A,25)}${b(250,45,170,75,'#dcfce7',G)}${t(335,77,`${k}×(3＋7)`,G,18)}${t(335,103,`＝${k*10}`,C,19)}`);};h.querySelector('#ks').oninput=draw;draw();};
  window.DECK.push({ch:1,title:'小數與分數的計算',color:C,sections:['1-1 小數四則計算','1-2 分數四則計算','1-3 小數與分數的混合計算','1-4 簡化計算'],slides});
})();
