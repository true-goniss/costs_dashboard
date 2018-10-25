import React from 'react'
import {render} from 'react-dom'
import CardContent from '@material-ui/core/CardContent';
import amcharts from 'amcharts3';


var AmCharts = require("@amcharts/amcharts3-react");



export default function TotalChange(props){
    var year = "year_" + props.year;

    var previousYearNumber = (parseInt(props.year) - 1);
    var previousYear = "year_" + previousYearNumber;
    var totalCosts = 0.0;

    Object.values(props.change[year]).map(
        (type) => {
            if (type.hasOwnProperty('costs')) {
                totalCosts += Number(type.costs)
            }
        }
    )

    totalCosts = Math.round(totalCosts * 1000) / 1000;

    var totalCostsPrevYear = 0.0;

    try {
        Object.values(props.change[previousYear]).map(
            (type) => {
                if (type.hasOwnProperty('costs')) {
                    totalCostsPrevYear += Number(type.costs)
                }
            }
        )
    }
    catch(err){ totalCostsPrevYear = 0.0;}

    var positiveChange = (totalCosts > totalCostsPrevYear)? true : false;

    var changeSymbol = positiveChange ? "+" : "-";

    var minCosts = (totalCosts < totalCostsPrevYear)? totalCosts : totalCostsPrevYear;
    var maxCosts = (totalCosts > totalCostsPrevYear)? totalCosts : totalCostsPrevYear;

    var changePercentage = (1.0 - (minCosts/maxCosts)) * 100;
    changePercentage = Math.round(changePercentage * 100) / 100;

    var changeString = "   " + changeSymbol + changePercentage + "% в " + props.year;
    // + " (по сравнению с " + previousYearNumber + ")");
    var trendingImageClass = (positiveChange)? "Trending-up-image" : "Trending-down-image";

    const Title = "Расходы блока " + props.block.slice(-1) + ":";
    const body = <section>{totalCosts + " млн. ₽"}</section>
    const change = (totalCostsPrevYear == 0)? <section></section> : <section>{changeString}</section>

    // var chart = AmCharts.makeChart("chartdiv",
    //
    // )

    var chart = AmCharts.makeChart( "chartdiv", {
  "type": "pie",
  "theme": "none",
  "dataProvider": [ {
    "cost": "OPEX",
    "rubles": props.change[year].opex.costs
  }, {
    "cost": "CAPEX",
    "rubles": props.change[year].capex.costs
  }, {
    "cost": "CIR",
    "rubles": props.change[year].cir.costs
  }
     ],
  "valueField": "rubles",
  "titleField": "cost",
   "balloon":{
   "fixedPosition":true
  },
  "export": {
    "enabled": true
  }
} );

    return (
        <CardContent>
         <div className="TotalChange">
            <span>
                <h2>
                    {Title}
                    {/*<button onClick={handleClick}>close</button>*/}
                </h2>
                <h1>
                    {body}
                </h1>
                <p  className = {trendingImageClass}>
                    {change}
                </p>
                <h2>Остаток</h2>
                <h1><section>{Math.round((props.change[year].budget - totalCosts) * 1000) / 1000 + " млн. ₽"}</section></h1>
            </span>
         </div>
        </CardContent>
    )

}

