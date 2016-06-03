angular.module('MainApp',['ui.bootstrap'])
	.controller('mainController',mainController);

function mainController($scope, $http, $uibModal, $log) {
	$scope.newOficio = {};
	$scope.oficios = {};
	$scope.selected = false;
	$scope.memo_actual = null;
	$scope.memoActualInc = null;
	$scope.fechaMin = new Date(new Date().getFullYear(), 0, 1);
	$scope.fechaMax = new Date(new Date().getFullYear(), 12, 0);
	$scope.fechaActual = new Date();
	$scope.meses = {}

	// Funcion para actualizar numero de memo
	function actualizaMemo(data) {
		if(Math.max.apply(Math,data.map(function(o){return o.numero_memo;}))>0){
			$scope.memo_actual= Math.max.apply(Math,data.map(function(o){return o.numero_memo;})) +1;
		}
		else{
			$scope.memo_actual = 0;
		}
	};

	// Obtenemos todos los datos de la base de datos
	$http.get('/api/oficio').success(function(data) {
		$scope.oficios = data;
		actualizaMemo(data);
		$scope.memoActualInc = $scope.memo_actual;
		$scope.newOficio.numero_memo = $scope.memoActualInc;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});


	// Función para registrar un oficio
	$scope.registrarOficio = function() {
		$http.post('/api/oficio', $scope.newOficio)
		.success(function(data) {
				$scope.memoActualInc += 1;
				$scope.newOficio = {}; // Borramos los datos del formulario
				$scope.newOficio.numero_memo=$scope.memoActualInc;
				$scope.oficios = data;
				actualizaMemo(data);
				$scope.fechaOficio = "";
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una Oficio
	$scope.modificarOficio = function(newOficio) {
		$http.put('/api/oficio/' + $scope.newOficio._id, $scope.newOficio)
		.success(function(data) {
				$scope.newOficio = {}; // Borramos los datos del formulario
				$scope.newOficio.numero_memo=$scope.memoActualInc;
				$scope.oficios = data;
				actualizaMemo(data);
				$scope.selected = false;
				$scope.fechaOficio = "";
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto Oficio conocido su id
	$scope.borrarOficio = function(newOficio) {
		$http.delete('/api/oficio/' + $scope.newOficio._id)
		.success(function(data) {
			$scope.newOficio = {};
			$scope.newOficio.numero_memo=$scope.memoActualInc;
			$scope.oficios = data;
			actualizaMemo(data);
			$scope.selected = false;
			$scope.fechaOficio = "";
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectOficio = function(oficio) {
		$scope.newOficio = oficio;
		$scope.selected = true;
		console.log($scope.newOficio, $scope.selected);
		//debugger
	};

	$scope.limpiarForm = function(){
		$scope.newOficio={};
		$scope.newOficio.numero_memo=$scope.memoActualInc;
		$scope.fechaOficio = "";
		$scope.selected = false;
	};

	$scope.estableceMemoInicial = function () {
		var val = prompt("Indica Numero de Memo Actual", "0");
		if(val!=null){
			val = parseInt(val);
			$scope.memoActualInc = val;
			console.log("nuevo memo",val);
		}
	};

	function setMemo(val){
		debugger;
		$scope.newOficio.numero_memo = val;
		$scope.memo_actual = val;
		console.log("nuevo memo",val);
	}

	$scope.$watch('fechaOficio', function(newValue){
		if(newValue != undefined){
			if(newValue != ""){
				$scope.newOficio.fecha = newValue.toISOString();
				console.log("hoo",newValue);
			}
		}
	});

	$scope.$watch('newOficio.fecha', function (newValue) {
		if(newValue != undefined){
			if (Object.keys(newValue).length != 0){
				var date = new Date(newValue);
				$scope.fechaOficio = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
				console.log("gooo",newValue);
			}
		}
	});

	$scope.open = function () {
		$uibModal.open({
			templateUrl: 'myModalContent.html',
			backdrop: true,
			windowClass: 'modal',
			controller: function ($scope, $uibModalInstance, $log, memoActualInc) {
				$scope.memoActualInc=memoActualInc;
				$scope.submit = function () {
					if($scope.memoActualInc){
						//debugger
						setMemo($scope.memoActualInc);
						$log.log('Presentando numero de memo.');
						$log.log($scope.memoActualInc);
						$uibModalInstance.dismiss('cancel');
					}
				};
				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
			resolve: {
				memoActualInc: function () {
					return $scope.memoActualInc;
				}
			}
		});
	};

}