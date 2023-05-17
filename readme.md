## how to run

> update .env file

> setup db and seed db with prisma

### db seed

- sync database table with schema

```bash
  # without planetScale
  npx prisma migrate deploy
  # with planetScale
  npx prisma db push
```

- run seed script to populate data

```bash
# go to src/seed.ts file and update these two value
# const HOW_MUCH_AT_A_TIME = 1000;
# const INTERVAL = 20 * 1000;

pnpm seed
```

### now benchmark testing

- for prisma
  ```
    pnpm prisma
  ```
- for drizzle
  ```
    pnpm drizzle
  ```

---

in my case: prisma was fast
