using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_Speaking.Migrations
{
    /// <inheritdoc />
    public partial class addProcess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Point",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Process",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Point",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Process");
        }
    }
}
