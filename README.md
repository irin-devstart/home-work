# Database

## 1. Setting Up

Run the following command in the directory (`/deploy/docker`) where docker-compose.yml exists<br/>

Init Container

```
docker-compose up -d
```

Destroy Container

```
docker-compose down
```

Stop Container

```
docker-compose stop
```

Start Container

```
docker-compose start -d
```

## 2. Database Config

- DB_HOST=localhost
- DB_PORT=5432
- DB_SCHEMA=homework
- DB_NAME=homework
- DB_USER=irin-devstart
- DB_PW=123456

# Reactjs Client

## 1. Commands

Init Project

```
yarn install
```

Start Project

```
yarn dev
```

Add dependencies

```
yarn add <DEPENDENCY> [<DEPENDENCY>]
```

Add dev dependencies

```
yarn add --dev <DEPENDENCY> [<DEPENDENCY>]
```

Remove dependencies

```
yarn remove <DEPENDENCY> [<DEPENDENCY>]
```

<br />

## 2. Project Structure

| Folder Name          | Type      | Description                                                                                                            |
| -------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| common               | Directory | This directory contains code that is commonly used throughout the application.                                         |
| common/constants     | Directory | This folder stores constant values used throughout the application.                                                    |
| common/theme         | Directory | This directory contains theme definitions used in the application.                                                     |
| common/typings       | Directory | This folder stores the types used in the application.                                                                  |
| common/utils         | Directory | This folder contains utility functions that help with various operations throughout the application.                   |
| components           | Directory | This directory contains all the UI components used in the application.                                                 |
| components/atoms     | Directory | This folder stores the smallest UI components.                                                                         |
| components/melecules | Directory | This directory stores combinations of atomic components forming more complex units.                                    |
| components/organisms | Directory | This folder contains complex components consisting of various molecules and atoms.                                     |
| components/templates | Directory | This directory stores page templates used in the application's UI.                                                     |
| components/layout    | Directory | This folder stores components responsible for the page layout.                                                         |
| contexts             | Directory | This directory contains React contexts used for sharing data across the application.                                   |
| hooks                | Directory | This folder stores custom hooks created to encapsulate reusable stateful logic.                                        |
| pages                | Directory | This directory contains the main page components of the application.                                                   |
| services             | Directory | This folder stores services used for communicating with APIs.                                                          |
| validations          | Directory | This directory contains validation logic used in the application to ensure that input data adheres to specified rules. |

<br />
<br />

# Nodejs / Expressjs API

## 1. Commands

Init Project

```
yarn install
```

Since this project use Prisma need run this for insert field in db

```
npx prisma migrate dev
```

Use this to run the predefined user seeding script in project.

```
npx prisma db seed
```

You can manually import the database in the directory folder (`/deploy/db`) homework.sql.

Build Project

```
yarn build
```

Start Project in watch mode

```
yarn watch
```

<br />

## 2. Project Structure

| Folder Name      | Type      | Description                                                                                                                  |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| controllers      | Directory | This directory contains controller files that handle incoming requests and manage data flow to and from models.              |
| databases        | Directory | This folder includes files and configurations related to the database.                                                       |
| databases/models | Directory | This subdirectory contains code for database operations such as create, update, delete, and get, which are used in services. |
| databases/prisma | Directory | This subdirectory holds Prisma-related files for database schema and migrations.                                             |
| service          | Directory | This folder includes service files that handle business logic and interact with models.                                      |
| typings          | Directory | This directory stores TypeScript type definitions used throughout the application.                                           |

<br />
<br />

# End-to-end tests

## 1. Commands

Start End-to-end Open

```
npx cypress open
```

# User Seeding

## 1. login payload

- email: admin@gmail.com
- password: 123456
