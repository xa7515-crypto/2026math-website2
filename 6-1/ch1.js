/* 第1章：最大公因數與最小公倍數
   依六上教冊：1-1 質數和合數、1-2 質因數和質因數分解、1-3 最大公因數、1-4 最小公倍數。
   範圍：正整數；質數與合數限20以內。不放入七年級延伸內容。 */
window.DECK = window.DECK || [];
(function () {
  const C = '#2563eb', G = '#059669', V = '#7c3aed', A = '#d97706';
  const svg = (vb, s) => `<div style="width:100%;text-align:center"><svg viewBox="${vb}" style="max-width:100%">${s}</svg></div>`;
  const t = (x,y,s,c='#172033',z=16,a='middle') => `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${z}" font-weight="700" fill="${c}">${s}</text>`;
  const b = (x,y,w,h,f,st='#cbd5e1') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${f}" stroke="${st}" stroke-width="2"/>`;
  const fac = n => Array.from({length:n},(_,i)=>i+1).filter(x=>n%x===0);
  const isPrime = n => n > 1 && fac(n).length === 2;
  const gcd = (a,b) => fac(a).filter(x=>b%x===0).at(-1);
  const lcm = (a,b) => a*b/gcd(a,b);
  const example = (q,steps,ans) => ({q,steps,ans});
  const factorVisual = n => {
    const xs=fac(n), step=330/xs.length;
    return svg('0 0 440 230', `${b(52,26,336,48,'#eff6ff',C)}${t(220,57,`${n} 的因數：${xs.join('、')}`,C,16)}${xs.map((x,i)=>`${b(55+i*step,105,step-5,48,isPrime(x)?'#dcfce7':'#fff7ed',isPrime(x)?G:A)}${t(55+i*step+(step-5)/2,136,x,isPrime(x)?G:A,18)}`).join('')}${t(220,205,'綠色：質數　橘色：合數','#475569',14)}`);
  };
  const shortDivision = (rows, divisors, answer) => {
    const cols=rows[0].length, x0=cols===1?220:185, gap=cols===1?0:92, y0=40, dy=38;
    const rowText=rows.map((row,i)=>row.map((v,j)=>t(x0+j*gap,y0+i*dy,v,'#172033',21)).join('')).join('');
    const left=divisors.map((v,i)=>t(x0-55,y0+i*dy,v,C,21)).join('');
    const rules=divisors.map((_,i)=>`<line x1="${x0-27}" y1="${y0+10+i*dy}" x2="${x0+(cols-1)*gap+30}" y2="${y0+10+i*dy}" stroke="${C}" stroke-width="2.5"/>`).join('');
    const bracket=`<line x1="${x0-32}" y1="${y0-25}" x2="${x0-32}" y2="${y0+10+(rows.length-2)*dy}" stroke="${C}" stroke-width="2.5"/>`;
    return svg('0 0 440 230',`${bracket}${rules}${left}${rowText}${t(220,210,answer,G,20)}`);
  };
  const division = n => {
    let x=n, divisors=[], rows=[[n]];
    while(!isPrime(x)){const p=[2,3,5,7].find(q=>x%q===0);divisors.push(p);x/=p;rows.push([x]);}
    return shortDivision(rows,divisors,`${n}＝${[...divisors,x].join('×')}`);
  };
  const pairDivision = (rows,divisors,answer) => shortDivision(rows,divisors,answer);
  window.DECK.push({
    ch:1, title:'最大公因數與最小公倍數', color:C,
    sections:['1-1 質數和合數','1-2 質因數和質因數分解','1-3 最大公因數','1-4 最小公倍數'],
    slides:[
      {sec:'1-1',secName:'質數和合數',title:'先找所有因數，才能判斷質數或合數',
       points:['列出一個數的<b>所有因數</b>。','大於1且只有1和自己兩個因數的是<span class="k">質數</span>。','還有別的因數的是<span class="k">合數</span>。'],
       formula:{label:'12的因數',tex:'12=1\\times12=2\\times6=3\\times4'},visual:h=>h.innerHTML=factorVisual(12),caption:'12有六個因數，所以是合數。',example:example('12是質數還是合數？',['因數是1、2、3、4、6、12。','因數超過兩個。'],'12是合數。')},
      {sec:'1-1',secName:'質數和合數',title:'1既不是質數，也不是合數',
       points:['質數必須有<b>剛好兩個</b>因數。','合數至少要有<b>三個</b>因數。','1只有一個因數，不能歸入兩類。'],
       formula:{label:'1的因數',tex:'1\\text{ 的因數只有 }1'},visual:h=>h.innerHTML=svg('0 0 440 220',`${b(75,35,290,58,'#f8fafc','#94a3b8')}${t(220,73,'1 的因數：1','#334155',23)}${b(45,135,150,50,'#dcfce7',G)}${b(245,135,150,50,'#fff7ed',A)}${t(120,166,'質數：2個因數',G,15)}${t(320,166,'合數：至少3個因數',A,14)}`),caption:'記住：1不是質數，也不是合數。',example:example('1是質數嗎？',['1只有一個因數。','質數要有兩個因數。'],'不是。')},
      {sec:'1-1',secName:'質數和合數',title:'20以內的質數，因數都只有1和自己',
       points:['從2開始，質數的因數只有1和自己。','能寫成兩個較小整數相乘，就知道是合數。','熟悉20以內的質數，分解會更快。'],
       formula:{label:'20以內的質數',tex:'2,3,5,7,11,13,17,19'},visual:h=>{const ns=Array.from({length:19},(_,i)=>i+2);h.innerHTML=svg('0 0 440 220',ns.map((n,i)=>{const x=31+i%5*82,y=20+Math.floor(i/5)*45;return `${b(x,y,62,32,isPrime(n)?'#dcfce7':'#fff7ed',isPrime(n)?G:A)}${t(x+31,y+22,n,isPrime(n)?G:A,16)}`;}).join('')+t(220,210,'綠色是質數；橘色是合數。','#475569',14));},caption:'每個數都先看因數有幾個。',example:example('17和18哪一個是質數？',['17的因數是1、17。','18還有2、3、6、9等因數。'],'17是質數。')},
      {sec:'1-1',secName:'質數和合數',title:'拖動數字，查看它的所有因數',
       points:['先列因數，再決定分類。','因數剛好兩個時，才是質數。','比較不同數的因數個數。'],
       formula:{label:'分類',tex:'\\#\\text{因數}=2\\Rightarrow\\text{質數}'},visual:h=>{h.innerHTML='<div><div id="fig"></div><div class="ictrl"><label>選一個數 <span class="ival" id="nv">12</span></label><input id="ns" type="range" min="2" max="20" value="12"></div></div>';const draw=()=>{const n=+h.querySelector('#ns').value;h.querySelector('#nv').textContent=n;h.querySelector('#fig').innerHTML=factorVisual(n);};h.querySelector('#ns').oninput=draw;draw();},caption:'用滑桿練習「先列因數」的習慣。',example:example('19有幾個因數？',['因數是1、19。','剛好兩個因數。'],'2個，是質數。')},
      {sec:'1-2',secName:'質因數和質因數分解',title:'質因數同時是因數，也是質數',
       points:['先找出原數的所有因數。','在因數中挑出<span class="k">質數</span>，就是質因數。','1是因數，但不是質數，不能當質因數。'],
       formula:{label:'24的質因數',tex:'24=2^3\\times3'},visual:h=>h.innerHTML=svg('0 0 440 220',`${b(42,28,356,48,'#eff6ff',C)}${t(220,59,'24 的因數：1、2、3、4、6、8、12、24',C,16)}${b(95,112,100,52,'#dcfce7',G)}${b(245,112,100,52,'#dcfce7',G)}${t(145,146,'2',G,27)}${t(295,146,'3',G,27)}${t(220,205,'2和3是24的質因數。','#475569',16)}`),caption:'質因數要同時通過兩個條件。',example:example('18的質因數有哪些？',['18的因數有1、2、3、6、9、18。','其中2、3是質數。'],'2、3。')},
      {sec:'1-2',secName:'質因數和質因數分解',title:'質因數分解要把合數一直拆到質數',
       points:['每一步把一個合數拆成兩個因數。','遇到合數繼續拆；遇到質數就停下來。','最後留下的質數相乘，等於原來的數。'],
       formula:{label:'樹狀分解',tex:'24=2\\times2\\times2\\times3'},visual:h=>h.innerHTML=svg('0 0 440 220',`${t(220,30,'24',C,23)}<line x1="220" y1="40" x2="150" y2="78" stroke="${C}" stroke-width="2"/><line x1="220" y1="40" x2="290" y2="78" stroke="${C}" stroke-width="2"/>${t(150,96,'2',G,21)}${t(290,96,'12',C,21)}<line x1="290" y1="106" x2="245" y2="143" stroke="${C}" stroke-width="2"/><line x1="290" y1="106" x2="335" y2="143" stroke="${C}" stroke-width="2"/>${t(245,161,'3',G,21)}${t(335,161,'4',C,21)}<line x1="335" y1="171" x2="305" y2="205" stroke="${C}" stroke-width="2"/><line x1="335" y1="171" x2="365" y2="205" stroke="${C}" stroke-width="2"/>${t(305,218,'2',G,18)}${t(365,218,'2',G,18)}`),caption:'最末端的2、2、2、3全是質數。',example:example('把18做質因數分解。',['18＝2×9。','9＝3×3。'],'\\(18=2\\times3\\times3\\)')},
      {sec:'1-2',secName:'質因數和質因數分解',title:'短除法的除數要用質數，直到商是質數',
       points:['用能整除的質數，從左邊依序除。','每除一次，把商寫在右下方。','最後把除數和最後的商相乘。'],
       formula:{label:'90的分解',tex:'90=2\\times3\\times3\\times5'},visual:h=>h.innerHTML=division(90),caption:'短除法是紀錄過程，答案要寫成質數連乘。',example:example('用短除法分解60。',['60依序除以2、2、3。','最後的商是5。'],'\\(60=2\\times2\\times3\\times5\\)')},
      {sec:'1-2',secName:'質因數和質因數分解',title:'拖動數字，觀察短除法如何拆成質因數',
       points:['每個除數都必須是質數。','同一個質因數可以重複出現。','連乘式可用來找最大公因數或最小公倍數。'],
       formula:{label:'質因數分解',tex:'n=p_1\\times p_2\\times\\cdots'},visual:h=>{h.innerHTML='<div><div id="fig"></div><div class="ictrl"><label>選一個數 <span class="ival" id="nv">60</span></label><input id="ns" type="range" min="0" max="7" value="4"></div></div>';const ns=[24,30,36,40,60,72,84,90],draw=()=>{const n=ns[+h.querySelector('#ns').value];h.querySelector('#nv').textContent=n;h.querySelector('#fig').innerHTML=division(n);};h.querySelector('#ns').oninput=draw;draw();},caption:'檢查左邊和最後的商是否都是質數。',example:example('60的質因數2出現幾次？',['60＝2×2×3×5。','數連乘式中的2。'],'2次。')},
      {sec:'1-3',secName:'最大公因數',title:'最大公因數是兩數共有因數中最大的',
       points:['先列出兩個數的因數。','找出兩邊重複的<span class="k">公因數</span>。','其中最大的，就是最大公因數。'],
       formula:{label:'12和18',tex:'\\gcd(12,18)=6'},visual:h=>h.innerHTML=svg('0 0 440 220',`${b(35,35,170,110,'#eff6ff',C)}${b(235,35,170,110,'#f5f3ff',V)}${t(120,65,'12 的因數',C,17)}${t(320,65,'18 的因數',V,17)}${t(120,105,'1、2、3、4、6、12','#172033',14)}${t(320,105,'1、2、3、6、9、18','#172033',14)}${b(140,170,160,34,'#dcfce7',G)}${t(220,193,'公因數：1、2、3、6',G,14)}`),caption:'在公因數中，6最大。',example:example('12和18的最大公因數？',['公因數是1、2、3、6。','選最大的公因數。'],'6。')},
      {sec:'1-3',secName:'最大公因數',title:'最大公因數是1的兩數，叫做互質',
       points:['互質說的是<b>兩個數的關係</b>。','只要公因數只有1，就互質。','兩個數不必都是質數，也可能互質。'],
       formula:{label:'互質',tex:'\\gcd(14,25)=1'},visual:h=>h.innerHTML=svg('0 0 440 220',`${b(55,42,140,60,'#eff6ff',C)}${b(245,42,140,60,'#f5f3ff',V)}${t(125,79,'14：1、2、7、14',C,14)}${t(315,79,'25：1、5、25',V,14)}${b(130,140,180,52,'#dcfce7',G)}${t(220,173,'共同的只有1',G,22)}`),caption:'互質不等於「兩個數都是質數」。',example:example('8和15互質嗎？',['8的因數：1、2、4、8。','15的因數：1、3、5、15。'],'是，最大公因數是1。')},
      {sec:'1-3',secName:'最大公因數',title:'短除法只乘共同除數，就得到最大公因數',
       points:['把兩數同時能整除的質數寫在左邊。','兩數不能再同時整除時就停下來。','左邊所有除數相乘，就是最大公因數。'],
       formula:{label:'42和70',tex:'\\gcd(42,70)=2\\times7=14'},visual:h=>h.innerHTML=pairDivision([[42,70],[21,35],[3,5]],[2,7],'最大公因數＝2×7＝14'),caption:'右邊剩下3、5互質，就停止共同除法。',example:example('42和70的最大公因數？',['共同除數是2、7。','相乘2×7。'],'14。')},
      {sec:'1-3',secName:'最大公因數',title:'平均分組或剪成最大等長，想到最大公因數',
       points:['「剛好分完」通常要找公因數。','要求每組最多或每段最長，就選<b>最大</b>公因數。','答案要寫出每組數量或每段長度。'],
       formula:{label:'24和36公分',tex:'\\gcd(24,36)=12'},visual:h=>h.innerHTML=svg('0 0 440 220',`${t(220,30,'24 cm和36 cm緞帶剪成最長等長小段','#334155',16)}${[24,36].map((n,r)=>{const y=65+r*65;return `${t(30,y+18,`${n} cm`,C,14,'start')}${Array.from({length:n/12},(_,i)=>`${b(95+i*138,y,128,32,'#dbeafe',C)}${t(159+i*138,y+22,'12 cm',C,14)}`).join('')}`;}).join('')}${t(220,210,'兩條都能剛好剪成12 cm一段。',G,15)}`),caption:'「最長且能剛好分完」是最大公因數線索。',example:example('24cm、36cm緞帶各剪成最長等長小段，長幾cm？',['找24、36的最大公因數。','最大公因數是12。'],'每段12cm。')},
      {sec:'1-4',secName:'最小公倍數',title:'最小公倍數是兩數共同倍數中最小的',
       points:['先寫出兩個數的倍數。','兩邊同時出現的是<span class="k">公倍數</span>。','第一個共同出現的數，就是最小公倍數。'],
       formula:{label:'6和8',tex:'\\operatorname{lcm}(6,8)=24'},visual:h=>h.innerHTML=svg('0 0 440 220',`${t(220,40,'6的倍數：6、12、18、24、30、…',C,18)}${t(220,95,'8的倍數：8、16、24、32、40、…',V,18)}${b(168,135,104,54,'#dcfce7',G)}${t(220,170,'第一個共同：24',G,18)}`),caption:'24之後也有公倍數，但只取最小的一個。',example:example('6和8的最小公倍數？',['列出倍數找共同的數。','最先遇到的共同倍數是24。'],'24。')},
      {sec:'1-4',secName:'最小公倍數',title:'用短除法找最小公倍數，要乘所有數',
       points:['把兩數共同的質因數寫在左邊。','算到右邊剩下的兩數互質為止。','左邊共同質因數和最下面兩數全部相乘。'],
       formula:{label:'18和42',tex:'\\operatorname{lcm}(18,42)=2\\times3\\times3\\times7=126'},visual:h=>h.innerHTML=pairDivision([[18,42],[9,21],[3,7]],[2,3],'最小公倍數＝2×3×3×7＝126'),caption:'教材寫法：右邊剩下3、7互質時停止。',example:example('18和42的最小公倍數？',['共同質因數依序是2、3。','再乘最下面互質的3和7。'],'126。')},
      {sec:'1-4',secName:'最小公倍數',title:'有倍數關係時，較大的數就是最小公倍數',
       points:['若A是B的倍數，A已同時是兩數的倍數。','兩數互質時，最小公倍數就是兩數相乘。','先看關係，可以少算很多步。'],
       formula:{label:'兩種捷徑',tex:'\\operatorname{lcm}(12,24)=24\\qquad\\operatorname{lcm}(8,15)=120'},visual:h=>h.innerHTML=svg('0 0 440 220',`${b(35,40,165,120,'#eff6ff',C)}${b(240,40,165,120,'#f5f3ff',V)}${t(118,72,'有倍數關係',C,18)}${t(118,108,'12的倍數有24','#172033',14)}${t(118,142,'最小公倍數：24',G,15)}${t(322,72,'互質',V,18)}${t(322,108,'8和15無共同質因數','#172033',12)}${t(322,142,'最小公倍數：8×15',G,14)}`),caption:'先判斷數的關係，再決定計算方式。',example:example('12和24的最小公倍數？',['24是12的倍數。','選較大的數。'],'24。')},
      {sec:'1-4',secName:'最小公倍數',title:'週期同時發生，想到最小公倍數',
       points:['「同時」「下一次一起」是找公倍數的線索。','要求最早再次同時發生，就選<b>最小</b>公倍數。','用時間線可檢查答案是否真的重合。'],
       formula:{label:'6分與8分',tex:'\\operatorname{lcm}(6,8)=24'},visual:h=>h.innerHTML=svg('0 0 440 220',`${t(28,40,'甲：每6分鐘',C,14,'start')}${t(28,122,'乙：每8分鐘',V,14,'start')}<line x1="120" y1="43" x2="410" y2="43" stroke="${C}" stroke-width="3"/><line x1="120" y1="125" x2="410" y2="125" stroke="${V}" stroke-width="3"/>${[0,6,12,18,24].map(n=>`<circle cx="${120+n*12}" cy="43" r="5" fill="${n===24?G:C}"/>${t(120+n*12,68,n,C,12)}`).join('')}${[0,8,16,24].map(n=>`<circle cx="${120+n*12}" cy="125" r="5" fill="${n===24?G:V}"/>${t(120+n*12,150,n,V,12)}`).join('')}${t(408,205,'24分鐘同時發生',G,15,'end')}`),caption:'兩條時間線第一次重合在24分鐘。',example:example('甲每6分鐘、乙每8分鐘響一次，幾分鐘後再同時響？',['找6、8的最小公倍數。','最小公倍數是24。'],'24分鐘後。')},
      {sec:'1-4',secName:'最小公倍數',title:'先看題意：要分配找最大，要同步找最小',
       points:['「最多組、最長一段」：想<span class="k">最大公因數</span>。','「最早同時、最少次數」：想<span class="k">最小公倍數</span>。','不要只看到兩個數就立刻用短除法。'],
       formula:{label:'判斷關鍵',tex:'\\text{分配}\\Rightarrow\\gcd\\qquad\\text{同步}\\Rightarrow\\operatorname{lcm}'},visual:h=>{h.innerHTML='<div><div id="fig"></div><div class="ictrl"><label>選擇情境 <span class="ival" id="lv">同步</span></label><input id="ls" type="range" min="0" max="1" value="1"></div></div>';const draw=()=>{const sync=+h.querySelector('#ls').value;h.querySelector('#lv').textContent=sync?'同步':'分配';h.querySelector('#fig').innerHTML=sync?svg('0 0 440 180',`${b(60,45,320,85,'#f5f3ff',V)}${t(220,80,'兩個鈴聲下一次何時同時響？',V,18)}${t(220,113,'找最小公倍數',G,22)}`):svg('0 0 440 180',`${b(60,45,320,85,'#eff6ff',C)}${t(220,80,'緞帶要剪成最長等長小段',C,18)}${t(220,113,'找最大公因數',G,22)}`);};h.querySelector('#ls').oninput=draw;draw();},caption:'先讀懂問題，再選對工具。',example:example('兩條緞帶剪成最長等長小段，要找哪一種數？',['目標是最長且剛好分完。','這是分配情境。'],'最大公因數。')}
    ]
  });
})();
