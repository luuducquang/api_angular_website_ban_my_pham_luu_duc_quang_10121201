app.controller ('categoryOffer', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tendanhmucuudaisearch = $routeParams.tendanhmucuudaisearch;
}]);

app.controller("CategoryOfferCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[6]).addClass('active_option')
    
    $scope.ListDanhMucUuDai;

    $scope.pageSize = 10
    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        Tendanhmucuudai:$scope.tendanhmucuudaisearch
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMucUuDai = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api-admin/DanhMucUuDai/search-danhmucuudai',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            $scope.ListDanhMucUuDai = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        });
        
        
    }
    $scope.GetDanhMucUuDai();

    //-------------------------------------------------------------------------------//
    $scope.timkiem = $scope.tendanhmucuudaisearch
    $scope.search = function(){
        if($scope.timkiem===undefined){
            $scope.tendanhmucuudaisearch=''
        }
        else{
            $scope.tendanhmucuudaisearch = $scope.timkiem
            var data = {
                page: 1,
                pageSize: $scope.pageSize,
                Tendanhmucuudai: $scope.tendanhmucuudaisearch
            };
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api-admin/DanhMucUuDai/search-danhmucuudai',
            }).then(function (response) {  
                console.log(response);
                if(response.data.totalItems===0){
                    alert("Không có danh mục nào")
                    $scope.tendanhmucuudaisearch =''
                    return
                }
                else{ 
                    window.location='#!categoryOffer/1/'+$scope.tendanhmucuudaisearch
                }
            }).catch(function (error) {
                console.error('Lỗi :', error);
            });
        }
    }
    //-------------------------------------------------------------------------------//
    $scope.pageIndex = function(total){
        $('#pagination').pagination({
            dataSource: function(done){
                var result = [];
                for(var i = 1; i <= total; i++){
                    result.push(i);
                }
                done(result);
            },
            pageSize: $scope.pageSize,
            pageNumber: $scope.page,
            showGoInput: true,
            showGoButton: true,
            className: 'paginationjs-theme-blue paginationjs-big',
            afterGoButtonOnClick :function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.tendanhmucuudaisearch){
                        window.location='#!categoryOffer/'+pageNumber+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        window.location='#!categoryOffer/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.tendanhmucuudaisearch){
                        window.location='#!categoryOffer/'+pageNumber+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        window.location='#!categoryOffer/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.tendanhmucuudaisearch){
                    window.location='#!categoryOffer/'+pageNumber+'/'+$scope.tendanhmucuudaisearch
                }
                else{
                    window.location='#!categoryOffer/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.tendanhmucuudaisearch){
                    window.location='#!categoryOffer/'+pageNumber+'/'+$scope.tendanhmucuudaisearch
                }
                else{
                    window.location='#!categoryOffer/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.tendanhmucuudaisearch){
                    window.location='#!categoryOffer/'+pageNumber+'/'+$scope.tendanhmucuudaisearch
                }
                else{
                    window.location='#!categoryOffer/'+pageNumber
                }
            }
        })
    }

    $scope.checkBoxItem =[]

    $scope.toggleSelection = function(item){
        var idx = $scope.checkBoxItem.indexOf(item.Madanhmucuudai);
        if(idx >-1){
            $scope.checkBoxItem.splice(idx, 1);
        }
        else{
            $scope.checkBoxItem.push(item.madanhmucuudai);
        }
    }

    yesdel = function(){
        if($scope.checkBoxItem.length === 0){
            alert("chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.checkBoxItem,
                url: current_url + '/api-admin/DanhMucUuDai/delete-danhmucuudai',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.tendanhmucuudaisearch){
                    window.location='#!categoryOffer/'+$scope.page+'/'+$scope.tendanhmucuudaisearch
                }
                else{
                    window.location='#!categoryOffer/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        categoryName.value=''
        describe.value=''
    }

    $scope.AddCategoryOffer = function(){
        if(categoryName.value==='' || describe.value===''){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                Tendanhmucuudai: categoryName.value,
                DacBiet: status.value==="true",
                NoiDung: describe.value
            },
            url: current_url + '/api-admin/DanhMucUuDai/create-danhmucuudai',
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) { 
            alert('Thêm thành công');
            if($scope.tendanhmucuudaisearch){
                window.location='#!categoryOffer/'+$scope.page+'/'+$scope.tendanhmucuudaisearch
            }
            else{
                window.location='#!categoryOffer/'+$scope.page
            }
        })
        .catch(function (error) {
            console.error('Lỗi khi thêm :', error);
        });
    }
    
    $scope.addItem = function(){
        $scope.AddCategoryOffer(); 
    }


    $scope.Madanhmucuudai
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        categoryName.value = x.tendanhmucuudai
        status.value = x.dacBiet
        describe.value = x.noiDung
        document.querySelector('.saveAdd').style.display = 'none'
        document.querySelector('.saveEdit').style.display = 'block'
        $scope.Madanhmucuudai = x.madanhmucuudai
    }

    $scope.editItem=function(){
        if(categoryName.value==='' || status.value===''|| describe.value===''){
            alert('không được bỏ trống')
            return
        }
        else{
            if(confirm("Bạn có muốn sửa thông tin danh mục ưu đãi không !")){
                $http({
                    method: 'PUT',
                    data: {
                        Madanhmucuudai: $scope.Madanhmucuudai,
                        Tendanhmucuudai: categoryName.value,
                        DacBiet: status.value==="true",
                        NoiDung: describe.value
                    },
                    url: current_url + '/api-admin/DanhMucUuDai/update-danhmucuudai',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) { 
                    if($scope.tendanhmucuudaisearch){
                        window.location='#!categoryOffer/'+$scope.page+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        window.location='#!categoryOffer/'+$scope.page
                    }
                })
                .catch(function (error) {
                    console.error('Lỗi khi sua:', error);
                });
            }
        }
    }
});