var app = angular.module("myAppExport", []);

app.controller("ExportCtrl", function($scope) {
    $scope.listExportInvoice = localStorage.getItem('listExportInvoice') ? JSON.parse(localStorage.getItem('listExportInvoice')) : {}
    $scope.listDetailInvoice = $scope.listExportInvoice.listitem.map(function(value,index){
        value.stt = index+1
        return value
    })
  });