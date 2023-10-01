$(document).ready(function () {
    Start()
    function Start() {
        GetProduct()
        Delete()
    }
    function Delete() {
        var arr = []
        var item = 0

        $(":checkbox").each(function (index, value) {
            var itemParent = $(this).parent().parent().find('.id-item').html()
            $(this).change(function () {
                if ($(this).is(':checked')) {
                    item++
                    arr.push(itemParent)
                    console.log(arr);
                } else {
                    item--
                    arr = arr.filter(x => x !== itemParent)
                    console.log(arr);
                }
            });
        })
    }
    function GetProduct() {
        var page = 1;
        var pageSize = 10
        var item = {
            page: page,
            pageSize: pageSize
        }
        $.ajax({
            url: 'https://localhost:44364/api/SanPham/search-sanpham',
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).done(function (res) {
            var html = "";
            $.each(res.data, function (index, value) {
                html += `<tr class="text-center">
                        <td>
                             <input class="form-check-input text-center" type="checkbox" value="" id="checkitem">
                        </td>
                        <td class="id-item">${value.maSanPham} </td>
                        <td>${value.tenSanPham} </td>
                        <td><img style="width: 100px;height: 100px;background-size: cover;" src="${value.anhDaiDien}" alt=""></td>
                        <td>${value.gia}</td>
                        <td>${value.soLuong}</td>
                        <td>${value.tenDanhMuc}</td>
                        <td>${value.tendanhmucuudai} </td>
                        <td>${value.moTa}</td>
                        <td>
                            <a style="cursor: pointer;" class="edit text-decoration-none">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </a>
                        </td>
                    </tr>`
            })
            $(".product-list").append(html)
        })
    }
})