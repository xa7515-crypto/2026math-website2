/* 第8章 簡化計算；範圍：利用四則性質做簡化；不引入正式代數符號。 */
/* 四下學生互動實驗室：每個教材小節都有三個可操作的實際例子。 */
(function(){
  const B='#2563eb',G='#059669',R='#e11d48',A='#d97706',I='#172033',M='#64748b';
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tx=(x,y,s,z=16,c=I,a='middle',w=700)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${z}" font-weight="${w}" fill="${c}">${esc(s)}</text>`;
  const box=(x,y,w,h,f='#f8fafc',s='#cbd5e1',r=12)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="2"/>`;
  const line=(x1,y1,x2,y2,c=I,w=3,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${d?`stroke-dasharray="${d}"`:''}/>`;
  const svg=s=>`<svg viewBox="0 0 440 248" style="width:100%;max-height:248px" role="img">${s}</svg>`;
  const strip=(x,y,w,h,n,d,c=B)=>Array.from({length:d},(_,i)=>`<rect x="${x+i*w/d}" y="${y}" width="${w/d}" height="${h}" fill="${i<n?c:'#fff'}" stroke="#94a3b8"/>`).join('');
  const cube3d=(x,y,s,level)=>`<g><polygon points="${x},${y} ${x+s},${y-s/2} ${x+2*s},${y} ${x+s},${y+s/2}" fill="${level?'#bbf7d0':'#bfdbfe'}" stroke="${level?G:B}"/><polygon points="${x},${y} ${x+s},${y+s/2} ${x+s},${y+s*1.5} ${x},${y+s}" fill="${level?'#86efac':'#93c5fd'}" stroke="${level?G:B}"/><polygon points="${x+s},${y+s/2} ${x+2*s},${y} ${x+2*s},${y+s} ${x+s},${y+s*1.5}" fill="${level?'#4ade80':'#60a5fa'}" stroke="${level?G:B}"/></g>`;
  const activities={
    '1-1':{type:'calc',samples:[['1234盒彩筆，每區205盒，共有幾盒？','252970盒',{a:1234,op:'×',b:205,r:252970}],['每校2305人，共312校，有幾人？','719160人',{a:2305,op:'×',b:312,r:719160}],['每批4012張，共124批，有幾張？','497488張',{a:4012,op:'×',b:124,r:497488}]]},
    '1-2':{type:'zero',samples:[['2400×300','720000',{a:'24×3＝72',zeros:4,r:'720000'}],['350×6000','2100000',{a:'35×6＝210',zeros:4,r:'2100000'}],['7020×500','3510000',{a:'702×5＝3510',zeros:3,r:'3510000'}]]},
    '1-3':{type:'calc',samples:[['2460本書每120本一箱','20箱，餘60本',{a:2460,op:'÷',b:120,r:'20餘60'}],['8735張紙每214張一疊','40疊，餘175張',{a:8735,op:'÷',b:214,r:'40餘175'}],['9632顆球每301顆一袋','32袋',{a:9632,op:'÷',b:301,r:32}]]},
    '2-1':{type:'lines',samples:[['十字路口兩條道路成90°，兩線關係？','互相垂直',{kind:'垂直',deg:90}],['鐵軌的兩條直線永不相交，兩線關係？','互相平行',{kind:'平行'}],['兩條線都垂直同一條線，它們的關係？','互相平行',{kind:'同垂直線'}]]},
    '2-2':{type:'quad',samples:[['只有一組對邊平行的四邊形？','梯形',{pts:'85,185 150,65 320,65 365,185',name:'梯形'}],['四個角是直角、對邊等長？','長方形',{pts:'75,180 75,65 365,65 365,180',name:'長方形'}],['兩組對邊平行、斜斜的四邊形？','平行四邊形',{pts:'55,180 125,65 365,65 295,180',name:'平行四邊形'}]]},
    '2-3':{type:'quad',samples:[['用平行線和垂直線畫長方形','四個直角、對邊等長',{pts:'80,185 80,60 360,60 360,185',name:'長方形'}],['把長方形沿對角線分割','得到兩個三角形',{pts:'80,185 80,60 360,60 360,185',name:'沿對角線分割',diag:true}],['依指定邊長畫一個正方形','四邊等長、四個直角',{pts:'125,195 125,55 265,55 265,195',name:'正方形'}]]},
    '3-1':{type:'approx',samples:[['全校約1200人，「約」表示什麼？','1200是接近實際人數的概數',{exact:1196,rough:1200,unit:'人'}],['演唱會約有5000人','5000是便於表達的概數',{exact:4987,rough:5000,unit:'人'}],['步道全長約3公里','3公里是接近實際長度的概數',{exact:'3.08',rough:3,unit:'公里'}]]},
    '3-2':{type:'ceilfloor',samples:[['321人，每車40人，至少需要幾車？','9車',{a:321,b:40,r:9,mode:'進入'}],['725毫升，每瓶200毫升，至少幾瓶？','4瓶',{a:725,b:200,r:4,mode:'進入'}],['1250人，每車48人，至少幾車？','27車',{a:1250,b:48,r:27,mode:'進入'}]]},
    '3-3':{type:'ceilfloor',samples:[['895元，每個200元，最多買幾個？','4個',{a:895,b:200,r:4,mode:'捨去'}],['930公分，每段200公分，最多剪幾段？','4段',{a:930,b:200,r:4,mode:'捨去'}],['1780元，每件350元，最多買幾件？','5件',{a:1780,b:350,r:5,mode:'捨去'}]]},
    '4-1':{type:'pattern',samples:[['●■▲●■▲，下一個圖形？','●',{items:['●','■','▲','●','■','▲','?'],r:'●'}],['紅藍藍紅藍藍，下一個顏色？','紅',{items:['紅','藍','藍','紅','藍','藍','?'],r:'紅'}],['△△○△△○，下一個圖形？','△',{items:['△','△','○','△','△','○','?'],r:'△'}]]},
    '4-2':{type:'pattern',samples:[['3、6、9、12，下一個數？','15',{items:[3,6,9,12,'?'],r:15}],['2、4、8、16，下一個數？','32',{items:[2,4,8,16,'?'],r:32}],['25、20、15、10，下一個數？','5',{items:[25,20,15,10,'?'],r:5}]]},
    '4-3':{type:'parity',samples:[['7＋9是奇數還是偶數？','偶數',{a:7,b:9,op:'＋',r:16}],['12＋8是奇數還是偶數？','偶數',{a:12,b:8,op:'＋',r:20}],['11＋6是奇數還是偶數？','奇數',{a:11,b:6,op:'＋',r:17}]]},
    '5-1':{type:'decimal',samples:[['2.4公尺的布買6段，共多長？','14.4公尺',{a:2.4,b:6,r:14.4}],['3.7公斤水果買4份，共多重？','14.8公斤',{a:3.7,b:4,r:14.8}],['0.8公升裝7瓶，共多少？','5.6公升',{a:.8,b:7,r:5.6}]]},
    '5-2':{type:'decimal',samples:[['1.25公斤買8份，共多重？','10公斤',{a:1.25,b:8,r:10}],['2.08公尺買5段，共多長？','10.4公尺',{a:2.08,b:5,r:10.4}],['0.36公升裝12瓶，共多少？','4.32公升',{a:.36,b:12,r:4.32}]]},
    '5-3':{type:'decimal',samples:[['每公尺3.6元，買5公尺多少元？','18元',{a:3.6,b:5,r:18}],['每盒彩帶2.45公尺，買4盒多少？','9.8公尺',{a:2.45,b:4,r:9.8}],['每瓶1.25公升，6瓶共多少？','7.5公升',{a:1.25,b:6,r:7.5}]]},
    '6-1':{type:'rect',samples:[['長8、寬5公分的長方形周長？','26公分',{l:8,w:5,mode:'周長',r:26}],['邊長7公分的正方形周長？','28公分',{l:7,w:7,mode:'周長',r:28}],['長12、寬4公尺的長方形周長？','32公尺',{l:12,w:4,mode:'周長',r:32}]]},
    '6-2':{type:'rect',samples:[['長8、寬5公分的長方形面積？','40平方公分',{l:8,w:5,mode:'面積',r:40}],['邊長6公尺的正方形面積？','36平方公尺',{l:6,w:6,mode:'面積',r:36}],['長10、寬3公尺的長方形面積？','30平方公尺',{l:10,w:3,mode:'面積',r:30}]]},
    '6-3':{type:'rect-compare',samples:[['周長20：1×9和5×5，面積相同嗎？','不相同：9和25平方單位',{a:[1,9],b:[5,5]}],['面積24：3×8和4×6，周長相同嗎？','不相同：22和20單位',{a:[3,8],b:[4,6]}],['周長24：2×10和6×6，哪個面積大？','6×6面積較大',{a:[2,10],b:[6,6]}]]},
    '7-1':{type:'equiv',samples:[['1/2和2/4大小相同嗎？','相等',{pairs:[[1,2],[2,4],[4,8]]}],['1/3和2/6大小相同嗎？','相等',{pairs:[[1,3],[2,6],[3,9]]}],['2/5和4/10大小相同嗎？','相等',{pairs:[[2,5],[4,10],[6,15]]}]]},
    '7-2':{type:'fraction-op',samples:[['1/2＋1/4','3/4',{terms:[[1,2],[1,4]],op:'＋',result:[3,4]}],['比較3/5和7/10','3/5＜7/10',{terms:[[3,5],[7,10]],op:'＜',result:null}],['5/6－1/3','3/6，也就是1/2',{terms:[[5,6],[1,3]],op:'－',result:[3,6],simple:[1,2]}]]},
    '7-3':{type:'fraction-decimal',samples:[['37/100化成小數','0.37',{n:37,d:100,v:.37}],['3/5化成小數','0.6',{n:3,d:5,v:.6}],['0.25化成分數','25/100，也就是1/4',{n:25,d:100,v:.25,reverse:true,simple:[1,4]}]]},
    '8-1':{type:'steps',samples:[['298＋157＋2','457',{steps:['298＋2','300＋157','457']}],['650－198－2','450',{steps:['198＋2','650－200','450']}],['475＋99＋25','599',{steps:['475＋25','500＋99','599']}]]},
    '8-2':{type:'steps',samples:[['240÷6÷5','8',{steps:['6×5','240÷30','8']}],['25×36×4','3600',{steps:['25×4','100×36','3600']}],['480÷8÷6','10',{steps:['8×6','480÷48','10']}]]},
    '8-3':{type:'steps',samples:[['25×36×4','3600',{steps:['25×4','100×36','3600']}],['199＋368＋1','568',{steps:['199＋1','200＋368','568']}],['720÷9÷8','10',{steps:['9×8','720÷72','10']}]]},
    '9-1':{type:'time',samples:[['2小時30分是多少分？','150分',{start:'2時30分',work:'2×60＋30',r:'150分'}],['3分20秒是多少秒？','200秒',{start:'3分20秒',work:'3×60＋20',r:'200秒'}],['150分是多少小時幾分？','2小時30分',{start:'150分',work:'150÷60',r:'2時30分'}]]},
    '9-2':{type:'time',samples:[['2小時45分＋1小時30分','4小時15分',{start:'2時45分＋1時30分',work:'75分＝1時15分',r:'4時15分'}],['5小時10分－2小時35分','2小時35分',{start:'5時10分－2時35分',work:'借1時＝60分',r:'2時35分'}],['1分50秒＋35秒','2分25秒',{start:'1分50秒＋35秒',work:'85秒＝1分25秒',r:'2分25秒'}]]},
    '9-3':{type:'timeline',samples:[['9時35分到11時10分經過多久？','1小時35分',{a:'9:35',b:'11:10',mins:95}],['23時20分到隔日1時05分經過多久？','1小時45分',{a:'23:20',b:'1:05',mins:105}],['下午2時50分到4時15分經過多久？','1小時25分',{a:'14:50',b:'16:15',mins:85}]]},
    '10-1':{type:'cubes',samples:[['兩個物體外形不同，能只看高度比體積嗎？','不能，要用相同單位比較',{layers:[4,4],r:8}],['形狀改變但積木顆數不變，體積會變嗎？','不會，體積保持不變',{layers:[5,3],r:8}],['一個盒子放入6顆相同積木，體積單位有幾個？','6個單位體積',{layers:[4,2],r:6}]]},
    '10-2':{type:'cubes',samples:[['底層6顆、上層2顆，共幾顆？','8顆',{layers:[6,2],r:8}],['底層9顆、中層4顆、上層1顆','14顆',{layers:[9,4,1],r:14}],['前面看到5顆，後面還藏3顆，共幾顆？','8顆',{layers:[5,3],r:8}]]},
    '10-3':{type:'cubic-cm',samples:[['用邊長1公分的正方體排成每層6個、共2層','12立方公分',{cols:3,deep:2,high:2,per:6,r:12}],['每層10個1立方公分正方體，共2層','20立方公分',{cols:5,deep:2,high:2,per:10,r:20}],['每層12個1立方公分正方體，共2層','24立方公分',{cols:4,deep:3,high:2,per:12,r:24}]]}
  };
  function scene(type,s){const d=s[2];
    if(type==='calc'||type==='decimal'){const op=type==='decimal'?'×':d.op;return svg(box(65,48,310,50,'#eff6ff',B)+tx(220,80,`${d.a} ${op} ${d.b}`,23,B)+line(95,128,345,128,A,4)+tx(220,165,`＝ ${d.r}`,27,G)+tx(220,210,type==='decimal'?'先估整數倍，再對齊小數位':'用估算與反算核對',16,M));}
    if(type==='zero')return svg(box(45,45,350,52,'#eff6ff',B)+tx(220,78,d.a,21,B)+tx(220,128,`把 ${d.zeros} 個 0 補回去`,18,A)+box(120,155,200,50,'#dcfce7',G)+tx(220,188,d.r,25,G));
    if(type==='lines'){const parallel=d.kind!=='垂直';return svg(parallel?line(65,75,375,75,B,5)+line(65,175,375,175,G,5)+tx(220,130,d.kind,21,A):line(70,125,370,125,B,5)+line(220,35,220,215,G,5)+`<path d="M220 125 h28 v-28" fill="none" stroke="${R}" stroke-width="4"/>`+tx(280,165,'90°',18,R));}
    if(type==='quad'){return svg(`<polygon points="${d.pts}" fill="#dbeafe" stroke="${B}" stroke-width="5"/>${d.diag?line(80,185,360,60,R,4):''}`+tx(220,225,d.name,19,G));}
    if(type==='approx')return svg(tx(105,75,`實際 ${d.exact}${d.unit}`,17,M)+`<path d="M155 70 H270" stroke="${A}" stroke-width="5"/><polygon points="270,70 253,60 253,80" fill="${A}"/>`+box(275,45,135,54,'#dcfce7',G)+tx(342,78,`約 ${d.rough}${d.unit}`,18,G)+tx(220,160,'概數接近實際值，方便表達或計算',17,B));
    if(type==='ceilfloor')return svg(tx(220,48,`${d.a} ÷ ${d.b}`,22,B)+Array.from({length:Math.min(d.r,10)},(_,i)=>`<rect x="${45+i*35}" y="85" width="28" height="60" rx="5" fill="${i===d.r-1?'#fde68a':'#dbeafe'}" stroke="${i===d.r-1?A:B}"/>`).join('')+tx(220,185,d.mode==='進入'?'有剩餘仍需再用1個':'剩餘不足1份就不計',17,d.mode==='進入'?A:G)+tx(220,220,`答案 ${d.r}`,22,G));
    if(type==='pattern')return svg(d.items.map((v,i)=>box(25+i*(390/d.items.length),75,48,65,i===d.items.length-1?'#fef3c7':'#eff6ff',i===d.items.length-1?A:B,5)+tx(49+i*(390/d.items.length),115,v,20,i===d.items.length-1?A:I)).join('')+tx(220,190,`下一個是 ${d.r}`,20,G));
    if(type==='parity'){const dots=n=>Array.from({length:n},(_,i)=>`<circle cx="${80+(i%10)*28}" cy="${65+Math.floor(i/10)*28}" r="9" fill="${i%2?B:G}"/>`).join('');return svg(dots(d.r)+tx(220,185,`${d.a}${d.op}${d.b}＝${d.r}`,22,B)+tx(220,220,d.r%2?'無法兩兩配對：奇數':'可以兩兩配對：偶數',18,d.r%2?A:G));}
    if(type==='rect'){const w=190,h=Math.max(70,190*d.w/d.l);return svg(`<rect x="${220-w/2}" y="${120-h/2}" width="${w}" height="${h}" fill="#dbeafe" stroke="${B}" stroke-width="5"/>${tx(220,120+h/2+25,d.l,16,I)}${tx(220-w/2-14,125,d.w,16,I,'end')}${tx(220,35,d.mode==='周長'?'沿邊一圈的長度':'裡面方格的數量',18,B)}${tx(220,225,`${d.mode}＝${d.r}`,21,G)}`);}
    if(type==='rect-compare'){const draw=(x,y,p,c)=>`<rect x="${x}" y="${y}" width="${p[1]*13}" height="${p[0]*13}" fill="${c}22" stroke="${c}" stroke-width="4"/>`;return svg(draw(45,75,d.a,B)+draw(245,75,d.b,G)+tx(110,210,`${d.a[0]}×${d.a[1]}`,17,B)+tx(320,210,`${d.b[0]}×${d.b[1]}`,17,G));}
    if(type==='equiv'||type==='fraction-op'||type==='fraction-decimal'){let pairs=type==='equiv'?d.pairs:type==='fraction-op'?d.terms:[[d.n,d.d]];return svg(pairs.map((p,i)=>strip(25+i*140,80,120,52,p[0],p[1],i?G:B)).join('')+tx(220,50,type==='equiv'?'塗色長度相同，所以分數等值':type==='fraction-op'?'先把分數單位變成相同':'用100格或數線連結小數',17,B)+tx(220,185,type==='fraction-decimal'?`${d.n}÷${d.d}＝${d.v}`:'分割方式不同，整體大小不變',17,G));}
    if(type==='steps')return svg(d.steps.map((v,i)=>box(45+i*130,75,110,68,i===2?'#dcfce7':'#eff6ff',i===2?G:B)+tx(100+i*130,116,v,17,i===2?G:I)).join('')+tx(220,195,'先找能湊整或合併的數',16,M));
    if(type==='time')return svg(box(35,65,150,70,'#eff6ff',B)+tx(110,107,d.start,18,B)+tx(220,103,'→',28,A)+box(255,65,150,70,'#dcfce7',G)+tx(330,107,d.r,18,G)+tx(220,180,d.work,18,I)+tx(220,220,'時間採60進位',16,R));
    if(type==='timeline')return svg(line(55,125,385,125,B,7)+`<circle cx="55" cy="125" r="12" fill="${G}"/><circle cx="385" cy="125" r="12" fill="${R}"/>`+tx(55,90,d.a,18,G)+tx(385,90,d.b,18,R)+tx(220,112,`${d.mins}分`,18,I)+tx(220,190,'沿時間向前數，跨日也相同',16,M));
    if(type==='cubic-cm'){let cubes='';const size=25,ox=105,oy=112;for(let z=0;z<d.high;z++)for(let j=d.deep-1;j>=0;j--)for(let i=0;i<d.cols;i++)cubes+=cube3d(ox+(i-j)*size,oy+(i+j)*size/2-z*size,size,z);return svg(cubes+tx(220,30,'每個小正方體的邊長都是1公分',16,B)+box(315,62,112,112,'#fff',G,10)+tx(371,91,`一層 ${d.per} 個`,15,I)+tx(371,119,`共有 ${d.high} 層`,15,I)+line(329,133,413,133,A,2)+tx(371,158,`${d.per}×${d.high}＝${d.r}`,17,G)+tx(220,231,`${d.r} 個1立方公分＝${d.r}立方公分`,18,G));}
    if(type==='cubes'){let cubes='',n=0;d.layers.forEach((count,row)=>{for(let i=0;i<count;i++){const x=40+(i%8)*42+row*12,y=165-Math.floor(i/8)*38-row*42;cubes+=`<rect x="${x}" y="${y}" width="34" height="34" fill="${row?'#dcfce7':'#dbeafe'}" stroke="${row?G:B}"/>`;n++;}});return svg(cubes+tx(220,40,'看得到的＋藏在後面的都要算',17,B)+tx(220,225,`共 ${d.r} 個單位正方體`,20,G));}
    return svg(tx(220,125,'拖曳切換實際例子',20,B));
  }
  const frac=(n,d)=>`\\dfrac{${n}}{${d}}`,inline=t=>`\\(${t}\\)`;
  const rich=v=>esc(v).replace(/(\d+)又(\d+)\/(\d+)/g,(_,w,n,d)=>inline(`${w}${frac(n,d)}`)).replace(/(\d+)\/(\d+)/g,(_,n,d)=>inline(frac(n,d)));
  function equation(type,d){
    if(type==='equiv')return d.pairs.map(p=>frac(p[0],p[1])).join('=');
    if(type==='fraction-op'){const [x,y]=d.terms,base=`${frac(x[0],x[1])}${d.op}${frac(y[0],y[1])}`;if(!d.result)return base;if(d.simple)return `${base}=${frac(d.result[0],d.result[1])}=${frac(d.simple[0],d.simple[1])}`;return `${base}=${frac(d.result[0],d.result[1])}`;}
    if(type==='fraction-decimal'){const main=d.reverse?`${d.v}=${frac(d.n,d.d)}`:`${frac(d.n,d.d)}=${d.v}`;return d.simple?`${main}=${frac(d.simple[0],d.simple[1])}`:main;}
    return '';
  }
  function render(h,sec,variant=0){const a=activities[sec];if(!a){h.innerHTML='<p>本頁互動準備中。</p>';return;}h.innerHTML=`<div style="width:100%"><div style="margin:0 1rem .2rem;font-weight:900;color:${B}">先預測，再拖曳切換三個實際例子</div><div class="live-equation" style="min-height:2.4rem;text-align:center;font-size:1.45rem;font-weight:800;color:${I}"></div><div class="live-scene"></div><div class="live-question" style="margin:.1rem 1rem;font-weight:800;color:${I}"></div><div class="live-answer" style="margin:.1rem 1rem;color:${G};font-weight:900"></div><div class="ictrl"><label>切換實例 <span class="ival live-value">1</span>／3</label><input class="live-range" type="range" min="0" max="2" step="1" value="${variant%3}"></div></div>`;const draw=()=>{const i=+h.querySelector('.live-range').value,s=a.samples[i],eq=equation(a.type,s[2]);h.querySelector('.live-value').textContent=i+1;h.querySelector('.live-equation').innerHTML=eq?inline(eq):'';h.querySelector('.live-scene').innerHTML=scene(a.type,s);h.querySelector('.live-question').innerHTML='我要解決：'+rich(s[0]);h.querySelector('.live-answer').innerHTML='我核對：'+rich(s[1]);if(typeof window.MJ==='function')window.MJ(h);};h.querySelector('.live-range').oninput=draw;draw();}
  window.M42Activity={render,activities};
})();

window.DECK=window.DECK||[];(function(){
const C='#ea580c';
const slides=[{"sec":"8-1","name":"加與減的簡化計算","title":"加與減的簡化計算","points":["<span class=\"k\">利用加法交換與結合，先湊整數</span>。","拖曳「切換實例」，比較三個教材情境。","用圖形、算式和完整單位一起核對。"],"q":"298＋157＋2","ans":"457","variant":0},{"sec":"8-2","name":"乘與除的簡化計算","title":"乘與除的簡化計算","points":["<span class=\"k\">連乘可交換結合，連除可改成除以除數乘積</span>。","拖曳「切換實例」，比較三個教材情境。","用圖形、算式和完整單位一起核對。"],"q":"240÷6÷5","ans":"8","variant":0},{"sec":"8-3","name":"簡化計算","title":"簡化計算","points":["<span class=\"k\">先觀察數字特徵，再選擇可行的簡化方法</span>。","拖曳「切換實例」，比較三個教材情境。","用圖形、算式和完整單位一起核對。"],"q":"25×36×4","ans":"3600","variant":0}].map(o=>({sec:o.sec,secName:o.name,title:o.title,points:o.points,formula:null,visual:h=>window.M42Activity.render(h,o.sec,o.variant),caption:'小節名稱對應一個互動頁；拖曳切換實例，圖形、教材式算式與答案同步更新。',example:{q:o.q,steps:['先讀懂情境並預測','拖曳切換三個實際例子','用圖形、算式和單位核對'],ans:o.ans}}));
window.DECK.push({ch:8,title:"簡化計算",color:C,sections:["8-1 加與減的簡化計算","8-2 乘與除的簡化計算","8-3 簡化計算"],slides});})();
