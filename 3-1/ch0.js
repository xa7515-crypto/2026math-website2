/* 三上學生互動實驗室：每個教材小節都有三個可操作的實際例子。
   用法：window.M31Activity.render(h, sec, variant)
   畫面結構與四上範例一致：教材式算式＋情境圖＋我要解決＋我核對＋切換實例滑桿。 */
(function(){
  const BLUE='#2563eb',GREEN='#059669',RED='#e11d48',AMBER='#d97706',INK='#172033',MUTED='#64748b';
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tx=(x,y,s,z=16,c=INK,a='middle',w=700)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${z}" font-weight="${w}" fill="${c}">${esc(s)}</text>`;
  const box=(x,y,w,h,f='#f8fafc',s='#cbd5e1',r=12)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="2"/>`;
  const svg=s=>`<svg viewBox="0 0 440 248" style="width:100%;max-height:248px" role="img">${s}</svg>`;
  const line=(x1,y1,x2,y2,c=INK,w=3)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
  const activities={
    '1-1':{type:'blocks',samples:[
      ['10個百合起來是多少','1000',{t:'blocks',n:10,unit:'百',per:100,total:'1000',note:'10個百合起來是1000，可以換成1個千'}],
      ['2個千是多少，讀作什麼','2000，讀作二千',{t:'blocks',n:2,unit:'千',per:1000,total:'2000',note:'記幾個千的位置是千位'}],
      ['10個千合起來是多少','10000，讀作一萬',{t:'blocks',n:10,unit:'千',per:1000,total:'10000',note:'10個千合起來是10000，讀作一萬'}]]},
    '1-2':{type:'money',samples:[
      ['4235元的帳篷怎麼付才會剛好','4張1000元、2張100元、3個10元和5個1元',{t:'money',bills:[['1000元',4],['100元',2],['10元',3],['1元',5]],total:'4235元',note:'千百十一個數字各付各的'}],
      ['12張100元合起來是幾元','1200元',{t:'convert',a:'12張100元',b:'1張1000元＋2張100元',note:'10張100元換1張1000元'}],
      ['6524的6表示多少','6000',{t:'place',digits:'6524',labels:['千位','百位','十位','個位'],hi:0,note:'6在千位，表示6000'}]]},
    '1-3':{type:'compare',samples:[
      ['3560和3952哪一個比較大','3952＞3560',{t:'compare',a:'3560',b:'3952',sign:'＜',note:'千位都是3，比百位5＜9'}],
      ['3418和2981哪一個比較小','2981比較小，2981＜3418',{t:'compare',a:'2981',b:'3418',sign:'＜',note:'先比千位2＜3'}],
      ['1、3、5、0排出最大和最小各是多少','最大5310，最小1035',{t:'arrange',cards:['1','3','5','0'],best:'5310',worst:'1035',note:'大數字放高位；0不能放千位'}]]},
    '1-4':{type:'numline',samples:[
      ['0、200、600的數線，空格各是多少','400和800',{t:'numline',start:0,unit:200,count:5,marks:[0,200,600,1000],blanks:[400,800],note:'相鄰差200，一格就是200'}],
      ['青蛙從8往右跳6格，停在哪裡','14，8＋6＝14',{t:'numline',start:0,unit:1,count:15,marks:[0,8,14],frog:14,note:'往右跳是加法'}],
      ['螞蟻從14往左走5格，停在哪裡','9，14－5＝9',{t:'numline',start:0,unit:1,count:15,marks:[0,9,14],frog:9,note:'往左走是減法'}]]},
    '2-1':{type:'col',samples:[
      ['火車票891元加孩童票446元共多少','1337元',{t:'col',a:'891',op:'＋',b:'446',r:'1337',top:'111 ',note:'十位百位都滿十，連進兩次'}],
      ['孔廟1227人加878人共多少人','2105人',{t:'col',a:'1227',op:'＋',b:'878',r:'2105',top:'111 ',note:'個位對齊，不同位數也要對齊'}],
      ['簽名球1323元加棒球衣1699元共多少','3022元',{t:'col',a:'1323',op:'＋',b:'1699',r:'3022',top:'111 ',note:'1699接近1700，也可先加1700再減1'}]]},
    '2-2':{type:'col',samples:[
      ['345元買88元鑰匙圈剩多少','257元',{t:'col',a:'345',op:'－',b:'88',r:'257',note:'個位十位不夠減，連退兩次'}],
      ['462頁看了294頁剩多少頁','168頁',{t:'col',a:'462',op:'－',b:'294',r:'168',note:'個位十位不夠減，連退兩次'}],
      ['500元買247元拼圖剩多少','253元',{t:'col',a:'500',op:'－',b:'247',r:'253',note:'0不夠減，先從百位借'}]]},
    '2-3':{type:'col',samples:[
      ['3712元買1488元茶具剩多少','2224元',{t:'col',a:'3712',op:'－',b:'1488',r:'2224',note:'個位十位不夠減，逐位借'}],
      ['上午4235片下午少2761片是幾片','1474片',{t:'col',a:'4235',op:'－',b:'2761',r:'1474',note:'比較型：多的減少的'}],
      ['3010瓶和1947瓶相差幾瓶','1063瓶',{t:'col',a:'3010',op:'－',b:'1947',r:'1063',note:'0不夠減，一直向千位借'}]]},
    '2-4':{type:'est',samples:[
      ['牛奶108大卡大約是幾百大卡','100大卡',{t:'est',pairs:[['108大卡','100大卡']],total:'約100大卡',note:'108比較接近100'}],
      ['3852公尺大約是幾千公尺','4000公尺',{t:'est',pairs:[['3852公尺','4000公尺']],total:'約4000公尺',note:'3852比較接近4000'}],
      ['2903＋1110＝3013對不對','不對，大約是4000',{t:'est',pairs:[['2903','3000'],['1110','1000']],total:'3000＋1000＝4000',note:'估算能檢查答案合不合理'}]]},
    '3-1':{type:'ruler',samples:[
      ['尺上1小格是多長','1毫米',{t:'ruler',max:10,hi:[0,1],reading:'1小格是1毫米',note:'毫米記作mm'}],
      ['9小格再加1小格是多長','10毫米＝1公分',{t:'ruler',max:10,hi:[0,10],reading:'10小格是10毫米，和1公分一樣',note:'1公分＝10毫米'}],
      ['5公分是幾毫米','50毫米',{t:'ruler',max:10,hi:[0,10],reading:'5個10毫米是50毫米',note:'5公分是10毫米的5倍'}]]},
    '3-2':{type:'lenop',samples:[
      ['48毫米＋19毫米是多少','67毫米＝6公分7毫米',{t:'lenop',a:'48毫米',op:'＋',b:'19毫米',r:'67毫米',r2:'6公分7毫米',note:'10毫米是1公分，67毫米就是6公分7毫米'}],
      ['65毫米－42毫米是多少','23毫米＝2公分3毫米',{t:'lenop',a:'65毫米',op:'－',b:'42毫米',r:'23毫米',r2:'2公分3毫米',note:'字典比故事書厚，先減再換'}],
      ['20公分6毫米－18公分8毫米是多少','1公分8毫米',{t:'lenop',a:'20公分6毫米',op:'－',b:'18公分8毫米',r:'19公分16毫米',r2:'1公分8毫米',note:'6毫米不夠減8毫米，把20公分換成19公分10毫米'}]]},
    '4-1':{type:'col',samples:[
      ['彈珠臺20元玩3次共花多少','60元，20×3＝60',{t:'col',a:'20',op:'×',b:'3',r:'60',note:'整十乘一位數，先算2×3再補0'}],
      ['玩偶43元買2隻要多少','86元，43×2＝86',{t:'col',a:'43',op:'×',b:'2',r:'86',note:'拆成40和3：40×2＋3×2'}],
      ['烤肉36元賣4串收多少','144元，36×4＝144',{t:'col',a:'36',op:'×',b:'4',r:'144',note:'個位6×4滿十，先進位再算十位'}]]},
    '4-2':{type:'col',samples:[
      ['門票200元4人要多少','800元，200×4＝800',{t:'col',a:'200',op:'×',b:'4',r:'800',note:'整百乘一位數，先算2×4再補兩個0'}],
      ['蜂蜜115元買4瓶多少','460元，115×4＝460',{t:'col',a:'115',op:'×',b:'4',r:'460',note:'拆成100、10、5再乘'}],
      ['秧苗一排205株插8排共多少','1640株，205×8＝1640',{t:'col',a:'205',op:'×',b:'8',r:'1640',note:'十位是0也要乘：0×8＝0'}]]},
    '4-3':{type:'chain',samples:[
      ['氣球先20×4再80×2共幾顆','160顆',{t:'chain',s1:'20×4＝80',s2:'80×2＝160',ans:'160顆',note:'先算一層幾顆，再算兩層'}],
      ['先6×4＝24再24×3共幾瓶','72瓶',{t:'chain',s1:'6×4＝24',s2:'24×3＝72',ans:'72瓶',note:'先算的答案再拿去算'}],
      ['先25×3＝75再75×2共幾元','150元',{t:'chain',s1:'25×3＝75',s2:'75×2＝150',ans:'150元',note:'分兩步記下來，不要併式'}]]},
    '4-4':{type:'estm',samples:[
      ['巧克力32元買6盒帶150元夠嗎','不夠，大約180元',{t:'estm',a:'32元',approx:'約30元',r:'30×6＝180元',verdict:'150元不夠',note:'32比較接近30'}],
      ['餅乾98元500元可買5盒嗎','可以，大約500元還比500少',{t:'estm',a:'98元',approx:'約100元',r:'100×5＝500元',verdict:'500元可以買',note:'98接近100，實際花的比500少'}],
      ['207×6大約是多少','大約1200',{t:'estm',a:'207',approx:'約200',r:'200×6＝1200',verdict:'答案應該是1200左右',note:'用估算判斷答案合不合理'}]]},
    '5-1':{type:'parts',samples:[
      ['角由什麼組成','1個頂點和2條邊',{t:'parts',note:'尖尖相接的地方是頂點'}],
      ['邊畫多長有關係嗎','沒關係，一樣大',{t:'parts',long:true,note:'邊畫多長都沒關係'}],
      ['兩邊彎彎的是角嗎','不是，兩邊都要是直線',{t:'parts',curved:true,note:'彎彎的線夾起來不是角'}]]},
    '5-2':{type:'open',samples:[
      ['扇子打開角會怎樣','角變大',{t:'open',deg:100,label:'打開：角變大',note:'開合越大角就越大'}],
      ['1號角和2號角哪個大','1號角，∠1＞∠2',{t:'compare',a:'∠1',b:'∠2',sign:'＞',note:'頂點對齊疊起來比'}],
      ['邊長不同的∠1和∠2哪個大','一樣大，邊長不影響',{t:'open',deg:60,label:'描下來疊疊看',note:'邊的長短不影響角的大小'}]]},
    '5-3':{type:'sort3',samples:[
      ['比直角小的角叫什麼','銳角',{t:'sort3',rows:[['直角','比一比的標準'],['銳角','比直角小'],['鈍角','比直角大']],hi:1,note:'拿三角板的直角來比'}],
      ['比直角大的角叫什麼','鈍角',{t:'sort3',rows:[['直角','比一比的標準'],['銳角','比直角小'],['鈍角','比直角大']],hi:2,note:'拿三角板的直角來比'}],
      ['紙可以摺出直角嗎','可以，先對摺再對摺',{t:'sort3',rows:[['先對摺','摺出一條直線邊'],['再對摺','直線邊對齊再摺'],['完成','用三角板檢查是直角']],hi:2,note:'沒三角板也能摺出直角'}]]},
    '5-4':{type:'quad',samples:[
      ['正方形有什麼特徵','4條邊等長，4個角都是直角',{t:'quad',name:'正方形',w:150,h:150,sides:['3cm','3cm','3cm','3cm'],note:'4條邊等長，4個角都是直角'}],
      ['長方形有什麼特徵','兩雙對邊等長，4個角都是直角',{t:'quad',name:'長方形',w:220,h:120,sides:['6cm','3cm','6cm','3cm'],note:'上下、左右兩雙對邊等長'}],
      ['4條邊5公分一定是正方形嗎','不一定，角可能不是直角',{t:'quad',name:'斜掉的四邊形？',w:180,h:130,skew:34,sides:['5cm','5cm','5cm','5cm'],note:'邊等長但角不是直角，就不是正方形'}]]},
    '6-1':{type:'grid',samples:[
      ['邊長1公分的正方形面積是多少','1平方公分',{t:'grid',cols:1,rows:1,title:'邊長1公分',sum:'面積1平方公分',note:'邊長1公分的正方形是1平方公分'}],
      ['2個1平方公分合起來是幾平方公分','2平方公分',{t:'grid',cols:2,rows:1,title:'2個合起來',sum:'面積2平方公分',note:'幾個1平方公分就是幾平方公分'}],
      ['卡片用15個方瓦排滿面積是多少','15平方公分',{t:'grid',cols:5,rows:3,title:'5個一排、共3排',sum:'面積15平方公分',note:'用方瓦排滿再數有幾個'}]]},
    '6-2':{type:'grid',samples:[
      ['一排6個共4排面積是多少','24平方公分，6×4＝24',{t:'grid',cols:6,rows:4,title:'一排6個、共4排',sum:'6×4＝24，共24平方公分',note:'一排幾個、有幾排，用乘法算'}],
      ['5×5的正方形面積是多少','25平方公分',{t:'grid',cols:5,rows:5,title:'橫5格、共5排',sum:'5×5＝25，共25平方公分',note:'橫幾格、共幾排，用乘法算'}],
      ['切成2片再拼面積會變嗎','不會，一樣大',{t:'keep',n:6,note:'分成2片再組合，面積一樣大'}]]},
    '6-3':{type:'pick',samples:[
      ['大拇指指甲面積大約是多少','1平方公分',{t:'pick',options:['1平方公分','10平方公分','100平方公分'],ans:0,note:'先估再用平方公分板量'}],
      ['健保卡面積是5、50還是500','50平方公分',{t:'pick',options:['5平方公分','50平方公分','500平方公分'],ans:1,note:'用指甲面積去估'}],
      ['葉子面積可能是6、12、20、25中的哪個','20平方公分',{t:'pick',options:['6平方公分','12平方公分','20平方公分','25平方公分'],ans:2,note:'比12大、比30小'}]]},
    '7-1':{type:'div',samples:[
      ['12個蛋糕3個裝一盤可裝幾盤','4盤，12÷3＝4',{t:'div',a:12,b:3,q:4,r:0,unit:'盤',note:'3個裝一盤，是包含除'}],
      ['除法算式12÷3＝4中12叫什麼','被除數',{t:'divname',vals:['12','÷','3','＝','4'],names:['被除數','除號','除數','','商'],note:'÷是除號，4是商'}],
      ['12÷3＝4怎麼讀','十二除以三等於四',{t:'divname',vals:['十二','除以','三','等於','四'],names:['被除數','除號','除數','','商'],note:'讀出每個部位的名稱'}]]},
    '7-2':{type:'div',samples:[
      ['13顆3顆裝一盤可裝幾盤剩幾顆','4盤剩1顆，13÷3＝4…1',{t:'div',a:13,b:3,q:4,r:1,unit:'顆',note:'分不完剩下的叫餘數'}],
      ['7個點心每人分3個可分幾人剩幾個','2人剩1個，7÷3＝2…1',{t:'div',a:7,b:3,q:2,r:1,unit:'個',note:'剩下的1個不夠再分一人'}],
      ['13÷3＝4…1怎麼讀','十三除以三等於四餘一',{t:'divname',vals:['13','÷','3','＝','4…1'],names:['被除數','除號','除數','','商和餘數'],note:'…1讀作餘一'}]]},
    '7-3':{type:'div',samples:[
      ['7個點心分3個直式怎麼算','2人剩1個',{t:'div',a:7,b:3,q:2,r:1,unit:'個',note:'先估商2，3×2＝6，7－6＝1'}],
      ['29顆分6顆可分幾人剩幾顆','4人剩5顆，29÷6＝4…5',{t:'div',a:29,b:6,q:4,r:5,unit:'顆',note:'6×4＝24，29－24＝5'}],
      ['40片平分5盤1盤幾片剩幾片','8片剩0片，40÷5＝8',{t:'div',a:40,b:5,q:8,r:0,unit:'片',note:'餘數是0就是剛好分完'}]]},
    '7-4':{type:'div',samples:[
      ['32個點心6個裝一盒可裝幾盒','5盒，32÷6＝5…2',{t:'div',a:32,b:6,q:5,r:2,unit:'盒',note:'剩2個不夠裝滿1盒'}],
      ['65片餅乾平分7人1人幾片','9片，65÷7＝9…2',{t:'div',a:65,b:7,q:9,r:2,unit:'片',note:'7×9＝63，65－63＝2'}],
      ['34人坐4人天鵝船要幾艘','9艘，34÷4＝8…2再加1',{t:'divup',a:34,b:4,q:8,r:2,ans:'9艘',note:'剩2人也要1艘，8＋1＝9'}]]},
    '8-1':{type:'cup',samples:[
      ['10毫升是幾個1毫升合起來的','10個',{t:'cup',max:10,marks:10,reading:'10毫升',note:'量杯1小格是1毫升'}],
      ['奶瓶1小格幾毫升，爸爸泡了幾毫升','1小格10毫升，共180毫升',{t:'cup',max:200,marks:180,reading:'180毫升',note:'150、160、170、180'}],
      ['量杯1大格1小格各幾毫升','1大格100毫升，1小格10毫升',{t:'cup',max:1000,marks:1000,reading:'1000毫升',note:'最多可量1000毫升'}]]},
    '8-2':{type:'convert',samples:[
      ['1公升是幾毫升','1000毫升',{t:'convert',a:'1公升',b:'1000毫升',note:'公升記作L，1公升＝1000毫升'}],
      ['5公升是幾毫升','5000毫升',{t:'convert',a:'5公升',b:'5000毫升',note:'5個1000毫升'}],
      ['1公升300毫升是幾毫升','1300毫升',{t:'convert',a:'1公升300毫升',b:'1300毫升',note:'1000＋300＝1300'}]]},
    '8-3':{type:'lenop',samples:[
      ['375毫升＋290毫升是幾毫升','665毫升',{t:'lenop',a:'375毫升',op:'＋',b:'290毫升',r:'665毫升',r2:'',note:'同單位的直接加'}],
      ['375毫升－290毫升是幾毫升','85毫升',{t:'lenop',a:'375毫升',op:'－',b:'290毫升',r:'85毫升',r2:'',note:'同單位的直接減'}],
      ['19公升＋15公升是幾公升','34公升',{t:'lenop',a:'19公升',op:'＋',b:'15公升',r:'34公升',r2:'',note:'公升和公升加'}]]},
    '9-1':{type:'frac',samples:[
      ['蔥油餅平分成4片，1片是幾張','1/4張',{t:'frac',n:1,d:4,whole:'張蔥油餅',note:'分母4是平分成4片，分子1是其中1片'}],
      ['2片是幾張','2/4張，是2個1/4合起來',{t:'frac',n:2,d:4,whole:'張蔥油餅',note:'2片是2個1/4合起來'}],
      ['披薩8片品妍吃3片是幾個披薩','3/8個，是3個1/8',{t:'frac',n:3,d:8,whole:'個披薩',note:'3片是3個1/8合起來'}]]},
    '9-2':{type:'frac',samples:[
      ['1盒6個陀螺1人分到幾盒','1/6盒',{t:'frac',n:1,d:6,whole:'盒',note:'整體1盒有6個，1個是1/6盒'}],
      ['大寶吃3個果凍是幾盒','3/10盒',{t:'frac',n:3,d:10,whole:'盒果凍',note:'整體1盒10個，3個是3/10盒'}],
      ['妹妹拿1個是1/6盒還是1/5盒','1/6盒，整體1不變',{t:'frac',n:1,d:6,whole:'盒甜甜圈',note:'整體還是1盒6個，所以是1/6盒'}]]},
    '9-3':{type:'frac',samples:[
      ['2/10公尺是幾個1/10公尺','2個',{t:'frac',n:2,d:10,whole:'公尺',note:'2/10是2個1/10合起來'}],
      ['3個1/10公尺是幾公尺','3/10公尺',{t:'frac',n:3,d:10,whole:'公尺',note:'3個1/10合起來是3/10'}],
      ['10個1/10公尺是幾公尺','1公尺，和1公尺一樣',{t:'frac',n:10,d:10,whole:'公尺',note:'10/10公尺就是1公尺'}]]},
    '9-4':{type:'fraccmp',samples:[
      ['思妤2/5條和詠安4/5條誰吃得多','詠安，4/5＞2/5',{t:'fraccmp',an:2,ad:5,bn:4,bd:5,sign:'＜',who:'詠安比較多',note:'分母相同比分子，4比2多'}],
      ['承恩5/8個和子晴3/8個誰吃得多','承恩，5/8＞3/8',{t:'fraccmp',an:5,ad:8,bn:3,bd:8,sign:'＞',who:'承恩比較多',note:'分母相同比分子，5比3多'}],
      ['宥廷5/9盒和芯語3/9盒誰吃得少','芯語，3/9＜5/9',{t:'fraccmp',an:5,ad:9,bn:3,bd:9,sign:'＞',who:'芯語比較少',note:'分母相同比分子，3比5少'}]]}
  };
  function scene(type,s){
    const d=s[2];
    if(type==='blocks'){const n=Math.min(d.n,10);let cells='';for(let i=0;i<n;i++){const x=32+(i%5)*76,y=62+Math.floor(i/5)*62;cells+=box(x,y,68,52,i>=5?'#fef3c7':'#eff6ff',i>=5?AMBER:BLUE,4)+tx(x+34,y+33,String(d.per),15,INK);}return svg(tx(220,40,`${d.n}個${d.unit}＝${d.total}`,19,BLUE)+cells+tx(220,224,d.note,15,GREEN));}
    if(type==='place'){return svg(d.digits.split('').map((v,i)=>box(42+i*72,66,62,88,i===d.hi?'#fef3c7':'#eff6ff',i===d.hi?AMBER:BLUE,4)+tx(73+i*72,107,v,26,INK)+tx(73+i*72,141,d.labels[i],13,MUTED)).join('')+tx(220,208,d.note,16,GREEN));}
    if(type==='money'){return svg(d.bills.map((r,i)=>box(40,36+i*46,210,38,'#eff6ff',BLUE,10)+tx(145,61+i*46,`${r[0]} × ${r[1]}`,16,INK)).join('')+box(272,70,140,84,'#dcfce7',GREEN,10)+tx(342,104,'共',14,MUTED)+tx(342,132,d.total,20,GREEN)+tx(220,232,d.note||'',14,MUTED));}
    if(type==='convert'){const f1=d.a.length>5?14:18,f2=d.b.length>8?12:(d.b.length>6?13:15);return svg(box(25,72,165,72,'#eff6ff',BLUE)+tx(107,114,d.a,f1,BLUE)+`<path d="M200 108 H250" stroke="${AMBER}" stroke-width="5"/><polygon points="250,108 234,98 234,118" fill="${AMBER}"/>`+box(260,72,155,72,'#dcfce7',GREEN)+tx(337,114,d.b,f2,GREEN)+tx(220,190,d.note,15,MUTED));}
    if(type==='col'){const n=Math.max(d.a.length,d.b.length,d.r.length,(d.top||'').length);const x0=220-(n-1)*28;const dig=(row,y,c,fs)=>String(row).split('').map((v,i)=>tx(x0+i*56,y,v,fs||24,c||INK)).join('');let s=tx(64,138,d.op,24,BLUE);if(d.top)s+=dig(d.top.padStart(n,' '),56,AMBER,16);s+=dig(d.a.padStart(n,' '),98)+dig(d.b.padStart(n,' '),142)+line(60,160,380,160,INK,3)+dig(d.r.padStart(n,' '),198,GREEN)+tx(220,228,d.note,15,MUTED);return svg(s);}
    if(type==='est'){let s=d.pairs.map((p,i)=>box(70,44+i*58,300,46,'#eff6ff',BLUE,10)+tx(220,74+i*58,`${p[0]} → 約${p[1]}`,17,INK)).join('');return svg(s+tx(220,44+d.pairs.length*58+26,d.total,20,GREEN)+tx(220,44+d.pairs.length*58+52,d.note,14,MUTED));}
    if(type==='ruler'){const x0=40,x1=400,y=118,step=(x1-x0)/d.max;let s=line(x0,y,x1,y,MUTED,4);for(let i=0;i<=d.max;i++){const x=x0+i*step,on=d.hi.indexOf(i)>=0;s+=line(x,y-14,x,y+14,on?AMBER:'#94a3b8',on?5:2)+tx(x,y+36,String(i),12,on?AMBER:MUTED);}const a=Math.min(...d.hi),b=Math.max(...d.hi);if(b>a)s+=box(x0+a*step,y-30,(b-a)*step,18,'rgba(217,119,6,.18)',AMBER,4);return svg(s+tx(220,196,d.reading,18,GREEN)+tx(220,222,d.note,14,MUTED));}
    if(type==='lenop'){let s=box(55,26,330,42,'#fff')+tx(220,55,d.a,18,INK)+box(55,74,330,42,'#fff')+tx(220,103,d.op+d.b,18,INK)+line(55,128,385,128,INK,3)+box(55,138,330,44,'#dcfce7',GREEN,10)+tx(220,167,d.r,19,GREEN);if(d.r2)s+=tx(220,200,'＝'+d.r2,17,AMBER);return svg(s+tx(220,228,d.note,14,MUTED));}
    if(type==='chain'){return svg(box(80,34,280,48,'#eff6ff',BLUE)+tx(220,65,d.s1,19,BLUE)+`<polygon points="220,92 208,108 232,108" fill="${AMBER}"/>`+box(80,112,280,48,'#eff6ff',BLUE)+tx(220,143,d.s2,19,BLUE)+box(80,172,280,48,'#dcfce7',GREEN)+tx(220,203,d.ans,20,GREEN)+tx(220,232,d.note||'',13,MUTED));}
    if(type==='estm'){return svg(tx(220,52,`${d.a} → ${d.approx}`,19,BLUE)+box(70,76,300,52,'#eff6ff',BLUE)+tx(220,109,d.r,18,INK)+tx(220,166,d.verdict,20,GREEN)+tx(220,204,d.note,14,MUTED));}
    if(type==='parts'){const v=[150,175],e1=d.long?[375,70]:[330,105],e2=d.long?[375,215]:[330,200];let rays;if(d.curved){rays=`<path d="M${v[0]} ${v[1]} Q 250 110 ${e1[0]} ${e1[1]}" fill="none" stroke="${BLUE}" stroke-width="5"/><path d="M${v[0]} ${v[1]} Q 250 190 ${e2[0]} ${e2[1]}" fill="none" stroke="${BLUE}" stroke-width="5"/>`;}else{rays=line(v[0],v[1],e1[0],e1[1],BLUE,5)+line(v[0],v[1],e2[0],e2[1],BLUE,5);}return svg(rays+`<circle cx="${v[0]}" cy="${v[1]}" r="9" fill="${RED}"/>`+tx(v[0]-8,v[1]+34,'頂點',15,RED,'end')+tx((v[0]+e1[0])/2,(v[1]+e1[1])/2-12,'邊',15,BLUE)+tx((v[0]+e2[0])/2,(v[1]+e2[1])/2+24,'邊',15,BLUE)+tx(220,228,d.note,15,GREEN));}
    if(type==='open'){const rad=-d.deg*Math.PI/180,x=220+125*Math.cos(rad),y=185+125*Math.sin(rad),x2=220+55*Math.cos(rad),y2=185+55*Math.sin(rad);return svg(line(220,185,355,185,BLUE,5)+line(220,185,x,y,RED,5)+`<path d="M275 185 A55 55 0 0 0 ${x2} ${y2}" fill="none" stroke="${AMBER}" stroke-width="4"/>`+tx(220,60,d.label,20,GREEN)+tx(220,228,d.note,15,MUTED));}
    if(type==='sort3'){return svg(d.rows.map((r,i)=>box(40,36+i*58,120,48,i===d.hi?'#fef3c7':'#eff6ff',i===d.hi?AMBER:BLUE,10)+tx(100,66+i*58,r[0],17,i===d.hi?AMBER:BLUE)+tx(180,66+i*58,r[1],15,INK,'start')).join('')+tx(220,230,d.note,14,MUTED));}
    if(type==='quad'){const w=d.w,h=d.h,cx=220,cy=116,k=d.skew||0;const pts=`${cx-w/2+k},${cy-h/2} ${cx+w/2+k},${cy-h/2} ${cx+w/2-k},${cy+h/2} ${cx-w/2-k},${cy+h/2}`;return svg(`<polygon points="${pts}" fill="#dbeafe" stroke="${BLUE}" stroke-width="4"/>`+tx(cx,cy,d.name,17,BLUE)+tx(cx,cy-h/2-10,d.sides[0],14,INK)+tx(cx+w/2+k+8,cy,d.sides[1],14,INK,'start')+tx(cx,cy+h/2+22,d.sides[2],14,INK)+tx(cx-w/2-k-8,cy,d.sides[3],14,INK,'end')+tx(220,232,d.note||'',13,MUTED));}
    if(type==='grid'){const cell=(d.cols>4||d.rows>4)?24:34,gw=d.cols*cell,gh=d.rows*cell,x0=220-gw/2,y0=60;let g='';for(let r=0;r<d.rows;r++)for(let c=0;c<d.cols;c++)g+=`<rect x="${x0+c*cell}" y="${y0+r*cell}" width="${cell}" height="${cell}" fill="#dbeafe" stroke="${BLUE}" stroke-width="1.6"/>`;return svg(tx(220,42,d.title,17,BLUE)+g+tx(220,y0+gh+26,d.sum,19,GREEN)+tx(220,y0+gh+50,d.note,14,MUTED));}
    if(type==='halves'){return svg(`<polygon points="90,80 90,170 170,170" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/><polygon points="200,80 200,170 280,170" fill="#dbeafe" stroke="${BLUE}" stroke-width="3"/>`+`<path d="M295 125 H335" stroke="${AMBER}" stroke-width="5"/><polygon points="335,125 321,116 321,134" fill="${AMBER}"/>`+`<rect x="350" y="95" width="60" height="60" fill="#dbeafe" stroke="${GREEN}" stroke-width="3"/>`+tx(220,205,'2個半格合成1個整格',17,GREEN)+tx(220,228,d.note,14,MUTED));}
    if(type==='keep'){let L='';for(let r=0;r<2;r++)for(let c=0;c<3;c++)L+=`<rect x="${60+c*34}" y="${70+r*34}" width="34" height="34" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>`;let R='';const cells=[[0,0],[0,1],[0,2],[0,3],[1,0],[1,3]];cells.forEach(p=>{R+=`<rect x="${250+p[1]*34}" y="${70+p[0]*34}" width="34" height="34" fill="#dcfce7" stroke="${GREEN}" stroke-width="2"/>`;});return svg(L+R+tx(130,160,'剪下前',14,BLUE)+tx(318,160,'拼排後',14,GREEN)+tx(220,200,d.n+'格還是'+d.n+'格',18,GREEN)+tx(220,224,d.note,14,MUTED));}
    if(type==='pick'){const n=d.options.length,w=Math.min(128,(400-(n-1)*12)/n);let s='';d.options.forEach((o,i)=>{const x=220-(n*w+(n-1)*12)/2+i*(w+12);s+=box(x,80,w,64,i===d.ans?'#dcfce7':'#fff',i===d.ans?GREEN:'#cbd5e1',10)+tx(x+w/2,117,o,14,i===d.ans?GREEN:INK);});return svg(s+tx(220,190,d.options[d.ans],20,GREEN)+tx(220,218,d.note,14,MUTED));}
    if(type==='div'){const chk=`${d.b}×${d.q}＝${d.b*d.q}，${d.a}－${d.b*d.q}＝${d.r}`;let s=tx(220,52,`${d.a}÷${d.b}＝${d.q}`+(d.r?`…${d.r}`:''),26,BLUE)+tx(220,88,chk,15,MUTED);if(d.a<=16){let dots='',gx=60;for(let g=0;g<d.q;g++){for(let k=0;k<d.b;k++)dots+=`<circle cx="${gx+k*20}" cy="130" r="8" fill="#dbeafe" stroke="${BLUE}" stroke-width="2"/>`;gx+=d.b*20+16;}for(let k=0;k<d.r;k++)dots+=`<circle cx="${gx+k*20}" cy="130" r="8" fill="#fee2e2" stroke="${RED}" stroke-width="2"/>`;s+=dots+tx(220,168,`${d.q}盤每盤${d.b}${d.unit}`+(d.r?`，剩${d.r}${d.unit}`:'，剛好分完'),15,GREEN);}return svg(s+tx(220,208,d.note,15,GREEN));}
    if(type==='divname'){return svg(d.vals.map((v,i)=>box(14+i*84,84,78,64,'#eff6ff',BLUE,8)+tx(53+i*84,112,v,18,INK)+tx(53+i*84,172,d.names[i]||'',13,AMBER)).join('')+tx(220,212,d.note,15,GREEN));}
    if(type==='divup'){return svg(tx(220,56,`${d.a}÷${d.b}＝${d.q}…${d.r}`,24,BLUE)+box(110,88,220,52,'#fef3c7',AMBER)+tx(220,121,`剩${d.r}→再加1艘`,18,AMBER)+box(110,152,220,52,'#dcfce7',GREEN)+tx(220,185,d.ans,22,GREEN)+tx(220,222,d.note,14,MUTED));}
    if(type==='cup'){const x0=150,x1=290,y0=58,y1=206,h=y1-y0;let s=tx(220,36,d.reading,19,GREEN)+box(x0,y0,x1-x0,h,'#fff','#94a3b8',6);for(let i=0;i<=5;i++){const v=Math.round(d.max*i/5),y=y1-i*(h/5);s+=line(x0,y,x0+22,y,MUTED,3)+tx(x0-8,y+5,String(v),12,MUTED,'end');}const fh=(d.marks/d.max)*h;s+=`<rect x="${x0+4}" y="${y1-fh}" width="${x1-x0-8}" height="${fh}" fill="rgba(37,99,235,.35)"/>`+tx(220,230,d.note||'',13,MUTED);return svg(s);}
    if(type==='frac'){const w=300,x0=220-w/2;let s='';for(let i=0;i<d.d;i++)s+=`<rect x="${x0+i*w/d.d}" y="92" width="${w/d.d}" height="56" fill="${i<d.n?BLUE:'#fff'}" stroke="#64748b" stroke-width="2"/>`;return svg(s+tx(220,60,`${d.n}／${d.d} ${d.whole}`,20,BLUE)+tx(220,188,`${d.n}個1／${d.d}合起來`,17,GREEN)+tx(220,216,d.note,14,MUTED));}
    if(type==='fraccmp'){const bar=(x,n,den,c)=>{let s='';for(let i=0;i<den;i++)s+=`<rect x="${x+i*150/den}" y="80" width="${150/den}" height="44" fill="${i<n?c:'#fff'}" stroke="#64748b" stroke-width="2"/>`;return s;};return svg(bar(40,d.an,d.ad,BLUE)+tx(220,102,d.sign,30,AMBER)+bar(250,d.bn,d.bd,GREEN)+tx(115,152,`${d.an}／${d.ad}`,15,BLUE)+tx(325,152,`${d.bn}／${d.bd}`,15,GREEN)+tx(220,190,d.who,19,GREEN)+tx(220,216,d.note,14,MUTED));}
    if(type==='compare'){return svg(box(35,70,155,72,'#eff6ff',BLUE)+tx(112,113,d.a,19,BLUE)+tx(220,116,d.sign,34,d.sign==='＝'?GREEN:AMBER)+box(250,70,155,72,'#eff6ff',BLUE)+tx(327,113,d.b,19,BLUE)+tx(220,190,d.note,15,MUTED));}
    if(type==='arrange'){return svg(d.cards.map((v,i)=>box(52+i*88,52,72,68,'#fff7ed',AMBER)+tx(88+i*88,96,v,30,AMBER)).join('')+box(60,142,140,56,'#dcfce7',GREEN)+tx(130,176,'最大'+d.best,17,GREEN)+box(240,142,140,56,'#eff6ff',BLUE)+tx(310,176,'最小'+d.worst,17,BLUE)+tx(220,226,d.note,14,MUTED));}
    if(type==='numline'){const x0=40,x1=400,y=128,step=(x1-x0)/d.count;let s=line(x0,y,x1+12,y,INK,3)+`<polygon points="${x1+12},${y-7} ${x1+12},${y+7} ${x1+24},${y}" fill="${INK}"/>`;for(let i=0;i<=d.count;i++){const x=x0+i*step,v=d.start+i*d.unit;const isB=d.blanks&&d.blanks.indexOf(v)>=0;const isM=d.marks&&d.marks.indexOf(v)>=0;if(isB){s+=box(x-26,y-46,52,34,'#fef3c7',AMBER,8)+tx(x,y-22,'?',20,AMBER);}else{s+=line(x,y-9,x,y+9,isM?RED:'#64748b',isM?4:2)+tx(x,y+30,String(v),13,isM?RED:'#334155');}}if(d.frog!==undefined&&d.frog!==null){const fx=x0+((d.frog-d.start)/d.unit)*step;s+=tx(fx,y-58,'●',22,GREEN)+tx(fx,y-74,String(d.frog),14,GREEN);}return svg(s+tx(220,224,d.note,15,GREEN));}
    return svg(tx(220,125,'拖曳切換實際例子',20,BLUE));
  }
  const frac=(n,d)=>`\\dfrac{${n}}{${d}}`,inline=t=>`\\(${t}\\)`;
  const rich=v=>esc(v).replace(/(\d+)又(\d+)\/(\d+)/g,(_,w,n,d)=>inline(`${w}${frac(n,d)}`)).replace(/(\d+)\/(\d+)/g,(_,n,d)=>inline(frac(n,d)));
  function equation(type,d){return '';}
  function render(h,sec,variant=0){const a=activities[sec];if(!a){h.innerHTML='<p>本頁互動準備中。</p>';return;}h.innerHTML=`<div style="width:100%"><div style="margin:0 1rem .2rem;font-weight:900;color:${BLUE}">先預測，再拖曳切換三個實際例子</div><div class="live-equation" style="min-height:2.4rem;text-align:center;font-size:1.45rem;font-weight:800;color:${INK}"></div><div class="live-scene"></div><div class="live-question" style="margin:.1rem 1rem;font-weight:800;color:${INK}"></div><div class="live-answer" style="margin:.1rem 1rem;color:${GREEN};font-weight:900"></div><div class="ictrl"><label>切換實例 <span class="ival live-value">1</span>／3</label><input class="live-range" type="range" min="0" max="2" step="1" value="${variant%3}"></div></div>`;const draw=()=>{const i=+h.querySelector('.live-range').value,s=a.samples[i],t=s[2].t||a.type,eq=equation(t,s[2]);h.querySelector('.live-value').textContent=i+1;h.querySelector('.live-equation').innerHTML=eq?inline(eq):'';h.querySelector('.live-scene').innerHTML=scene(t,s);h.querySelector('.live-question').innerHTML='我要解決：'+rich(s[0]);h.querySelector('.live-answer').innerHTML='我核對：'+rich(s[1]);if(typeof window.MJ==='function')window.MJ(h);};h.querySelector('.live-range').oninput=draw;draw();}
  function makeSlides(defs){
    return defs.flatMap(def=>activities[def.sec].samples.map((sample,variant)=>{
      const data=sample[2], concept=data.note||sample[0];
      return {
        sec:def.sec,secName:def.sec==='7-1'?'除法算式(整除)':def.name,title:concept,
        points:[def.points[0],'本頁先處理一個實際例子，再切換同小節題型。','用圖形、算式和完整單位一起核對。'],
        formula:null,
        visual:h=>render(h,def.sec,variant),
        caption:'拖曳切換同小節的三個實際例子，圖形與答案同步更新。',
        example:{q:sample[0],steps:['先讀懂情境並預測','操作圖形或切換實例','用算式和單位核對'],ans:sample[1]}
      };
    }));
  }
  window.M31Activity={render,activities,makeSlides};
})();
