/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "profile_image_url",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "attendance" INTEGER,
ADD COLUMN     "class" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" TEXT DEFAULT 'employee',
ADD COLUMN     "subjects" TEXT[];
