function TrimStringsRight_String(s, substring)
{
	s = s || "";
	var strings = s.toStrings();
	alert(JSON.stringify("1 " + strings));


	return TrimStringsRight_Array(strings, substring)
}

function TrimStringsRight_Array(strings, substring)
{
	alert(JSON.stringify("2 " + strings));
	strings = strings || [];
	var n=0;
	for(n=0;n<strings.length;n++)
	{
		var i = strings[n].indexOfNoCase(substring);
		if(i >= 0)
		{
			strings[n] = strings[n].substring(0, i);
		}
	}
	
	return strings;
}







