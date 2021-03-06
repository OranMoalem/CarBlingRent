USE [master]
GO
/****** Object:  Database [CarBlingRent]    Script Date: 20/12/2020 22:26:01 ******/
CREATE DATABASE [CarBlingRent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarBlingRent', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CarBlingRent.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CarBlingRent_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\CarBlingRent_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [CarBlingRent] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarBlingRent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarBlingRent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarBlingRent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarBlingRent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarBlingRent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarBlingRent] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarBlingRent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CarBlingRent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarBlingRent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarBlingRent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarBlingRent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarBlingRent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarBlingRent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarBlingRent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarBlingRent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarBlingRent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CarBlingRent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarBlingRent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarBlingRent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarBlingRent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarBlingRent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarBlingRent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarBlingRent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarBlingRent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CarBlingRent] SET  MULTI_USER 
GO
ALTER DATABASE [CarBlingRent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarBlingRent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarBlingRent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarBlingRent] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CarBlingRent] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CarBlingRent] SET QUERY_STORE = OFF
GO
USE [CarBlingRent]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[BranchName] [nvarchar](50) NOT NULL,
	[BranchAddress] [nvarchar](50) NOT NULL,
	[BranchLongitude] [decimal](12, 9) NOT NULL,
	[BranchLatitude] [decimal](12, 9) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarFleet]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarFleet](
	[CarFleetID] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerID] [int] NOT NULL,
	[Model] [nvarchar](20) NOT NULL,
	[DailyCost] [smallmoney] NOT NULL,
	[LateDayCost] [smallmoney] NOT NULL,
	[YearOfManufacturer] [smallint] NOT NULL,
	[Gear] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_CarsCategories] PRIMARY KEY CLUSTERED 
(
	[CarFleetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarRental]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarRental](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarNumber] [int] NOT NULL,
	[CarFleetID] [int] NOT NULL,
	[CurrentMileage] [int] NOT NULL,
	[CarPicture] [nvarchar](max) NULL,
	[IsProperForRent] [bit] NOT NULL,
	[IsAvailableForRent] [bit] NOT NULL,
	[BranchID] [int] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manufacturers]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manufacturers](
	[ManufacturerID] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CarsManufacturers] PRIMARY KEY CLUSTERED 
(
	[ManufacturerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[ReturnDate] [datetime] NOT NULL,
	[ActualReturnDate] [datetime] NULL,
	[UserID] [int] NOT NULL,
	[CarID] [int] NOT NULL,
 CONSTRAINT [PK_CarsRental] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 20/12/2020 22:26:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserFullName] [nvarchar](50) NOT NULL,
	[ID] [nvarchar](20) NOT NULL,
	[UserName] [nvarchar](20) NOT NULL,
	[UserIDateOfBirth] [date] NULL,
	[UserGender] [nvarchar](10) NOT NULL,
	[UserEmail] [nvarchar](50) NOT NULL,
	[UserIPassword] [nvarchar](max) NOT NULL,
	[UserImage] [nvarchar](max) NULL,
	[UserPermission] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchAddress], [BranchLongitude], [BranchLatitude]) VALUES (19, N'Tel Aviv', N'Gedera 5', CAST(31.125210000 AS Decimal(12, 9)), CAST(21.251300000 AS Decimal(12, 9)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchAddress], [BranchLongitude], [BranchLatitude]) VALUES (21, N'Bat Yam', N'Zichron Yaacov 22', CAST(41.256000000 AS Decimal(12, 9)), CAST(41.362250000 AS Decimal(12, 9)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchAddress], [BranchLongitude], [BranchLatitude]) VALUES (23, N'Herzliya', N'Ben-Hur 17', CAST(12.635200000 AS Decimal(12, 9)), CAST(63.521000000 AS Decimal(12, 9)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchAddress], [BranchLongitude], [BranchLatitude]) VALUES (24, N'Givatayim', N'Moshe Sneh 22', CAST(17.256300000 AS Decimal(12, 9)), CAST(23.652140000 AS Decimal(12, 9)))
INSERT [dbo].[Branches] ([BranchID], [BranchName], [BranchAddress], [BranchLongitude], [BranchLatitude]) VALUES (27, N'11111', N'fd', CAST(111.200000000 AS Decimal(12, 9)), CAST(22.300000000 AS Decimal(12, 9)))
SET IDENTITY_INSERT [dbo].[Branches] OFF
GO
SET IDENTITY_INSERT [dbo].[CarFleet] ON 

INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (36, 51, N'Civic', 200.0000, 250.0000, 2017, N'Automatic')
INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (37, 54, N'A1', 450.0000, 470.0000, 2020, N'Automatic')
INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (38, 52, N'I20', 190.0000, 220.0000, 2018, N'Manual')
INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (39, 52, N'I10', 320.0000, 190.0000, 2019, N'Manual')
INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (40, 56, N'Ibiza', 100.0000, 260.0000, 2016, N'Robotic')
INSERT [dbo].[CarFleet] ([CarFleetID], [ManufacturerID], [Model], [DailyCost], [LateDayCost], [YearOfManufacturer], [Gear]) VALUES (41, 58, N'C3', 240.0000, 100.0000, 2018, N'Manual')
SET IDENTITY_INSERT [dbo].[CarFleet] OFF
GO
SET IDENTITY_INSERT [dbo].[CarRental] ON 

INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (59, 41258741, 36, 124587, N'fed69f82-0cfb-4f20-a96e-f61b97c05a5d.jpg', 1, 0, 19)
INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (60, 14523698, 37, 22146, N'ad0037dc-6553-4cdf-b61c-4eac954bcc4d.jpg', 1, 0, 21)
INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (61, 6854712, 38, 141368, N'49acbcd6-c09e-495d-a717-931d10abb807.jpg', 1, 0, 23)
INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (62, 2574123, 39, 22187, N'b73b02bc-86fd-40ac-8ada-971a91accfe9.jpg', 1, 1, 23)
INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (63, 74185963, 40, 184752, N'83ca1e82-9740-4917-bacb-1a1ae3bb47b8.jpg', 1, 0, 24)
INSERT [dbo].[CarRental] ([CarID], [CarNumber], [CarFleetID], [CurrentMileage], [CarPicture], [IsProperForRent], [IsAvailableForRent], [BranchID]) VALUES (64, 25748451, 41, 112324, N'93d2a442-191e-4101-833a-01bf7a54b0d6.jpg', 1, 1, 24)
SET IDENTITY_INSERT [dbo].[CarRental] OFF
GO
SET IDENTITY_INSERT [dbo].[Manufacturers] ON 

INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (51, N'Honda')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (52, N'Hyundai')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (53, N'BMW')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (54, N'Audi')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (55, N'Opel')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (56, N'Seat')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (58, N'Citroen')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (70, N'gfdfgd')
SET IDENTITY_INSERT [dbo].[Manufacturers] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (206, CAST(N'2020-01-20T00:00:00.000' AS DateTime), CAST(N'2020-01-30T00:00:00.000' AS DateTime), CAST(N'2020-01-30T00:00:00.000' AS DateTime), 107, 59)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (207, CAST(N'2019-12-20T00:00:00.000' AS DateTime), CAST(N'2019-12-24T00:00:00.000' AS DateTime), CAST(N'2019-12-22T00:00:00.000' AS DateTime), 108, 60)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (208, CAST(N'2017-06-16T00:00:00.000' AS DateTime), CAST(N'2017-06-18T00:00:00.000' AS DateTime), CAST(N'2017-06-18T00:00:00.000' AS DateTime), 109, 61)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (209, CAST(N'2018-03-01T00:00:00.000' AS DateTime), CAST(N'2018-03-10T00:00:00.000' AS DateTime), CAST(N'2018-03-07T00:00:00.000' AS DateTime), 110, 62)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (210, CAST(N'2020-12-21T00:00:00.000' AS DateTime), CAST(N'2020-12-30T00:00:00.000' AS DateTime), NULL, 109, 59)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (211, CAST(N'2020-12-19T00:00:00.000' AS DateTime), CAST(N'2021-01-02T00:00:00.000' AS DateTime), NULL, 108, 60)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (212, CAST(N'2020-12-20T00:00:00.000' AS DateTime), CAST(N'2020-12-21T00:00:00.000' AS DateTime), NULL, 110, 61)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (213, CAST(N'2020-12-22T00:00:00.000' AS DateTime), CAST(N'2021-01-12T00:00:00.000' AS DateTime), NULL, 107, 62)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (214, CAST(N'2020-12-10T00:00:00.000' AS DateTime), CAST(N'2020-12-21T00:00:00.000' AS DateTime), NULL, 110, 63)
INSERT [dbo].[Orders] ([OrderID], [StartDate], [ReturnDate], [ActualReturnDate], [UserID], [CarID]) VALUES (215, CAST(N'2020-12-15T00:00:00.000' AS DateTime), CAST(N'2020-12-17T00:00:00.000' AS DateTime), NULL, 109, 64)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (104, N'Avi Levi', N'456456133', N'avilevi', CAST(N'1991-06-12' AS Date), N'Male', N'avilevi5@walla.com', N'BA3253876AED6BC22D4A6FF53D8406C6AD864195ED144AB5C87621B6C233B548BAEAE6956DF346EC8C17F5EA10F35EE3CBC514797ED7DDD3145464E2A0BAB413', N'64133e11-9c82-46fc-b955-fc686298aee4.jpg', N'Admin')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (105, N'Kobi Kipi', N'432543435', N'kobikipi', CAST(N'2002-11-28' AS Date), N'Male', N'kobikipi@hotmail.com', N'F9A697846F2D7130ADDDA44B4469095ED8EF3A569BA7BC5D5C943C5655D3CDF0A3D902C6DF50A38D9129B58560BADE96F9C951EB557CA3F7D714D1A5E78293F0', N'93bd15a3-7582-4a3a-ab44-ee276548d43f.jpg', N'Worker')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (106, N'Rona Levi', N'789564542', N'ronalevi587', NULL, N'Female', N'ronalevi587@walla.com', N'BA3253876AED6BC22D4A6FF53D8406C6AD864195ED144AB5C87621B6C233B548BAEAE6956DF346EC8C17F5EA10F35EE3CBC514797ED7DDD3145464E2A0BAB413', NULL, N'Worker')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (107, N'Hazi Mor', N'465123155', N'hazimor', NULL, N'Male', N'hazimor@gmail.com', N'BE0162F9E7F513E523218F6FA7FEE3E37842EB4664C5BD651B04B0C7C47E27E5BBC791E1A146629A73333BB7EF7BAEB9D01A1ACBBD9AE42BC164062E8C367F0B', N'79b08f89-fbbf-4b80-8d1c-2552df788b35.jpg', N'User')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (108, N'John Hook', N'321353223', N'johnhook', CAST(N'2002-12-17' AS Date), N'Male', N'johnhook@walla.co.il', N'18AE605EDC98926A7E359584A15884836782082135955BBB2F7193B95638658D76610F75A056750320F62F5CC83E028B57AA04D73DDB873C751F886770C3FF7E', N'f1546b82-fde1-45fc-9277-26cb9fac854d.jpg', N'User')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (109, N'Tom Alon', N'741526233', N'tomalon', NULL, N'Male', N'tomalon@yahoo.com', N'18AE605EDC98926A7E359584A15884836782082135955BBB2F7193B95638658D76610F75A056750320F62F5CC83E028B57AA04D73DDB873C751F886770C3FF7E', N'ead49b47-45b5-4279-b4aa-f62afb8b65f2', N'User')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (110, N'Rotem Rozner', N'65437643', N'rotemrozner', CAST(N'1991-10-08' AS Date), N'Female', N'rotemrozner@walla.com', N'D8022F2060AD6EFD297AB73DCC5355C9B214054B0D1776A136A669D26A7D3B14F73AA0D0EBFF19EE333368F0164B6419A96DA49E3E481753E7E96B716BDCCB6F', N'ff86c92e-47be-463d-9c75-ef00d8f36dd2.jpg', N'User')
INSERT [dbo].[Users] ([UserID], [UserFullName], [ID], [UserName], [UserIDateOfBirth], [UserGender], [UserEmail], [UserIPassword], [UserImage], [UserPermission]) VALUES (111, N'Avital David', N'52874525', N'avitaldavid', CAST(N'1993-11-11' AS Date), N'Female', N'avitaldavid@walla.com', N'18AE605EDC98926A7E359584A15884836782082135955BBB2F7193B95638658D76610F75A056750320F62F5CC83E028B57AA04D73DDB873C751F886770C3FF7E', NULL, N'User')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[CarFleet]  WITH CHECK ADD  CONSTRAINT [FK_CarFleet_Manufacturers] FOREIGN KEY([ManufacturerID])
REFERENCES [dbo].[Manufacturers] ([ManufacturerID])
GO
ALTER TABLE [dbo].[CarFleet] CHECK CONSTRAINT [FK_CarFleet_Manufacturers]
GO
ALTER TABLE [dbo].[CarRental]  WITH CHECK ADD  CONSTRAINT [FK_CarRental_Branches] FOREIGN KEY([BranchID])
REFERENCES [dbo].[Branches] ([BranchID])
GO
ALTER TABLE [dbo].[CarRental] CHECK CONSTRAINT [FK_CarRental_Branches]
GO
ALTER TABLE [dbo].[CarRental]  WITH CHECK ADD  CONSTRAINT [FK_CarRental_CarFleet] FOREIGN KEY([CarFleetID])
REFERENCES [dbo].[CarFleet] ([CarFleetID])
GO
ALTER TABLE [dbo].[CarRental] CHECK CONSTRAINT [FK_CarRental_CarFleet]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_CarRental] FOREIGN KEY([CarID])
REFERENCES [dbo].[CarRental] ([CarID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_CarRental]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
USE [master]
GO
ALTER DATABASE [CarBlingRent] SET  READ_WRITE 
GO
