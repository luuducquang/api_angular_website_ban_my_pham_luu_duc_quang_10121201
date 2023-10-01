$(document).ready(function () {
    function Listproduct() {
        var page = 1;
        var pageSize = 10
        var item = {
            page: page,
            pageSize: pageSize,
            TenSanPham: "S"
        }

        var sale = $(".sale");

        $.ajax({
            url: 'https://localhost:44364/api/SanPham/search-sanpham',
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).done(function (res) { 
            var html = "";
            $.each(res.data, function (index,value) {
                html += `<div class="home-product-item">
                            <a href="./product.html">
                                <div class="home-product-item_img"><img src="./assets/img/Cleanser/cerave-renewing-sa-face-cleanser-for-normal-skin.png" alt=""></div>
                                <h4 class="home-product-item_name">Sữa rửa mặt Cerave Foaming Cleanser</h4>
                                <span class="decrip-item">Sữa rửa mặt Cerave Foaming 
                                    Cleanser mang đến hiệu quả trong việc tái tạo,
                                     phục hồi lớp màng Lipid của da và Hyaluronic Acid
                                      cân bằng độ ẩm trên da, giúp da khỏe mạnh,
                                       mịn màng. Sản phẩm có độ pH ở mức ~5.5, giúpnhẹ
                                        nhàng lấy đi bụi bẩn, dầu thừa, lớp cặn trang 
                                        điểm mà không làm tổn hại đến lớp màng ẩm trên da.
                                </span>
                            </a>
                            <span class="banner-sale">SALE</span>
                            <span class="sale-up">20 <sup>%</sup><div>Giảm</div></span>
                            <div class="home-product-item_price">
                                <span class="home-product-item_price_current">${value.gia}<sup>đ</sup></span>
                                <span class="home-product-item_price_old">${value.giaGiam}<sup>đ</sup></span>
                            </div>
                            <div class="home-icon-recommend">
                                <span class="fa-solid fa-star star-gold"></span>
                                <span class="fa-solid fa-star star-gold"></span>
                                <span class="fa-solid fa-star star-gold"></span>
                                <span class="fa-solid fa-star star-gold"></span>
                                <span class="fa-solid fa-star star-gold"></span>
                                <span class="people-rate">(100)</span>
                                <span>|</span>
                                <span class="fa-solid fa-shop"></span>
                                <span class="amount-product">123</span>
                                <span class="fa-solid fa-truck-fast free-ship"></span>
                            </div>  
                            <div class="country">
                                Hàn Quốc
                            </div>
                        </div>`
            })
            sale.append(html);
            console.log(res)
        })

    }

    Listproduct()

})
