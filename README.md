# petal

A basic Discord bot utilizing dependency injection, unit testing, and a homemade localization library. We use PostgreSQL with Prisma for our database.

# Using

1. Put your bot token, desired prefix, and PostgreSQL config into `.env.example` and rename to `.env`.
2. Create the `petal` database in PostgreSQL.
3. Run the Prisma migrations with `prisma migrate deploy --preview-feature`.
4. Build the source
5. `yarn start`

You can run the tests with `yarn test` if you would like.
