const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const writeXlsxFile = require('write-excel-file/node');
let allscorecardsURL=[];
const tournament_url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(tournament_url,requestCallback);

function requestCallback(err,res,html){
    const $=cheerio.load(html);
    const scorecards=$("[data-hover=Scorecard]");
    for(let i=0;i<scorecards.length;i++){
        allscorecardsURL.push("https://www.espncricinfo.com"+$(scorecards[i]).attr("href"));
        //console.log(allscorecardsURL[i]);
    }
    //request(allscorecardsURL[0]);
    for(let j in allscorecardsURL){
        let match=allscorecardsURL[j].split('/')[5];
        let matchIdstartindex=match.lastIndexOf('-');
        let matchId=match.slice(matchIdstartindex+1);
        
        request(allscorecardsURL[j],fetchDataTables.bind(this,matchId,j));
       // request(allscorecardsURL[j],fetchDataTables2.bind(this,matchId,j));
         //request(allscorecardsURL[j],fetchDataTables3.bind(this,matchId,j));
         //request(allscorecardsURL[j],fetchDataTables4.bind(this,matchId,j));
    }
}
async function fetchDataTables(matchId,index,err,res,html){

    const $=cheerio.load(html);
    const schema = [
        // Column #1
        {
          column: 'Batsman Name',
          type: String,
          value: student => student.name
        },
        // Column #2
        {
          column: 'Dismissal By',
          type: String,
          value: student => student.dismissal
        },
        // Column #3
        {
          column: 'Runs',
          type: String,
          value: student => student.run
        },
        // Column #4
        {
          column: 'Balls',
          type: String,
          value: student => student.ball
        },
        {
            column: 'Fours',
            type: String,
            value: student => student.four
          },
          {
            column: 'Sixes',
            type: String,
            value: student => student.six
          },
          {
            column: 'Strike Rate',
            type: String,
            value: student => student.sr
          }
      ]
    
    let batsmanTable1=$(".table.batsman")[0];
    let allrows=$(batsmanTable1).find("tr");
    let objects=[];
    for(let i=0;i<allrows.length;i++){
         let eachcol=$(allrows[i]).find("td");
         if(eachcol.length==8){
             let topush=
                {
                    name: $(eachcol[0]).text(),
                    dismissal: $(eachcol[1]).text(),
                    run: $(eachcol[2]).text(),
                    ball: $(eachcol[3]).text(),
                    four: $(eachcol[5]).text(),
                    six: $(eachcol[6]).text(),
                    sr: $(eachcol[7]).text()
                };
                objects.push(topush);             
             
         }
         
         if(eachcol.length==4){
          objects.push({});
           let topush={
            name:$(eachcol[0]).text(),
            dismissal:$(eachcol[1]).text(),
            four: $(eachcol[2]).text()
           };
           objects.push(topush);
         }
        }
    
        let batsmanTable2=$(".table.batsman")[1];
        let allrows2=$(batsmanTable2).find("tr");
        let objects2=[];
        for(let i=0;i<allrows2.length;i++){
             let eachcol2=$(allrows2[i]).find("td");
             if(eachcol2.length==8){
                 let topush2=
                    {
                        name: $(eachcol2[0]).text(),
                        dismissal: $(eachcol2[1]).text(),
                        run: $(eachcol2[2]).text(),
                        ball: $(eachcol2[3]).text(),
                        four: $(eachcol2[5]).text(),
                        six: $(eachcol2[6]).text(),
                        sr: $(eachcol2[7]).text()
                    };
                    objects2.push(topush2);
                 
             }
             if(eachcol2.length==4){
              objects2.push({});
               let topush2={
                name:$(eachcol2[0]).text(),
                dismissal:$(eachcol2[1]).text(),
                four: $(eachcol2[2]).text()
               };
               objects2.push(topush2);
             }
            }
    
    const schema2 = [
        // Column #1
        {
          column: 'Bowler Name',
          type: String,
          value: student => student.name
        },
        // Column #2
        {
          column: 'Overs',
          type: String,
          value: student => student.over
        },
        // Column #3
        {
          column: 'Maidens',
          type: String,
          value: student => student.maiden
        },
        // Column #4
        {
          column: 'Runs',
          type: String,
          value: student => student.run
        },
        {
            column: 'Wickets',
            type: String,
            value: student => student.wicket
          },
          {
            column: 'Economy',
            type: String,
            value: student => student.eco
          },
          {
            column: "0's",
            type: String,
            value: student => student.zero
          },
          {
            column: "4's",
            type: String,
            value: student => student.four
          },
          {
            column: "6's",
            type: String,
            value: student => student.six
          },
          {
            column: "Wide",
            type: String,
            value: student => student.wide
          },
          {
            column: "No balls",
            type: String,
            value: student => student.nb
          }
      ]

    let bowlerTable1=$(".table.bowler")[0];
    let allrows3=$(bowlerTable1).find("tr");
    let objects3=[];
    for(let i=0;i<allrows3.length;i++){
         let eachcol=$(allrows3[i]).find("td");
         if(eachcol.length==11){
             let topush=
                {
                    name: $(eachcol[0]).text(),
                    over: $(eachcol[1]).text(),
                    maiden: $(eachcol[2]).text(),
                    run: $(eachcol[3]).text(),
                    wicket: $(eachcol[4]).text(),
                    eco: $(eachcol[5]).text(),
                    zero: $(eachcol[6]).text(),
                    four: $(eachcol[7]).text(),
                    six: $(eachcol[8]).text(),
                    wide: $(eachcol[9]).text(),
                    nb: $(eachcol[10]).text(),
                };
                objects3.push(topush);
         }
        }

        let bowlerTable2=$(".table.bowler")[1];
    let allrows4=$(bowlerTable2).find("tr");
    let objects4=[];
    for(let i=0;i<allrows4.length;i++){
         let eachcol=$(allrows4[i]).find("td");
         if(eachcol.length==11){
             let topush=
                {
                    name: $(eachcol[0]).text(),
                    over: $(eachcol[1]).text(),
                    maiden: $(eachcol[2]).text(),
                    run: $(eachcol[3]).text(),
                    wicket: $(eachcol[4]).text(),
                    eco: $(eachcol[5]).text(),
                    zero: $(eachcol[6]).text(),
                    four: $(eachcol[7]).text(),
                    six: $(eachcol[8]).text(),
                    wide: $(eachcol[9]).text(),
                    nb: $(eachcol[10]).text(),
                };
                objects4.push(topush);
         }
        }
        let filename="match-"+matchId+".xlsx";
        let filepath="IPL_projectexcelfiles/"+filename;
        
        await writeXlsxFile([objects,objects2,objects3,objects4], {
            schema: [schema,schema,schema2,schema2],
            sheets: ['Batsman-1','Batsman-2','Bowler-1','Bowler-2'],
            filePath: filepath
          })

            

}

//my old tarreka....making 240 seperate files

// async function fetchDataTables(matchId,index,err,res,html){

//     const $=cheerio.load(html);
    
//     let data=[
//         [{     //row 1
//             value: 'Batsman Name',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Dismissal by',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Runs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Balls',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Fours',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Sixes',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Strike rate',
//             fontWeight: 'bold'
//         }]
//     ]
//     let batsmanTable1=$(".table.batsman")[0];
//     let allrows=$(batsmanTable1).find("tr");
    
//     for(let i=0;i<allrows.length;i++){
//          let eachcol=$(allrows[i]).find("td");
//          if(eachcol.length==8){
//              let topush=[
//                 {
//                     type: String,
//                     value: $(eachcol[0]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[1]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[2]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[3]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[5]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[6]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[7]).text()
//                 },
//              ]
             
//              data.push(topush);
             
//          }
//         }
//         let filename=matchId+"-1stInnings-Batsman.xlsx";
//              await writeXlsxFile(data, {
//                 filePath: filename
//               })

            

// }

// async function fetchDataTables2(matchId,index,err,res,html){
    
//     const $=cheerio.load(html);
    
//     let data=[
//         [{     //row 1
//             value: 'Batsman Name',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Dismissal by',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Runs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Balls',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Fours',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Sixes',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Strike rate',
//             fontWeight: 'bold'
//         }]
//     ]
//     let batsmanTable1=$(".table.batsman")[1];
//     let allrows=$(batsmanTable1).find("tr");
    
//     for(let i=0;i<allrows.length;i++){
//          let eachcol=$(allrows[i]).find("td");
//          if(eachcol.length==8){
//              let topush=[
//                 {
//                     type: String,
//                     value: $(eachcol[0]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[1]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[2]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[3]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[5]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[6]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[7]).text()
//                 },
//              ]
             
//              data.push(topush);
             
//          }
//         }
//         let filename=matchId+"-2ndInnings-Batsman.xlsx";
//              await writeXlsxFile(data, {
//                 filePath: filename
//               })

// }

// async function fetchDataTables3(matchId,index,err,res,html){
    
//     const $=cheerio.load(html);
    
//     let data=[
//         [{     //row 1
//             value: 'Bowler Name',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Overs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Maiden',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Runs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Wickets',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Economy',
//             fontWeight: 'bold'
//         },
//         {
//             value: "0's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "4's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "6's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "Wide",
//             fontWeight: 'bold'
//         },
//         {
//             value: "No-balls",
//             fontWeight: 'bold'
//         }
//     ]
//     ]
//     let bowlerTable=$(".table.bowler")[0];
//     let allrows=$(bowlerTable).find("tr");
    
//     for(let i=0;i<allrows.length;i++){
//          let eachcol=$(allrows[i]).find("td");
//          if(eachcol.length==11){
//              let topush=[
//                 {
//                     type: String,
//                     value: $(eachcol[0]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[1]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[2]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[3]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[4]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[5]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[6]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[7]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[8]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[9]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[10]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[11]).text()
//                 }
//              ]
             
//              data.push(topush);
             
//          }
//         }
//         let filename=matchId+"-1stInnings-Bowler.xlsx";
//              await writeXlsxFile(data, {
//                 filePath: filename
//               })

// }
// async function fetchDataTables4(matchId,index,err,res,html){
    
//     const $=cheerio.load(html);
    
//     let data=[
//         [{     //row 1
//             value: 'Bowler Name',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Overs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Maiden',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Runs',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Wickets',
//             fontWeight: 'bold'
//         },
//         {
//             value: 'Economy',
//             fontWeight: 'bold'
//         },
//         {
//             value: "0's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "4's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "6's",
//             fontWeight: 'bold'
//         },
//         {
//             value: "Wide",
//             fontWeight: 'bold'
//         },
//         {
//             value: "No-balls",
//             fontWeight: 'bold'
//         }
//     ]
//     ]
//     let bowlerTable=$(".table.bowler")[1];
//     let allrows=$(bowlerTable).find("tr");
    
//     for(let i=0;i<allrows.length;i++){
//          let eachcol=$(allrows[i]).find("td");
//          if(eachcol.length==11){
//              let topush=[
//                 {
//                     type: String,
//                     value: $(eachcol[0]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[1]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[2]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[3]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[4]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[5]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[6]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[7]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[8]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[9]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[10]).text()
//                 },
//                 {
//                     type: String,
//                     value: $(eachcol[11]).text()
//                 }
//              ]
             
//              data.push(topush);
             
//          }
//         }
//         let filename=matchId+"-2ndInnings-Bowler.xlsx";
//              await writeXlsxFile(data, {
//                 filePath: filename
//               })

// }  