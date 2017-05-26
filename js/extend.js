String.prototype.indexOfNoCase = function (substring) {

	if((substring==null)||(substring==undefined)||(!substring))
		return -1;

    return this.toLowerCase().indexOf(substring.toLowerCase());
};

String.prototype.toStrings = function () {
	return this.split("\n");
};