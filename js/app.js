var rapidApp = angular.module('ng-rapidapp', ['ui.bootstrap', 'ui.bootstrap.modal', 'ngSanitize', 'ngAnimate']).provider({

});

var ModalInstanceCtrl = function ($scope, $uibModalInstance, formvarsParam) {

    $scope.ModalResultModal = {};

	$scope.cancel = function () {
        $scope.ModalResultModal.ResultType = 0;
        $scope.ModalResultModal.String1 = $scope.string1;

		$uibModalInstance.close($scope.ModalResultModal);
	};

    $scope.ok = function () {
        $scope.ModalResultModal = 1;
        $uibModalInstance.close()
    };
};



rapidApp.controller("MainController", function ($scope, $http, $uibModal, $sce) {

    $scope.editorText1 = "";
    $scope.editorText2 = "";
    $scope.text = "hello"; 


    $scope.RetrieveWebPage = function ($url) {
    
    };

    $scope.DeleteStringAndAfter = function ($editorIndex1, $editorIndex2) {
        var txt1=null;

        if($editorIndex1 == 1)
        {
            txt1 = $scope.editorText1;
        }
        else
        {
            txt1 = $scope.editorText2;
        }

        txt1 = $scope.TrimStringsRight_String(txt1, "blah");

        if($editorIndex2 == 1)
        {
            $scope.editorText1 = txt1;
        }
        else 
        {
            $scope.editorText2 = txt1;
        }
    };




	$scope.showRoomRateDetailsModal = function ($formvars) {


		var modalInstance = $uibModal.open({
			templateUrl: $sce.trustAsResourceUrl('./static/singleStringTemplate.html'),
			controller: ModalInstanceCtrl,
			resolve: {
                formvarsParam: function () {
					return $formvars;//roomrate;//$scope.roomrateModal;
				}
				/*PropertyDetail: function () {
					return PropertyDetail;
				}
				,
				roomrateParam: function () {
					return roomrate;//roomrate;//$scope.roomrateModal;
				}
				,
				rateplanParam: function () {
					return rateplan; //rateplan;//$scope.rateplanModal;
				}
				,
				AvailabilityRequestDataParam: function () {
					return AvailabilityRequestData; //rateplan;//$scope.rateplanModal;
				}
				,
				TranslatedText: function () {
					return TranslatedTextArray; //rateplan;//$scope.rateplanModal;
                }*/
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