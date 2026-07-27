-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CAREER', 'ENROLLMENT');

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'ENROLLMENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StayUpdatedEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StayUpdatedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPostCache" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "status" TEXT NOT NULL,
    "tags" TEXT[],
    "markdown" TEXT NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogPostCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotionImage" (
    "id" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "hostedUrl" TEXT NOT NULL,
    "notionUrl" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "NotionImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostCache_pageId_key" ON "BlogPostCache"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostCache_slug_key" ON "BlogPostCache"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NotionImage_blockId_key" ON "NotionImage"("blockId");

-- CreateIndex
CREATE INDEX "NotionImage_postId_idx" ON "NotionImage"("postId");

-- AddForeignKey
ALTER TABLE "NotionImage" ADD CONSTRAINT "NotionImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPostCache"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
