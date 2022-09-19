CREATE Database empleados;
use empleados;
CREATE TABLE [dbo].[areas](
	[idArea] [int] IDENTITY(1,1) NOT NULL,
	[nombreArea] [varchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idArea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[empleados](
	[idEmp] [int] IDENTITY(1,1) NOT NULL,
	[nomEmp] [varchar](500) NOT NULL,
	[nomArea] [varchar](500) NULL,
	[fechaInicio] [date] NULL,
	[fechaFin] [date] NULL,
	[email] [varchar](200) NULL,
	[foto] [varchar](500) NULL,
	[idAreaFK] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idEmp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[empleados]  WITH CHECK ADD FOREIGN KEY([idAreaFK])
REFERENCES [dbo].[areas] ([idArea])
GO

