﻿// <auto-generated />
using System;
using Mathmixin.Server.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Mathmixin.Server.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20230403144156_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Mathmixin.Server.Entities.Notebook", b =>
                {
                    b.Property<long>("NotebookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<DateTime?>("DeletedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<DateTime>("ModifiedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("NotebookId");

                    b.ToTable("Notebooks");
                });

            modelBuilder.Entity("Mathmixin.Server.Entities.Page", b =>
                {
                    b.Property<long>("PageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<DateTime?>("DeletedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<string>("HtmlContent")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("ModifiedDateUtc")
                        .HasColumnType("datetime(0)");

                    b.Property<long>("NotebookId")
                        .HasColumnType("bigint");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("PageId");

                    b.HasIndex("NotebookId");

                    b.ToTable("Pages");
                });

            modelBuilder.Entity("Mathmixin.Server.Entities.Page", b =>
                {
                    b.HasOne("Mathmixin.Server.Entities.Notebook", "Notebook")
                        .WithMany()
                        .HasForeignKey("NotebookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Notebook");
                });
#pragma warning restore 612, 618
        }
    }
}
