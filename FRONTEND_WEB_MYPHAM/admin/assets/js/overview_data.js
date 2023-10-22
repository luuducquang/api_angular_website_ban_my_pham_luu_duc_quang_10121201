app.controller("OverviewCtrl", function ($scope, $http) {
  $scope.DataOverview;
  $scope.GetOverview = function () {
    $http
      .get(current_url + "/api/Overview/tong-quan")
      .then(function (response) {
        $scope.DataOverview = response.data;
        $scope.Tienchi = VND.format($scope.DataOverview.tienChi);
        $scope.DoanhThu = VND.format($scope.DataOverview.doanhThu);
      });
  };
  $scope.GetOverview();

  $scope.Getspbanchaythang = function () {
    $http
      .get(
        current_url + "/api/Overview/sp-banchaythang"
      )
      .then(function (response) {
        $scope.Spbanchaythang = response.data
      });
  };
  $scope.Getspbanchaythang()

  $scope.Getspsaphet = function () {
    $http
      .get(
        current_url + "/api/Overview/sp-saphet"
      )
      .then(function (response) {
        $scope.Spsaphet = response.data
      });
  };
  $scope.Getspsaphet()

  //--------------------------------------------------------------------------------------------------
  let myChart;

  function updateChart() {
    if (myChart) {
      myChart.data.datasets[0].data = $scope.Thongketienchinam;
      myChart.data.datasets[1].data = $scope.Thongkenam;
      myChart.data.datasets[2].data = $scope.ThongkeHDBnam;
      myChart.data.datasets[3].data = $scope.ThongkeHDNnam;
      myChart.data.datasets[4].data = $scope.ThongkeKHnam;
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
              fill: false,
            },
            {
                label: "Doanh thu",
              data: $scope.Thongkenam,
              borderColor: "#66CC00",
              fill: false,
            },{
                label: "Hoá đơn bán",
                data: $scope.ThongkeHDBnam,
                borderColor: "#0099FF",
                fill: false,
              },{
                label: "Hoá đơn nhập",
                data: $scope.ThongkeHDNnam,
                borderColor: "#FF6600",
                fill: false,
              },{
                label: "khách hàng",
                data: $scope.ThongkeKHnam,
                borderColor: "#FFCC00",
                fill: false,
              },
          ],
        },
        options: {
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            display: true,
            // labels: {
            //   generateLabels: function (chart) {
            //     const labels =
            //       Chart.defaults.global.legend.labels.generateLabels(chart);
            //     labels.forEach((label, index) => {
            //       if (index === 0) {
            //         label.text = "Tiền chi";
            //       } else if (index === 1) {
            //         label.text = "Doanh thu";
            //       }else if (index === 2) {
            //         label.text = "Hoá đơn bán";
            //       }else if (index === 3) {
            //         label.text = "Hóa đơn nhập";
            //       }else if (index === 4) {
            //         label.text = "Khách hàng";
            //       }
            //     });
            //     return labels;
            //   },
            // },
          },
        },
      });
    }
  }

  $scope.GetThongkenam = function () {
    $http
      .get(
        current_url +
          "/api/Overview/thongkedoanhthutheonam/" +
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
          "/api/Overview/thongketienchitheonam/" +
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
          "/api/Overview/thongkehoadonbantheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeHDNnam = response.data.map(function (value) {
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
          "/api/Overview/thongkehoadonnhaptheonam/" +
          document.querySelector(".choiseYear").value
      )
      .then(function (response) {
        $scope.ThongkeHDBnam = response.data.map(function (value) {
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
          "/api/Overview/thongkekhachhangtheonam/" +
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

  $(".choiseYear").on("change", function () {
    $scope.GetThongkenam();
    $scope.GetThongketienchinam();
    $scope.GetThongkeHDBnam();
    $scope.GetThongkeHDNnam();
    $scope.GetThongkeKHnam();
  });

  //--------------------------------------------------------------------------------------------------
  var CharDay;

  function updateChartTheoNgay() {
    if (CharDay) {
      CharDay.data.datasets[0].data = $scope.Tienchingay;
      CharDay.data.datasets[1].data = $scope.Doanhthungay;
      CharDay.data.datasets[2].data = $scope.HDBNgay;
      CharDay.data.datasets[3].data = $scope.HDNNgay;
      CharDay.data.datasets[4].data = $scope.KHNgay;
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
                fill: false,
              },
              {
                label: "Doanh thu",
                data: $scope.Doanhthungay,
                borderColor: "#66CC00",
                fill: false,
              },{
                label: "Hoá đơn bán",
                  data: $scope.HDBNgay,
                  borderColor: "#0099FF",
                  fill: false,
                },{
                    label: "Hoá đơn nhập",
                  data: $scope.HDNNgay,
                  borderColor: "#FF6600",
                  fill: false,
                },{
                    label: "Khách hàng",
                  data: $scope.KHNgay,
                  borderColor: "#FFCC00",
                  fill: false,
                },
          ],
        },
        options: {
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            display: true,
            // labels: {
            //   generateLabels: function (chart) {
            //     const labels =
            //       Chart.defaults.global.legend.labels.generateLabels(chart);
            //     labels.forEach((label, index) => {
            //       if (index === 0) {
            //         label.text = "Tiền chi";
            //       } else if (index === 1) {
            //         label.text = "Doanh thu";
            //       }else if (index === 2) {
            //         label.text = "Hoá đơn bán";
            //       }else if (index === 3) {
            //         label.text = "Hóa đơn nhập";
            //       }else if (index === 4) {
            //         label.text = "Khách hàng";
            //       }
            //     });
            //     return labels;
            //   },
            // },
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
        "/api/Overview/thongkedoanhthungay?Nam=" +
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
        "/api/Overview/thongketienchingay?Nam=" +
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
        "/api/Overview/thongkehdbngay?Nam=" +
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
        "/api/Overview/thongkehdnngay?Nam=" +
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
        "/api/Overview/thongkekhngay?Nam=" +
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

  $(".choiseMonthtoDay, .choiseYeartoDay").on("change", function () {
    $scope.Getthongkedoanhthungay();
    $scope.Getthongkechingay();
    $scope.GetthongkeHDBngay();
    $scope.GetthongkeHDNngay();
    $scope.GetthongkeKHngay();
  });
});
