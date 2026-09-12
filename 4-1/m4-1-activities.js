/* 四上學生互動實驗室：每個教材小節都有三個可操作的實際例子。 */
(function(){
  const BLUE='#2563eb',GREEN='#059669',RED='#e11d48',AMBER='#d97706',INK='#172033',MUTED='#64748b';
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tx=(x,y,s,z=16,c=INK,a='middle',w=700)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${z}" font-weight="${w}" fill="${c}">${esc(s)}</text>`;
  const box=(x,y,w,h,f='#f8fafc',s='#cbd5e1',r=12)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="2"/>`;
  const svg=s=>`<svg viewBox="0 0 440 248" style="width:100%;max-height:248px" role="img">${s}</svg>`;
  const line=(x1,y1,x2,y2,c=INK,w=3)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
  const strip=(x,y,w,h,n,d,c=BLUE)=>Array.from({length:d},(_,i)=>`<rect x="${x+i*w/d}" y="${y}" width="${w/d}" height="${h}" fill="${i<n?c:'#fff'}" stroke="#94a3b8"/>`).join('');
  const fmt=n=>Number.isInteger(n)?String(n):String(+n.toFixed(4));
  const gcd=(a,b)=>{while(b)[a,b]=[b,a%b];return a;};
  const activities={
    '1-1':{type:'place',samples:[['五萬零六十寫成數字','50,060',{digits:'50060',labels:['萬','千','百','十','個']}],['八萬三千零七寫成數字','83,007',{digits:'83007',labels:['萬','千','百','十','個']}],['九萬九千九百九十九寫成數字','99,999',{digits:'99999',labels:['萬','千','百','十','個']}]]},
    '1-2':{type:'groups',samples:[['三千零五萬零八寫成數字','30,050,008',{groups:['3005','0008']}],['七千二百萬零四百寫成數字','72,000,400',{groups:['7200','0400']}],['九千零九萬零九十寫成數字','90,090,090',{groups:['9009','0090']}]]},
    '1-3':{type:'compare',samples:[['比較45,090,000和45,900,000','45,090,000＜45,900,000',{a:'45,090,000',b:'45,900,000',sign:'＜'}],['比較8,765,432和8,756,432','8,765,432＞8,756,432',{a:'8,765,432',b:'8,756,432',sign:'＞'}],['比較9,999,999和10,000,000','9,999,999＜10,000,000',{a:'9,999,999',b:'10,000,000',sign:'＜'}]]},
    '2-1':{type:'multiply',samples:[['2345盒彩筆，每箱3盒，共有幾盒？','7035盒',{a:2345,b:3}],['4082張色紙，每組6張，共有幾張？','24492張',{a:4082,b:6}],['1250顆積木裝8箱，共有幾顆？','10000顆',{a:1250,b:8}]]},
    '2-2':{type:'multiply',samples:[['每排36張椅子，共24排，有幾張？','864張',{a:36,b:24}],['每盒48枝筆，共35盒，有幾枝？','1680枝',{a:48,b:35}],['每箱72瓶水，共16箱，有幾瓶？','1152瓶',{a:72,b:16}]]},
    '2-3':{type:'multiply',samples:[['每天印1205張，32天共印幾張？','38560張',{a:1205,b:32}],['每區3408人，共24區，有幾人？','81792人',{a:3408,b:24}],['每箱2506個，共41箱，有幾個？','102746個',{a:2506,b:41}]]},
    '3-1':{type:'angle',samples:[['從0度線量到第一條射線，角有多大？','30°',{deg:30}],['量角器上的鈍角有多大？','95°',{deg:95}],['量角器上的大鈍角有多大？','150°',{deg:150}]]},
    '3-2':{type:'angle',samples:[['畫一個60°的角','60°',{deg:60}],['畫一個120°的角','120°',{deg:120}],['畫一個225°的角','225°',{deg:225}]]},
    '3-3':{type:'turn',samples:[['轉四分之一圈是多少度？','90°',{part:'四分之一圈',deg:90}],['轉二分之一圈是多少度？','180°',{part:'二分之一圈',deg:180}],['轉四分之三圈是多少度？','270°',{part:'四分之三圈',deg:270}]]},
    '4-1':{type:'divide',samples:[['4824本書平均放6櫃，每櫃幾本？','804本',{a:4824,b:6}],['7350顆球平均裝7箱，每箱幾顆？','1050顆',{a:7350,b:7}],['9632張紙平均分8疊，每疊幾張？','1204張',{a:9632,b:8}]]},
    '4-2':{type:'divide',samples:[['84顆糖每21顆一包，可裝幾包？','4包',{a:84,b:21}],['96人每24人一隊，可分幾隊？','4隊',{a:96,b:24}],['75朵花每15朵一束，可紮幾束？','5束',{a:75,b:15}]]},
    '4-3':{type:'divide',samples:[['936張卡每24張一疊，可分幾疊？','39疊',{a:936,b:24}],['864本書每32本一箱，可裝幾箱？','27箱',{a:864,b:32}],['975顆球每25顆一袋，可裝幾袋？','39袋',{a:975,b:25}]]},
    '5-1':{type:'distance',samples:[['學校到車站約3什麼單位？','3公里',{value:3,unit:'公里',kind:'長距離'}],['操場一圈約400什麼單位？','400公尺',{value:400,unit:'公尺',kind:'校園距離'}],['鉛筆長約18什麼單位？','18公分',{value:18,unit:'公分',kind:'物品長度'}]]},
    '5-2':{type:'convert',samples:[['2公里350公尺是多少公尺？','2350公尺',{a:'2公里350公尺',b:'2350公尺',note:'2×1000＋350'}],['4公里80公尺是多少公尺？','4080公尺',{a:'4公里80公尺',b:'4080公尺',note:'4×1000＋80'}],['300000公分是多少公里？','3公里',{a:'300000公分',b:'3公里',note:'÷100，再÷1000'}]]},
    '5-3':{type:'convert',samples:[['3公里200公尺＋1公里850公尺','5公里50公尺',{a:'3 km 200 m',b:'1 km 850 m',note:'相加並滿1000公尺進1公里'}],['6公里100公尺－2公里750公尺','3公里350公尺',{a:'6 km 100 m',b:'2 km 750 m',note:'借1公里換1000公尺'}],['2公里680公尺＋3公里420公尺','6公里100公尺',{a:'2 km 680 m',b:'3 km 420 m',note:'1100公尺＝1公里100公尺'}]]},
    '6-1':{type:'triangle',samples:[['數一數：三角形有幾條邊、幾個角？','3條邊、3個角',{pts:'85,190 220,45 355,190',label:'三條線段首尾相接'}],['找出三角形的三個頂點','A、B、C三個頂點',{pts:'75,185 165,55 365,185',label:'每兩邊相接處是頂點'}],['哪個圖形由三條線段圍成？','封閉的三邊形',{pts:'95,185 220,65 345,185',label:'必須首尾相接並封閉'}]]},
    '6-2':{type:'triangle',samples:[['邊長5、5、8是哪種三角形？','等腰三角形',{pts:'85,190 220,50 355,190',label:'兩邊相等'}],['邊長6、6、6是哪種三角形？','正三角形',{pts:'95,190 220,42 345,190',label:'三邊相等'}],['邊長4、5、6是哪種三角形？','不等邊三角形',{pts:'72,190 178,58 365,190',label:'三邊都不相等'}]]},
    '6-3':{type:'triangle',samples:[['有一個120°角是哪種三角形？','鈍角三角形',{pts:'72,190 185,80 365,190',label:'有一個角大於90°'}],['有一個90°角是哪種三角形？','直角三角形',{pts:'95,190 95,55 350,190',label:'有一個直角'}],['三個角都是銳角是哪種三角形？','銳角三角形',{pts:'95,190 220,42 345,190',label:'三個角都小於90°'}]]},
    '7-1':{type:'decimal',samples:[['3個一、4個十分之一、7個百分之一','3.47',{value:'3.47',labels:['個位','十分位','百分位']}],['5個一、0個十分之一、8個百分之一','5.08',{value:'5.08',labels:['個位','十分位','百分位']}],['3個十分之一、6個百分之一','0.36',{value:'0.36',labels:['個位','十分位','百分位']}]]},
    '7-2':{type:'compare',samples:[['比較2.50公尺和2.48公尺','2.50＞2.48',{a:'2.50',b:'2.48',sign:'＞'}],['比較1.09公尺和1.12公尺','1.09＜1.12',{a:'1.09',b:'1.12',sign:'＜'}],['比較3.40公尺和3.4公尺','3.40＝3.4',{a:'3.40',b:'3.4',sign:'＝'}]]},
    '7-3':{type:'decimal-op',samples:[['3.75公升＋2.8公升','6.55公升',{a:'3.75',op:'＋',b:'2.80',result:'6.55'}],['8.20公尺－3.47公尺','4.73公尺',{a:'8.20',op:'－',b:'3.47',result:'4.73'}],['4.68公斤＋1.25公斤','5.93公斤',{a:'4.68',op:'＋',b:'1.25',result:'5.93'}]]},
    '8-1':{type:'expression',samples:[['500－120＋80','460',{expr:['500－120','380＋80','460']}],['900－(250＋180)','470',{expr:['250＋180','900－430','470']}],['640－200－140','300',{expr:['640－200','440－140','300']}]]},
    '8-2':{type:'expression',samples:[['240÷6×5','200',{expr:['240÷6','40×5','200']}],['360÷9×4','160',{expr:['360÷9','40×4','160']}],['12×8÷6','16',{expr:['12×8','96÷6','16']}]]},
    '8-3':{type:'expression',samples:[['100－8×7','44',{expr:['8×7','100－56','44']}],['250＋15×6','340',{expr:['15×6','250＋90','340']}],['500－24×12','212',{expr:['24×12','500－288','212']}]]},
    '9-1':{type:'fraction-class',samples:[['7/5是哪一類分數？','假分數',{n:7,d:5,label:'假分數'}],['3/8是哪一類分數？','真分數',{n:3,d:8,label:'真分數'}],['8/8是哪一類分數？','假分數，也等於1',{n:8,d:8,label:'假分數'}]]},
    '9-2':{type:'mixed',samples:[['11/4換成帶分數','2又3/4',{n:11,d:4,w:2,r:3}],['17/5換成帶分數','3又2/5',{n:17,d:5,w:3,r:2}],['2又1/3換成假分數','7/3',{n:7,d:3,w:2,r:1,reverse:true}]]},
    '9-3':{type:'fraction-op',samples:[['3/8＋2/8','5/8',{a:3,b:2,d:8,op:'＋',r:5}],['7/10－3/10','4/10',{a:7,b:3,d:10,op:'－',r:4}],['1又2/5＋3/5','2',{a:7,b:3,d:5,op:'＋',r:10,mixed:true}]]},
    '10-1':{type:'pictograph',samples:[['每個圖案代表5人，3個圖案是多少人？','15人',{count:3,each:5}],['每個圖案代表2本，4個圖案是多少本？','8本',{count:4,each:2}],['每個圖案代表10票，6個圖案是多少票？','60票',{count:6,each:10}]]},
    '10-2':{type:'bar',samples:[['每格代表10，長條高6格是多少？','60',{values:[30,60,40],focus:1,step:10}],['每格代表5，長條高7格是多少？','35',{values:[20,35,15],focus:1,step:5}],['每格代表20，長條高4格是多少？','80',{values:[40,60,80],focus:2,step:20}]]},
    '10-3':{type:'chart',samples:[['數量從20上升到35，增加多少？','15',{values:[20,25,35]}],['溫度從28下降到22，下降多少？','6',{values:[28,25,22]}],['人數10、18、16，最高是哪一次？','第2次',{values:[10,18,16]}]]}
  };

  function scene(type,s){
    const d=s[2];
    if(type==='place'){return svg(d.digits.split('').map((v,i)=>box(42+i*72,65,62,88,i===d.digits.length-1?'#fef3c7':'#eff6ff',i===d.digits.length-1?AMBER:BLUE,4)+tx(73+i*72,106,v,26,INK)+tx(73+i*72,140,d.labels[i],13,MUTED)).join('')+tx(220,205,'每個數字的位置決定它代表多少',16,BLUE));}
    if(type==='groups'){return svg(d.groups.map((v,i)=>box(75+i*155,65,135,90,i?'#eff6ff':'#fef3c7',i?BLUE:AMBER)+tx(142+i*155,108,v,27,INK)+tx(142+i*155,143,i?'個級':'萬級',14,MUTED)).join('')+tx(220,205,'由右往左，每四位分一級',17,BLUE));}
    if(type==='compare'){return svg(box(35,70,155,72,'#eff6ff',BLUE)+tx(112,113,d.a,19,BLUE)+tx(220,116,d.sign,34,d.sign==='＝'?GREEN:AMBER)+box(250,70,155,72,'#eff6ff',BLUE)+tx(327,113,d.b,19,BLUE)+tx(220,190,'小數要對齊小數點；整數先比位數',15,MUTED));}
    if(type==='multiply'||type==='divide'){const op=type==='multiply'?'×':'÷',result=type==='multiply'?d.a*d.b:d.a/d.b;return svg(box(65,45,310,48,'#eff6ff',BLUE)+tx(220,77,`${d.a} ${op} ${d.b}`,23,BLUE)+line(95,125,345,125,AMBER,4)+tx(220,159,`＝ ${fmt(result)}`,27,GREEN)+tx(220,205,type==='multiply'?'先估算，再用直式核對':'用乘法反查商是否正確',16,MUTED));}
    if(type==='angle'||type==='turn'){const deg=d.deg,rad=-deg*Math.PI/180,x=220+105*Math.cos(rad),y=172+105*Math.sin(rad),large=deg>180?1:0;return svg(`<path d="M90 172 A130 130 0 0 1 350 172" fill="none" stroke="#cbd5e1" stroke-width="14"/>${line(220,172,335,172,BLUE,5)}${line(220,172,x,y,RED,5)}<path d="M275 172 A55 55 0 ${large} 0 ${220+55*Math.cos(rad)} ${172+55*Math.sin(rad)}" fill="none" stroke="${AMBER}" stroke-width="4"/>${tx(220,222,type==='turn'?`${d.part}＝${deg}°`:`從0°量到${deg}°`,19,GREEN)}`);}
    if(type==='distance'){const widths={公里:300,公尺:190,公分:80};return svg(tx(220,45,d.kind,18,BLUE)+line(65,125,65+widths[d.unit],125,AMBER,12)+tx(65,158,'起點',13,MUTED,'start')+tx(65+widths[d.unit],158,'終點',13,MUTED,'end')+box(125,185,190,42,'#dcfce7',GREEN)+tx(220,212,`${d.value} ${d.unit}`,20,GREEN));}
    if(type==='convert'){return svg(box(25,72,165,72,'#eff6ff',BLUE)+tx(107,114,d.a,18,BLUE)+`<path d="M200 108 H250" stroke="${AMBER}" stroke-width="5"/><polygon points="250,108 234,98 234,118" fill="${AMBER}"/>`+box(260,72,155,72,'#dcfce7',GREEN)+tx(337,114,d.b,18,GREEN)+tx(220,190,d.note,15,MUTED));}
    if(type==='triangle'){const pts=d.pts.split(' ').map(p=>p.split(','));return svg(`<polygon points="${d.pts}" fill="#dbeafe" stroke="${BLUE}" stroke-width="5"/>`+pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${[RED,GREEN,AMBER][i]}"/>${tx(+p[0]+(i===0?-18:i===2?18:0),+p[1]+(i===1?-12:24),['A','B','C'][i],15,INK)}`).join('')+tx(220,230,d.label,17,GREEN));}
    if(type==='decimal'){const digits=d.value.replace('.','').split('');return svg(digits.map((v,i)=>box(75+i*105,65,85,88,i===0?'#fef3c7':'#eff6ff',i===0?AMBER:BLUE,4)+tx(117+i*105,108,v,28,INK)+tx(117+i*105,140,d.labels[i],13,MUTED)).join('')+tx(177,110,'.',32,RED)+tx(220,205,'小數點右邊第一位是十分位',16,BLUE));}
    if(type==='decimal-op'){return svg(tx(275,55,d.a,25,INK,'end')+tx(110,100,d.op,24,BLUE)+tx(275,100,d.b,25,INK,'end')+line(125,120,295,120,INK,3)+tx(275,162,d.result,28,GREEN,'end')+line(221,35,221,174,RED,2)+tx(220,215,'小數點要上下對齊',16,RED));}
    if(type==='expression'){return svg(d.expr.map((v,i)=>box(55+i*125,75,105,70,i===2?'#dcfce7':'#eff6ff',i===2?GREEN:BLUE)+tx(107+i*125,117,v,17,i===2?GREEN:INK)).join('')+line(160,110,180,110,AMBER,4)+line(285,110,305,110,AMBER,4)+tx(220,198,'一次只處理一個運算步驟',16,MUTED));}
    if(type==='fraction-class'||type==='mixed'||type==='fraction-op'){const total=type==='fraction-class'?d.n:type==='mixed'?d.n:(d.a+d.b),den=d.d,whole=Math.floor(total/den),rem=total%den;let bars='';for(let k=0;k<Math.max(1,whole+(rem?1:0));k++){const fill=k<whole?den:rem;bars+=strip(25+k*100,85,86,48,fill,den,k<whole?BLUE:GREEN);}return svg(bars+tx(220,55,'用完整的一條表示 1',17,BLUE)+tx(220,180,type==='fraction-class'?d.label:type==='mixed'?`${whole}個1和剩下${rem}份`:'同分母：分數單位不變',18,GREEN)+tx(220,220,'正式算式請看上方的教材式分數',15,MUTED));}
    if(type==='pictograph'){return svg(Array.from({length:d.count},(_,i)=>`<circle cx="${80+i*55}" cy="105" r="20" fill="#fde68a" stroke="${AMBER}" stroke-width="3"/>${tx(80+i*55,112,'★',19,AMBER)}`).join('')+tx(220,55,`★＝${d.each}`,18,BLUE)+tx(220,185,`${d.count} × ${d.each}＝${d.count*d.each}`,23,GREEN));}
    if(type==='bar'){const max=Math.max(...d.values),scale=125/max;return svg(line(50,200,400,200,MUTED,2)+line(50,40,50,200,MUTED,2)+d.values.map((v,i)=>`<rect x="${95+i*95}" y="${200-v*scale}" width="52" height="${v*scale}" fill="${i===d.focus?BLUE:'#bfdbfe'}" stroke="${BLUE}"/>${tx(121+i*95,225,['甲','乙','丙'][i],14,MUTED)}${tx(121+i*95,190-v*scale,v,14,INK)}`).join('')+tx(350,52,`每格${d.step}`,14,AMBER));}
    if(type==='chart'){const max=Math.max(...d.values),min=Math.min(...d.values),x=i=>85+i*135,y=v=>185-(v-min)/(max-min||1)*115;return svg(line(55,200,385,200,MUTED,2)+line(55,35,55,200,MUTED,2)+`<polyline points="${d.values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="${BLUE}" stroke-width="5"/>`+d.values.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="8" fill="${GREEN}"/>${tx(x(i),y(v)-15,v,14,INK)}${tx(x(i),225,`第${i+1}次`,13,MUTED)}`).join(''));}
    return svg(tx(220,125,'拖曳切換實際例子',20,BLUE));
  }
  const frac=(n,d)=>`\\dfrac{${n}}{${d}}`,inline=t=>`\\(${t}\\)`;
  const rich=v=>esc(v).replace(/(\d+)又(\d+)\/(\d+)/g,(_,w,n,d)=>inline(`${w}${frac(n,d)}`)).replace(/(\d+)\/(\d+)/g,(_,n,d)=>inline(frac(n,d)));
  function equation(type,d){
    if(type==='fraction-class')return frac(d.n,d.d);
    if(type==='mixed')return d.reverse?`${d.w}${frac(d.r,d.d)}=${frac(d.n,d.d)}`:`${frac(d.n,d.d)}=${d.w}${frac(d.r,d.d)}`;
    if(type==='fraction-op'){const left=d.mixed?`1${frac(2,5)}`:frac(d.a,d.d);return `${left}${d.op}${frac(d.b,d.d)}=${d.r===d.d?'2':frac(d.r,d.d)}`;}
    return '';
  }
  function render(h,sec,variant=0){const a=activities[sec];if(!a){h.innerHTML='<p>本頁互動準備中。</p>';return;}h.innerHTML=`<div style="width:100%"><div style="margin:0 1rem .2rem;font-weight:900;color:${BLUE}">先預測，再拖曳切換三個實際例子</div><div class="live-equation" style="min-height:2.4rem;text-align:center;font-size:1.45rem;font-weight:800;color:${INK}"></div><div class="live-scene"></div><div class="live-question" style="margin:.1rem 1rem;font-weight:800;color:${INK}"></div><div class="live-answer" style="margin:.1rem 1rem;color:${GREEN};font-weight:900"></div><div class="ictrl"><label>切換實例 <span class="ival live-value">1</span>／3</label><input class="live-range" type="range" min="0" max="2" step="1" value="${variant%3}"></div></div>`;const draw=()=>{const i=+h.querySelector('.live-range').value,s=a.samples[i],eq=equation(a.type,s[2]);h.querySelector('.live-value').textContent=i+1;h.querySelector('.live-equation').innerHTML=eq?inline(eq):'';h.querySelector('.live-scene').innerHTML=scene(a.type,s);h.querySelector('.live-question').innerHTML='我要解決：'+rich(s[0]);h.querySelector('.live-answer').innerHTML='我核對：'+rich(s[1]);if(typeof window.MJ==='function')window.MJ(h);};h.querySelector('.live-range').oninput=draw;draw();}
  window.M41Activity={render,activities};
})();
