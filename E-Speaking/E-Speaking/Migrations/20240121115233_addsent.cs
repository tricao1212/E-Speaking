using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_Speaking.Migrations
{
    /// <inheritdoc />
    public partial class addsent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Word",
                table: "Word_Lesson",
                newName: "Content");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Word_Lesson",
                newName: "Word");
        }
    }
}
