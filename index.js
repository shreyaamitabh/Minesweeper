'use strict'
let root= document.getElementById("root");
let indexes=[];
let visited=[];
let bombPoints=[1, -1, 9, -9, 8, -8, 10, -10];
let arr= generate(indexes);
let score= document.getElementById("points");
let congo= document.getElementById("congo");
let button=document.getElementById("butt");
let points=0;
let over=false;

for(let i=0; i<9; i++)
{
      let row= document.createElement("div");
      if(i==0)
      row.setAttribute("id", "firstrow");
    row.style.height="40px";
    row.setAttribute("class", "rows");
    for(let j=0; j<9; j++)
    {
        let curr= (i*9)+j;
         let cell= document.createElement("div");
        cell.style.display="inline-block";
        cell.style.height="40px";
        cell.style.width="40px";
        cell.style.backgroundColor="lightgrey";
        cell.setAttribute("id", curr);
        cell.style.border= "1px solid black";
        cell.addEventListener("contextmenu", function(){
            if(!over)
            {
            cell.style.textAlign="center";
            //cell.style.fontSize="20px";
           cell.style.verticalAlign="21px";
            cell.innerHTML="❗️";
            return false;
        }}, false);
        cell.addEventListener("click", function(){
            if(!arr.includes(curr)  && !over && !visited.includes(curr))
            {
                let bombs=0;
                
               for(let o=0; o<bombPoints.length; o++)
               {    if(curr%9==0)
                {
                    if(bombPoints[o]==-1 || bombPoints[o]==8 || bombPoints[o]==-10)
                    continue;
                }
                if((curr+1)%9==0)
                {
                    if(bombPoints[o]==1 || bombPoints[o]==-8 || bombPoints[o]==10)
                    continue;
                }
                   let oo= curr+bombPoints[o];
                   if(arr.includes(oo))
                   bombs++;
               }
                visited.push(curr);
               cell.style.verticalAlign="27px";
                cell.style.backgroundColor="green";
                cell.style.textAlign="center";
                cell.innerHTML=bombs;
                points++;
            score.innerHTML=points;
             
            if(points==71)
            {   congo.style.display="block";
                congo.innerHTML="Congratulations, you won!";
            }
            }
            else if(arr.includes(curr))
            {
                for(let y=0; y<10;y++)
                {
                    
                    document.getElementById(arr[y]).style.backgroundColor="red";
                    document.getElementById(arr[y]).style.verticalAlign="20px";
                    document.getElementById(arr[y]).innerHTML="💣";
                    over=true;
                }
                button.style.display="block";
            }
        })
        row.appendChild(cell);
    }
    root.appendChild(row);
}

function generate(indexes)
{
    if(indexes.length==10)
    {
       
    return indexes;
    }
    let rand= Math.ceil(Math.random()*80);
    if(!indexes.includes(rand))
    {
        indexes.push(rand);
    }
    return generate(indexes);
}
function refresh()
{
    window.location.reload();
}
