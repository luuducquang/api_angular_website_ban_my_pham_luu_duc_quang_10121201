﻿CREATE DATABASE DOAN2

USE DOAN2


CREATE TABLE CaiDats(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Logo NVARCHAR(MAX),
    GioLamViec NVARCHAR(50),
    GiaoHang NVARCHAR(50),
    HoanTien NVARCHAR(50),
    SDTLienHe NVARCHAR(50),
    EmailLienHe NVARCHAR(50),
    FaceBook NVARCHAR(MAX),
    GooglePlus NVARCHAR(MAX),
	Twiter NVARCHAR(MAX),
    YouTube NVARCHAR(MAX),
    Instargram NVARCHAR(MAX),
    GoogleMap NVARCHAR(MAX),
    MatKhauMail NVARCHAR(50)
);

CREATE TABLE KhachHangs(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenKH NVARCHAR(50),
    GioiTinh BIT,
    DiaChi NVARCHAR(MAX),
    SDT NVARCHAR(50),
    Email NVARCHAR(250)
);


CREATE TABLE QuangCaos(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    AnhDaiDien NVARCHAR(MAX),
    LinkQuangCao NVARCHAR(MAX),
    MoTa NVARCHAR(MAX)
);

CREATE TABLE LoaiTaiKhoans(
    MaLoaitaikhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenLoai NVARCHAR(50),
    MoTa NVARCHAR(250)
);

CREATE TABLE TaiKhoans(
    MaTaiKhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenTaiKhoan NVARCHAR(50),
    MatKhau NVARCHAR(50),
    Email NVARCHAR(150)
);

CREATE TABLE ChiTietTaiKhoans(
    MaChitietTaiKhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade,
	MaLoaitaikhoan INT foreign key (MaLoaitaikhoan) references LoaiTaiKhoans(MaLoaitaikhoan) on delete cascade on update cascade,
    HoTen NVARCHAR(50),
    DiaChi NVARCHAR(250),
    SoDienThoai NVARCHAR(11),
    AnhDaiDien NVARCHAR(500)
);

CREATE TABLE DanhMucUudais(
    Madanhmucuudai INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Tendanhmucuudai NVARCHAR(250),
    DacBiet BIT,
    NoiDung NVARCHAR(MAX)
);


CREATE TABLE DanhMucs(
    MaDanhMuc INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenDanhMuc NVARCHAR(50),
    DacBiet BIT,
    NoiDung NVARCHAR(MAX)
);


CREATE TABLE SanPhams(
    MaSanPham INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaDanhMuc INT foreign key (MaDanhMuc) references DanhMucs(MaDanhMuc) on delete cascade on update cascade,
    Madanhmucuudai INT foreign key (Madanhmucuudai) references DanhMucUudais(Madanhmucuudai) on delete cascade on update cascade,
    TenSanPham NVARCHAR(150),
    AnhDaiDien NVARCHAR(350),
    Gia DECIMAL(18, 0),
    GiaGiam DECIMAL(18, 0) DEFAULT 0,
    SoLuong INT,
    TrangThai BIT DEFAULT 0,
    LuotXem INT DEFAULT 0,
    DacBiet BIT
);


CREATE TABLE SlideDetail(
    MaAnh INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TieuDe NVARCHAR(MAX),
    TieuDe1 NVARCHAR(MAX),
    TieuDe2 NVARCHAR(MAX),
    MoTa1 NVARCHAR(MAX),
	MoTa2 NVARCHAR(MAX),
    MoTa3 NVARCHAR(MAX),
    MoTa4 NVARCHAR(MAX),
    LinkAnh NVARCHAR(MAX)
);

CREATE TABLE HoaDons(
    MaHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TrangThai BIT DEFAULT 0,
    NgayTao DATETIME,
    NgayDuyet DATETIME,
    TongGia DECIMAL(18, 0),
    TenKH NVARCHAR(50),
    GioiTinh BIT ,
    Diachi NVARCHAR(250),
    Email NVARCHAR(50),
    SDT NVARCHAR(50),
    DiaChiGiaoHang NVARCHAR(350),
    ThoiGianGiaoHang DATETIME
);


CREATE TABLE ChiTietHoaDons(
    MaChiTietHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDons(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
    TongGia DECIMAL(18, 0)
);


CREATE TABLE HangSanXuats(
    MaNhaSanXuat INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenHang NVARCHAR(50),
    LinkWeb NVARCHAR(MAX),
    AnhDaiDien NVARCHAR(MAX)
);

CREATE TABLE ChiTietSanPhams(
    MaChiTietSanPham INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    MaNhaSanXuat INT foreign key (MaNhaSanXuat) references HangSanXuats(MaNhaSanXuat) on delete cascade on update cascade,
    MoTa NVARCHAR(350) ,
    ChiTiet NVARCHAR(MAX)
);


CREATE TABLE NhaPhanPhois(
    MaNhaPhanPhoi INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenNhaPhanPhoi NVARCHAR(250),
    DiaChi NVARCHAR(MAX),
    SoDienThoai NVARCHAR(50),
    Fax NVARCHAR(50),
    MoTa NVARCHAR(MAX)
);

CREATE TABLE SanPhams_NhaPhanPhois(
    MaSanPham INT NOT NULL foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    MaNhaPhanPhoi INT NOT NULL foreign key (MaNhaPhanPhoi) references NhaPhanPhois(MaNhaPhanPhoi) on delete cascade on update cascade
);

CREATE TABLE HoaDonNhaps(
	MaHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaNhaPhanPhoi INT foreign key (MaNhaPhanPhoi) references NhaPhanPhois(MaNhaPhanPhoi) on delete cascade on update cascade,
    NgayTao DATETIME,
    KieuThanhToan NVARCHAR(MAX),
    MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade
);

CREATE TABLE ChiTietHoaDonNhaps(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDonNhaps(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
    DonViTinh NVARCHAR(50),
    GiaNhap DECIMAL(18, 0),
    TongTien DECIMAL(18, 0)
);


INSERT INTO CaiDats (Logo, GioLamViec, GiaoHang, HoanTien, SDTLienHe, EmailLienHe, FaceBook, GooglePlus, Twiter, YouTube, Instargram, GoogleMap, MatKhauMail)
VALUES 
('logo1.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0987654321', 'contact@example.com', 'facebook.com/page1', NULL, NULL, NULL,NULL, 'google.com/maps', 'password1'),
('logo2.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page2', NULL, NULL, NULL,NULL, 'google.com/maps', 'password2'),
('logo3.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page3', NULL, NULL, NULL,NULL, 'google.com/maps', 'password3'),
('logo4.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page4', NULL, NULL, NULL,NULL, 'google.com/maps', 'password4'),
('logo5.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page5', NULL, NULL, NULL,NULL, 'google.com/maps', 'password5'),
('logo6.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page6', NULL, NULL, NULL,NULL, 'google.com/maps', 'password6')


INSERT INTO KhachHangs (TenKH, GioiTinh, DiaChi, SDT, Email)
VALUES 
(N'Nguyễn Văn A', 1, N'123 Đường ABC, Quận 1, TP.HCM', '0987654321', 'nguyenvana@example.com'),
(N'Trần Thị B', 0, N'456 Đường XYZ, Quận 2, TP.HCM', '0123456789', 'tranthib@example.com'),
(N'Lưu Đức Hải', 0, N'456 Đường XYZ, Quận 3, TP.HCM', '021466462', 'haiday@example.com'),
(N'Lưu Mẫn Nhi', 0, N'456 Đường XYZ, Quận 4, TP.HCM', '0767572232', 'nhine@example.com'),
(N'Nguyễn Thị Mai', 0, N'456 Đường XYZ, Quận 5, TP.HCM', '0757757522', 'maisino@example.com')

INSERT INTO QuangCaos (AnhDaiDien, LinkQuangCao, MoTa)
VALUES 
('quangcao1.jpg', 'link1.com', N'Mô tả quảng cáo 1'),
('quangcao2.jpg', 'link2.com', N'Mô tả quảng cáo 2'),
('quangcao3.jpg', 'link3.com', N'Mô tả quảng cáo 3'),
('quangcao4.jpg', 'link4.com', N'Mô tả quảng cáo 4'),
('quangcao5.jpg', 'link5.com', N'Mô tả quảng cáo 5')

INSERT INTO LoaiTaiKhoans (TenLoai, MoTa)
VALUES 
('Admin', N'Tài khoản quản trị hệ thống'),
('KhachHang', N'Tài khoản người dùng thông thường'),
('KhachHang', N'Tài khoản người dùng thông thường'),
('KhachHang', N'Tài khoản người dùng thông thường'),
('KhachHang', N'Tài khoản người dùng thông thường')


INSERT INTO TaiKhoans (TenTaiKhoan, MatKhau, Email)
VALUES 
( 'admin1', '1', 'admin1@example.com'),
( 'user1', '1', 'user1@example.com'),
( 'user2', '1', 'user1@example.com'),
('user3', '1', 'user1@example.com'),
( 'user4', '1', 'user1@example.com')


INSERT INTO ChiTietTaiKhoans (MaTaiKhoan,MaLoaitaikhoan, HoTen, DiaChi, SoDienThoai, AnhDaiDien)
VALUES 
(1,1, 'Admin 1', N'123 Đường Admin, Quận 1, TP.HCM', '0987654321', 'admin1.jpg'),
(2,2, 'User 1', N'456 Đường User, Quận 2, TP.HCM', '0123456789', 'user1.jpg'),
(3,3, 'User 2', N'456 Đường User, Quận 2, TP.HCM', '0123456789', 'user1.jpg'),
(4,4, 'User 3', N'456 Đường User, Quận 2, TP.HCM', '0123456789', 'user1.jpg'),
(5,5, 'User 4', N'456 Đường User, Quận 2, TP.HCM', '0123456789', 'user1.jpg')

INSERT INTO DanhMucUudais ( Tendanhmucuudai,DacBiet,NoiDung)
VALUES 
( 'FlagSale',null,null),
( 'Mục ưu thích',null,null),
( 'Bán chạy',null,null)


INSERT INTO DanhMucs(TenDanhMuc, DacBiet, NoiDung)
VALUES 
( N'Sữa rửa mặt', 1, N'Nội dung chuyên mục 1'),
( N'Nước tẩy trang', 0, N'Nội dung chuyên mục 2'),
( N'Toner', 0, N'Nội dung chuyên mục 2'),
( N'Kem chống nắng', 0, N'Nội dung chuyên mục 2'),
( N'Serum', 0, N'Nội dung chuyên mục 2')


INSERT INTO SanPhams (MaDanhMuc, Madanhmucuudai, TenSanPham, AnhDaiDien, Gia, GiaGiam, SoLuong, TrangThai, LuotXem, DacBiet)
VALUES 
(1, 1, N'Sản phẩm 1', 'product1.jpg', 100000, 0, 50, 1, 0, 0),
(2, 2, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0, 1),
(3, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0, 1),
(4, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0, 1),
(5, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0, 1)



INSERT INTO SlideDetail (TieuDe, TieuDe1, TieuDe2, MoTa1, MoTa2, MoTa3, MoTa4, LinkAnh)
VALUES 
(N'Tiêu đề 1', N'Tiêu đề 1.1', N'Tiêu đề 1.2', N'Mô tả 1.1', N'Mô tả 1.2', N'Mô tả 1.3', N'Mô tả 1.4', 'image1.jpg'),
(N'Tiêu đề 2', N'Tiêu đề 2.1', N'Tiêu đề 2.2', N'Mô tả 2.1', N'Mô tả 2.2', N'Mô tả 2.3', N'Mô tả 2.4', 'image2.jpg'),
(N'Tiêu đề 3', N'Tiêu đề 3.1', N'Tiêu đề 3.2', N'Mô tả 3.1', N'Mô tả 3.2', N'Mô tả 3.3', N'Mô tả 3.4', 'image3.jpg'),
(N'Tiêu đề 4', N'Tiêu đề 4.1', N'Tiêu đề 4.2', N'Mô tả 4.1', N'Mô tả 4.2', N'Mô tả 4.3', N'Mô tả 4.4', 'image4.jpg'),
(N'Tiêu đề 5', N'Tiêu đề 5.1', N'Tiêu đề 5.2', N'Mô tả 5.1', N'Mô tả 5.2', N'Mô tả 5.3', N'Mô tả 5.4', 'image5.jpg')


INSERT INTO HoaDons (TrangThai, NgayTao, NgayDuyet, TongGia, TenKH, GioiTinh, Diachi, Email, SDT, DiaChiGiaoHang, ThoiGianGiaoHang)
VALUES 
(0, '2023-09-10 10:00:00', NULL, 250000, N'Nguyễn Văn A', 1, N'123 Đường ABC, Quận 1, TP.HCM', 'nguyenvana@example.com', '0987654321', N'123 Đường XYZ, Quận 2, TP.HCM', '2023-09-12 14:00:00'),
(1, '2023-09-11 11:00:00', '2023-09-11 12:00:00', 350000, N'Trần Thị B', 0, N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 1, TP.HCM', '2023-09-13 15:00:00'),
(0, '2023-09-11 11:00:00', '2023-09-11 12:00:00', 350000, N'Trần Thị B', 0, N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 2, TP.HCM', '2023-09-13 15:00:00'),
(1, '2023-09-11 11:00:00', '2023-09-11 12:00:00', 350000, N'Trần Thị B', 0, N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 3, TP.HCM', '2023-09-13 15:00:00'),
(0, '2023-09-11 11:00:00', '2023-09-11 12:00:00', 350000, N'Trần Thị B', 0, N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 4, TP.HCM', '2023-09-13 15:00:00')


INSERT INTO ChiTietHoaDons (MaHoaDon, MaSanPham, SoLuong, TongGia)
VALUES 
(1, 1, 2, 200000),
(1, 2, 1, 50000),
(2, 2, 1, 70000),
(3, 2, 1, 90000),
(3, 2, 1, 40000)


INSERT INTO HangSanXuats (TenHang, LinkWeb, AnhDaiDien)
VALUES 
(N'Nhà sản xuất 1', 'manufacturer1.com', 'manufacturer1.jpg'),
(N'Nhà sản xuất 2', 'manufacturer2.com', 'manufacturer2.jpg'),
(N'Nhà sản xuất 3', 'manufacturer3.com', 'manufacturer3.jpg'),
(N'Nhà sản xuất 4', 'manufacturer4.com', 'manufacturer4.jpg'),
(N'Nhà sản xuất 5', 'manufacturer5.com', 'manufacturer5.jpg')


INSERT INTO ChiTietSanPhams (MaSanPham, MaNhaSanXuat, MoTa, ChiTiet)
VALUES 
(1, 1, N'Mô tả sản phẩm 1', N'Chi tiết sản phẩm 1'),
(2, 2, N'Mô tả sản phẩm 2', N'Chi tiết sản phẩm 2'),
(3, 2, N'Mô tả sản phẩm 3', N'Chi tiết sản phẩm 3'),
(4, 2, N'Mô tả sản phẩm 4', N'Chi tiết sản phẩm 4'),
(5, 2, N'Mô tả sản phẩm 5', N'Chi tiết sản phẩm 5')


INSERT INTO NhaPhanPhois (TenNhaPhanPhoi, DiaChi, SoDienThoai, Fax, MoTa)
VALUES 
(N'Nhà phân phối 1', N'123 Đường PPP, Quận 1, TP.HCM', '0987654321', '12345', N'Mô tả nhà phân phối 1'),
(N'Nhà phân phối 2', N'456 Đường PPP, Quận 2, TP.HCM', '0123456789', '67890', N'Mô tả nhà phân phối 2'),
(N'Nhà phân phối 3', N'456 Đường PPP, Quận 3, TP.HCM', '0123456789', '67890', N'Mô tả nhà phân phối 3'),
(N'Nhà phân phối 4', N'456 Đường PPP, Quận 4, TP.HCM', '0123456789', '67890', N'Mô tả nhà phân phối 4'),
(N'Nhà phân phối 5', N'456 Đường PPP, Quận 5, TP.HCM', '0123456789', '67890', N'Mô tả nhà phân phối 5')


INSERT INTO SanPhams_NhaPhanPhois (MaSanPham, MaNhaPhanPhoi)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5)


INSERT INTO HoaDonNhaps (MaNhaPhanPhoi, NgayTao, KieuThanhToan, MaTaiKhoan)
VALUES 
(1, '2023-09-10 10:00:00', N'Thanh toán trực tiếp', 1),
(2, '2023-09-11 11:00:00', N'Thanh toán qua ngân hàng', 2),
(3, '2023-09-11 11:00:00', N'Thanh toán qua ngân hàng', 3),
(4, '2023-09-11 11:00:00', N'Thanh toán qua ngân hàng', 4),
(5, '2023-09-11 11:00:00', N'Thanh toán qua ngân hàng', 5)


INSERT INTO ChiTietHoaDonNhaps (MaHoaDon, MaSanPham, SoLuong, DonViTinh, GiaNhap, TongTien)
VALUES 
(1, 1, 100, N'Hộp', 5000, 500000),
(1, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000)


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_themkhachhang(
@TenKH nvarchar(50),
@GioiTinh bit,
@DiaChi nvarchar(250),
@SDT nvarchar(50),
@Email nvarchar(250))
as
begin
	insert into KhachHangs(TenKH,GioiTinh,DiaChi,SDT,Email)
	values (@TenKH,@GioiTinh,@DiaChi,@SDT,@Email)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_suakhachhang(@Id int,@TenKH nvarchar(50),
@GioiTinh bit,
@DiaChi nvarchar(250),
@SDT nvarchar(50),
@Email nvarchar(250))
as
begin
	update KhachHangs
	set TenKH = @TenKH,GioiTinh = @GioiTinh,DiaChi = @DiaChi,SDT = @SDT,Email = @Email
	where Id = @Id 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoakhachhang(@Id int)
as
begin
	delete from KhachHangs where Id = @Id
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getallkhachhang
as
begin
	select*from KhachHangs
end


-------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE sp_khach_hang_search (@page_index  INT, 
                                       @page_size   INT,
									   @TenKH Nvarchar(50),
									   @DiaChi nvarchar(250))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY TenKH ASC)) AS RowNumber, 
                              K.Id, 
                              K.TenKH,
							  K.DiaChi
                        INTO #Results1
                        FROM KhachHangs AS K
					    WHERE (@TenKH = '' or K.TenKH like N'%'+@TenKH +'%') and
						(@DiaChi = '' or k.DiaChi like N'%'+@DiaChi +'%');
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY TenKH ASC)) AS RowNumber, 
                              K.Id, 
                              K.TenKH,
							  K.DiaChi
                        INTO #Results2
                        FROM KhachHangs AS K
					    WHERE (@TenKH = '' or K.TenKH like N'%'+@TenKH +'%') and
						(@DiaChi = '' or k.DiaChi like N'%'+@DiaChi +'%');
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
        END;
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_quang_cao
as
begin
	select *from QuangCaos
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_themquangcao(
@AnhDaiDien nvarchar(max),
@LinkQuangCao nvarchar(max),
@MoTa nvarchar(max))
as
begin
	insert into QuangCaos(AnhDaiDien,LinkQuangCao,MoTa)
	values (@AnhDaiDien,@LinkQuangCao,@MoTa)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_suaquangcao(@Id int,@AnhDaiDien nvarchar(max),
@LinkQuangCao nvarchar(max),
@MoTa nvarchar(max))
as
begin
	update QuangCaos
	set AnhDaiDien = @AnhDaiDien,LinkQuangCao = @LinkQuangCao,MoTa = @MoTa
	where Id = @Id 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoaquangcao(@Id int)
as
begin
	delete from QuangCaos where Id = @Id
end


-------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE sp_quang_cao_search (@page_index  INT, 
                                       @page_size   INT,
									   @AnhDaiDien Nvarchar(max),
									   @LinkQuangCao  Nvarchar(max),
									   @MoTa  Nvarchar(max))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY AnhDaiDien ASC)) AS RowNumber, 
                              K.Id, 
                              K.AnhDaiDien,
							  K.LinkQuangCao,
							  K.MoTa
                        INTO #Results1
                        FROM QuangCaos AS K
					    WHERE (@AnhDaiDien = '' or K.AnhDaiDien like N'%'+@AnhDaiDien +'%') and
						(@LinkQuangCao = '' or k.LinkQuangCao like N'%'+@LinkQuangCao +'%') and
						(@MoTa = '' or k.MoTa like N'%'+@MoTa +'%');
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY AnhDaiDien ASC)) AS RowNumber, 
                              K.Id, 
                              K.AnhDaiDien,
							  K.LinkQuangCao,
							  K.MoTa
                        INTO #Results2
                        FROM QuangCaos AS K
					    WHERE (@AnhDaiDien = '' or K.AnhDaiDien like N'%'+@AnhDaiDien +'%') and
						(@LinkQuangCao = '' or k.LinkQuangCao like N'%'+@LinkQuangCao +'%') and
						(@MoTa = '' or k.MoTa like N'%'+@MoTa +'%');
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
        END;
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_silde_detail
as
begin
	select*from SlideDetail
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_slide(
@TieuDe nvarchar(max),
@TieuDe1 nvarchar(max),
@TieuDe2 nvarchar(max),
@MoTa1 nvarchar(max),
@MoTa2 nvarchar(max),
@MoTa3 nvarchar(max),
@MoTa4 nvarchar(max),
@LinkAnh nvarchar(max))
as
begin
	insert into SlideDetail(TieuDe,TieuDe1,TieuDe2,MoTa1,MoTa2,MoTa3,MoTa4,LinkAnh)
	values (@TieuDe,@TieuDe1,@TieuDe2,@MoTa1,@MoTa2,@MoTa3,@MoTa4,@LinkAnh)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_suaslide(@MaAnh int,@TieuDe nvarchar(max),
@TieuDe1 nvarchar(max),
@TieuDe2 nvarchar(max),
@MoTa1 nvarchar(max),
@MoTa2 nvarchar(max),
@MoTa3 nvarchar(max),
@MoTa4 nvarchar(max),
@LinkAnh nvarchar(max))
as
begin
	update SlideDetail
	set TieuDe = @TieuDe,TieuDe1 = @TieuDe1,TieuDe2 = @TieuDe2,MoTa1 = @MoTa1,MoTa2 = @MoTa2,MoTa3 = @MoTa3,MoTa4 = @MoTa4,LinkAnh = @LinkAnh
	where MaAnh = @MaAnh 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoaslide(@MaAnh int)
as
begin
	delete from SlideDetail where MaAnh = @MaAnh 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_caidat
as
begin
	select*from CaiDats
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_cai_dat(@Logo nvarchar(MAX),
@GioLamViec nvarchar(50),
@GiaoHang nvarchar(50),
@HoanTien nvarchar(50),
@SDTLienHe nvarchar(50),
@EmailLienHe nvarchar(50),
@FaceBook nvarchar(MAX),
@GooglePlus nvarchar(MAX),
@Twiter nvarchar(MAX),
@YouTube nvarchar(MAX),
@Instargram nvarchar(MAX),
@GoogleMap nvarchar(MAX),
@MatKhauMail nvarchar(50))
as
begin
	insert into CaiDats(Logo,GioLamViec,GiaoHang,HoanTien,SDTLienHe,EmailLienHe,FaceBook,
	GooglePlus,Twiter,YouTube,Instargram,GoogleMap,MatKhauMail)
	values(@Logo,@GioLamViec,@GiaoHang,@HoanTien,@SDTLienHe,@EmailLienHe,@FaceBook,
	@GooglePlus,@Twiter,@YouTube,@Instargram,@GoogleMap,@MatKhauMail)
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_cai_dat(@Id int,
@Logo nvarchar(MAX),
@GioLamViec nvarchar(50),
@GiaoHang nvarchar(50),
@HoanTien nvarchar(50),
@SDTLienHe nvarchar(50),
@EmailLienHe nvarchar(50),
@FaceBook nvarchar(MAX),
@GooglePlus nvarchar(MAX),
@Twiter nvarchar(MAX),
@YouTube nvarchar(MAX),
@Instargram nvarchar(MAX),
@GoogleMap nvarchar(MAX),
@MatKhauMail nvarchar(50))
as
begin
	update CaiDats
	set	Logo=@Logo,GioLamViec=@GioLamViec,GiaoHang=@GiaoHang,HoanTien=@HoanTien,SDTLienHe=@SDTLienHe,EmailLienHe=@EmailLienHe,FaceBook=@FaceBook,
	GooglePlus=@GooglePlus,Twiter=@Twiter,Youtube=@YouTube,Instargram=@Instargram,GoogleMap=@GoogleMap,MatKhauMail=@MatKhauMail
	where Id = @Id
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_cai_dat(@Id int)
as
begin
	delete from CaiDats
	where Id = @Id
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_loaitaikhoan
as
begin
	select*from LoaiTaiKhoans
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_loaitaikhoan(@TenLoai nvarchar(50),@MoTa nvarchar(250))
as
begin
	insert into LoaiTaiKhoans(TenLoai,MoTa)
	values(@TenLoai,@MoTa)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_loaitaikhoan(@MaLoaitaikhoan int,@TenLoai nvarchar(50),@MoTa nvarchar(250))
as
begin
	update LoaiTaiKhoans
	set TenLoai = @TenLoai, MoTa=@MoTa
	where MaLoaitaikhoan = @MaLoaitaikhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_loaitaikhoan(@MaLoaitaikhoan int)
as
begin
	delete from LoaiTaiKhoans
	where MaLoaitaikhoan = @MaLoaitaikhoan
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_taikhoan(
@TenTaiKhoan nvarchar(50),
@MatKhau nvarchar(50),
@Email nvarchar(150),
@list_json_chitiet_taikhoan NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaTaiKhoan INT;
		DECLARE @MaLoaiTaiKhoan INT;
		DECLARE @USER int
		Set @USER = (SELECT COUNT(TenTaiKhoan) from TaiKhoans where TenTaiKhoan =@TenTaiKhoan)
        if(@USER=0)
		BEGIN
			INSERT INTO TaiKhoans
					(TenTaiKhoan, 
					 MatKhau, 
					 Email               
					)
					VALUES
					(@TenTaiKhoan, 
					 @MatKhau, 
					 @Email
					);

					SET @MaTaiKhoan = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiet_taikhoan IS NOT NULL)
						BEGIN
							INSERT INTO ChiTietTaiKhoans
							 (MaTaiKhoan,
							 MaLoaitaikhoan,
							 HoTen,
							 DiaChi,
							 SoDienThoai,
							 AnhDaiDien)
						SELECT	@MaTaiKhoan,
								JSON_VALUE(y.value, '$.maLoaitaikhoan') ,
								JSON_VALUE(y.value, '$.hoTen') ,
								JSON_VALUE(y.value, '$.diaChi') ,
								JSON_VALUE(y.value, '$.soDienThoai') ,
								JSON_VALUE(y.value, '$.anhDaiDien') 
						FROM OPENJSON(@list_json_chitiet_taikhoan) AS y;
						END;
			END


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_update_taikhoan(
@MaTaiKhoan int,
@MatKhau nvarchar(50),
@Email nvarchar(150),
@list_json_chitiet_taikhoan NVARCHAR(MAX)
)
as
BEGIN
		BEGIN
			Update TaiKhoans
			Set MatKhau =@MatKhau,Email =@Email
			WHERE MaTaiKhoan = @MaTaiKhoan

					IF(@list_json_chitiet_taikhoan IS NOT NULL)
						BEGIN
							Update ChiTietTaiKhoans
							Set
								HoTen =  JSON_VALUE(y.value, '$.hoTen'),
								DiaChi = JSON_VALUE(y.value, '$.diaChi'),
								SoDienThoai =  JSON_VALUE(y.value, '$.soDienThoai'),
								AnhDaiDien =  JSON_VALUE(y.value, '$.anhDaiDien')
							from OPENJSON(@list_json_chitiet_taikhoan) AS y
							Where MaChitietTaiKhoan = @MaTaiKhoan
						END;
			END


        SELECT '';
    END;


EXEC sp_update_taikhoan
   @MaTaiKhoan = 5,
   @MatKhau = 'quang123',
   @Email = 'quang@988133',
   @list_json_chitiet_taikhoan = N'[{"hoTen": "Lưu Đức Quang",
									"diaChi":"Hưng Yên",
									"soDienThoai":"0837465729",
									"anhDaiDien":"aaa"}]'





-------------------------------------------------------------------------------------------------------------------------------
create proc sp_doimk_taikhoan(@TenTaiKhoan nvarchar(50),@MatKhau nvarchar(50))
as
begin
	update TaiKhoans
	set MatKhau = @MatKhau
	where TenTaiKhoan = @TenTaiKhoan
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_chitiettaikhoan(@MaChitietTaiKhoan int,
@HoTen nvarchar(50),
@DiaChi nvarchar(250),
@SoDienThoai nvarchar(11),
@AnhDaiDien nvarchar(500))
as
begin
	update ChiTietTaiKhoans
	set HoTen = @HoTen, DiaChi = @DiaChi, SoDienThoai = @SoDienThoai, AnhDaiDien = @AnhDaiDien
	where MaChitietTaiKhoan = @MaChitietTaiKhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_danhmucuudai
as
begin
	select*from DanhMucUudais
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_danhmucuudai(
@Tendanhmucuudai nvarchar(250),@Dacbiet bit,@NoiDung nvarchar(MAX))
as
begin
	insert into DanhMucUudais(Tendanhmucuudai,DacBiet,NoiDung)
	values(@Tendanhmucuudai,@Dacbiet,@NoiDung)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_danhmucuudai(@Madanhmucuudai int,
@Tendanhmucuudai nvarchar(250),@Dacbiet bit,@NoiDung nvarchar(MAX))
as
begin
	update DanhMucUudais
	set Tendanhmucuudai = @Tendanhmucuudai, DacBiet = @Dacbiet, NoiDung = @NoiDung
	where Madanhmucuudai = @Madanhmucuudai
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_danhmucuudai(@Madanhmucuudai int)
as
begin
	delete from DanhMucUudais
	where Madanhmucuudai = @Madanhmucuudai
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_danhmuc
as
begin
	select * from DanhMucs
end


-------------------------------------------------------------------------------------------------------------------------------
Create proc sp_them_danhmuc(
@TenDanhMuc nvarchar(250),@Dacbiet bit,@NoiDung nvarchar(MAX))
as
begin
	insert into DanhMucs(TenDanhMuc,DacBiet,NoiDung)
	values(@TenDanhMuc,@Dacbiet,@NoiDung)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_danhmuc(@MaDanhMuc int,
@TenDanhMuc nvarchar(250),@Dacbiet bit,@NoiDung nvarchar(MAX))
as
begin
	update DanhMucs
	set TenDanhMuc = @TenDanhMuc, DacBiet = @Dacbiet, NoiDung = @NoiDung
	where MaDanhMuc = @MaDanhMuc
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_danhmuc(@Madanhmuc int)
as
begin
	delete from DanhMucs
	where MaDanhMuc = @Madanhmuc
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_hangsanxuat
as
begin
	select * from HangSanXuats
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_hangsanxuat(@TenHang nvarchar(50), @LinkWeb nvarchar(max), @AnhDaiDien nvarchar(50))
as
begin
	insert into HangSanXuats(TenHang,LinkWeb,AnhDaiDien)
	values(@TenHang,@LinkWeb,@AnhDaiDien)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_hangsanxuat(@MaNhaSanXuat int, @TenHang nvarchar(50), @LinkWeb nvarchar(max), @AnhDaiDien nvarchar(50))
as
begin
	update HangSanXuats
	set TenHang = @TenHang,LinkWeb =@LinkWeb, AnhDaiDien=@AnhDaiDien
	where MaNhaSanXuat = @MaNhaSanXuat
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_nhasanxuat(@MaNhaSanXuat int)
as
begin
	delete from HangSanXuats
	where MaNhaSanXuat = @MaNhaSanXuat
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_nhaphanphoi
as
begin
	select*from NhaPhanPhois
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_nhaphanphoi(@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@Fax nvarchar(50),@MoTa nvarchar(max))
as
begin
	insert into NhaPhanPhois(TenNhaPhanPhoi,DiaChi,SoDienThoai,Fax,MoTa)
	values(@TenNhaPhanPhoi,@DiaChi,@SoDienThoai,@Fax,@MoTa)
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_nhaphanphoi(@MaNhaPhanPhoi int,@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@Fax nvarchar(50),@MoTa nvarchar(max))
as
begin
	update NhaPhanPhois
	set TenNhaPhanPhoi = @TenNhaPhanPhoi, DiaChi =@DiaChi,SoDienThoai =@SoDienThoai,Fax=@Fax, MoTa = @MoTa
	where MaNhaPhanPhoi = @MaNhaPhanPhoi
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_nhaphanphoi(@MaNhaPhanPhoi int)
as
begin
	delete from NhaPhanPhois
	where MaNhaPhanPhoi = @MaNhaPhanPhoi
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_sanpham(
@MaDanhMuc int,
@Madanhmucuudai int,
@TenSanPham nvarchar(150),
@AnhDaiDien nvarchar(150),
@Gia decimal(18, 0),
@GiaGiam decimal(18, 0),
@SoLuong int,
@TrangThai bit,
@LuotXem int,
@DacBiet bit,
@list_json_chitiet_sanpham NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaSanPham INT;
		BEGIN
			INSERT INTO SanPhams
					(MaDanhMuc, 
					 Madanhmucuudai, 
					 TenSanPham,
					 AnhDaiDien,
					 Gia,
					 GiaGiam,
					 SoLuong,
					 TrangThai,
					 LuotXem,
					 DacBiet
					)
					VALUES
					(@MaDanhMuc, 
					 @Madanhmucuudai, 
					 @TenSanPham,
					 @AnhDaiDien,
					 @Gia,
					 @GiaGiam,
					 @SoLuong,
					 @TrangThai,
					 @LuotXem,
					 @DacBiet
					);

					SET @MaSanPham = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiet_sanpham IS NOT NULL)
						BEGIN
							INSERT INTO ChiTietSanPhams
							 (
							 MaSanPham,
							 MaNhaSanXuat,
							 MoTa,
							 ChiTiet)
						SELECT	@MaSanPham,
								JSON_VALUE(y.value, '$.maNhaSanXuat') ,
								JSON_VALUE(y.value, '$.moTa') ,
								JSON_VALUE(y.value, '$.chiTiet') 
						FROM OPENJSON(@list_json_chitiet_sanpham) AS y;
						END;
			END


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_update_sanpham(
@MaSanPham int,
@MaDanhMuc int,
@Madanhmucuudai int,
@TenSanPham nvarchar(150),
@AnhDaiDien nvarchar(150),
@Gia decimal(18, 0),
@GiaGiam decimal(18, 0),
@SoLuong int,
@TrangThai bit,
@LuotXem int,
@DacBiet bit,
@list_json_chitiet_sanpham NVARCHAR(MAX)
)
as
BEGIN
		update SanPhams
		set MaDanhMuc = @MaDanhMuc,
			Madanhmucuudai = @Madanhmucuudai,
			TenSanPham = @TenSanPham,
			AnhDaiDien = @AnhDaiDien,
			Gia = @Gia,
			GiaGiam = @GiaGiam,
			SoLuong = @SoLuong,
			TrangThai = @TrangThai,
			LuotXem = @LuotXem,
			DacBiet = @DacBiet
		where MaSanPham =@MaSanPham
		
					IF(@list_json_chitiet_sanpham IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maChiTietSanPham') as MaChiTietSanPham,
								JSON_VALUE(p.value, '$.maSanPham') as MaSanPham, 
								JSON_VALUE(p.value, '$.maNhaSanXuat') as MaNhaSanXuat,
								JSON_VALUE(p.value, '$.moTa') as MoTa,
								JSON_VALUE(p.value, '$.chiTiet')as ChiTiet,
								JSON_VALUE(p.value, '$.status') as Status
								INTO #Result
							FROM OPENJSON(@list_json_chitiet_sanpham) AS p;

							--insert status =1
							Insert into ChiTietSanPhams(MaSanPham,MaNhaSanXuat,MoTa,ChiTiet)
							select @MaSanPham,
									#Result.maNhaSanXuat,
									#Result.moTa,
									#Result.chiTiet
							from #Result
							where #Result.Status = 1

							--update status =2 
							Update ChiTietSanPhams
							set MaNhaSanXuat= #Result.maNhaSanXuat,
								MoTa = #Result.moTa,
								ChiTiet = #Result.chiTiet
							from #Result
							where ChiTietSanPhams.MaChiTietSanPham=#Result.maChiTietSanPham and #Result.status = '2'

							--delete status =3
							delete c 
							from ChiTietSanPhams c
							inner join #Result r on c.maChiTietSanPham = r.maChiTietSanPham
							where r.status = '3'
							drop table #Result

						END;
			


        SELECT '';
    END;
