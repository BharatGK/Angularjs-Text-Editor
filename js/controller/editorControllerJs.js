
editorApp.controller('editorController',['$scope','$rootScope','$modal','$sce',function($scope,$rootScope,$modal,$sce) {
    $rootScope.data = {
        text: "<h4 style='text-align:center;'>Hello folks</h4> &nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te sit amet, consecsit s d",
        text2:"Link"
    }
    
    $scope.disabled = false;
    $scope.menu = [
        ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
        ['format-block'],
        ['font'],
        ['font-size'],
        ['btn-color','back-color','font-color', 'hilite-color'],
        ['remove-format'],
        ['ordered-list', 'unordered-list', 'outdent', 'indent'],
        ['left-justify', 'center-justify', 'right-justify'],
        ['code', 'quote', 'paragraph'],
        ['link', 'image'],
        ['css-class']
    ];

    $scope.setDisabled = function() {
        $scope.disabled = !$scope.disabled;
    }
    
    //To Count character remaning
   $scope.characterLimit
   $scope.maxlength=100
   
   $scope.remaningCharacterCount=function(){
        if($scope.textareaCount!=undefined)
        if($scope.textareaCount.length>=0){
        $scope.characterLimit=$scope.maxlength-$scope.textareaCount.length;
            if( $scope.characterLimit < 0){
                 $scope.characterLimit = 0;
                 toastr.success('You have been reached max limit');
            }
        if($scope.textareaCount.length>=$scope.maxlength)
          $scope.textareaCount = $scope.textareaCount.substring(0,$scope.maxlength)
          $scope.totalEnteredCharacter = $scope.textareaCount.length;
       }
   }
   
   
   

    //render textarea
    $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  
    function expand() {
    	$scope.autoExpand('TextArea');
    }
    
    $scope.saveEditorText=function(){
        //get text by id
        $rootScope.getEditorText=angular.element(editorText).html();
        $scope.showEditorData = $sce.trustAsHtml($rootScope.getEditorText); /*+ '<script>for(vari=0;i<document.getElementsByClassName("btn btn-info btn-sm mindbowser-textarea").length;i++){document.getElementsByClassName("btn btn-info btn-sm mindbowser-textarea")[i].setAttribute("contenteditable","false")}</script>';*/
       
        
        $scope.showEditorPreview('md');
    }
    $scope.items=['item1','item2'];
    //Preview of text editor
    $scope.showEditorPreview= function(size) {
					var modalInstance = $modal.open({
						templateUrl : 'template/editorPreviewTemplate.html',
						controller : 'editorPreviewController',
						size : size,
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});

					modalInstance.result.then(function(selectedItem) {
						$scope.selected = selectedItem;
					}, function() {
						// $rootScope.modalClose();//call after closing model box
						// $scope.redirectToPage();
						
					});
				};
    
    
}]);

editorApp.controller('editorPreviewController', function($scope, $rootScope,
		$modalStack, $modalInstance) {

	$rootScope.save = function() {
		if ($modalInstance) {
			$modalInstance.dismiss('save');
		}
	};// save();
    
	$rootScope.cancel = function() {
		if ($modalInstance) {
			$modalInstance.dismiss('cancel');
		}
	};// cancel();
});