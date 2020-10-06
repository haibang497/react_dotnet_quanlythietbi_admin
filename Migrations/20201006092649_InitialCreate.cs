using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuanLyThietBi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DonVis",
                columns: table => new
                {
                    DonViId = table.Column<Guid>(nullable: false),
                    TenDonVi = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonVis", x => x.DonViId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DonVis");
        }
    }
}
