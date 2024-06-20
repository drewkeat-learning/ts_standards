-- CreateTable
CREATE TABLE "Jurisdiction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "JurisdictionType" NOT NULL
);

-- CreateTable
CREATE TABLE "StandardSet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "educationLevels" TEXT[],
    "cspStatus" JSONB NOT NULL,
    "license" JSONB NOT NULL,
    "document" JSONB NOT NULL,
    "jurisdictionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" TEXT NOT NULL,
    "asnIdentifier" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "listId" TEXT NOT NULL,
    "statementNotation" TEXT NOT NULL,
    "altStatementNotation" TEXT NOT NULL,
    "statementLabel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT[],
    "ancestorIds" TEXT[],
    "standardSetId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Jurisdiction_id_key" ON "Jurisdiction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StandardSet_id_key" ON "StandardSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_id_key" ON "Standard"("id");

-- AddForeignKey
ALTER TABLE "StandardSet" ADD CONSTRAINT "StandardSet_jurisdictionId_fkey" FOREIGN KEY ("jurisdictionId") REFERENCES "Jurisdiction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard" ADD CONSTRAINT "Standard_standardSetId_fkey" FOREIGN KEY ("standardSetId") REFERENCES "StandardSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
