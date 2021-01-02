using Microsoft.EntityFrameworkCore;
#nullable disable

namespace CarBlingRent
{
    public partial class CarBlingRentContext : DbContext
    {
        public CarBlingRentContext()
        {
        }

        public CarBlingRentContext(DbContextOptions<CarBlingRentContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<CarFleet> CarFleets { get; set; }
        public virtual DbSet<CarRental> CarRentals { get; set; }
        public virtual DbSet<Manufacturer> Manufacturers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-LI745HRB\\SQLEXPRESS;Database=CarBlingRent;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Branch>(entity =>
            {
                entity.Property(e => e.BranchId).HasColumnName("BranchID");

                entity.Property(e => e.BranchAddress)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.BranchLatitude).HasColumnType("decimal(12, 9)");

                entity.Property(e => e.BranchLongitude).HasColumnType("decimal(12, 9)");

                entity.Property(e => e.BranchName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<CarFleet>(entity =>
            {
                entity.ToTable("CarFleet");

                entity.Property(e => e.CarFleetId).HasColumnName("CarFleetID");

                entity.Property(e => e.DailyCost).HasColumnType("smallmoney");

                entity.Property(e => e.Gear)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.LateDayCost).HasColumnType("smallmoney");

                entity.Property(e => e.ManufacturerId).HasColumnName("ManufacturerID");

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.CarFleets)
                    .HasForeignKey(d => d.ManufacturerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CarsTypes_CarsManufacturers");
            });

            modelBuilder.Entity<CarRental>(entity =>
            {
                entity.HasKey(e => e.CarId)
                    .HasName("PK_Cars");

                entity.ToTable("CarRental");

                entity.Property(e => e.CarId).HasColumnName("CarID");

                entity.Property(e => e.BranchId).HasColumnName("BranchID");

                entity.Property(e => e.CarFleetId).HasColumnName("CarFleetID");

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.CarRentals)
                    .HasForeignKey(d => d.BranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cars_Branches");

                entity.HasOne(d => d.CarFleet)
                    .WithMany(p => p.CarRentals)
                    .HasForeignKey(d => d.CarFleetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cars_CarsTypes");
            });

            modelBuilder.Entity<Manufacturer>(entity =>
            {
                entity.Property(e => e.ManufacturerId).HasColumnName("ManufacturerID");

                entity.Property(e => e.ManufacturerName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.ActualReturnDate).HasColumnType("datetime");

                entity.Property(e => e.CarId).HasColumnName("CarID");

                entity.Property(e => e.ReturnDate).HasColumnType("datetime");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Car)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CarId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CarsOrders_Cars");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CarsOrders_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("ID");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserFullName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserGender)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.UserIdateOfBirth)
                    .HasColumnType("date")
                    .HasColumnName("UserIDateOfBirth");

                entity.Property(e => e.UserIpassword)
                    .IsRequired()
                    .HasColumnName("UserIPassword");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.UserPermission)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
