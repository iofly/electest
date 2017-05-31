var rapidApp = angular.module('ng-rapidapp', ['ui.bootstrap', 'ui.bootstrap.modal', 'ngSanitize', 'ngAnimate']).provider({

});


function ModalInstanceController($scope, $uibModalInstance, formvars) {

        $scope.formvars = formvars;

        $scope.save = function() {

            var singleStringInstructionSet = ["AppendToLines", "PrependToLines", "DeleteBeforeStr", "DeleteAfterStr", 
                                                "DeleteStrAndBeforeStr", "DeleteStrAndAfterStr", "DeleteLinesThatStartWith", 
                                                "DeleteLinesThatEndWith"];

            var singleIntegerInstructionSet = ["DeleteXCharsFromEnd", "DeleteXCharsFromBeginning"];

            if(singleStringInstructionSet.indexOf(formvars.Instruction)>=0){
                formvars.scopeObj.method(formvars.EditorIndexSource, formvars.EditorIndexTarget, formvars.StringsRequired[0].Value);
            }
            else if(singleIntegerInstructionSet.indexOf(formvars.Instruction)>=0){
                formvars.scopeObj.method(formvars.EditorIndexSource, formvars.EditorIndexTarget, number);
            }
           

            $uibModalInstance.close('ok');
        };

        $scope.cancel = function() {
            console.log("Cancel");
            $uibModalInstance.dismiss('cancel');
        };

}



rapidApp.controller("MainController", function ($scope, $http, $uibModal, $sce, $window) {

    $scope.editorText1 = "";
    $scope.editorText2 = "";

    $scope.RetrieveWebPage = function ($url) {
    
    };

    $scope.DeleteStringAndAfter = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $scope.TrimStringsRight_String(txt1, "blah");
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.showGetSingleStringModal = function ($editorIndexSrc, $editorIndexTarget) {
       var formvars = {};
       formvars.Instruction = "DeleteStringAndAfter";
       formvars.DialogTitle = "Enter Required Text";
       formvars.EditorIndexSource = $editorIndexSrc;
       formvars.EditorIndexTarget = $editorIndexTarget;
       formvars.StringsRequired = [{Label: "Text to find", Value: ""}, {Label: "Replace with", Value: ""}];
       $scope.showGetVarsModal(formvars);
    };

	$scope.showGetVarsModal = function (formvars) {

        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: './static/singleStringTemplate.html',
            size: 'md',
            controller:ModalInstanceController,
                resolve: {
                    formvars: () => formvars,
                }
         });
	};

    $scope.trimStrings = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $scope.TrimStrings_String(txt1);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.sortLines = function ($sortOrder, $editorIndex1, $editorIndex2) {
        $sortOrder = $sortOrder || 1;
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $scope.SortStrings_String(txt1, $sortOrder);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.uniquizeLines = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $scope.UniquizeStrings_String(txt1);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.extractLines = function ($editorIndex1, $editorIndex2) {

    };

    $scope.stripHTML = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $scope.StripHTML(txt1);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.htmlEncode = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $('<div/>').text(text).html();
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.htmlDecode = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = $('<div/>').html(txt1).text();
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.urlEncode = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = encodeURIComponent(txt1);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.urlDecode = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);
        txt1 = decodeURIComponent(txt1);
        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.removeWhiteSpaceLines = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);

        var strings = txt1.toStrings();
        var n=0;
        for(n=0;n<strings.length;n++)
        {
            if(strings[n].trim().length==0)
                strings.splice(n,1);
        }
        txt1 = strings.join("\n");

        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };

    $scope.removeEmptyLines = function ($editorIndex1, $editorIndex2) {
        var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);

        var strings = txt1.toStrings();
        var n=0;
        for(n=0;n<strings.length;n++)
        {
            if(strings[n].length==0)
                strings.splice(n,1);
        }
        txt1 = strings.join("\n");

        $scope.SetTargetText($editorIndex1, $editorIndex2, txt1);
    };




    //Editor Get/Set methods
    $scope.GetSourceText = function($editorIndex1, $editorIndex2){
        if($editorIndex1 == 1) 
            return $scope.editorText1;
        else 
            return $scope.editorText2;
    }

    $scope.SetTargetText = function($editorIndex1, $editorIndex2, $text){
        if($editorIndex2 == 1) 
            $scope.editorText1 = $text;
        else 
            $scope.editorText2 = $text;
    }






    //Events that open a dialog

    $scope.appendToLines = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "AppendToLines";
       formvars.DialogTitle = "Append To Lines";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to append:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.appendToLines_String;
       $scope.showGetVarsModal(formvars);
    };
    
    $scope.prependToLines = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "PrependToLines";
       formvars.DialogTitle = "Prepend To Lines";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to prepend:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.prependToLines_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteXCharsFromEnd = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteXCharsFromEnd";
       formvars.DialogTitle = "Delete X Chars From End of Lines";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Char count:", Value: "1", Format: "int"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteXCharsFromEnd_String;
       $scope.showGetVarsModal(formvars);
    }

    $scope.deleteXCharsFromBeginning = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteXCharsFromBeginning";
       formvars.DialogTitle = "Delete X Chars From Beginning of Lines";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Char count:", Value: "1", Format: "int"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteXCharsFromBeginning_String;
       $scope.showGetVarsModal(formvars);
    }

    $scope.deleteBeforeStr = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteBeforeStr";
       formvars.DialogTitle = "Delete Before String";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to find:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteBeforeStr_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteAfterStr = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteAfterStr";
       formvars.DialogTitle = "Delete After String";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to find:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteAfterStr_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteStrAndBeforeStr = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteStrAndBeforeStr";
       formvars.DialogTitle = "Delete Str and Before String";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to find:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteStrAndBefore_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteStrAndAfterStr = function ($editorIndex1, $editorIndex2) {
       var formvars = {};
       formvars.Instruction = "DeleteStrAndAfterStr";
       formvars.DialogTitle = "Delete Str and After String";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text to find:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteStrAndAfter_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteLinesThatStartWith = function ($editorIndex1, $editorIndex2) {
        console.log("deleteLinesThatStartWith start...");
       var formvars = {};
       formvars.Instruction = "DeleteLinesThatStartWith";
       formvars.DialogTitle = "Delete Lines That Start With";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteLinesThatStartWith_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteLinesThatEndWith = function ($editorIndex1, $editorIndex2) {
       console.log("deleteLinesThatEndWith start...");
       var formvars = {};
       formvars.Instruction = "DeleteLinesThatEndWith";
       formvars.DialogTitle = "Delete Lines That End With";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteLinesThatEndWith_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteLinesThatContain = function ($editorIndex1, $editorIndex2) {
        console.log("deleteLinesThatContain start...");
       var formvars = {};
       formvars.Instruction = "DeleteLinesThatContain";
       formvars.DialogTitle = "Delete Lines That Contain";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteLinesThatContain_String;
       $scope.showGetVarsModal(formvars);
    };

    $scope.deleteLinesThatDontContain = function ($editorIndex1, $editorIndex2) {
        console.log("deleteLinesThatDontContain start...");
       var formvars = {};
       formvars.Instruction = "DeleteLinesThatDontContain";
       formvars.DialogTitle = "Delete Lines That Don't Contain";
       formvars.EditorIndexSource = $editorIndex1;
       formvars.EditorIndexTarget = $editorIndex2;
       formvars.StringsRequired = [{Label: "Text:", Value: "", Format: "string"}];
       formvars.scopeObj = {};
       formvars.scopeObj.method = $scope.deleteLinesThatDontContain_String;
       $scope.showGetVarsModal(formvars);
    };











        $scope.TrimStringsRight_String = function ($s, $substring) {
            $s = $s || "";
            var strings = $s.toStrings();
            strings = $scope.TrimStringsRight_Array(strings, $substring);
            var res = strings.join("\n");
            return res;
        };

        $scope.TrimStrings_String = function ($s) {
            $s = $s || "";
            var strings = $s.toStrings();
            strings = $scope.TrimStrings_Array(strings);
            var res = strings.join("\n");
            return res;
        };

        $scope.SortStrings_String = function ($s, $sortDirection) {
            $s = $s || "";
            $sortDirection = $sortDirection || 1;
            var strings = $s.toStrings();
            
            strings.sort();
            
            if($sortDirection==2)
                strings.reverse();
            
            var res = strings.join("\n");
            return res;
        };

        $scope.TrimStringsRight_Array = function ($strings, $substring) {
            $strings = $strings || [];
            var n = 0;
            for( n = 0 ; n < $strings.length ; n++ ){
                var i = $strings[n].indexOfNoCase($substring);
                if(i >= 0){
                    $strings[n] = $strings[n].substring(0, i);
                }
            }
            
            return $strings;
        };

        $scope.TrimStrings_Array = function ($strings) {
            $strings = $strings || [];
            var n = 0;
            for( n = 0 ; n < $strings.length ; n++ ){
                $strings[n] = $strings[n].trim();
            }
            
            return $strings;
        };

        $scope.UniquizeStrings_String = function ($s) {
            $s = $s || "";
            var strings = $s.toStrings();
            var n = 0;
            for( n = strings.length-1 ; n >=0  ; n-- ){
                if (strings.indexOf(strings[n])!=n)
                {
                    strings.splice(n, 1);
                }
            }
            var res = strings.join("\n");
            return res;
        };

        $scope.StripHTML = function($html){
            var div = document.createElement("div");
            div.innerHTML = $html;
            return div.textContent || div.innerText || "";
        };
        
        $scope.appendToLines_String = function ($editorIndex1, $editorIndex2, $appendText) {
           
            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();

            var n=0;
            for(n=0;n<strings.length;n++)
            {
                strings[n] = strings[n] + $appendText;
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.prependToLines_String = function ($editorIndex1, $editorIndex2, $prependText) {

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();

            var n=0;
            for(n=0;n<strings.length;n++)
            {
                strings[n] = $prependText + strings[n];
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteXCharsFromEnd_String = function ($editorIndex1, $editorIndex2, $charCount) {

            $charCount = $charCount||1;

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();

            var n=0;
            for(n=0;n<strings.length;n++)
            {
                if(strings[n].length>=$charCount)
                {
                   strings[n] = strings[n].substring(0, $charCount-1);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteXCharsFromBeginning_String = function ($editorIndex1, $editorIndex2, $charCount) {

            $charCount = $charCount||1;

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();

            var n=0;
            for(n=0;n<strings.length;n++)
            {
                if(strings[n].length>=$charCount)
                {
                   strings[n] = strings[n].substring($charCount-1, strings[n].length-1);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteBeforeStr_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;


            for(n=0;n<strings.length;n++)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                   console.log("found in " + strings[n] + " at " + index);
                   strings[n] = strings[n].substring(index, strings[n].length);
                   console.log("afterwards strings[n] = " + strings[n]);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteAfterStr_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;

            for(n=0;n<strings.length;n++)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                   strings[n] = strings[n].substring(0, index + $textToFind.length);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteStrAndBefore_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;

            for(n=0;n<strings.length;n++)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                   strings[n] = strings[n].substring($textToFind.length + index, strings[n].length);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteStrAndAfter_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;

            for(n=0;n<strings.length;n++)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                   strings[n] = strings[n].substring(0, index);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteLinesThatStartWith_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;


            for(n=strings.length-1;n>=0;n--)
            {
                index = strings[n].indexOf($textToFind);
                if(index==0)
                {
                   strings.splice(n, 1);
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteLinesThatEndWith_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";

            var txt1=null;
            if($editorIndex1 == 1) txt1 = $scope.editorText1;
            else txt1 = $scope.editorText2;

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;
            var test = "";

            for(n=strings.length-1;n>=0;n--)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                    //could be dupe, so check if at the end
                    test = strings[n].substring(strings[n].length-$textToFind.length, strings[n].length);
                    if(test==$textToFind)
                    {
                        strings.splice(n, 1);
                    }
                } 
            }

            txt1 = strings.join("\n");

            if($editorIndex2 == 1) $scope.editorText1 = txt1;
            else $scope.editorText2 = txt1;
        };

        $scope.deleteLinesThatContain_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";
            var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;
            var test = "";

            for(n=strings.length-1;n>=0;n--)
            {
                index = strings[n].indexOf($textToFind);
                if(index>=0)
                {
                    strings.splice(n, 1);
                } 
            }

            txt1 = strings.join("\n");

            $scope.GetSourceText($editorIndex1, $editorIndex2, txt1);
        };

        $scope.deleteLinesThatDontContain_String = function ($editorIndex1, $editorIndex2, $textToFind) {

            $textToFind = $textToFind||"unfindablez";
            var txt1=$scope.GetSourceText($editorIndex1, $editorIndex2);

            var strings = txt1.toStrings();
            var n=0;
            var index = -1;
            var test = "";

            for(n=strings.length-1;n>=0;n--)
            {
                index = strings[n].indexOf($textToFind);
                if(index<0)
                {
                    strings.splice(n, 1);
                } 
            }

            txt1 = strings.join("\n");

            $scope.GetSourceText($editorIndex1, $editorIndex2, txt1);
        };


});