/**
 * @fileoverview binList.js defines the BinList object.  A BinList consists of:
 * 			set of bins
 * 		    ??? - data connection, etc., e.g. the population bin list with 5 bins
 */
/*jslint nomen:true, plusplus:true, todo:true,  browser:true  */
"use strict";

/**
 * @constructor; optional inputs to define the number of bins in the list.  By default high/low out-of-range will also be created
 */
binMaster.BinList = function (binParam){
// numBins, binBreaks){
	// TODO: refine to streamline creation of empty Bins and to populate (if info is provided)
	if (typeof(binParam) === "number"){ // BinList defined to be specified length
		this.bins = new Array(binParam);
		if (binParam > 0){
			for (var i = 0; i < binParam; i++){
				this.bins[i] = new binMaster.Bin;
			}
		}
	} else if (typeof(binParam) === "object"){ // BinList defined to have specified breaks
		binParam.sort(function(a, b){return a-b}); // make sure they are in ascending order

		this.bins = new Array(binParam.length - 1); // an array of breaks is one longer than number of classes 
		for (var i = 0; i < binParam.length - 1; i++){
			this.bins[i] = new binMaster.Bin;
		}
		// set bin values based on array-specified breaks
		for (var i = 0; i < binParam.length - 1; i++){
			this.bins[i].setBinMin(binParam[i]);
			this.bins[i].setBinMax(binParam[i+1]); // binBreaks should always be numBins + 1
		}
	} else { // BinList initialized without definition
		this.bins = new Array();
	}
	this.outRangeBin_high = new binMaster.Bin;
	this.outRangeBin_low = new binMaster.Bin;
	this.binMax = undefined;
	this.binMin = undefined; // to store the overall range of bin values

	if (typeof(binParam) === "object"){
		this.binMax = binParam[binParam.length-1];
		this.binMin = binParam[0];
	}

}


/**
 * Get one Bin by number
 */ 
binMaster.BinList.prototype.getBinNumber = function (binNumber){
	if (binNumber < this.bins.length){
		return this.bins[binNumber];
	} else {
		console.log("The binNumber (", binNumber, ") is not valid.  There are only", this.bins.length, "bins");
		return;
	}
}

binMaster.BinList.prototype.getOutRangeBin_high = function(){
	return this.outRangeBin_high;
}

binMaster.BinList.prototype.getOutRangeBin_low = function(){
	return this.outRangeBin_low;
}

/**
 * Identify the bin that a specified value falls into
 */ 
binMaster.BinList.prototype.getBin = function(dataVal){
	for (var i = 0; i < this.bins.length; i++){
		if(this.bins[i].binVals.min != undefined && this.bins[i].binVals.max != undefined){
			if (inRange(dataVal, this.bins[i].binVals.min, this.bins[i].binVals.max)){
				return i;
			}
		}
	}

	function inRange(dataVal, min, max){
		if (dataVal > min && dataVal <= max){
			return true;
		} 
		return false;

	}
}

binMaster.BinList.prototype.setMin = function(dataVal){
	if (dataVal != undefined){
		// figure out if a workflow to set the min manually makes sense
		// it would require checking the bin min values to make sure there isn't a weird out of range
		console.log(dataVal + " was the input...but this doesn't do anything yet")
		return;
	} else {
		var min;
		for (var i = 0; i < this.bins.length; i++){
			if(this.bins[i].binVals.min != undefined && this.bins[i].binVals.max != undefined){
				if (min === undefined) { min = this.bins[i].binVals.min;}
				else {
					if (this.bins[i].binVals.min < min){
						min = this.bins[i].binVals.min;
					}
				}
			}
		}
	}
	this.binMin = min; 
}


binMaster.BinList.prototype.setMax = function(dataVal){
	if (dataVal != undefined){
		// figure out if a workflow to set the min manually makes sense
		// it would require checking the bin min values to make sure there isn't a weird out of range
		console.log(dataVal + " was the input...but this doesn't do anything yet")
		return;
	} else {
		var max;
		for (var i = 0; i < this.bins.length; i++){
			if(this.bins[i].binVals.min != undefined && this.bins[i].binVals.max != undefined){
				if (max === undefined) { max = this.bins[i].binVals.max;}
				else {
					if (this.bins[i].binVals.max > max){
						max = this.bins[i].binVals.max;
					}
				}
			}
		}
	}
	this.binMax = max; 
}

binMaster.BinList.prototype.setMinMax = function(){
	var max, min;
	for (var i = 0; i < this.bins.length; i++){
		if(this.bins[i].binVals.min != undefined && this.bins[i].binVals.max != undefined){
			if (max === undefined) { max = this.bins[i].binVals.max;}
			if (min === undefined) { min = this.bins[i].binVals.min;}
			else {
				if (this.bins[i].binVals.max > max){
					max = this.bins[i].binVals.max;
				}
				if (this.bins[i].binVals.min < min){
					min = this.bins[i].binVals.min;
				}
			}
		}
	}
	this.binMax = max; 
	this.binMin = min;
}