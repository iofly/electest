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
    }

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




        $scope.TrimStringsRight_String = function ($s, $substring) {
            $s = $s || "";
            var strings = $s.toStrings();
            strings = $scope.TrimStringsRight_Array(strings, $substring);
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
        }


});