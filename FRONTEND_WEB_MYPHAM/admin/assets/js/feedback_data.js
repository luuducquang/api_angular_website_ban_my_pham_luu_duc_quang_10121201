app.controller ('feedback', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.page = $routeParams.page;
    $scope.start = $routeParams.start;
    $scope.valuestart = $routeParams.valuestart;
    $scope.end = $routeParams.end;
    $scope.valueend = $routeParams.valueend;
    $scope.noidung = $routeParams.noidung;
    $scope.chatluong = $routeParams.chatluong;
}]);

app.controller("feedbackCtrl", function ($scope, $http) {
    var btnOption = $('.button-item')
    var classbtn = $('.button-item.active_option')
    if(classbtn){
        $(classbtn).removeClass('active_option')
    }
    $(btnOption[4]).addClass('active_option')

    var ngaybatdau = document.getElementById("startdate")
    var ngayketthuc = document.getElementById("enddate")
    
    var ngayBatDau = new Date(gmt7Time);
    ngayBatDau.setMonth(ngayBatDau.getMonth() - 1);
    ngayBatDau = ngayBatDau.toISOString().slice(0, 16);
    ngaybatdau.value = ngayBatDau
    ngayketthuc.value = gmt7ISODate;

    $scope.start = "fr_NgayTao"
    $scope.end = "to_NgayTao"

    if($scope.valuestart){
        ngaybatdau.value = $scope.valuestart
    }

    if($scope.valueend){
        ngayketthuc.value = $scope.valueend
    }

    $scope.pageSize = 10
    var datas = {
        page: $scope.page,
        pageSize: $scope.pageSize,
        ChatLuong: $scope.chatluong,
        NoiDung: $scope.noidung,
        fr_NgayTao: $scope.valuestart,
        to_NgayTao:$scope.valueend
    }
    $scope.GetFeedBack= function () {
        $http({
            method: 'POST',
            headers: { "Authorization": 'Bearer ' + _user.token },
            data: datas,
            url: current_url + '/api-admin/DanhGia/search-danhgia',
        }).then(function (response) {  
            $scope.listFeedBack = response.data.data
            $scope.pageIndex(response.data.totalItems)
            $scope.timkiem = $scope.chatluong
        }).catch(function (error) {
            console.error('Lỗi :', error);
        });
    };   
	$scope.GetFeedBack();

    if($scope.noidung){
        $scope.timkiemnoidung = $scope.noidung
    }

    $scope.search = function(){
        if(ngaybatdau.value>=ngayketthuc.value){
            alert('Ngày không hợp lệ')
            return
        }
        else{
            $scope.valuestart = ngaybatdau.value
            $scope.valueend = ngayketthuc.value
            if(!$scope.timkiem&&!$scope.timkiemnoidung){
                    $http({
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + _user.token },
                        data: {
                            page: $scope.page,
                            pageSize: $scope.pageSize,
                            fr_NgayTao: $scope.valuestart,
                            to_NgayTao:$scope.valueend
                        },
                        url: current_url + '/api-admin/DanhGia/search-DanhGia',
                    }).then(function (response) {  
                        if(response.data.totalItems===0){
                            alert("Không có đánh giá nào")
                            $scope.valuestart=''
                            $scope.valueend=''
                            return
                        }
                        else{
                            window.location='#!feedback/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                        }
                    }).catch(function (error) {
                        console.error('Lỗi :', error);
                    });
            }
            else if(!$scope.timkiem&&$scope.timkiemnoidung){
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: {
                        page: $scope.page,
                        pageSize: $scope.pageSize,
                        NoiDung: $scope.timkiemnoidung,
                        fr_NgayTao: $scope.valuestart,
                        to_NgayTao:$scope.valueend
                    },
                    url: current_url + '/api-admin/DanhGia/search-DanhGia',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có đánh giá nào")
                        $scope.valuestart=''
                        $scope.valueend=''
                        return
                    }
                    else{
                        window.location='#!feedback/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.timkiemnoidung
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
            }
            else if($scope.timkiem&&!$scope.timkiemnoidung){
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: {
                        page: $scope.page,
                        pageSize: $scope.pageSize,
                        ChatLuong: $scope.timkiem,
                        fr_NgayTao: $scope.valuestart,
                        to_NgayTao:$scope.valueend
                    },
                    url: current_url + '/api-admin/DanhGia/search-DanhGia',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có đánh giá nào")
                        $scope.valuestart=''
                        $scope.valueend=''
                        return
                    }
                    else{
                        window.location='#!feedback/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.timkiem
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
            }
            else{
                $scope.chatluong = $scope.timkiem
                $scope.noidung = $scope.timkiemnoidung
                $http({
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + _user.token },
                    data: {
                        page: $scope.page,
                        pageSize: $scope.pageSize,
                        ChatLuong: $scope.timkiem,
                        NoiDung: $scope.timkiemnoidung,
                        fr_NgayTao: $scope.valuestart,
                        to_NgayTao:$scope.valueend
                    },
                    url: current_url + '/api-admin/DanhGia/search-DanhGia',
                }).then(function (response) {  
                    if(response.data.totalItems===0){
                        alert("Không có đánh giá nào")
                        $scope.chatluong = 0
                        $scope.valuestart=''
                        $scope.valueend=''
                        return
                    }
                    else{
                        window.location='#!feedback/1/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.timkiemnoidung+'/'+$scope.chatluong
                    }
                }).catch(function (error) {
                    console.error('Lỗi :', error);
                });
            }
        }
    }

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
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                        window.location='#!feedback/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterGoInputOnEnter:function(event,pageNumber){
                if(pageNumber!=""&&pageNumber>0&&pageNumber<=Number(Math.ceil((total) / $scope.pageSize))){
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                        window.location='#!feedback/'+pageNumber
                    }
                }
                else{
                    $('.J-paginationjs-go-pagenumber').val('')
                }
            },
            afterNextOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                    window.location='#!feedback/'+pageNumber
                }
            },
            afterPreviousOnClick:function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                    window.location='#!feedback/'+pageNumber
                }
            },
            afterPageOnClick : function(event,pageNumber){
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+pageNumber+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                    window.location='#!feedback/'+pageNumber
                }
            }
        })
    }

    

    $scope.selected =[]
    $scope.toggleSelection = function(item){
        var idx = $scope.selected.indexOf(item.maDanhGia);
        if(idx >-1){
            $scope.selected.splice(idx, 1);
            console.log($scope.selected);
        }
        else{
            $scope.selected.push(item.maDanhGia);
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
                url: current_url + '/api-admin/Danhgia/delete-danhgia',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
            }).then(function (response) { 
                alert('Xoá thành công')
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                    window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                    window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                }
                if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                    window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                }
                if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                    window.location='#!feedback/'+$scope.page
                }
            })
            .catch(function (error) {
                console.error('Lỗi khi xoá:', error);
            });
        }
    }

    $scope.madanhgia
    $scope.edit=function(x){
        $(".product-container").toggleClass("hide")
        $(".detail").show()
        $(".saveAdd").hide()
        $('.addimportBill').show()
        $scope.madanhgia = x.maDanhGia
        $scope.ghichu = x.ghiChu
    }

    $scope.editFeedback = function(){
        if($scope.ghichu === ''){
            alert('không được bỏ trống')
            return
        }
        else{
            if(confirm("Bạn có muốn sửa ghi chú không !")){
                $http({
                    method: 'POST',
                    data: {
                        MaDanhGia: $scope.madanhgia,
                        GhiChu: $scope.ghichu,
                        AnhDanhGia:'',
                        NoiDung:''
                    },
                    url: current_url + '/api-admin/DanhGia/update-danhgia',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
                }).then(function (response) { 
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend){
                        window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung){
                        window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+$scope.noidung+'/'+$scope.chatluong
                    }
                    if($scope.start&&$scope.end&&$scope.valuestart&&$scope.valueend&&!$scope.noidung&&$scope.chatluong){
                        window.location='#!feedback/'+$scope.page+'/'+$scope.start+'/'+$scope.valuestart+'/'+$scope.end+'/'+$scope.valueend+'/'+' '+'/'+$scope.chatluong
                    }
                    if(!$scope.valuestart&&!$scope.valueend&&!$scope.noidung&&!$scope.chatluong){
                        window.location='#!feedback/'+$scope.page
                    }
                })
                .catch(function (error) {
                    console.error('Lỗi khi sua:', error);
                });
            }
        }
    }
})