import*as f from"node:fs";
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
function S(t){
let L=t.trim().split("\n"),w=L[0].length,G=L.join(""),U=[-w,w,-1,1],g=[...G.matchAll(/[$*]/g)].map(m=>m.index),p=G.search(/[@+]/);
let y=(p/w)|0,m="",x=p%w,V=[];
for(let j of[y-1,y+1])for(let i=0;i<w;i++){let d=j*w+i;
if(G[d]!=="#"){
let s={[d]:1},q=[d];
for(let k=0;k<q.length;k++)for(let o of U){let n=q[k]+o;!s[n]&&(n/w|0)!==y&&G[n]!=="#"&&(s[n]=1,q.push(n))}
V.push([s,d]);}}
for(let r=0;r<V.length;r++){let s=V[r][0],d=V[r][1],e=(d/w|0)<y?d+w:d-w,n=e%w;
while(x<n)m+="r",x++;
while(x>n)m+="l",x--;
let v=Z(s,e,g.filter(z=>s[z]),r===V.length-1);
if(v===null)return"";
m+=v;x=n;}
return m;
function Z(s,e,b,last){
let k=e+","+b,P=new Map([[k,["",0]]]),Q=[k],N=[],c=0,h=0;
while(h<Q.length||N.length){
if(h>=Q.length){Q=N;N=[];h=0;c++;}
let k=Q[h++];
let[p,...b]=k.split(",").map(Number),R=P.get(k);
if(b.every(z=>".*+".includes(G[z]))&&(last||p===e))return R[0];
for(let j=0;j<4;j++){let o=U[j],q=p+o;
if(!s[q]&&q!==e)continue;
let z=b.indexOf(q),b2=b,n=c;
if(z>=0){let r=q+o;if(!s[r]||b.includes(r))continue;
b2=b.slice();b2[z]=r;b2.sort((a,b)=>a-b);n=c+1;}
let nk=q+","+b2;
if(P.has(nk)&&P.get(nk)[1]<=n)continue;
P.set(nk,[R[0]+"udlr"[j],n]);n===c?Q.push(nk):N.push(nk);}}
return null;}
}
for(let i of f.readdirSync(I))f.mkdirSync(O+"/"+i),f.writeFileSync(O+"/"+i+"/solution.txt",S(f.readFileSync(I+"/"+i+"/level.txt")+""));
