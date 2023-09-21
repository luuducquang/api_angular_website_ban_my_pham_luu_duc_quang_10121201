using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Helper;
using BussinessLayer.Interfaces;
using BussinessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<IKhachHangBUS, KhachHangBUS>();
builder.Services.AddTransient<IQuangCaoBUS, QuangCaoBUS>();
builder.Services.AddTransient<ISlideDetailBUS, SlideDetailBUS>();
builder.Services.AddTransient<ICaidatBUS, CaiDatBUS>();
builder.Services.AddTransient<ITaiKhoanBUS, TaiKhoanBUS>();
builder.Services.AddTransient<ILoaiTaiKhoanBUS, LoaiTaiKhoanBUS>();
builder.Services.AddTransient<IChiTietTaiKhoanBUS, ChiTietTaiKhoanBUS>();
builder.Services.AddTransient<IDanhMucUuDaiBUS, DanhMucUuDaiBUS>();
builder.Services.AddTransient<IDanhMucBUS, DanhMucBUS>();
builder.Services.AddTransient<IHangSanXuatBUS, HangSanXuatBUS>();
builder.Services.AddTransient<INhaPhanPhoiBUS, NhaPhanPhoiBUS>();
builder.Services.AddTransient<ISanPhamBUS, SanPhamBUS>();
builder.Services.AddTransient<IHoaDonBUS, HoaDonBUS>();
builder.Services.AddTransient<IHoaDonNhapBUS, HoaDonNhapBUS>();
builder.Services.AddTransient<IKhachHangResponsitory, KhachHangResponsitory>();
builder.Services.AddTransient<IQuangCaoResponsitory, QuangCaoResponsitory>();
builder.Services.AddTransient<ISlideDetailResponsitory, SlideDetailResponsitory>();
builder.Services.AddTransient<ICaidatResponsitory, CaidatResponsitory>();
builder.Services.AddTransient<ITaiKhoanResponsitory, TaiKhoanResponsitory>();
builder.Services.AddTransient<ILoaiTaiKhoanResponsitory, LoaiTaiKhoanResponsitory>();
builder.Services.AddTransient<IChiTietTaiKhoanResponsitory, ChiTietTaiKhoanResponsitory>();
builder.Services.AddTransient<IDanhMucUuDaiResponsitory, DanhMucUuDaiResponsitory>();
builder.Services.AddTransient<IDanhMucResponsitory, DanhMucResponsitory>();
builder.Services.AddTransient<IHangSanXuatResponsitory, HangSanXuatResponsitory>();
builder.Services.AddTransient<INhaPhanPhoiResponsitory, NhaPhanPhoiResponsitory>();
builder.Services.AddTransient<ISanPhamResponsitory, SanPhamResponsitory>();
builder.Services.AddTransient<IHoaDonResponsitory, HoaDonResponsitory>();
builder.Services.AddTransient<IHoaDonNhapResponsitory, HoaDonNhapResponsitory>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddCors(option=>
//{
//    option.AddDefaultPolicy(
//        policy =>
//        {
//            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
//        });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

//app.UseCors();

