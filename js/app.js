var rapidApp = angular.module('ng-rapidapp', ['ui.bootstrap', 'ui.bootstrap.modal', 'ngSanitize', 'ngAnimate']).provider({

});


function ModalInstanceController($scope, $uibModalInstance, formvars) {

        $scope.formvars = formvars;

        $scope.save = function() {
            console.log("saving: frmvars = " + JSON.stringify($scope.formvars));
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function() {
            console.log("Cancel");
            $uibModalInstance.dismiss('cancel');
        };
}



rapidApp.controller("MainController", function ($scope, $http, $uibModal, $sce) {

    $scope.editorText1 = "";
    $scope.editorText2 = "";

    $scope.RetrieveWebPage = function ($url) {
    
    };

    $scope.DeleteStringAndAfter = function ($editorIndex1, $editorIndex2) {
        var txt1=null;

        if($editorIndex1 == 1){
            txt1 = $scope.editorText1;
        }
        else {
            txt1 = $scope.editorText2;
        }

        txt1 = $scope.TrimStringsRight_String(txt1, "blah");

        if($editorIndex2 == 1){
            $scope.editorText1 = txt1;
        }
        else 
        {
            $scope.editorText2 = txt1;
        }
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

        var txt1=null;
        if($editorIndex1 == 1) txt1 = $scope.editorText1;
        else txt1 = $scope.editorText2;

        txt1 = $scope.TrimStrings_String(txt1);

        if($editorIndex2 == 1) $scope.editorText1 = txt1;
        else $scope.editorText2 = txt1;
    };

    $scope.sortLines = function ($sortOrder, $editorIndex1, $editorIndex2) {
        $sortOrder = $sortOrder || 1;
        var txt1=null;
        if($editorIndex1 == 1) txt1 = $scope.editorText1;
        else txt1 = $scope.editorText2;

        txt1 = $scope.SortStrings_String(txt1, $sortOrder);

        if($editorIndex2 == 1) $scope.editorText1 = txt1;
        else $scope.editorText2 = txt1;
    };

    $scope.uniquizeLines = function ($editorIndex1, $editorIndex2) {
        var txt1=null;
        if($editorIndex1 == 1) txt1 = $scope.editorText1;
        else txt1 = $scope.editorText2;

        txt1 = $scope.UniquizeStrings_String(txt1);

        if($editorIndex2 == 1) $scope.editorText1 = txt1;
        else $scope.editorText2 = txt1;

    };

    $scope.extractLines = function ($editorIndex1, $editorIndex2) {

    };

    $scope.stripHTML = function ($editorIndex1, $editorIndex2) {
        var txt1=null;
        if($editorIndex1 == 1) txt1 = $scope.editorText1;
        else txt1 = $scope.editorText2;

        txt1 = $scope.StripHTML(txt1);
        console.log("stripHTML : " + txt1);
        if($editorIndex2 == 1) $scope.editorText1 = txt1;
        else $scope.editorText2 = txt1;
    };

    $scope.htmlEncode = function ($editorIndex1, $editorIndex2) {
        var txt1=null;
        if($editorIndex1 == 1) txt1 = $scope.editorText1;
        else txt1 = $scope.editorText2;

        var elm = document.createElement("div");
        elm.innerText = elm.textContent = txt1;
        txt1 = elm.innerHTML;
        delete elm;
        if($editorIndex2 == 1) $scope.editorText1 = txt1;
        else $scope.editorText2 = txt1;
    };

    $scope.htmlDecode = function ($editorIndex1, $editorIndex2) {

    };

    $scope.urlEncode = function ($editorIndex1, $editorIndex2) {

    };

    $scope.urlDecode = function ($editorIndex1, $editorIndex2) {

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

        


});