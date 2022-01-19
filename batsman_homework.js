//adding runs, balls,sixes,fours,strikerate

const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",requestCallback);
let batsmanProfile=[];
let balls=[]
let fours=[]
let sixes=[]
let strikrate=[]
function requestCallback(err,res,html){
    const $=cheerio.load(html);
    const batsmanAnchorTags=$(".batsman-cell a");
    const batsmanRun=$(".table.batsman tr  td.font-weight-bold");
    const batsmanTables=$(".table.batsman tbody tr");//sari tables
    for(let i=0;i<batsmanTables.length;i++){
        const oneTable=$(batsmanTables[i]).find("td");//ek ek karke players ke stats vali rows
        const batsmanname=$(oneTable[0]).text();
        //console.log(oneTable.length);
        if(oneTable.length==8){
            //console.log(batsmanname);
            balls.push($(oneTable[3]).text());
            fours.push($(oneTable[5]).text());
            sixes.push($(oneTable[6]).text());
            strikrate.push($(oneTable[7]).text());
        }
    }
    //console.log(batsmanTables);
    let runarr=[]
    let extraxindex1=-1;
    for(let i=0;i<batsmanRun.length-2;i++){
        if($(batsmanRun[i]).text().includes('/')){
            extraxindex1=i-1
            continue;
        }
        else{
            runarr.push($(batsmanRun[i]).text());
        }
    }
    runarr.splice(extraxindex1,1);
    //console.log(runarr);
    for(let i=0;i<batsmanAnchorTags.length;i++){
        batsmanProfile.push({
            name:$(batsmanAnchorTags[i]).text(),
            url:"https://www.espncricinfo.com"+$(batsmanAnchorTags[i]).attr("href"),
            DateofBirth:"",
            RunScored:runarr[i],
            BallsFaced:balls[i],
            Fours:fours[i],
            Sixes:sixes[i],
            Strike_RATE:strikrate[i]
        });
    }
    for (let j in batsmanProfile) {
            request(batsmanProfile[j].url,fetchDOB.bind(this,j));

        }


        
    }
    let count=0;
    function fetchDOB(index,err,res,html){
        count++;
        //console.log(index);
        const $=cheerio.load(html);
        const playerDOB=$($(".player-card-description.gray-900")[1]).text();
        //console.log(playerDOB);
        batsmanProfile[index]["DateofBirth"]=playerDOB.split(',')[0].split(' ')[1]+" "+playerDOB.split(',')[0].split(' ')[0]+playerDOB.split(',')[1];
        if(count==batsmanProfile.length){//now we know that all the requests have been completed
            console.log(batsmanProfile);
        }
    }

    
    
