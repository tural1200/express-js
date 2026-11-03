-- CreateTable
CREATE TABLE "Person" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(7) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "email" VARCHAR(150),
    "country" VARCHAR(15),

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email_adress" ON "Person"("email");
