app.controller ('categoryOffer', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tendanhmucuudaisearch = $routeParams.tendanhmucuudaisearch;
}]);

app.controller("CategoryOfferCtrl", function ($scope, $http) {
    $scope.ListDanhMucUuDai;

    var datas = {
        page: $scope.page,
        pageSize: 10,
        Tendanhmucuudai:$scope.tendanhmucuudaisearch
    }

    var categoryName = document.querySelector('#categoryName')
    var status = document.querySelector('.status')
    var describe = document.querySelector('#describe')

    $scope.GetDanhMucUuDai = function(){
        $http({
            method: 'POST',
            data: datas,
            url: current_url + '/api/DanhMucUuDai/search-danhmucuudai',
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
                pageSize: 10,
                Tendanhmucuudai: $scope.tendanhmucuudaisearch
            };
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api/DanhMucUuDai/search-danhmucuudai',
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
        $('.page-count li').remove()
            var count = Math.ceil((total) / datas.pageSize)
            var currentPage = $scope.page;
            var aItem = [];
            for (var i = 1; i < count + 1; i++) {
                let li = document.createElement('li')
                li.className = 'page-item'
                let a = document.createElement('a')
                a.className = 'page-link'
                li.appendChild(a)
                a.innerText = i
                aItem.push(a);
                $('.page-count').append(li)
                a.onclick = function () {
                    $scope.changePage(a.innerHTML)
                    if($scope.tendanhmucuudaisearch){
                        a.href='#!categoryOffer/'+a.innerHTML+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        a.href='#!categoryOffer/'+a.innerHTML
                    }
                }
            }    

            aItem[currentPage - 1].classList.add('activePage'); 
            prev = function(){
                if($scope.page<=1){
                    $scope.page=1
                }
                else{
                    $scope.page--
                    if($scope.tendanhmucuudaisearch){
                        window.location='#!categoryOffer/'+$scope.page+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        window.location='#!categoryOffer/'+$scope.page
                    }
                }
            }

            next = function(){
                if($scope.page<count){
                    $scope.page++
                    if($scope.tendanhmucuudaisearch){
                        window.location='#!categoryOffer/'+$scope.page+'/'+$scope.tendanhmucuudaisearch
                    }
                    else{
                        window.location='#!categoryOffer/'+$scope.page
                    }
                }
            }
    }
    

    $scope.changePage=function(i) {
        datas.page = i
        $scope.GetDanhMucUuDai()
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
                url: current_url + '/api/DanhMucUuDai/delete-danhmucuudai',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
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
            url: current_url + '/api/DanhMucUuDai/create-danhmucuudai',
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
            $http({
                method: 'PUT',
                data: {
                    Madanhmucuudai: $scope.Madanhmucuudai,
                    Tendanhmucuudai: categoryName.value,
                    DacBiet: status.value==="true",
                    NoiDung: describe.value
                },
                url: current_url + '/api/DanhMucUuDai/update-danhmucuudai',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Sửa thành công')
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
});