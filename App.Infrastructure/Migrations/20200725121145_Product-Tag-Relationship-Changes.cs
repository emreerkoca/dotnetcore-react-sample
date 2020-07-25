using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Infrastructure.Migrations
{
    public partial class ProductTagRelationshipChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tag_Product_ProductId",
                table: "Tag");

            migrationBuilder.DropIndex(
                name: "IX_Tag_ProductId",
                table: "Tag");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Tag");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "Tag");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Product",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Tag",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "Tag",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Tag_ProductId",
                table: "Tag",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tag_Product_ProductId",
                table: "Tag",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
