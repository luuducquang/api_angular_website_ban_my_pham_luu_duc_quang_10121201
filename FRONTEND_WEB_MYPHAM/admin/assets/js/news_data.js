app.controller ('news', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.tieudesearch = $routeParams.tieudesearch;
}]);

app.controller("NewsCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[4]).addClass('active_option')

    document.title = 'Tin tức'


    var editorData
    ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .then( editor => {
                editorData = editor
        } )
        .catch( error => {
                console.error( error );
        } );
                
    function getdata() {
        if (editorData) {
            return editorData.getData();
        } else {
            return 'Editor is not initialized yet.';
        }
    }

    $scope.submit = "Thêm mới";
    $scope.pageSize=10
    $scope.Image

    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        TieuDe:$scope.tieudesearch
    }

    //-------------------------------------------------------------------------------------//
    $scope.timkiem = $scope.tieudesearch
    $scope.search = function(){
        if($scope.timkiem===undefined){
            $scope.tieudesearch=''
        }
        else{
            $scope.tieudesearch = $scope.timkiem
            var data = {
                page: 1,
                pageSize: 10,
                TieuDe: $scope.tieudesearch
            };
            $http({
                method: 'POST',
                headers: { "Authorization": 'Bearer ' + _user.token },
                data: data,
                url: current_url + '/api-admin/TinTuc/search-tintuc',
            }).then(function (response) {  
                console.log(response);
                if(response.data.totalItems===0){
                    alert("Không có tin tức nào")
                    $scope.tieudesearch =''
                    return
                }
                else{
                    window.location='#!news/1/'+$scope.tieudesearch
                }
            }).catch(function (error) {
                console.error('Lỗi :', error);
            });
        }
    }
    //-------------------------------------------------------------------------------------//

    $scope.GetListNews= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-admin/TinTuc/search-tintuc',
        }).then(function (response) {  
            $scope.listNew = response.data.data
            console.log($scope.listNew);
            $scope.pageIndex(response.data.totalItems)
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetListNews();

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
                    if($scope.tieudesearch){
                        window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                    }
                    else{
                        window.location='#!news/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.tieudesearch){
                        window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                    }
                    else{
                        window.location='#!news/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
                
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
                
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.tieudesearch){
                    window.location='#!news/'+pageNumber+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+pageNumber
                }
            }
        })
    }

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maTinTuc);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maTinTuc);
            console.log($scope.selected);
        }
    }

    yesdel = function(){
        if($scope.selected.length === 0){
            alert("Chưa chọn mục để xoá")
            return
        }
        else{
            $http({
                method: 'DELETE',
                data: $scope.selected,
                url: current_url + '/api-admin/TinTuc/delete-tintuc',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                if($scope.tieudesearch){
                    window.location='#!news/'+$scope.page+'/'+$scope.tieudesearch
                }
                else{
                    window.location='#!news/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.btnAdd=function(){
        $scope.submit="Thêm mới"
        $scope.tieude=''
        $scope.noidung=''
        $scope.hinhanh=''
        $scope.trangthai=''
        preview.src=''
        editorData.setData('');
    }

    var preview = document.querySelector('.ImgProduct')
    $scope.getFilePathProduct=function(){
        $('#Image').change(function () {
            var file = this.files[0]
            if(!file){
                return
            }
            if(file.size / (1024*1024)>5){
                alert("File không được quá 5MB")
            }
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function(e){
                    preview.src = e.target.result
                }
            }
        });
    }
    $scope.getFilePathProduct()

    $scope.save = function(){
        if($scope.tieude===''&&$scope.noidung===''&&$scope.trangthai===''){
            alert("Vui lòng nhập đủ thông tin")
            return
        }
        var file = document.getElementById('Image').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + _user.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api-admin/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                preview.src = "../img"+ $scope.Image

                if($scope.submit==="Thêm mới"){
                    $http({
                        method: 'POST',
                        data: {
                            TieuDe: $scope.tieude,
                            NoiDung: getdata(),
                            HinhAnh: "../img"+$scope.Image,
                            MaTaiKhoan: _user.mataikhoan,
                            TrangThai: $scope.trangthai
                        },
                        url: current_url + '/api-admin/TinTuc/create-tintuc',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        alert('Thêm thành công')
                        if($scope.tieudesearch){
                            window.location='#!news/'+$scope.page+'/'+$scope.tieudesearch
                        }
                        else{
                            window.location='#!news/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi thêm sản phẩm:', error);
                    });
                }
                else{
                    if(confirm("Bạn có muốn sửa thông tin hãng sản xuất không !")){
                        $http({
                            method: 'PUT',
                            data: {
                                MaTinTuc: $scope.matintuc,
                                TieuDe: $scope.tieude,
                                NoiDung: getdata(),
                                HinhAnh: "../img"+$scope.Image,
                                TrangThai: $scope.trangthai
                            },
                            url: current_url + '/api-admin/TinTuc/update-tintuc',
                            headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                        }).then(function (response) {  
                            if($scope.tieudesearch){
                                window.location='#!news/'+$scope.page+'/'+$scope.tieudesearch
                            }
                            else{
                                window.location='#!news/'+$scope.page
                            }
                        }).catch(function (error) {
                            console.error('Lỗi khi sửa sản phẩm:', error);
                        });
                    }
                }
            });
        }
        else{
            if($scope.submit==="Thêm mới"){
                $http({
                    method: 'POST',
                    data: {
                        TieuDe: $scope.tieude,
                        NoiDung: getdata(),
                        HinhAnh: "../img"+$scope.Image,
                        MaTaiKhoan: _user.mataikhoan,
                        TrangThai: $scope.trangthai
                    },
                    url: current_url + '/api-admin/TinTuc/create-tintuc',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) {  
                    alert('Thêm thành công')
                    if($scope.tieudesearch){
                        window.location='#!news/'+$scope.page+'/'+$scope.tieudesearch
                    }
                    else{
                        window.location='#!news/'+$scope.page
                    }
                }).catch(function (error) {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                });
            }
            else{
                if(confirm("Bạn có muốn sửa thông tin hãng sản xuất không !")){
                    $http({
                        method: 'PUT',
                        data: {
                            MaTinTuc: $scope.matintuc,
                            TieuDe: $scope.tieude,
                            NoiDung: getdata(),
                            HinhAnh: $scope.hinhanh,
                            TrangThai: $scope.trangthai
                        },
                        url: current_url + '/api-admin/TinTuc/update-tintuc',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                    }).then(function (response) {  
                        if($scope.tieudesearch){
                            window.location='#!news/'+$scope.page+'/'+$scope.tieudesearch
                        }
                        else{
                            window.location='#!news/'+$scope.page
                        }
                    }).catch(function (error) {
                        console.error('Lỗi khi sửa sản phẩm:', error);
                    });
                }
            }
        }
    }

    $scope.edit = function(x){
        $scope.submit = "Chỉnh sửa";
        console.log(x);
        $(".product-container").toggleClass("hide")
        $scope.matintuc = x.maTinTuc
        $scope.tieude = x.tieuDe
        $scope.hinhanh = x.hinhAnh
        $scope.trangthai = x.trangThai
        preview.src = x.hinhAnh
        editorData.setData(x.noiDung);
    }
})