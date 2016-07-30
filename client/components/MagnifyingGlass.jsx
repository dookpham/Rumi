import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';
import urgency from '../urgency.service';


// let groupStyle = {
//   position: 'relative',
//   margin: 'auto',
//   width: '300px',
//   left: '110px',
//   top: '20px'
// };

// let handleStyle = {
//   backgroundColor: '#FA0',
//   width: '8px',
//   height: '20px',
//   position: 'relative',
//   transform: 'rotate(-45deg)',
//   left: '70px',
//   top: '70px',
// };

// let outerRingStyle = {
//   backgroundColor: '#FA0',
//   width: '80px',
//   height: '80px',
//   borderRadius: '40px',
//   position: 'absolute',
//   left: '0px',
//   top: '0px'
// };



// let innerRingStyle = {
//   backgroundColor: '#FFF',
//   width: '72px',
//   height: '72px',
//   borderRadius: '36px',
//   position: 'absolute',
//   left: '4px',
//   top: '4px'

// };


class MagnifyingGlass extends React.Component {
  constructor(props) {
    super(props);
  } 

  clickHandler() {
    console.log('clicked');
  }
  
  render() {
    return (
    <div className="magnifyingGlass" onClick={this.clickHandler}>
      <div className="magOuterRing"/>
      <div className="magInnerRing"/>
      <div className="magHandle"/>
    </div>);
  } 
}


// function makeCircle(parent, className, diameter, color, position, left, top){
//       var circle = makeDiv(parent, className);
      
//       circle.style.backgroundColor = color;
//       circle.style.width = diameter + "px";
//       circle.style.height = diameter + "px";
//       circle.style.borderRadius = diameter/2 + "px";
//       circle.style.position = "absolute";
//       circle.style.left = left;
//       circle.style.top = top;
//       return circle;
//     }

// //80 x 80
// function makeInteractiveMagnifyingGlass(parent, width, height){
//       var group = makeDiv(parent, "magnifying-group");
//       var state = "normal";
//       var fullWidth = 300;
//       var fullHeight = 130;
//       group.style.width = fullWidth + "px";
//       //group.style.height = fullHeight + "px";
//       //group.style.display = "inline-block";
//       group.style.left = "110px";
//       group.style.top = "20px";
//       group.style.position = "relative";
//       var outerRing = makeCircle(group, "outer-ring", width, "#FA0", "absolute", "0px", "0px"); 
//       var innerRing = makeCircle(group, "inner-ring", width-8, "#034", "absolute", "4px", "4px");
//       var handle = makeDiv(group, "handle");
//       handle.style.backgroundColor = "#FA0";
//       handle.style.width = "8px";
//       handle.style.height = "20px";
//       handle.style.position = "relative";
//       handle.style.transform = "rotate(-45deg)";
//       handle.style.left = "-75px";
//       handle.style.top = "70px";
      
//       var inputsCreated = false;
      
//       group.close = function(){
//         if (state == "stretched"){
//           state = "normal";
//           console.log("close mag glass");
//           $(".outer-ring").animate({
//             width: '-=200px',
//             left: '+=100px'
//           });
//           $(".inner-ring").animate({
//             width: '-=200px',
//             left: '+=100px'
//           });
//           $(".handle").animate({
//             height: '20px'
//           });
//           $(".closeDiv").hide();
//           $(".inputDiv").hide();
//         }
//       }
      
//       var input;
      
//       group.stretch = function(){
//         if (state == "normal"){
//           state = "stretched";
//           console.log("stretch mag glass");
//           $(".outer-ring").animate({
//             width: '+=200px',
//             left: '-=100px'
//           });
//           $(".inner-ring").animate({
//             width: '+=200px',
//             left: '-=100px'
//           });
//           $(".handle").animate({
//             height: '0px'
//           });
          
//           if (inputsCreated == false){
//             var inputDiv = makeDiv(group, "inputDiv");
//             group.appendChild(inputDiv);
//             input = document.createElement("input");
//             input.type = "text";
//             input.className = "glassInput";
//             input.style.position = "absolute";
//             input.style.zIndex = 1;
//             input.style.textAlign = "center";
//             input.style.width = "180px";
//             input.style.height = "40px";
//             input.style.top = "18px";
//             input.style.left = "-60px";
//             input.style.fontSize = "20px";
//             input.style.color = "#FFF";
//             input.style.border = "none";
//             input.style.outline = 0;
//             input.style.backgroundColor = "transparent";
//             //group.appendChild(input);
//             inputDiv.appendChild(input);

//             input.focus();
            
//             input.onkeypress = function(event){
//               //console.log("press key " + event.keyCode);
//               //if (event.keyCode == 13) {
//                 //console.log("pressed Enter ok:" + input.value);
//                 if (input.value == "" || input.value == undefined){
                  
//                 } else {
//                   //console.log("submit it");
//                   //searchWiki(input.value);
//                   if (call) {
//                     clearTimeout(call);
//                   }
                  
//                   call = setTimeout(function(){
//                     search(input.value).done(function(data) {
//                       showResults(data.query.search);
//                     });
//                   }, timeout);
                  
                  
//                 }
//               //}
//             };

//             var closeDiv = makeDiv(group, "closeDiv");
//             closeDiv.style.width = "30px";
//             closeDiv.style.height = "30px";

//             var closeBtn = makeTextNode(closeDiv, "X", "closeBtn")
//             closeBtn.style.position = "absolute";
//             closeBtn.style.zIndex = 1;
//             closeBtn.style.top = "25px";
//             closeBtn.style.left = "130px";
//             closeBtn.style.color = "#FFF";
//             closeBtn.style.fontSize = "25px";
//             closeBtn.style.width = "0px";

//             $(".closeBtn").animate({
//               width: '=20px'
//             });

//             $(".closeDiv").click(function(){
//               console.log("clicked closeBtn");
//               group.close();
//             });
            
//             inputsCreated = true;
//           } else {
//             $(".inputDiv").show();
//             //$(".input").focus();
//             $(".closeDiv").show();
//             input.focus();
//           }
//         }
//       }
      
//       console.log("makeMagnifyingGlass");
//       return group;
//     }

// MagnifyingGlass.propTypes = {
//   overdueTasks: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     dueBy: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

// const mapStateToProps = function(state) {
//   return {
//     overdueTasks: urgency(state.tasks, 'overdue')
//   };
// };

// MagnifyingGlass = connect(
//   mapStateToProps
// )(MagnifyingGlass);

export default MagnifyingGlass;