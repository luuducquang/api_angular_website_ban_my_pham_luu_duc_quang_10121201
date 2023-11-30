app.controller ('category', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tendanhmucsearch = $routeParams.tendanhmucsearch;
}]);

app.controller("CategoryCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[5]).addClass('active_option')

    $scope.ListDanhMuc;
    $scope.pageSize = 10
    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        TenDanhMuc: $scope.tendanhmucsearch
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMuc = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api-admin/DanhMuc/search-danhmuc',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {  
            $scope.ListDanhMuc = response.data.data; 
            $scope.pageIndex(response.data.totalItems)
        });
        
        
    }
    $scope.GetDanhMuc();

    //-------------------------------------------------------------------------------//
    $scope.timkiem = $scope.tendanhmucsearch
    $scope.search = function(){
        if($scope.timkiem===undefined){
            $scope.tendanhmucsearch=''
        }
        else{
            $scope.tendanhmucsearch = $scope.timkiem
            var data = {
                page: 1,
                pageSize: $scope.pageSize,
                TenDanhMuc: $scope.tendanhmucsearch
            };
            $http({
                method: 'POST',
                // headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api-admin/DanhMuc/search-danhmuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) {  
                console.log(response);
                if(response.data.totalItems===0){
                    alert("Không có danh mục nào")
                    $scope.tendanhmucsearch =''
                    return
                }
                else{
                    window.location='#!category/1/'+$scope.tendanhmucsearch
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
                    if($scope.tendanhmucsearch){
                        window.location='#!category/'+pageNumber+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        window.location='#!category/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.tendanhmucsearch){
                        window.location='#!category/'+pageNumber+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        window.location='#!category/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+pageNumber+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+pageNumber+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+pageNumber+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+pageNumber
                }
            }
        })
    }

    $scope.checkCategory =[]

    $scope.toggleSelection = function(item){
        var idx = $scope.checkCategory.indexOf(item.maDanhMuc);
        if(idx >-1){
            $scope.checkCategory.splice(idx, 1);
        }
        else{
            $scope.checkCategory.push(item.maDanhMuc);
        }
    }

    yesdel = function(){
        if($scope.checkCategory.length === 0){
            alert("chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.checkCategory,
                url: current_url + '/api-admin/DanhMuc/delete-danhmuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.tendanhmucsearch){
                    window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                }
                else{
                    window.location='#!category/'+$scope.page
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

    $scope.AddCategory = function(){
        if(categoryName.value==='' || describe.value===''){
            alert('không được bỏ trống')
            return
        }

        $http({
            method: 'POST',
            data: {
                TenDanhMuc: categoryName.value,
                DacBiet: status.value === "true",
                NoiDung: describe.value
            },
            url: current_url + '/api-admin/DanhMuc/create-danhmuc',
            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
        }).then(function (response) {
            alert('Thêm thành công');
            if($scope.tendanhmucsearch){
                window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
            }
            else{
                window.location='#!category/'+$scope.page
            }
        })
        .catch(function (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        });
    }
    
    $scope.addCategory = function(){
        $scope.AddCategory(); 
    }

    
    $scope.maDanhMuc
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        categoryName.value = x.tenDanhMuc
        status.value = x.dacBiet
        describe.value = x.noiDung
        document.querySelector('.saveAdd').style.display = 'none'
        document.querySelector('.saveEdit').style.display = 'block'
        $scope.maDanhMuc = x.maDanhMuc
    }

    $scope.editCategory=function(){
        if(categoryName.value==='' || status.value===undefined|| describe.value==='undefined'){
            alert('không được bỏ trống')
            return
        }
        else{
            if(confirm("Bạn có muốn sửa thông tin danh mục không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaDanhMuc: $scope.maDanhMuc,
                        TenDanhMuc: categoryName.value,
                        DacBiet: status.value === "true",
                        NoiDung: describe.value
                    },
                    url: current_url + '/api-admin/DanhMuc/update-danhmuc',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) { 
                    if($scope.tendanhmucsearch){
                        window.location='#!category/'+$scope.page+'/'+$scope.tendanhmucsearch
                    }
                    else{
                        window.location='#!category/'+$scope.page
                    }
                })
                .catch(function (error) {
                    console.error('Lỗi khi sua:', error);
                });
            }
        }
    }

    
});