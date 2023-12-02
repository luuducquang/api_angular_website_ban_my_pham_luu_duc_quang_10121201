app.controller("OverviewCtrl", function ($scope, $http) {
  var btnOption = $('.button-item')
  var classbtn = $('.button-item.active_option')
  if(classbtn){
    $(classbtn).removeClass('active_option')
  }
  $(btnOption[0]).addClass('active_option')

  document.title = 'Tổng quan'

  var date = new Date()
  $scope.year = date.getFullYear()
  $scope.month = date.getMonth()
  document.querySelector(".choiseYear").value = $scope.year
  document.querySelector(".choiseYeartoDay").value = $scope.year
  document.querySelector(".choiseMonthtoDay").value = $scope.month +1

  $scope.DataOverview;
  $scope.GetOverview = function () {
    $http
      .get(current_url + "/api-admin/Overview/tong-quan")
      .then(function (response) {
        $scope.DataOverview = response.data;
        $scope.Tienchi = VND.format($scope.DataOverview.tienChi);
        $scope.DoanhThu = VND.format($scope.DataOverview.doanhThu);
        $scope.tileradon = ($scope.DataOverview.soluongHoaDonBan/$scope.DataOverview.luotXem)*100
        $scope.tilehuydon = ($scope.DataOverview.soLuongHoaDonHuy/$scope.DataOverview.soluongHoaDonBan)*100
      });
  };
  $scope.GetOverview();

  /*------------------------------------------------------------------------------------------*/
  $scope.SellingValue='360'
  $scope.Getspbanchaythang = function (ngay) {
      $http({
        method: 'POST',
        url: current_url + '/api-admin/Overview/sp-banchaythang?Ngay='+ngay,
        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
    }).then(function (response) {  
      $scope.Spbanchaythang = response.data.map(function(value,index){
        value.stt = index+1
        return value
     })
    }).catch(function (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    });
  };
  $scope.Getspbanchaythang($scope.SellingValue)

  $scope.changeSelling = function(){
    $scope.Getspbanchaythang($scope.SellingValue)
  }
  /*------------------------------------------------------------------------------------------*/
  $scope.Getspsaphet = function () {
    $http
      .get(
        current_url + "/api-admin/Overview/sp-saphet"
      )
      .then(function (response) {
        $scope.Spsaphet = response.data.map(function(value,index){
          value.stt = index+1
          return value
       })
      });
  };
  $scope.Getspsaphet()
/*------------------------------------------------------------------------------------------*/

  $scope.SoldValue = '360'
  $scope.Getspbantrongthang = function (ngay) {
      $http({
        method: 'POST',
        url: current_url + '/api-admin/Overview/sp-dabantrongthang?Ngay='+ngay,
        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
    }).then(function (response) {  
      $scope.Spbantrongthang = response.data.map(function(value,index){
        value.stt = index+1
        return value
     })
     console.log($scope.Spbantrongthang);
    }).catch(function (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    });
  };
  $scope.Getspbantrongthang($scope.SoldValue)

  $scope.changeSold = function(){
    $scope.Getspbantrongthang($scope.SoldValue)
  }

/*------------------------------------------------------------------------------------------*/

$scope.FeedbackValue = '360'
$scope.Getdanhgia = function (ngay) {
    $http({
      method: 'GET',
      url: current_url + '/api-admin/Overview/thongkedanhgia?Ngay='+ngay,
      headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
  }).then(function (response) {  
    $scope.listFeedBack = response.data.map(function(value,index){
      value.stt = index+1
      return value
   })
  }).catch(function (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
  });
};
$scope.Getdanhgia($scope.FeedbackValue)

$scope.changeFeedback = function(){
  $scope.Getdanhgia($scope.FeedbackValue)
}
  /*------------------------------------------------------------------------------------------*/
  $scope.SellSlowlyValue = '360'
  $scope.Getspbancham = function (ngay) {
      $http({
        method: 'POST',
        url: current_url + '/api-admin/Overview/sp-bancham?Ngay='+ngay,
        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + _user.token }
    }).then(function (response) {  
      $scope.Spbancham = response.data.map(function(value,index){
        value.stt = index+1
        return value
     })
    }).catch(function (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    });
  };
  $scope.Getspbancham($scope.SellSlowlyValue)

  $scope.changeSellSlowly = function(){
    $scope.Getspbancham($scope.SellSlowlyValue)
  }

  /*------------------------------------------------------------------------------------------*/

  $scope.GetHDBDangxuly= function () {
    $http({
        method: 'POST',
        headers: { "Authorization": 'Bearer ' + _user.token },
        data: {
          page:1,
          pageSize:1000,
          TrangThai:"Đang xử lý"
        },
        url: current_url + '/api-admin/HoaDon/search-hoadonsingle',
    }).then(function (response) {  
        $scope.listHoaDonBan = response.data.data
        $scope.amountDonHang = response.data.totalItems
    }).catch(function (error) {
        console.error('Lỗi :', error);
    });
  };   
  $scope.GetHDBDangxuly();

  /*-------------------------------------------------------------------------------------------------------*/
  var myChartRevenue
  function UpdateRevenueProduct(){
    if(myChartRevenue){
      myChartRevenue.data.datasets[0].data = $scope.revenues
      myChartRevenue.data.datasets[1].data = $scope.quantities
      myChartRevenue.options.title.text =
      "Thống kê doanh thu theo sản phẩm ("+$scope.revenueProduct+" ngày gần nhất)"
      myChartRevenue.update();
    }
    else{
      const ctx = document.getElementById('myChart3').getContext('2d');
        myChartRevenue = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: $scope.productNames,
            datasets: [
              {
                label: 'Doanh thu',
                data: $scope.revenues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Số lượng',
                data: $scope.quantities,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: getRevenueProductChartOptions(),
        });
    }
  }

  function getRevenueProductChartOptions() {
    return {
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
            if (label) {
              label += ': ';
            }
            label += tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return label;
          },
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        }],
        xAxes: [{
          display: false,
        }],
      },
      title: {
        display: true,
        text: "Thống kê doanh thu theo sản phẩm (" + $scope.revenueProduct + " ngày gần nhất)",
        fontSize: 20,
      },
      legend: {
        display: true,
      },
    };
  }
  
  $scope.revenueProduct = '360'
  $scope.Getdoanhthutheosanpham = function (ngay) {
    $http
      .get(
        current_url + "/api-admin/Overview/thongkedoanhthutheosanpham?Ngay="+ngay
      )
      .then(function (response) {
        $scope.DoanhThuTheoSanPham = response.data
        $scope.productNames = $scope.DoanhThuTheoSanPham.map(product => product.tenSanPham);
        $scope.revenues = $scope.DoanhThuTheoSanPham.map(product => product.doanhThu);
        $scope.quantities = $scope.DoanhThuTheoSanPham.map(product => product.soLuong);
        UpdateRevenueProduct()
      });
  };
  $scope.Getdoanhthutheosanpham($scope.revenueProduct)

  $scope.changerevenueProduct = function(){
    $scope.Getdoanhthutheosanpham($scope.revenueProduct)
  }

  //--------------------------------------------------------------------------------------------------
  let myChart;

  function updateChart() {
    if (myChart) {
      myChart.data.datasets[0].data = $scope.Thongketienchinam;
      myChart.data.datasets[1].data = $scope.Thongkenam;
      myChart.data.datasets[2].data = $scope.ThongkeKHnam;
      myChart.data.datasets[3].data = $scope.ThongkeHDNnam;
      myChart.data.datasets[4].data = $scope.ThongkeHDBnam;
      myChart.data.datasets[5].data = $scope.ThongkeDonHoanTatNam;
      myChart.data.datasets[6].data = $scope.ThongkeDonHoanTraNam;
      myChart.data.datasets[7].data = $scope.ThongkeDonHuyNam;
      myChart.options.title.text =
        "Thống kê năm " + document.querySelector(".choiseYear").value;
      myChart.update();
    } else {
      let chartCanvas = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              label: "Tiền chi",
              data: $scope.Thongketienchinam,
              borderColor: "#FF0000",
              backgroundColor: "rgba(255, 0, 0, 0.2)", // Màu nền
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Doanh thu",
              data: $scope.Thongkenam,
              borderColor: "#66CC00",
              backgroundColor: "rgba(102, 204, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Khách hàng",
              data: $scope.ThongkeKHnam,
              borderColor: "#FFCC00",
              backgroundColor: "rgba(255, 204, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Hoá đơn nhập",
              data: $scope.ThongkeHDNnam,
              borderColor: "#FF6600",
              backgroundColor: "rgba(255, 102, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Hoá đơn bán",
              data: $scope.ThongkeHDBnam,
              borderColor: "#0099FF",
              backgroundColor: "rgba(0, 153, 255, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn hoàn tất",
              data: $scope.ThongkeDonHoanTatNam,
              borderColor: "#CCFF00",
              backgroundColor: "rgba(204, 255, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn hoàn trả",
              data: $scope.ThongkeDonHoanTraNam,
              borderColor: "#8B4513",
              backgroundColor: "rgba(139, 69, 19, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn huỷ",
              data: $scope.ThongkeDonHuyNam,
              borderColor: "#003333",
              backgroundColor: "rgba(0, 51, 51, 0.2)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          tooltips: {
                  mode: 'index',
                  intersect: false,
                  callbacks: {
                      label: function(tooltipItem, data) {
                          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          
                          if (label) {
                              label += ': ';
                          }
                          label += tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          return label;
                      }
                  }
              },
              scales:{
                yAxes: [{
                    ticks: {
                      callback: function(value, index, values) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }
                    },
                }]
              },
          title: {
            display: true,
            text:
              "Thống kê năm " +
              document.querySelector(".choiseYear").value,
            fontSize: 20,
          },
          legend: {
            display: true
          },
        },
      });
    }
  }

  //--------------------------------------------------------------------------------------------------

  $scope.GetThongkenam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkedoanhthutheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.Thongkenam = response.data.map(function (value) {
          return value.doanhThu
        });
        updateChart();
      });
  };

  $scope.GetThongkenam();

  $scope.GetThongketienchinam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongketienchitheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.Thongketienchinam = response.data.map(function (value) {
          return value.tienChi;
        });
        updateChart();
      });
  };
  $scope.GetThongketienchinam();

  $scope.GetThongkeHDBnam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkehoadonbantheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeHDBnam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeHDBnam();

  $scope.GetThongkeHDNnam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkehoadonnhaptheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeHDNnam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeHDNnam();

  $scope.GetThongkeKHnam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkekhachhangtheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeKHnam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeKHnam();

  $scope.GetThongkeDonHangHuynam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkedonhanghuytheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeDonHuyNam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeDonHangHuynam();

  $scope.GetThongkeDonHangHoantranam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkedonhoantratheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeDonHoanTraNam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeDonHangHoantranam();

  $scope.GetThongkeDonHangHoantatnam = function () {
    $http
      .get(
        current_url +
          "/api-admin/Overview/thongkedonhoantattheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeDonHoanTatNam = response.data.map(function (value) {
          return value.sl;
        });
        updateChart();
      });
  };
  $scope.GetThongkeDonHangHoantatnam();

  $(".choiseYear").on("change", function () {
    $scope.GetThongkenam();
    $scope.GetThongketienchinam();
    $scope.GetThongkeHDBnam();
    $scope.GetThongkeHDNnam();
    $scope.GetThongkeKHnam();
    $scope.GetThongkeDonHangHuynam();
    $scope.GetThongkeDonHangHoantranam();
    $scope.GetThongkeDonHangHoantatnam();
  });

  //--------------------------------------------------------------------------------------------------
  var CharDay;

  function updateChartTheoNgay() {
    if (CharDay) {
      CharDay.data.datasets[0].data = $scope.Tienchingay;
      CharDay.data.datasets[1].data = $scope.Doanhthungay;
      CharDay.data.datasets[2].data = $scope.KHNgay;
      CharDay.data.datasets[3].data = $scope.HDNNgay;
      CharDay.data.datasets[4].data = $scope.HDBNgay;
      CharDay.data.datasets[5].data = $scope.DonHoanTatNgay;
      CharDay.data.datasets[6].data = $scope.DonHoanTraNgay;
      CharDay.data.datasets[7].data = $scope.DonHuyNgay;
      CharDay.options.title.text =
        "Thống kê tháng " +
        document.querySelector(".choiseMonthtoDay").value +
        " năm " +
        document.querySelector(".choiseYeartoDay").value ;
      CharDay.update();
    } else {
      const ngay = Array.from({ length: 31 }, (_, i) => i + 1);
      const ctx = document.getElementById("myChart2").getContext("2d");
      CharDay = new Chart(ctx, {
        type: "line",
        data: {
          labels: ngay,
          datasets: [
            {
              label: "Tiền chi",
              data: $scope.Tienchingay,
              borderColor: "#FF0000",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Doanh thu",
              data: $scope.Doanhthungay,
              borderColor: "#66CC00",
              backgroundColor: "rgba(102, 204, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Khách hàng",
              data: $scope.KHNgay,
              borderColor: "#FFCC00",
              backgroundColor: "rgba(255, 204, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Hoá đơn nhập",
              data: $scope.HDNNgay,
              borderColor: "#FF6600",
              backgroundColor: "rgba(255, 102, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Hoá đơn bán",
              data: $scope.HDBNgay,
              borderColor: "#0099FF",
              backgroundColor: "rgba(0, 153, 255, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn hoàn tất",
              data: $scope.DonHoanTatNgay,
              borderColor: "#CCFF00",
              backgroundColor: "rgba(204, 255, 0, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn hoàn trả",
              data: $scope.DonHoanTraNgay,
              borderColor: "#8B4513",
              backgroundColor: "rgba(139, 69, 19, 0.2)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Đơn huỷ",
              data: $scope.DonHuyNgay,
              borderColor: "#003333",
              backgroundColor: "rgba(0, 51, 51, 0.2)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
    
                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return label;
                }
            }
        },
              scales:{
                yAxes: [{
                    ticks: {
                      callback: function(value, index, values) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }
                    },
                }]
              },
          title: {
            display: true,
            text:
              "Thống kê tháng " +
              document.querySelector(".choiseMonthtoDay").value +
              " năm " +
              document.querySelector(".choiseYeartoDay").value ,
            fontSize: 20,
          },
          legend: {
            display: true
          },
        },
      });
    }
  }

  $scope.Getthongkedoanhthungay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkedoanhthungay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.Doanhthungay = response.data.map(function (value) {
          return value.doanhThu;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.Getthongkedoanhthungay();

  $scope.Getthongkechingay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongketienchingay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.Tienchingay = response.data.map(function (value) {
          return value.tienChi;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.Getthongkechingay();

  $scope.GetthongkeHDBngay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkehdbngay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.HDBNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeHDBngay();

  $scope.GetthongkeHDNngay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkehdnngay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.HDNNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeHDNngay();

  $scope.GetthongkeKHngay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkekhngay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.KHNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeKHngay();

  $scope.GetthongkeDonHuyngay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkedonhuyngay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.DonHuyNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeDonHuyngay();

  $scope.GetthongkeDonHoanTrangay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkedonhoantrangay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.DonHoanTraNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeDonHoanTrangay();

  $scope.GetthongkeDonHoanTatngay = function () {
    $http({
      method: "POST",
      url:
        current_url +
        "/api-admin/Overview/thongkedonhoantatngay?Nam=" +
        document.querySelector(".choiseYeartoDay").value +
        "&Thang=" +
        document.querySelector(".choiseMonthtoDay").value,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.DonHoanTatNgay = response.data.map(function (value) {
          return value.sl;
        });
        updateChartTheoNgay();
      })
      .catch(function (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      });
  };
  $scope.GetthongkeDonHoanTatngay();

  $(".choiseMonthtoDay, .choiseYeartoDay").on("change", function () {
    $scope.Getthongkedoanhthungay();
    $scope.Getthongkechingay();
    $scope.GetthongkeHDBngay();
    $scope.GetthongkeHDNngay();
    $scope.GetthongkeKHngay();
    $scope.GetthongkeDonHuyngay();
    $scope.GetthongkeDonHoanTrangay();
    $scope.GetthongkeDonHoanTatngay();
  });
});
