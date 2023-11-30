CREATE DATABASE DOAN2

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
    TenTaiKhoan NVARCHAR(50) UNIQUE,
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
    AnhDaiDien NVARCHAR(MAX)
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
    AnhDaiDien NVARCHAR(MAX),
    Gia DECIMAL(18, 0) DEFAULT 0,
    GiaGiam DECIMAL(18, 0) DEFAULT 0,
    SoLuong INT DEFAULT 0,
	TrongLuong nvarchar(100),
    TrangThai BIT DEFAULT 0,
    LuotXem INT DEFAULT 0,
	LuotBan INT DEFAULT 0,
	DanhGia FLOAT DEFAULT 0,
	XuatXu nvarchar(50)
);


CREATE TABLE DanhGia(
	MaDanhGia INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
	MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade,
	AnhDanhGia NVARCHAR(MAX),
	ChatLuong float,
	NoiDung NVARCHAR(MAX),
	TrangThai BIT,
	ThoiGian DATETIME,
	GhiChu nvarchar(max)
)



CREATE TABLE AnhSanPhams(
	Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
	LinkAnh NVARCHAR(MAX)
)


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
    TongGia DECIMAL(18, 0),
    TenKH NVARCHAR(50),
    Diachi NVARCHAR(250),
    Email NVARCHAR(50),
    SDT NVARCHAR(50),
    DiaChiGiaoHang NVARCHAR(350),
	TrangThai nvarchar(50),
	MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade
);




CREATE TABLE ChiTietHoaDons(
    MaChiTietHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDons(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
	DonGia DECIMAL(18, 0),
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
    MoTa NVARCHAR(MAX) ,
    ChiTiet NVARCHAR(MAX)
);


CREATE TABLE NhaPhanPhois(
    MaNhaPhanPhoi INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenNhaPhanPhoi NVARCHAR(250),
    DiaChi NVARCHAR(MAX),
    SoDienThoai NVARCHAR(50),
    LinkWeb nvarchar(max),
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
	TongTien DECIMAL(18, 0),
    MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade
);


CREATE TABLE ChiTietHoaDonNhaps(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDonNhaps(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references SanPhams(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
    DonViTinh NVARCHAR(50),
    GiaNhap DECIMAL(18, 0),
    TongGia DECIMAL(18, 0)
);


INSERT INTO CaiDats (Logo, GioLamViec, GiaoHang, HoanTien, SDTLienHe, EmailLienHe, FaceBook, GooglePlus, Twiter, YouTube, Instargram, GoogleMap, MatKhauMail)
VALUES 
('logo1.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0987654321', 'contact@example.com', 'facebook.com/page1', NULL, NULL, NULL,NULL, 'google.com/maps', 'password1'),
('logo2.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page2', NULL, NULL, NULL,NULL, 'google.com/maps', 'password2'),
('logo3.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page3', NULL, NULL, NULL,NULL, 'google.com/maps', 'password3'),
('logo4.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page4', NULL, NULL, NULL,NULL, 'google.com/maps', 'password4'),
('logo5.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page5', NULL, NULL, NULL,NULL, 'google.com/maps', 'password5'),
('logo6.jpg', '8h', N'Giao hàng nhanh', N'Chính sách hoàn tiền', '0123456789', 'info@example.com', 'facebook.com/page6', NULL, NULL, NULL,NULL, 'google.com/maps', 'password6')

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


INSERT INTO SanPhams (MaDanhMuc, Madanhmucuudai, TenSanPham, AnhDaiDien, Gia, GiaGiam, SoLuong, TrangThai, LuotXem,XuatXu)
VALUES 
(1, 1, N'Sản phẩm 1', 'product1.jpg', 100000, 0, 50, 1, 0,'Canada'),
(2, 2, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0,'Canada'),
(3, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 1,'Canada'),
(4, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 1,'Canada'),
(5, 3, N'Sản phẩm 2', 'product2.jpg', 150000, 20000, 30, 1, 0,'Canada')


INSERT INTO AnhSanPhams(MaSanPham, LinkAnh)
VALUES 
(1,'document/product1.jpg' ),
(2,'document/product2.jpg' ),
(3,'document/product3.jpg' ),
(4,'document/product4.jpg' ),
(5,'document/product5.jpg' )



INSERT INTO SlideDetail (TieuDe,MoTa, LinkAnh)
VALUES 
(N'Tiêu đề 1', N'Mô tả 1.4', 'image1.jpg'),
(N'Tiêu đề 2', N'Mô tả 2.4', 'image2.jpg'),
(N'Tiêu đề 3', N'Mô tả 3.4', 'image3.jpg'),
(N'Tiêu đề 4', N'Mô tả 4.4', 'image4.jpg'),
(N'Tiêu đề 5', N'Mô tả 5.4', 'image5.jpg')


INSERT INTO HoaDons ( NgayTao, TongGia, TenKH, Diachi, Email, SDT, DiaChiGiaoHang,TrangThai,MaTaiKhoan)
VALUES 
( '2023-09-10 10:00:00', 250000, N'Nguyễn Văn A', N'123 Đường ABC, Quận 1, TP.HCM', 'nguyenvana@example.com', '0987654321', N'123 Đường XYZ, Quận 2, TP.HCM',N'Đang xử lý',1),
( '2023-09-11 11:00:00', 350000, N'Trần Thị B',  N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 1, TP.HCM',N'Đang xử lý',1),
( '2023-09-11 11:00:00', 350000, N'Trần Thị B',  N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 2, TP.HCM',N'Đang xử lý',1),
( '2023-09-11 11:00:00', 350000, N'Trần Thị B',  N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 3, TP.HCM',N'Đang xử lý',1),
( '2023-09-11 11:00:00', 350000, N'Trần Thị B',  N'456 Đường XYZ, Quận 2, TP.HCM', 'tranthib@example.com', '0123456789', N'456 Đường ABC, Quận 4, TP.HCM',N'Đang xử lý',1)


INSERT INTO ChiTietHoaDons (MaHoaDon, MaSanPham, SoLuong,DonGia, TongGia)
VALUES 
(1, 1, 2, 200000, 200000),
(1, 2, 1, 50000, 200000),
(2, 2, 1, 70000, 200000),
(3, 2, 1, 90000, 200000),
(3, 2, 1, 40000, 200000)


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


INSERT INTO NhaPhanPhois (TenNhaPhanPhoi, DiaChi, SoDienThoai, LinkWeb, MoTa)
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


INSERT INTO ChiTietHoaDonNhaps (MaHoaDon, MaSanPham, SoLuong, DonViTinh, GiaNhap, TongGia)
VALUES 
(1, 1, 100, N'Hộp', 5000, 500000),
(1, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000),
(2, 2, 50, N'Cái', 3000, 150000)


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
alter PROCEDURE sp_quang_cao_search (@page_index  INT, 
                                       @page_size   INT,
									   @MoTa  Nvarchar(max))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY K.Id DESC)) AS RowNumber, 
                              K.Id, 
                              K.AnhDaiDien,
							  K.LinkQuangCao,
							  K.MoTa
                        INTO #Results1
                        FROM QuangCaos AS K
					    WHERE (@MoTa = '' or k.MoTa like N'%'+@MoTa +'%');
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
                              ORDER BY K.Id DESC)) AS RowNumber, 
                              K.Id, 
                              K.AnhDaiDien,
							  K.LinkQuangCao,
							  K.MoTa
                        INTO #Results2
                        FROM QuangCaos AS K
					    WHERE (@MoTa = '' or k.MoTa like N'%'+@MoTa +'%');
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
@MoTa nvarchar(max),
@LinkAnh nvarchar(max))
as
begin
	insert into SlideDetail(TieuDe,MoTa,LinkAnh)
	values (@TieuDe,@MoTa,@LinkAnh)
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_suaslide(@MaAnh int,@TieuDe nvarchar(max),
@MoTa nvarchar(max),
@LinkAnh nvarchar(max))
as
begin
	update SlideDetail
	set TieuDe = @TieuDe,MoTa = @MoTa,LinkAnh = @LinkAnh
	where MaAnh = @MaAnh 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoaslide(@MaAnh int)
as
begin
	delete from SlideDetail where MaAnh = @MaAnh 
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_searchslide(@page_index  INT, 
                                       @page_size   INT,
									   @TieuDe nvarchar(MAX))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaAnh DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp1
                        FROM SlideDetail as a
					    WHERE (@TieuDe = '' or a.TieuDe like '%'+@TieuDe +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaAnh DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp2
                        FROM SlideDetail as a
					    WHERE (@TieuDe = '' or a.TieuDe like '%'+@TieuDe +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_get_all_loaitaikhoan
as
begin
	select*from LoaiTaiKhoans
	order by MaLoaitaikhoan
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
create proc sp_getalltaikhoan
as
begin
	select*from TaiKhoans
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getallusername
as
begin	
	select TenTaiKhoan
	from TaiKhoans
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getbyidchitiettaikhoan(@MaTaiKhoan int)
as
begin
	select h.*,c.TenLoai
	from ChiTietTaiKhoans h
	inner join LoaiTaiKhoans c on h.MaLoaitaikhoan=c.MaLoaitaikhoan
	where MaTaiKhoan =@MaTaiKhoan
end

exec sp_getbyidchitiettaikhoan 9

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getbyidchitiettaikhoancustomer(@MaTaiKhoan int)
as
begin
	select h.*,c.TenLoai,tk.Email,tk.TenTaiKhoan,tk.MatKhau
	from ChiTietTaiKhoans h
	inner join LoaiTaiKhoans c on h.MaLoaitaikhoan=c.MaLoaitaikhoan
	inner join TaiKhoans tk on tk.MaTaiKhoan = h.MaTaiKhoan
	where tk.MaTaiKhoan =@MaTaiKhoan
end

exec sp_getbyidchitiettaikhoancustomer 9

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
alter proc sp_update_taikhoan(
@MaTaiKhoan int,
@Email nvarchar(150),
@list_json_chitiet_taikhoan NVARCHAR(MAX)
)
as
BEGIN
		BEGIN
			Update TaiKhoans
			Set Email =@Email
			WHERE MaTaiKhoan = @MaTaiKhoan
					IF(@list_json_chitiet_taikhoan IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maChitietTaiKhoan') as maChitietTaiKhoan,
								JSON_VALUE(p.value, '$.maTaiKhoan') as maTaiKhoan,
								JSON_VALUE(p.value, '$.maLoaitaikhoan') as maLoaitaikhoan,
								JSON_VALUE(p.value, '$.hoTen') as hoTen,
								JSON_VALUE(p.value, '$.diaChi') as diaChi, 
								JSON_VALUE(p.value, '$.soDienThoai') as soDienThoai,
								JSON_VALUE(p.value, '$.anhDaiDien') as anhDaiDien,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiet_taikhoan) AS p;

							--insert status =1
							Insert into ChiTietTaiKhoans(MaTaiKhoan,MaLoaitaikhoan,HoTen,DiaChi,SoDienThoai,AnhDaiDien)
							select @MaTaiKhoan,
									#Result.maLoaitaikhoan,
									#Result.hoTen,
									#Result.diaChi,
									#Result.soDienThoai,
									#Result.anhDaiDien
							from #Result
							where #Result.status = 1

							--update status =2 
							Update ChiTietTaiKhoans
							set MaLoaitaikhoan= #Result.maLoaitaikhoan,
								HoTen = #Result.hoTen,
								DiaChi = #Result.diaChi,
								SoDienThoai = #Result.soDienThoai,
								AnhDaiDien = #Result.anhDaiDien
							from #Result
							where ChiTietTaiKhoans.MaChitietTaiKhoan=#Result.maChitietTaiKhoan and #Result.status = '2'

							--delete status =3
							delete c 
							from ChiTietTaiKhoans c
							inner join #Result r on c.maChitietTaiKhoan = r.maChitietTaiKhoan
							where r.status = '3'
							drop table #Result

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
--create proc sp_sua_chitiettaikhoan(@MaChitietTaiKhoan int,
--@HoTen nvarchar(50),
--@DiaChi nvarchar(250),
--@SoDienThoai nvarchar(11),
--@AnhDaiDien nvarchar(500))
--as
--begin
--	update ChiTietTaiKhoans
--	set HoTen = @HoTen, DiaChi = @DiaChi, SoDienThoai = @SoDienThoai, AnhDaiDien = @AnhDaiDien
--	where MaChitietTaiKhoan = @MaChitietTaiKhoan
--end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_taikhoan(@MaTaiKhoan int)
as
begin
	delete from TaiKhoans
	where MaTaiKhoan = @MaTaiKhoan
end


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_taikhoan_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenTaiKhoan nvarchar(50),
									   @Email nvarchar(150),
									   @HoTen nvarchar(50),
									   @SoDienThoai nvarchar(11))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaTaiKhoan DESC)) AS RowNumber, 
							  s.MaTaiKhoan,
                              s.TenTaiKhoan,
							  s.MatKhau,
							  s.Email,
							  h.TenLoai,
							  c.HoTen,
							  c.SoDienThoai,
							  h.MaLoaitaikhoan,
							  c.AnhDaiDien
                        INTO #Temp1
                        FROM TaiKhoans AS s
						inner join ChiTietTaiKhoans c on c.MaTaiKhoan = s.MaTaiKhoan
						inner join LoaiTaiKhoans h on h.MaLoaitaikhoan = c.MaLoaitaikhoan

					    WHERE (@TenTaiKhoan = '' or s.TenTaiKhoan like '%'+@TenTaiKhoan +'%')
						and (@Email = '' or s.Email like '%'+@Email +'%')
						and (@HoTen = '' or c.HoTen like '%'+@HoTen +'%')
						and (@SoDienThoai = '' or c.SoDienThoai like '%'+@SoDienThoai +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaTaiKhoan DESC)) AS RowNumber, 
                              s.TenTaiKhoan,
							  s.Email,
							  h.TenLoai,
							  c.HoTen,
							  c.SoDienThoai
                        INTO #Temp2
                        FROM TaiKhoans AS s
						inner join ChiTietTaiKhoans c on c.MaTaiKhoan = s.MaTaiKhoan
						inner join LoaiTaiKhoans h on h.MaLoaitaikhoan = c.MaLoaitaikhoan

					    WHERE (@TenTaiKhoan = '' or s.TenTaiKhoan like '%'+@TenTaiKhoan +'%')
						and (@Email = '' or s.Email like '%'+@Email +'%')
						and (@HoTen = '' or c.HoTen like '%'+@HoTen +'%')
						and (@SoDienThoai = '' or c.SoDienThoai like '%'+@SoDienThoai +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_taikhoan_searchsingle(@page_index  INT, 
                                       @page_size   INT,
									   @TenTaiKhoan nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaTaiKhoan DESC)) AS RowNumber, 
                              s.*
                        INTO #Temp1
                        FROM TaiKhoans AS s

					    WHERE (@TenTaiKhoan = '' or s.TenTaiKhoan like '%'+@TenTaiKhoan +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaTaiKhoan DESC)) AS RowNumber, 
                              s.*
                        INTO #Temp2
                        FROM TaiKhoans AS s

					    WHERE (@TenTaiKhoan = '' or s.TenTaiKhoan like '%'+@TenTaiKhoan +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter PROCEDURE sp_login(@taikhoan nvarchar(50), @matkhau nvarchar(50))
AS
    BEGIN
      SELECT  *
      FROM TaiKhoans t 
	  inner join ChiTietTaiKhoans c on c.MaTaiKhoan = t.MaTaiKhoan
	  inner join LoaiTaiKhoans l on l.MaLoaitaikhoan = c.MaLoaitaikhoan
      where TenTaiKhoan= @taikhoan and MatKhau = @matkhau;
    END;

exec sp_login 'quang','123'

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
alter proc sp_danhmucuudai_search(@page_index  INT, 
                                       @page_size   INT,
									   @Tendanhmucuudai nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.Madanhmucuudai DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp1
                        FROM DanhMucUudais as a

					    WHERE (@Tendanhmucuudai = '' or a.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.Madanhmucuudai DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp2
                        FROM DanhMucUudais as a

					    WHERE (@Tendanhmucuudai = '' or a.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

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
alter proc sp_danhmuc_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenDanhMuc nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaDanhMuc DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp1
                        FROM DanhMucs as a

					    WHERE (@TenDanhMuc = '' or a.TenDanhMuc like '%'+@TenDanhMuc +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaDanhMuc DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp2
                        FROM DanhMucs as a

					    WHERE (@TenDanhMuc = '' or a.TenDanhMuc like '%'+@TenDanhMuc +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_hangsanxuat
as
begin
	select * from HangSanXuats
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_them_hangsanxuat(@TenHang nvarchar(50), @LinkWeb nvarchar(max), @AnhDaiDien nvarchar(max))
as
begin
	insert into HangSanXuats(TenHang,LinkWeb,AnhDaiDien)
	values(@TenHang,@LinkWeb,@AnhDaiDien)
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sua_hangsanxuat(@MaNhaSanXuat int, @TenHang nvarchar(50), @LinkWeb nvarchar(max), @AnhDaiDien nvarchar(max))
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
alter proc sp_hangsanxuat_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenHang nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaNhaSanXuat DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp1
                        FROM HangSanXuats as a

					    WHERE (@TenHang = '' or a.TenHang like '%'+@TenHang +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
               SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaNhaSanXuat DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp2
                        FROM HangSanXuats as a

					    WHERE (@TenHang = '' or a.TenHang like '%'+@TenHang +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;



-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_nhaphanphoi
as
begin
	select*from NhaPhanPhois
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_them_nhaphanphoi(@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@LinkWeb nvarchar(max),@MoTa nvarchar(max))
as
begin
	insert into NhaPhanPhois(TenNhaPhanPhoi,DiaChi,SoDienThoai,LinkWeb,MoTa)
	values(@TenNhaPhanPhoi,@DiaChi,@SoDienThoai,@LinkWeb,@MoTa)
end


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sua_nhaphanphoi(@MaNhaPhanPhoi int,@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@LinkWeb nvarchar(max),@MoTa nvarchar(max))
as
begin
	update NhaPhanPhois
	set TenNhaPhanPhoi = @TenNhaPhanPhoi, DiaChi =@DiaChi,SoDienThoai =@SoDienThoai,LinkWeb=@LinkWeb, MoTa = @MoTa
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
alter proc sp_nhaphanphoi_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenNhaPhanPhoi nvarchar(250),
									   @DiaChi nvarchar(max),
									   @SoDienThoai nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaNhaPhanPhoi DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp1
                        FROM NhaPhanPhois as a

					    WHERE (@TenNhaPhanPhoi = '' or a.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@DiaChi = '' or a.DiaChi like '%'+@DiaChi +'%')
							and (@SoDienThoai = '' or a.SoDienThoai like '%'+@SoDienThoai +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
               SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY a.MaNhaPhanPhoi DESC)) AS RowNumber, 
                              a.*
                        INTO #Temp2
                        FROM NhaPhanPhois as a

					    WHERE (@TenNhaPhanPhoi = '' or a.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@DiaChi = '' or a.DiaChi like '%'+@DiaChi +'%')
							and (@SoDienThoai = '' or a.SoDienThoai like '%'+@SoDienThoai +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getidImgdetail(@MaSanPham int)
as
begin
	select *
	from AnhSanPhams
	where MaSanPham = @MaSanPham
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getallsanpham
as
begin
	select TenSanPham,MaSanPham,GiaGiam
	from SanPhams
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_get_sanpham_id(@MaSanPham int)
as
begin
	Select s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet,
							  c.MaChiTietSanPham
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai
						inner join AnhSanPhams asp on asp.MaSanPham = s.MaSanPham
	where s.MaSanPham = @MaSanPham
end

create proc sp_get_sanpham_id_user(@MaSanPham int)
as
begin
	Select s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet,
							  c.MaChiTietSanPham
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai
						inner join AnhSanPhams asp on asp.MaSanPham = s.MaSanPham
	where s.MaSanPham = @MaSanPham

	update SanPhams
	set LuotXem = LuotXem + 1
	where MaSanPham = @MaSanPham
end


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_create_sanpham(
@MaDanhMuc int,
@Madanhmucuudai int,
@TenSanPham nvarchar(150),
@AnhDaiDien nvarchar(150),
@Gia decimal(18, 0),
@GiaGiam decimal(18, 0),
@SoLuong int,
@TrongLuong nvarchar(100),
@TrangThai bit,
@XuatXu nvarchar(50),
@list_json_chitiet_sanpham NVARCHAR(MAX),
@list_json_sanpham_nhaphanphoi NVARCHAR(MAX),
@list_json_anhsanpham NVARCHAR(MAX)
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
					 TrongLuong,
					 TrangThai,
					 XuatXu
					)
					VALUES
					(@MaDanhMuc, 
					 @Madanhmucuudai, 
					 @TenSanPham,
					 @AnhDaiDien,
					 @Gia,
					 @GiaGiam,
					 @SoLuong,
					 @TrongLuong,
					 @TrangThai,
					 @XuatXu
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

					IF(@list_json_sanpham_nhaphanphoi IS NOT NULL)
						BEGIN
							INSERT INTO SanPhams_NhaPhanPhois
							 (
							 MaSanPham,
							 MaNhaPhanPhoi)
						SELECT	@MaSanPham,
								JSON_VALUE(z.value, '$.maNhaPhanPhoi')
						FROM OPENJSON(@list_json_sanpham_nhaphanphoi) AS z;
						END;

					IF(@list_json_anhsanpham IS NOT NULL)
						BEGIN
							INSERT INTO AnhSanPhams
							 (
							 MaSanPham,
							 LinkAnh)
						SELECT	@MaSanPham,
								JSON_VALUE(z.value, '$.linkAnh')
						FROM OPENJSON(@list_json_anhsanpham) AS z;
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
@TrongLuong nvarchar(100),
@TrangThai bit,
@XuatXu nvarchar(50),
@list_json_chitiet_sanpham NVARCHAR(MAX),
@list_json_sanpham_nhaphanphoi NVARCHAR(MAX),
@list_json_anhsanpham NVARCHAR(MAX)
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
			TrongLuong = @TrongLuong,
			TrangThai = @TrangThai,
			XuatXu = @XuatXu
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
							--Insert into ChiTietSanPhams(MaSanPham,MaNhaSanXuat,MoTa,ChiTiet)
							--select @MaSanPham,
							--		#Result.maNhaSanXuat,
							--		#Result.moTa,
							--		#Result.chiTiet
							--from #Result
							--where #Result.Status = 1

							--update status =2 
							Update ChiTietSanPhams
							set MaNhaSanXuat= #Result.maNhaSanXuat,
								MoTa = #Result.moTa,
								ChiTiet = #Result.chiTiet
							from #Result
							where ChiTietSanPhams.MaChiTietSanPham=#Result.maChiTietSanPham and #Result.status = '2'

							--delete status =3
							--delete c 
							--from ChiTietSanPhams c
							--inner join #Result r on c.maChiTietSanPham = r.maChiTietSanPham
							--where r.status = '3'
							--drop table #Result
						END;

						IF(@list_json_sanpham_nhaphanphoi IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maSanPham') as maSanPham, 
								JSON_VALUE(p.value, '$.maNhaPhanPhoi') as maNhaPhanPhoi,
								JSON_VALUE(p.value, '$.status') as Status
								INTO #Result1
							FROM OPENJSON(@list_json_sanpham_nhaphanphoi) AS p;

							--insert status =1
							--Insert into SanPhams_NhaPhanPhois(MaSanPham,MaNhaPhanPhoi)
							--select @MaSanPham,
							--		#Result1.maNhaPhanPhoi
							--from #Result1
							--where #Result1.Status = 1

							--update status =2 
							Update SanPhams_NhaPhanPhois
							set 
								MaNhaPhanPhoi = #Result1.maNhaPhanPhoi
							from #Result1
							where SanPhams_NhaPhanPhois.MaSanPham=#Result1.maSanPham and #Result1.status = '2'

							--delete status =3
							--delete c 
							--from SanPhams_NhaPhanPhois c
							--inner join #Result1 r on c.MaSanPham = r.maSanPham
							--where r.status = '3'
							--drop table #Result1
						END;

						IF(@list_json_anhsanpham IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maSanPham') as maSanPham, 
							    JSON_VALUE(p.value, '$.id') as id, 
								JSON_VALUE(p.value, '$.linkAnh') as linkAnh,
								JSON_VALUE(p.value, '$.status') as Status
								INTO #Result2
							FROM OPENJSON(@list_json_anhsanpham) AS p;

							--insert status =1
							Insert into AnhSanPhams(MaSanPham,LinkAnh)
							select @MaSanPham,
									#Result2.linkAnh
							from #Result2
							where #Result2.Status = 1

							--update status =2 
							Update AnhSanPhams
							set 
								LinkAnh = #Result2.linkAnh
							from #Result2
							where AnhSanPhams.Id=#Result2.Id and #Result2.status = 2

							--delete status =3
							delete c 
							from AnhSanPhams c
							inner join #Result2 r on c.Id = r.id
							where r.status = '3'
							drop table #Result2

						END;
			


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_sanpham(@MaSanPham int)
as
begin
	delete from SanPhams
	where MaSanPham = @MaSanPham
end


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanpham_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @TenDanhMuc nvarchar(50),
									   @Tendanhmucuudai nvarchar(250),
									   @GiaMin DECIMAL(18, 0),
									   @GiaMax DECIMAL(18, 0),
									   @TenHang nvarchar(50),
									   @TenNhaPhanPhoi nvarchar(250),
									   @XuatXu nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaSanPham DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp1
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaSanPham DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp2
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;
	

exec sp_sanpham_search @page_index = 1, @page_size = 100, @TenSanPham = N'',@TenDanhMuc=N'sữa rửa mặt'
,@Tendanhmucuudai=N'',@GiaMin=1,@GiaMax=3500000,@TenHang=N'',@TenNhaPhanPhoi=N'',@XuatXu=N''


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanpham_single_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @Gia decimal(18, 0))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaSanPham DESC)) AS RowNumber, 
                              s.MaSanPham,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia
                        INTO #Temp1
                        FROM SanPhams AS s

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@Gia = 0 or s.Gia = @Gia)
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.MaSanPham DESC)) AS RowNumber, 
                              s.MaSanPham,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia
                        INTO #Temp2
                        FROM SanPhams AS s

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@Gia = 0 or s.Gia = @Gia)

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanpham_search_gia_tang(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @TenDanhMuc nvarchar(50),
									   @Tendanhmucuudai nvarchar(250),
									   @GiaMin DECIMAL(18, 0),
									   @GiaMax DECIMAL(18, 0),
									   @TenHang nvarchar(50),
									   @TenNhaPhanPhoi nvarchar(250),
									   @XuatXu nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CAST(s.GiaGiam AS DECIMAL(18, 0)) ASC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp1
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CAST(s.GiaGiam AS DECIMAL(18, 0)) ASC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp2
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

	
exec sp_sanpham_search_gia_tang @page_index = 1, @page_size = 100, @TenSanPham = N'',@TenDanhMuc=N'sữa rửa mặt'
,@Tendanhmucuudai=N'',@GiaMin=1,@GiaMax=3500000,@TenHang=N'',@TenNhaPhanPhoi=N'',@XuatXu=N''

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanpham_search_gia_giam(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @TenDanhMuc nvarchar(50),
									   @Tendanhmucuudai nvarchar(250),
									   @GiaMin DECIMAL(18, 0),
									   @GiaMax DECIMAL(18, 0),
									   @TenHang nvarchar(50),
									   @TenNhaPhanPhoi nvarchar(250),
									   @XuatXu nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CAST(s.GiaGiam AS DECIMAL(18, 2)) DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp1
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY CAST(s.GiaGiam AS DECIMAL(18, 2)) DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp2
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_tang_gia_sp_all_5
as
begin
	update SanPhams
	set GiaGiam = CEILING((GiaGiam + (GiaGiam * 0.05)) / 1000) * 1000
	where GiaGiam < Gia
end

exec sp_tang_gia_sp_all_5
-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_giam_gia_sp_all_5
as
begin
	update SanPhams
	set GiaGiam = CEILING((GiaGiam - (GiaGiam * 0.05)) / 1000) * 1000
end

exec sp_giam_gia_sp_all_5

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getbyidchitiethoadon(@MaHoaDon int)
as
begin
	select h.MaHoaDon,
			c.MaChiTietHoaDon,
							  c.MaSanPham,
                              s.TenSanPham,
							  c.SoLuong,
							  c.DonGia,
							  c.TongGia,
							  s.AnhDaiDien
                        FROM HoaDons AS h
						inner join ChiTietHoaDons c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
	where h.MaHoaDon = @MaHoaDon
end

exec sp_getbyidchitiethoadon 7

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getbytaikhoanchitiethoadon(@MaTaiKhoan int)
as
begin
	select h.*
    FROM HoaDons AS h
					
	where h.MaTaiKhoan = @MaTaiKhoan
	order by h.MaHoaDon DESC
end

exec sp_getbytaikhoanchitiethoadon 9

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getbytaikhoanchitiethoadonproduct(@MaTaiKhoan int)
as
begin
	select ct.MaSanPham
    FROM HoaDons AS h
	inner join ChiTietHoaDons ct on ct.MaHoaDon = h.MaHoaDon
	where h.MaTaiKhoan = @MaTaiKhoan
	group by ct.MaSanPham
end

exec sp_getbytaikhoanchitiethoadonproduct 9

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_danhgiagetsp(@page_index  int, 
                                       @page_size   int,
									   @MaSanPham int,
									   @ChatLuong int,
									   @NoiDung nvarchar(MAX),
									   @fr_NgayTao datetime,
									   @to_NgayTao datetime)
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY MaDanhGia ASC)) AS RowNumber, 
                              dg.*, sp.TenSanPham,cttk.HoTen,tk.TenTaiKhoan,cttk.SoDienThoai
                        INTO #Temp1
                        from DanhGia dg 
							inner join SanPhams sp on dg.MaSanPham = sp.MaSanPham
							inner join TaiKhoans tk on tk.MaTaiKhoan = dg.MaTaiKhoan
							inner join ChiTietTaiKhoans cttk on cttk.MaTaiKhoan = tk.MaTaiKhoan

					    WHERE ((@MaSanPham = 0) or (dg.MaSanPham  = @MaSanPham))
							and ((@ChatLuong = 0) OR (dg.ChatLuong = @ChatLuong))
							and (@NoiDung = '' or dg.NoiDung like N'%'+@NoiDung +'%')
							 and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								dg.ThoiGian >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and dg.ThoiGian < @to_NgayTao
								or dg.ThoiGian between @fr_NgayTao and @to_NgayTao))
					
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                         SELECT(ROW_NUMBER() OVER(
                              ORDER BY MaDanhGia ASC)) AS RowNumber, 
                              dg.*, sp.TenSanPham,cttk.HoTen,tk.TenTaiKhoan,cttk.SoDienThoai
                        INTO #Temp2
                        from DanhGia dg 
							inner join SanPhams sp on dg.MaSanPham = sp.MaSanPham
							inner join TaiKhoans tk on tk.MaTaiKhoan = dg.MaTaiKhoan
							inner join ChiTietTaiKhoans cttk on cttk.MaTaiKhoan = tk.MaTaiKhoan

					    WHERE ((@MaSanPham = 0) or (dg.MaSanPham  = @MaSanPham))
							and ((@ChatLuong = 0) OR (dg.ChatLuong = @ChatLuong))
							and (@NoiDung = '' or dg.NoiDung like N'%'+@NoiDung +'%')
							 and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								dg.ThoiGian >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and dg.ThoiGian < @to_NgayTao
								or dg.ThoiGian between @fr_NgayTao and @to_NgayTao))
					
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

exec sp_danhgiagetsp 1,10,0

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_update_danhgia(@MaDanhGia int,
								@GhiChu nvarchar(max))
as
begin
	update DanhGia
	set GhiChu = @GhiChu
	where MaDanhGia = @MaDanhGia
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_danhgia(@MaDanhGia int)
as
begin
	delete from DanhGia
	where MaDanhGia  = @MaDanhGia
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_create_danh_gia(@MaSanPham int,
								@MaTaiKhoan int,
								@ChatLuong float,
								@NoiDung nvarchar(max),
								@TrangThai bit,
								@ThoiGian datetime,
								@AnhDanhGia nvarchar(max),
								@GhiChu nvarchar(max))
as
begin
	insert into DanhGia(MaSanPham,MaTaiKhoan,ChatLuong,NoiDung,TrangThai,ThoiGian,AnhDanhGia,GhiChu)
	values(@MaSanPham,@MaTaiKhoan,@ChatLuong,@NoiDung,@TrangThai,@ThoiGian,@AnhDanhGia,@GhiChu)
	update SanPhams
	set DanhGia = CASE
                    WHEN DanhGia = 0 THEN @ChatLuong
                    ELSE (DanhGia + @ChatLuong) / 2
                 END
	where MaSanPham = @MaSanPham
end

exec sp_create_danh_gia 66,9,5,'tot',true,"2023-11-22T07:39:06.309Z",'ád'

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_create_hoadon(
@TrangThai nvarchar(50),
@NgayTao datetime,
@TongGia decimal(18,0),
@TenKH nvarchar(50),
@Diachi nvarchar(250),
@Email nvarchar(50),
@SDT nvarchar(50),
@DiaChiGiaoHang nvarchar(350),
@MaTaiKhoan int,
@list_json_chitiet_hoadon NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaHoaDon INT;
		BEGIN
			INSERT INTO HoaDons
					(TrangThai,
					NgayTao ,
					TongGia ,
					TenKH ,
					Diachi ,
					Email ,
					SDT ,
					DiaChiGiaoHang,
					MaTaiKhoan
					)
					VALUES
					(@TrangThai,
					@NgayTao ,
					@TongGia ,
					@TenKH ,
					@Diachi ,
					@Email ,
					@SDT ,
					@DiaChiGiaoHang,
					@MaTaiKhoan
					);

					SET @MaHoaDon = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiet_hoadon IS NOT NULL)

						BEGIN
							DECLARE @Result1 TABLE
							(
								MaSanPham INT,
								SoLuong INT,
								DonGia DECIMAL(18, 0),
								TongGia DECIMAL(18, 0)
							);

							INSERT INTO @Result1
							(
								MaSanPham,
								SoLuong,
								DonGia,
								TongGia
							)
							SELECT
								JSON_VALUE(y.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(y.value, '$.soLuong') as SoLuong,
								JSON_VALUE(y.value, '$.donGia') as DonGia,
								JSON_VALUE(y.value, '$.tongGia') as TongGia
							FROM OPENJSON(@list_json_chitiet_hoadon) AS y;

							Insert into ChiTietHoaDons(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 DonGia,
										 TongGia)
							select @MaHoaDon,
									MaSanPham,
									SoLuong,
									DonGia,
									TongGia
							from @Result1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuong,
								sp.LuotBan = sp.LuotBan + r.SoLuong
							FROM SanPhams sp
							JOIN @Result1 r ON sp.MaSanPham = r.MaSanPham;

						END;
			END


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_update_hoadon(
@MaHoaDon int,
@TrangThai nvarchar(50),
@NgayTao datetime,
@TongGia decimal(18,0),
@TenKH nvarchar(50),
@Diachi nvarchar(250),
@Email nvarchar(50),
@SDT nvarchar(50),
@DiaChiGiaoHang nvarchar(350),
@list_json_chitiet_hoadon NVARCHAR(MAX)
)
as
BEGIN
		update HoaDons
		set TrangThai = @TrangThai,
			NgayTao = @NgayTao ,
			TongGia = @TongGia ,
			TenKH = @TenKH,
			Diachi = @Diachi,
			Email = @Email,
			SDT = @SDT,
			DiaChiGiaoHang = @DiaChiGiaoHang
					
		where MaHoaDon =@MaHoaDon
		
					IF(@list_json_chitiet_hoadon IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maChiTietHoaDon') as maChiTietHoaDon,
								JSON_VALUE(p.value, '$.maHoaDon') as MaHoaDon, 
								JSON_VALUE(p.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(p.value, '$.soLuong') as soLuong,
								JSON_VALUE(p.value, '$.soLuongTon') as SoLuongTon,
								JSON_VALUE(p.value, '$.donGia') as donGia,
								JSON_VALUE(p.value, '$.tongGia')as tongGia,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiet_hoadon) AS p;

							--insert status =1
							Insert into ChiTietHoaDons(MaHoaDon,MaSanPham,SoLuong,DonGia,TongGia)
							select @MaHoaDon,
									#Result.maSanPham,
									#Result.soLuong,
									#Result.donGia,
									#Result.tongGia
							from #Result
							where #Result.Status = 1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuongTon,
								sp.LuotBan = sp.LuotBan + r.SoLuongTon
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 1;

							--update status =2 
							Update ChiTietHoaDons
							set MaSanPham= #Result.MaSanPham,
								SoLuong = #Result.soLuong,
								DonGia = #Result.donGia,
								TongGia = #Result.tongGia
							from #Result
							where ChiTietHoaDons.MaChiTietHoaDon=#Result.maChiTietHoaDon and #Result.status = '2'

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuongTon,
								sp.LuotBan = sp.LuotBan + r.SoLuongTon
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 2;

							--delete status =3
							delete c 
							from ChiTietHoaDons c
							inner join #Result r on c.maChiTietHoaDon = r.maChiTietHoaDon
							where r.status = '3'

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,
								sp.LuotBan = sp.LuotBan - r.SoLuongTon
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 3;

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,
								sp.LuotBan = sp.LuotBan - r.SoLuongTon
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 4;

							drop table #Result

						END;
			


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_delete_hoadon(@MaHoaDon int)
as
begin
	delete from HoaDons
	where MaHoaDon = @MaHoaDon
end
	
-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_hoadon_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenKH Nvarchar(50),
									   @SDT nvarchar(50),
									   @TrangThai nvarchar(50),
									   @fr_NgayTao datetime,
									   @to_NgayTao datetime)
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.MaHoaDon,
							  h.NgayTao,
							  h.TenKH,
							  h.SDT,
							  h.DiaChiGiaoHang,
                              s.TenSanPham,
							  c.SoLuong,
							  c.DonGia,
							  c.TongGia
                        INTO #Results
                        FROM HoaDons AS h
						inner join ChiTietHoaDons c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
					    WHERE (@TenKH = '' or h.TenKH like N'%'+@TenKH +'%')
						and   (@SDT = '' or h.SDT like N'%'+@SDT +'%')
						and   (@TrangThai = '' or h.TrangThai like N'%'+@TrangThai +'%')
						and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.MaHoaDon,
							  h.NgayTao,
							  h.TenKH,
							  h.SDT,
							  h.DiaChiGiaoHang,
                              s.TenSanPham,
							  c.SoLuong,
							  c.DonGia,
							  c.TongGia
                        INTO #Results2
                        FROM HoaDons AS h
						inner join ChiTietHoaDons c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
					    WHERE (@TenKH = '' or h.TenKH like N'%'+@TenKH +'%')
						and   (@SDT = '' or h.SDT like N'%'+@SDT +'%')
						and   (@TrangThai = '' or h.TrangThai like N'%'+@TrangThai +'%')
						and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
        END;
    END;

exec sp_hoadon_search @page_index = 1, @page_size = 5, @TenKH = '', @SDT = '09', @fr_NgayTao ='',@to_NgayTao=''

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_hoadon_search_single(@page_index  INT, 
                                       @page_size   INT,
									   @TenKH Nvarchar(50),
									   @SDT nvarchar(50),
									   @TrangThai nvarchar(50),
									   @fr_NgayTao datetime,
									   @to_NgayTao datetime)
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.*,
							  tk.TenTaiKhoan
                        INTO #Results
                        FROM HoaDons AS h
						inner join TaiKhoans tk on h.MaTaiKhoan = tk.MaTaiKhoan
					    WHERE (@TenKH = '' or h.TenKH like N'%'+@TenKH +'%')
						and   (@SDT = '' or h.SDT like N'%'+@SDT +'%')
						and   (@TrangThai = '' or h.TrangThai like N'%'+@TrangThai +'%')
						and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.*
                        INTO #Results2
                        FROM HoaDons AS h
					    WHERE (@TenKH = '' or h.TenKH like N'%'+@TenKH +'%')
						and   (@SDT = '' or h.SDT like N'%'+@SDT +'%')
						and   (@TrangThai = '' or h.TrangThai like N'%'+@TrangThai +'%')
						and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
        END;
    END;

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getbyidchitiethoadonnhap(@MaHoaDon int)
as
begin
	select c.Id,
			 h.MaHoaDon,
							  c.MaSanPham,
                              s.TenSanPham,
							  c.SoLuong,	
							  c.DonViTinh,
							  c.GiaNhap,
							  c.TongGia,
							  s.AnhDaiDien
                        FROM HoaDonNhaps AS h
						inner join ChiTietHoaDonNhaps c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
	where h.MaHoaDon = @MaHoaDon
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_create_hoadon_nhap(
@MaNhaPhanPhoi int,
@NgayTao datetime,
@KieuThanhToan nvarchar(MAX),
@TongTien DECIMAL(18, 0),
@MaTaiKhoan int,
@list_json_chitiethoadonnhap NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaHoaDon INT;
		BEGIN
			INSERT INTO HoaDonNhaps
					(MaNhaPhanPhoi,
					NgayTao ,
					KieuThanhToan ,
					TongTien,
					MaTaiKhoan
					)
					VALUES
					(@MaNhaPhanPhoi,
					@NgayTao ,
					@KieuThanhToan ,
					@TongTien,
					@MaTaiKhoan
					);

					SET @MaHoaDon = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiethoadonnhap IS NOT NULL)
						BEGIN
							DECLARE @Result TABLE
							(
								MaSanPham INT,
								SoLuong INT,
								DonViTinh NVARCHAR(50),
								GiaNhap DECIMAL(18, 0),
								TongGia DECIMAL(18, 0)
							);

							INSERT INTO @Result
							(
								MaSanPham,
								SoLuong,
								DonViTinh,
								GiaNhap,
								TongGia
							)
							SELECT
								JSON_VALUE(y.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(y.value, '$.soLuong') as SoLuong,
								JSON_VALUE(y.value, '$.donViTinh') as DonViTinh,
								JSON_VALUE(y.value, '$.giaNhap') as GiaNhap,
								JSON_VALUE(y.value, '$.tongGia') as TongGia
							FROM OPENJSON(@list_json_chitiethoadonnhap) AS y;

							Insert into ChiTietHoaDonNhaps(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 DonViTinh,
										 GiaNhap,
										 TongGia)
							select @MaHoaDon,
									MaSanPham,
									SoLuong,
									DonViTinh,
									GiaNhap,
									TongGia
							from @Result

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuong, sp.Gia = r.GiaNhap + ( r.GiaNhap * 0.5),sp.GiaGiam = r.GiaNhap + ( r.GiaNhap * 0.3)
							FROM SanPhams sp
							JOIN @Result r ON sp.MaSanPham = r.MaSanPham;

						END;
			END


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_update_hoadon_nhap(
@MaHoaDon int,
@MaNhaPhanPhoi int,
@NgayTao datetime,
@KieuThanhToan nvarchar(MAX),
@TongTien DECIMAL(18, 0),
@list_json_chitiethoadonnhap NVARCHAR(MAX)
)
as
BEGIN
		update HoaDonNhaps
		set MaNhaPhanPhoi = @MaNhaPhanPhoi,
			NgayTao = @NgayTao ,
			KieuThanhToan = @KieuThanhToan ,
			TongTien = @TongTien
					
		where MaHoaDon =@MaHoaDon
		
					IF(@list_json_chitiethoadonnhap IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.id') as Id,
								JSON_VALUE(p.value, '$.maHoaDon') as MaHoaDon, 
								JSON_VALUE(p.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(p.value, '$.soLuong') as SoLuong,
								JSON_VALUE(p.value, '$.soLuongTon') as SoLuongTon,
								JSON_VALUE(p.value, '$.donViTinh')as DonViTinh,
								JSON_VALUE(p.value, '$.giaNhap') as GiaNhap,
								JSON_VALUE(p.value, '$.tongGia') as TongGia,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiethoadonnhap) AS p;

							--insert status =1
							Insert into ChiTietHoaDonNhaps(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 DonViTinh,
										 GiaNhap,
										 TongGia)
							select @MaHoaDon,
									#Result.MaSanPham,
									#Result.SoLuong,
									#Result.DonViTinh,
									#Result.GiaNhap,
									#Result.TongGia
							from #Result
							where #Result.Status = 1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuong,
								sp.Gia = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.5)),
								sp.GiaGiam = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.3))
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 1;


							--update status =2 
							Update ChiTietHoaDonNhaps
							set MaSanPham= #Result.MaSanPham,
								SoLuong = #Result.SoLuong,
								DonViTinh = #Result.DonViTinh,
								GiaNhap = #Result.GiaNhap,
								TongGia = #Result.TongGia
							from #Result
							where ChiTietHoaDonNhaps.Id=#Result.Id and #Result.status = 2

							
							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,sp.Gia = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.5)),
										sp.GiaGiam = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.3))
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 2;

							--delete status =3
							delete c 
							from ChiTietHoaDonNhaps c
							inner join #Result r on c.Id = r.Id
							where r.status = 3

							UPDATE sp
							SET sp.SoLuong =(CAST (sp.SoLuong AS INT) - (CAST(r.SoLuong AS INT)))
							FROM SanPhams sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 3;

							drop table #Result

						END;
			


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_delete_hoadon_nhap(@MaHoaDon int)
as
begin
	delete from HoaDonNhaps
	where MaHoaDon = @MaHoaDon
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_thongketheongay_hoadonnhap_search(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @TenNhaPhanPhoi nvarchar(250),
									   @NgayTao datetime)
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.MaHoaDon,
                              s.MaSanPham,
							  npp.TenNhaPhanPhoi,
							  s.TenSanPham,
							  c.SoLuong,
							  c.DonViTinh,
							  c.GiaNhap,
							  c.TongGia,
							  h.NgayTao,
							  h.KieuThanhToan,
							  h.MaTaiKhoan
                        INTO #Results
                        FROM HoaDonNhaps AS h
						inner join ChiTietHoaDonNhaps c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = h.MaNhaPhanPhoi
					    WHERE 
							(@TenSanPham = '' OR s.TenSanPham LIKE N'%' + @TenSanPham + '%')
							and (@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE N'%' + @TenNhaPhanPhoi + '%')
							AND (@NgayTao IS NULL OR h.NgayTao < @NgayTao);
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.MaHoaDon,
                              s.MaSanPham,
							  npp.TenNhaPhanPhoi,
							  s.TenSanPham,
							  c.SoLuong,
							  c.DonViTinh,
							  c.GiaNhap,
							  c.TongGia,
							  h.NgayTao,
							  h.KieuThanhToan,
							  h.MaTaiKhoan
                        INTO #Results2
                        FROM HoaDonNhaps AS h
						inner join ChiTietHoaDonNhaps c on c.MaHoaDon = h.MaHoaDon
						inner join SanPhams s on s.MaSanPham = c.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = h.MaNhaPhanPhoi
					    WHERE 
							(@TenSanPham = '' OR s.TenSanPham LIKE N'%' + @TenSanPham + '%')
							and (@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE N'%' + @TenNhaPhanPhoi + '%')
							AND (@NgayTao IS NULL OR h.NgayTao < @NgayTao);
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
		END

    END;

exec sp_thongketheongay_hoadonnhap_search @page_index = 1, @page_size = 5, @TenSanPham = N'', @NgayTao = '',@TenNhaPhanPhoi=''


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_search_hoadonnhap_single(@page_index  INT, 
                                       @page_size   INT,
									   @TenNhaPhanPhoi nvarchar(250),
									   @fr_NgayTao datetime,
									   @to_NgayTao datetime)
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.*,
							  npp.TenNhaPhanPhoi,
							  tk.TenTaiKhoan
                        INTO #Results
                        FROM HoaDonNhaps AS h
						inner join NhaPhanPhois npp on h.MaNhaPhanPhoi = npp.MaNhaPhanPhoi
						inner join TaiKhoans tk on tk.MaTaiKhoan = h.MaTaiKhoan
					     WHERE(@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE N'%' + @TenNhaPhanPhoi + '%')
							and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Results; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY h.MaHoaDon DESC)) AS RowNumber, 
							  h.*,
							  npp.TenNhaPhanPhoi,
							  tk.TenTaiKhoan
                        INTO #Results2
                        FROM HoaDonNhaps AS h
						inner join NhaPhanPhois npp on h.MaNhaPhanPhoi = npp.MaNhaPhanPhoi
						inner join TaiKhoans tk on tk.MaTaiKhoan = h.MaTaiKhoan
					    WHERE (@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE N'%' + @TenNhaPhanPhoi + '%')
							and ((@fr_NgayTao is null and @to_NgayTao is null 
								or (@fr_NgayTao is not null
								and @to_NgayTao is null and
								h.NgayTao >= @fr_NgayTao)
								or @fr_NgayTao is null and @to_NgayTao is not null 
								and h.NgayTao < @to_NgayTao
								or h.NgayTao between @fr_NgayTao and @to_NgayTao))
                        SELECT @RecordCount = COUNT(*)
                        FROM #Results2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Results2
                        DROP TABLE #Results2; 
		END

    END;

-------------------------------------------------------------------------------------------------------------------------------
ALTER PROC sp_overview
AS
BEGIN
    DECLARE @Results TABLE (
        SoluongHoaDonNhap INT,
        SoluongHoaDonBan INT,
		SoLuongHoaDonHuy INT,
		SoLuongHoaDonCho INT,
		SoLuongHoaDonDangGiao INT,
		SoLuongHoaDonDaGiao INT,
		SoLuongHoaDonDoiTra INT,
        KhachHangMua INT,
        KhachHangMoi INT,
        TienChi INT,
        DoanhThu INT,
		LuotXem INT
    )

    INSERT INTO @Results (SoluongHoaDonNhap, SoluongHoaDonBan,SoLuongHoaDonHuy,SoLuongHoaDonCho,SoLuongHoaDonDangGiao,SoLuongHoaDonDaGiao,SoLuongHoaDonDoiTra, KhachHangMua, KhachHangMoi, TienChi, DoanhThu,LuotXem)
    SELECT
        (SELECT COUNT(*) FROM HoaDonNhaps) AS SoluongHoaDonNhap,
        (SELECT COUNT(*) FROM HoaDons) AS SoluongHoaDonBan,
        (SELECT COUNT(*) FROM HoaDons WHERE TrangThai like N'Huỷ đơn') AS SoLuongHoaDonHuy,
        (SELECT COUNT(*) FROM HoaDons WHERE TrangThai like N'Đang xử lý') AS SoLuongHoaDonCho,
        (SELECT COUNT(*) FROM HoaDons WHERE TrangThai like N'Đang giao hàng') AS SoLuongHoaDonDangGiao,
        (SELECT COUNT(*) FROM HoaDons WHERE TrangThai like N'Đã giao hàng' or TrangThai like N'Hoàn tất') AS SoLuongHoaDonDaGiao,
        (SELECT COUNT(*) FROM HoaDons WHERE TrangThai like N'Đổi hàng' or TrangThai like N'Trả hàng') AS SoLuongHoaDonDoiTra,
        (SELECT COUNT(DISTINCT SDT) FROM HoaDons) AS KhachHangMua,
        (SELECT COUNT(DISTINCT SDT) FROM HoaDons WHERE MONTH(NgayTao) = MONTH(GETDATE()) AND YEAR(NgayTao) = YEAR(GETDATE())) AS KhachHangMoi,
        (SELECT SUM(TongTien) FROM HoaDonNhaps) AS TienChi,
        (SELECT SUM(TongGia) FROM HoaDons WHERE TrangThai != N'Huỷ đơn') AS DoanhThu,
		(SELECT SUM(LuotXem) FROM SanPhams) AS LuotXem	

    SELECT * FROM @Results
END


exec sp_overview


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_ThongKeDoanhThuNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @DoanhThu FLOAT;
    
    CREATE TABLE #ThongKeDoanhThu (Thang INT, DoanhThu FLOAT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @DoanhThu = SUM(TongGia)
        FROM HoaDons
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang;

        INSERT INTO #ThongKeDoanhThu (Thang, DoanhThu)
        VALUES (@Thang, @DoanhThu);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeDoanhThu;

    DROP TABLE #ThongKeDoanhThu;
END;

exec sp_ThongKeDoanhThuNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_ThongKeTienChiNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @TienChi FLOAT;
    
    CREATE TABLE #ThongKeTienChi(Thang INT, TienChi FLOAT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @TienChi = SUM(TongTien)
        FROM ChiTietHoaDonNhaps ct
		inner join HoaDonNhaps hdn on hdn.MaHoaDon = ct.MaHoaDon
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang;

        INSERT INTO #ThongKeTienChi (Thang, TienChi)
        VALUES (@Thang, @TienChi);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeTienChi;

    DROP TABLE #ThongKeTienChi;
END;

exec sp_ThongKeTienChiNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeDoanhThuTrongThang
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #DoanhThuTheoNgay (Ngay DATE, DoanhThu FLOAT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #DoanhThuTheoNgay (Ngay, DoanhThu)
        SELECT @NgayHienTai, SUM(TongGia)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai;

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #DoanhThuTheoNgay;

    DROP TABLE #DoanhThuTheoNgay;
END;

exec sp_ThongKeDoanhThuTrongThang 2023,10

-------------------------------------------------------------------------------------------------------------------------------
alter PROCEDURE sp_ThongKeTienChiTrongThang
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #TienChiTheoNgay (Ngay DATE, TienChi FLOAT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #TienChiTheoNgay (Ngay, TienChi)
        SELECT @NgayHienTai, SUM(ct.TongTien)
        FROM HoaDonNhaps hdn
		inner join HoaDonNhaps ct on ct.MaHoaDon=hdn.MaHoaDon
        WHERE CAST(hdn.NgayTao AS DATE) = @NgayHienTai;

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #TienChiTheoNgay;

    DROP TABLE #TienChiTheoNgay;
END;

exec sp_ThongKeTienChiTrongThang 2023,10

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_ThongKeHDBNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeHDBNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(*)
        FROM HoaDons ct
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang;

        INSERT INTO #ThongKeHDBNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeHDBNam;

    DROP TABLE #ThongKeHDBNam;
END;

exec sp_ThongKeHDBNam 2023

-------------------------------------------------------------------------------------------------------------------------------
alter PROCEDURE sp_ThongKeHDBNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #HDBNgay (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #HDBNgay (Ngay, SL)
        SELECT @NgayHienTai, COUNT(*)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai;

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #HDBNgay;

    DROP TABLE #HDBNgay;
END;

exec sp_ThongKeHDBNgay 2023,9

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_ThongKeHDNNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeHDNNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(*)
        FROM HoaDonNhaps
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang;

        INSERT INTO #ThongKeHDNNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeHDNNam;

    DROP TABLE #ThongKeHDNNam;
END;

exec sp_ThongKeHDNNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeHDNNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #HDNNgay (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #HDNNgay (Ngay, SL)
        SELECT @NgayHienTai, COUNT(*)
        FROM HoaDonNhaps
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai;

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #HDNNgay;

    DROP TABLE #HDNNgay;
END;

exec sp_ThongKeHDNNgay 2023,10

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_ThongKeKHNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeKHNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(DISTINCT SDT)
        FROM HoaDons
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang;

        INSERT INTO #ThongKeKHNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeKHNam;

    DROP TABLE #ThongKeKHNam;
END;

exec sp_ThongKeKHNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeKHNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #KHNgay (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #KHNgay (Ngay, SL)
        SELECT @NgayHienTai, COUNT(DISTINCT SDT)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai;

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #KHNgay;

    DROP TABLE #KHNgay;
END;

exec sp_ThongKeKHNgay 2023,10

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_ThongKeDonHuyNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeDonHuyNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(*)
        FROM HoaDons
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang AND TrangThai like N'Huỷ đơn'

        INSERT INTO #ThongKeDonHuyNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeDonHuyNam;

    DROP TABLE #ThongKeDonHuyNam;
END;

exec sp_ThongKeDonHuyNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeDonHuyNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #DonHuy (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #DonHuy (Ngay, SL)
        SELECT @NgayHienTai, COUNT(*)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai AND TrangThai like N'Huỷ đơn'

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #DonHuy;

    DROP TABLE #DonHuy;
END;

exec sp_ThongKeDonHuyNgay 2023,11

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_ThongKeDonHoanTraNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeDonHoanTraNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(*)
        FROM HoaDons
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang AND (TrangThai like N'Đổi hàng' or TrangThai like N'Trả hàng')

        INSERT INTO #ThongKeDonHoanTraNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeDonHoanTraNam;

    DROP TABLE #ThongKeDonHoanTraNam;
END;

exec sp_ThongKeDonHoanTraNam 2023

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeDonHoanTraNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #DonHoanTra (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #DonHoanTra (Ngay, SL)
        SELECT @NgayHienTai, COUNT(*)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai AND (TrangThai like N'Đổi hàng' or TrangThai like N'Trả hàng')

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #DonHoanTra;

    DROP TABLE #DonHoanTra;
END;

exec sp_ThongKeDonHoanTraNgay 2023,11

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_ThongKeDonHoanTatNam(@Nam INT)
AS
BEGIN
    DECLARE @Thang INT = 1;
    DECLARE @SL INT;
    
    CREATE TABLE #ThongKeDonHoanTatNam(Thang INT, SL INT);

    WHILE @Thang <= 12
    BEGIN

        SELECT @SL = COUNT(*)
        FROM HoaDons
        WHERE YEAR(NgayTao) = @Nam AND MONTH(NgayTao) = @Thang AND (TrangThai like N'Đã giao hàng' or TrangThai like N'Hoàn tất')

        INSERT INTO #ThongKeDonHoanTatNam (Thang, SL)
        VALUES (@Thang, @SL);

        SET @Thang = @Thang + 1;
    END;

    SELECT * FROM #ThongKeDonHoanTatNam;

    DROP TABLE #ThongKeDonHoanTatNam;
END;

exec sp_ThongKeDonHoanTatNam 2023

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_Thongkedoanhthutheosanpham(@Ngay int)
as
begin
	DECLARE @CurrentDate DATETIME = GETDATE()
    DECLARE @StartDate DATETIME = DATEADD(day, -@Ngay, @CurrentDate)
	select sp.TenSanPham,ct.SoLuong,Sum(ct.SoLuong * ct.DonGia) as DoanhThu
	from HoaDons hd
	inner join ChiTietHoaDons ct on hd.MaHoaDon = ct.MaHoaDon
	inner join SanPhams sp on sp.MaSanPham = ct.MaSanPham
	WHERE hd.NgayTao BETWEEN @StartDate AND @CurrentDate
	group by sp.TenSanPham,ct.SoLuong
end

exec sp_Thongkedoanhthutheosanpham 60

-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_ThongKeDonHoanTatNgay
    @Nam INT,
    @Thang INT
AS
BEGIN
    CREATE TABLE #DonHoanTat (Ngay DATE, SL INT);

    DECLARE @NgayDau DATE = DATEFROMPARTS(@Nam, @Thang, 1);
    DECLARE @NgayCuoi DATE = EOMONTH(@NgayDau);

    DECLARE @NgayHienTai DATE = @NgayDau;

    WHILE @NgayHienTai <= @NgayCuoi
    BEGIN
        INSERT INTO #DonHoanTat (Ngay, SL)
        SELECT @NgayHienTai, COUNT(*)
        FROM HoaDons
        WHERE CAST(NgayTao AS DATE) = @NgayHienTai AND (TrangThai like N'Đã giao hàng' or TrangThai like N'Hoàn tất')

        SET @NgayHienTai = DATEADD(DAY, 1, @NgayHienTai);
    END;

    SELECT * FROM #DonHoanTat;

    DROP TABLE #DonHoanTat
END;

exec sp_ThongKeDonHoanTatNgay 2023,11

---------------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanphambanchaytrong(@ngay int)
as
begin
	DECLARE @StartDate DATETIME
	IF @Ngay = 0
    BEGIN
        SET @StartDate = CAST(GETDATE() AS DATE);
    END
    ELSE
    BEGIN
        SET @StartDate = DATEADD(DAY, -@Ngay, GETDATE());
    END

    SELECT TOP (100)
           ct.MaSanPham,
           sp.TenSanPham,
           sp.AnhDaiDien,
           sp.Gia,
           sp.GiaGiam,
		   sp.LuotBan,
		   sp.DanhGia,
           sp.TrongLuong,
           dmu.Tendanhmucuudai,
           dm.TenDanhMuc,
           SUM(ct.SoLuong) AS soluong
    FROM HoaDons hd
        INNER JOIN ChiTietHoaDons ct ON ct.MaHoaDon = hd.MaHoaDon
        INNER JOIN SanPhams sp ON sp.MaSanPham = ct.MaSanPham
        INNER JOIN DanhMucs dm ON dm.MaDanhMuc = sp.MaDanhMuc
        INNER JOIN DanhMucUudais dmu ON dmu.Madanhmucuudai = sp.Madanhmucuudai
    WHERE hd.NgayTao >= @StartDate AND hd.NgayTao <= GETDATE()
    GROUP BY ct.MaSanPham, sp.TenSanPham, sp.AnhDaiDien, sp.Gia, sp.GiaGiam, sp.TrongLuong, dmu.Tendanhmucuudai, dm.TenDanhMuc,sp.LuotBan,sp.DanhGia
    HAVING SUM(ct.SoLuong) > 10
    ORDER BY soluong DESC;
end

exec sp_sanphambanchaytrong 0

---------------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanphambanchamtrong(@Ngay int)
as
begin
	DECLARE @StartDate DATETIME = DATEADD(DAY, -@Ngay, GETDATE());

    SELECT TOP (1000)
           ct.MaSanPham,
           sp.TenSanPham,
           sp.AnhDaiDien,
           sp.Gia,
           sp.GiaGiam,
		   sp.LuotBan,
		   sp.DanhGia,
           sp.TrongLuong,
           dmu.Tendanhmucuudai,
           dm.TenDanhMuc,
           SUM(ct.SoLuong) AS soluong
    FROM HoaDons hd
        INNER JOIN ChiTietHoaDons ct ON ct.MaHoaDon = hd.MaHoaDon
        INNER JOIN SanPhams sp ON sp.MaSanPham = ct.MaSanPham
        INNER JOIN DanhMucs dm ON dm.MaDanhMuc = sp.MaDanhMuc
        INNER JOIN DanhMucUudais dmu ON dmu.Madanhmucuudai = sp.Madanhmucuudai
    WHERE hd.NgayTao >= @StartDate AND hd.NgayTao <= GETDATE()
    GROUP BY ct.MaSanPham, sp.TenSanPham, sp.AnhDaiDien, sp.Gia, sp.GiaGiam, sp.TrongLuong, dmu.Tendanhmucuudai, dm.TenDanhMuc,sp.LuotBan,sp.DanhGia
    HAVING SUM(ct.SoLuong) < 5
    ORDER BY soluong DESC;
end

exec sp_sanphambanchamtrong 60

---------------------------------------------------------------------------------------------------------------------------------------
alter proc sp_danhgiatrong(@Ngay int)
as
begin
	DECLARE @StartDate DATETIME
	IF @Ngay = 0
    BEGIN
        SET @StartDate = CAST(GETDATE() AS DATE);
    END
    ELSE
    BEGIN
        SET @StartDate = DATEADD(DAY, -@Ngay, GETDATE());
    END

    SELECT TOP (1000) dg.*, sp.TenSanPham,cttk.HoTen,tk.TenTaiKhoan,cttk.SoDienThoai
    from DanhGia dg 
		inner join SanPhams sp on dg.MaSanPham = sp.MaSanPham
		inner join TaiKhoans tk on tk.MaTaiKhoan = dg.MaTaiKhoan
		inner join ChiTietTaiKhoans cttk on cttk.MaTaiKhoan = tk.MaTaiKhoan
    WHERE dg.ThoiGian >= @StartDate AND dg.ThoiGian <= GETDATE()
	ORDER BY MaDanhGia DESC
end

exec sp_danhgiatrong 0

---------------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanphamdabantrong(@Ngay int)
as
begin
	DECLARE @StartDate DATETIME
	IF @Ngay = 0
    BEGIN
        SET @StartDate = CAST(GETDATE() AS DATE);
    END
    ELSE
    BEGIN
        SET @StartDate = DATEADD(DAY, -@Ngay, GETDATE());
    END
    SELECT TOP (1000)
           ct.MaSanPham,
           sp.TenSanPham,
           sp.AnhDaiDien,
           sp.Gia,
           sp.GiaGiam,
		   sp.LuotBan,
		   sp.DanhGia,
           sp.TrongLuong,
           dmu.Tendanhmucuudai,
           dm.TenDanhMuc,
           SUM(ct.SoLuong) AS soluong
    FROM HoaDons hd
        INNER JOIN ChiTietHoaDons ct ON ct.MaHoaDon = hd.MaHoaDon
        INNER JOIN SanPhams sp ON sp.MaSanPham = ct.MaSanPham
        INNER JOIN DanhMucs dm ON dm.MaDanhMuc = sp.MaDanhMuc
        INNER JOIN DanhMucUudais dmu ON dmu.Madanhmucuudai = sp.Madanhmucuudai
   WHERE hd.NgayTao >= @StartDate AND hd.NgayTao <= GETDATE()
    GROUP BY ct.MaSanPham, sp.TenSanPham, sp.AnhDaiDien, sp.Gia, sp.GiaGiam, sp.TrongLuong, dmu.Tendanhmucuudai, dm.TenDanhMuc,sp.LuotBan,sp.DanhGia
    ORDER BY soluong DESC;
end

exec sp_sanphamdabantrong 0


---------------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanphamsaphet
as
begin
	select top(100) sp.MaSanPham,sp.TenSanPham,sp.AnhDaiDien,sp.Gia,sp.GiaGiam,sp.LuotBan,sp.DanhGia,sp.TrongLuong,dm.TenDanhMuc,dmu.Tendanhmucuudai,sp.SoLuong as soluong
	from SanPhams sp
	inner join DanhMucs dm on dm.MaDanhMuc = sp.MaDanhMuc
	inner join DanhMucUudais dmu on dmu.Madanhmucuudai = sp.Madanhmucuudai
	where SoLuong < 20
	ORDER BY soluong ASC
end

exec sp_sanphamsaphet

alter proc sp_sanphamuathich
as
begin
	SELECT Top(10) ctsp.MoTa,sp.LuotBan,sp.XuatXu,ct.MaSanPham,sp.TenSanPham,sp.AnhDaiDien,sp.Gia,sp.GiaGiam,sp.LuotXem,sp.DanhGia,sp.TrongLuong,dmu.Tendanhmucuudai,dm.TenDanhMuc, SUM(ct.SoLuong) AS soluong
	FROM HoaDons hd
	inner join ChiTietHoaDons ct on ct.MaHoaDon = hd.MaHoaDon
	inner join SanPhams sp on sp.MaSanPham = ct.MaSanPham
	inner join DanhMucs dm on dm.MaDanhMuc = sp.MaDanhMuc
	inner join DanhMucUudais dmu on dmu.Madanhmucuudai = sp.Madanhmucuudai
	inner join ChiTietSanPhams ctsp on ctsp.MaSanPham = sp.MaSanPham
	GROUP BY ctsp.MoTa,sp.LuotBan,sp.XuatXu,ct.MaSanPham,sp.TenSanPham,sp.AnhDaiDien,sp.Gia,sp.GiaGiam,sp.LuotXem,sp.DanhGia,sp.TrongLuong,dmu.Tendanhmucuudai,dm.TenDanhMuc
	having SUM(ct.SoLuong) > 10
	ORDER BY soluong DESC
end

exec sp_sanphamuathich


-------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE sp_sanpham_search_banchay
    @page_index INT,
    @page_size INT,
    @TenSanPham NVARCHAR(150),
    @TenDanhMuc NVARCHAR(50),
    @Tendanhmucuudai NVARCHAR(250),
    @GiaMin DECIMAL(18, 0),
    @GiaMax DECIMAL(18, 0),
    @TenHang NVARCHAR(50),
    @TenNhaPhanPhoi NVARCHAR(250),
    @XuatXu NVARCHAR(50)
AS
BEGIN
    DECLARE @RecordCount BIGINT;

    IF (@page_size <> 0)
    BEGIN
        SET NOCOUNT ON;

        SELECT
            (ROW_NUMBER() OVER (ORDER BY SUM(ct.SoLuong) DESC)) AS RowNumber,
            s.MaSanPham,
            dm.MaDanhMuc,
            dm.TenDanhMuc,
            dmu.Madanhmucuudai,
            dmu.Tendanhmucuudai,
            s.TenSanPham,
            s.AnhDaiDien,
            s.Gia,
            s.GiaGiam,
            SUM(ct.SoLuong) AS SoLuong,
            s.TrongLuong,
            s.TrangThai,
            s.LuotXem,
            s.LuotBan,
            s.DanhGia,
            s.XuatXu,
            h.MaNhaSanXuat,
            h.TenHang,
            npp.MaNhaPhanPhoi,
            npp.TenNhaPhanPhoi,
            c.MoTa,
            c.ChiTiet
        INTO #Temp1
        FROM SanPhams AS s
        INNER JOIN ChiTietSanPhams c ON c.MaSanPham = s.MaSanPham
        INNER JOIN HangSanXuats h ON h.MaNhaSanXuat = c.MaNhaSanXuat
        INNER JOIN SanPhams_NhaPhanPhois sp ON sp.MaSanPham = s.MaSanPham
        INNER JOIN NhaPhanPhois npp ON npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
        INNER JOIN DanhMucs dm ON dm.MaDanhMuc = s.MaDanhMuc
        INNER JOIN DanhMucUudais dmu ON dmu.Madanhmucuudai = s.Madanhmucuudai
        INNER JOIN ChiTietHoaDons ct ON s.MaSanPham = ct.MaSanPham
        WHERE
            (@TenSanPham = '' OR s.TenSanPham LIKE '%' + @TenSanPham + '%')
            AND (@TenDanhMuc = '' OR dm.TenDanhMuc LIKE '%' + @TenDanhMuc + '%')
            AND (@Tendanhmucuudai = '' OR dmu.Tendanhmucuudai LIKE '%' + @Tendanhmucuudai + '%')
            AND (@GiaMin = 0 OR s.Gia >= @GiaMin)
            AND (@GiaMax = 0 OR s.Gia <= @GiaMax)
            AND (@TenHang = '' OR h.TenHang LIKE '%' + @TenHang + '%')
            AND (@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE '%' + @TenNhaPhanPhoi + '%')
            AND (@XuatXu = '' OR s.XuatXu LIKE '%' + @XuatXu + '%')
        GROUP BY
            s.MaSanPham,
            dm.MaDanhMuc,
            dm.TenDanhMuc,
            dmu.Madanhmucuudai,
            dmu.Tendanhmucuudai,
            s.TenSanPham,
            s.AnhDaiDien,
            s.Gia,
            s.GiaGiam,
            s.TrongLuong,
            s.TrangThai,
            s.LuotXem,
            s.LuotBan,
            s.DanhGia,
            s.XuatXu,
            h.MaNhaSanXuat,
            h.TenHang,
            npp.MaNhaPhanPhoi,
            npp.TenNhaPhanPhoi,
            c.MoTa,
            c.ChiTiet;

        SELECT @RecordCount = COUNT(*)
        FROM #Temp1;

        SELECT *,
            @RecordCount AS RecordCount
        FROM #Temp1
        WHERE
            RowNumber BETWEEN (@page_index - 1) * @page_size + 1 AND ((@page_index - 1) * @page_size + 1 + @page_size) - 1
        OR @page_index = -1;

        DROP TABLE #Temp1;
    END;
    ELSE
    BEGIN
        SET NOCOUNT ON;

         SELECT
            (ROW_NUMBER() OVER (ORDER BY SUM(ct.SoLuong) DESC)) AS RowNumber,
            s.MaSanPham,
            dm.MaDanhMuc,
            dm.TenDanhMuc,
            dmu.Madanhmucuudai,
            dmu.Tendanhmucuudai,
            s.TenSanPham,
            s.AnhDaiDien,
            s.Gia,
            s.GiaGiam,
            SUM(ct.SoLuong) AS SoLuong,
            s.TrongLuong,
            s.TrangThai,
            s.LuotXem,
            s.LuotBan,
            s.DanhGia,
            s.XuatXu,
            h.MaNhaSanXuat,
            h.TenHang,
            npp.MaNhaPhanPhoi,
            npp.TenNhaPhanPhoi,
            c.MoTa,
            c.ChiTiet
        INTO #Temp2
        FROM SanPhams AS s
        INNER JOIN ChiTietSanPhams c ON c.MaSanPham = s.MaSanPham
        INNER JOIN HangSanXuats h ON h.MaNhaSanXuat = c.MaNhaSanXuat
        INNER JOIN SanPhams_NhaPhanPhois sp ON sp.MaSanPham = s.MaSanPham
        INNER JOIN NhaPhanPhois npp ON npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
        INNER JOIN DanhMucs dm ON dm.MaDanhMuc = s.MaDanhMuc
        INNER JOIN DanhMucUudais dmu ON dmu.Madanhmucuudai = s.Madanhmucuudai
        INNER JOIN ChiTietHoaDons ct ON s.MaSanPham = ct.MaSanPham
        WHERE
            (@TenSanPham = '' OR s.TenSanPham LIKE '%' + @TenSanPham + '%')
            AND (@TenDanhMuc = '' OR dm.TenDanhMuc LIKE '%' + @TenDanhMuc + '%')
            AND (@Tendanhmucuudai = '' OR dmu.Tendanhmucuudai LIKE '%' + @Tendanhmucuudai + '%')
            AND (@GiaMin = 0 OR s.Gia >= @GiaMin)
            AND (@GiaMax = 0 OR s.Gia <= @GiaMax)
            AND (@TenHang = '' OR h.TenHang LIKE '%' + @TenHang + '%')
            AND (@TenNhaPhanPhoi = '' OR npp.TenNhaPhanPhoi LIKE '%' + @TenNhaPhanPhoi + '%')
            AND (@XuatXu = '' OR s.XuatXu LIKE '%' + @XuatXu + '%')
        GROUP BY
            s.MaSanPham,
            dm.MaDanhMuc,
            dm.TenDanhMuc,
            dmu.Madanhmucuudai,
            dmu.Tendanhmucuudai,
            s.TenSanPham,
            s.AnhDaiDien,
            s.Gia,
            s.GiaGiam,
            s.TrongLuong,
            s.TrangThai,
            s.LuotXem,
            s.LuotBan,
            s.DanhGia,
            s.XuatXu,
            h.MaNhaSanXuat,
            h.TenHang,
            npp.MaNhaPhanPhoi,
            npp.TenNhaPhanPhoi,
            c.MoTa,
            c.ChiTiet;

        SELECT @RecordCount = COUNT(*)
        FROM #Temp2;

        SELECT *,
            @RecordCount AS RecordCount
        FROM #Temp2
        DROP TABLE #Temp2;

    END;
END;

exec sp_sanpham_search_banchay @page_index = 1, @page_size = 100, @TenSanPham = N'',@TenDanhMuc=N''
,@Tendanhmucuudai=N'',@GiaMin=1,@GiaMax=8888888,@TenHang=N'',@TenNhaPhanPhoi=N'',@XuatXu=N''

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_sanpham_search_luotxem_nhieu(@page_index  INT, 
                                       @page_size   INT,
									   @TenSanPham nvarchar(150),
									   @TenDanhMuc nvarchar(50),
									   @Tendanhmucuudai nvarchar(250),
									   @GiaMin DECIMAL(18, 0),
									   @GiaMax DECIMAL(18, 0),
									   @TenHang nvarchar(50),
									   @TenNhaPhanPhoi nvarchar(250),
									   @XuatXu nvarchar(50))
AS
    BEGIN
        DECLARE @RecordCount BIGINT;
        IF(@page_size <> 0)
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.LuotXem DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp1
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')
						
                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp1;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp1
                        WHERE ROWNUMBER BETWEEN(@page_index - 1) * @page_size + 1 AND(((@page_index - 1) * @page_size + 1) + @page_size) - 1
                              OR @page_index = -1;
                        DROP TABLE #Temp1; 
            END;
            ELSE
            BEGIN
                SET NOCOUNT ON;
                        SELECT(ROW_NUMBER() OVER(
                              ORDER BY s.LuotXem DESC)) AS RowNumber, 
                              s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  dmu.Madanhmucuudai,
							  dmu.Tendanhmucuudai,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.TrongLuong,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  h.MaNhaSanXuat,
							  h.TenHang,
							  npp.MaNhaPhanPhoi,
							  npp.TenNhaPhanPhoi,
							  c.MoTa,
							  c.ChiTiet
                        INTO #Temp2
                        FROM SanPhams AS s
						inner join ChiTietSanPhams c on c.MaSanPham = s.MaSanPham
						inner join HangSanXuats h on h.MaNhaSanXuat = c.MaNhaSanXuat
						inner join SanPhams_NhaPhanPhois sp on sp.MaSanPham = s.MaSanPham
						inner join NhaPhanPhois npp on npp.MaNhaPhanPhoi = sp.MaNhaPhanPhoi
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
						inner join DanhMucUudais dmu on dmu.Madanhmucuudai = s.Madanhmucuudai

					    WHERE (@TenSanPham = '' or s.TenSanPham like '%'+@TenSanPham +'%')
							and (@TenDanhMuc = '' or dm.TenDanhMuc like '%'+@TenDanhMuc +'%')
							and (@Tendanhmucuudai = '' or dmu.Tendanhmucuudai like '%'+@Tendanhmucuudai +'%')
							and (@GiaMin = 0 OR s.Gia >= @GiaMin)
							 and (@GiaMax = 0 OR s.Gia <= @GiaMax)
							and (@TenHang = '' or h.TenHang like '%'+@TenHang +'%')
							and (@TenNhaPhanPhoi = '' or npp.TenNhaPhanPhoi like '%'+@TenNhaPhanPhoi +'%')
							and (@XuatXu = '' or s.XuatXu like '%'+@XuatXu +'%')

                        SELECT @RecordCount = COUNT(*)
                        FROM #Temp2;
                        SELECT *, 
                               @RecordCount AS RecordCount
                        FROM #Temp2
                        DROP TABLE #Temp2; 
        END;
    END;

exec sp_sanpham_search_luotxem_nhieu @page_index = 1, @page_size = 100, @TenSanPham = N'',@TenDanhMuc=N''
,@Tendanhmucuudai=N'',@GiaMin=1,@GiaMax=8888888,@TenHang=N'',@TenNhaPhanPhoi=N'',@XuatXu=N''