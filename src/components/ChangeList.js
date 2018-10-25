import React from 'react'
import Change from "./Change";
import Card from '@material-ui/core/Card';
import TotalChange from "./TotalChange";

const jsonData = require('./data.json');
console.log(jsonData);

export default function ChangeList(props){
    // const changeElements = Object.values(jsonData).map(change =>
    //     <li><Change change = {jsonData.blockT} year = "2018" parameter = "capex"/></li>
    // )
    return (
        <a className="Change-list">
            {console.log(props.selectedData)}
            <Card className = "Change"><Change change = {jsonData[props.selectedData.block]} year = {props.selectedData.year} parameter = "opex" /></Card>
            <Card className = "Change"><Change change = {jsonData[props.selectedData.block]} year = {props.selectedData.year} parameter = "capex"/></Card>
            <Card className = "Change"><Change change = {jsonData[props.selectedData.block]} year = {props.selectedData.year} parameter = "cir"/></Card>
            {/*{changeElements}*/}
        </a>
    )
}