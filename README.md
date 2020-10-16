# Valfur Admin

This is an API to manage the content of my website [https://valfur.fr](https://valfur.fr/).

---

You can use this API for your own purpose. The code isn't licensed.

## Technologies

For this project, I used:

- NodeJS - For the API routes (I used the `express` module).
- PHP & MySQL - For the database.

## Getting started

### Installation

First, clone this repository on your local machine.

```bash
git clone https://github.com/valfur03/valfur-admin.git
```

Then, install all the node modules.

```bash
npm install
```

###	Configuration

There are two files that you need to configure yourself in order to run the API: `.env` and `email_template.js`. When you first clone them, they have a `.template` suffix. Just remove it, and edit the files. They will be ignored by Git. 

#### .env

This file is used by the `dotenv` node module. You can complete the file with the existing keys.

> The format is: KEY = VALUE.
>
> You don't need any `quotes` surrounding the string. For more information, you can check [the official dotenv documentation](https://www.npmjs.com/package/dotenv).

| Key                 |                         Description                          |
| ------------------- | :----------------------------------------------------------: |
| DB_USER             |          The user that the MySQL database will use.          |
| DB_PASSWORD         |         The password corresponding to the `DB_USER`.         |
| DB_NAME             |                  The name of the database.                   |
| TOKEN_SECRET        | The hash for encrypting tokens. You can generate one [here](https://randomkeygen.com/). |
| TIME_ZONE           | The time zone for log dates ([here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) are all the time zone that you can use, ex: `Europe/Paris`). |
| EMAIL_USER          |                   The SMTP server's user.                    |
| EMAIL_PASS          |       The password corresponding to the `EMAIL_USER`.        |
| EMAIL_HOST          |                 The SMTP server's hostname.                  |
| EMAIL_PORT          |                   The SMTP server's port.                    |
| BASE_URL (optional) | The base URL of the API. On your local machine, it should be http://localhost:3000. |
| APP_NAME (optional) | The name of your application. You can use that to send emails. |
| MASTER_USERNAME     |          The username used for the master account.           |
| MASTER_EMAIL        |            The email used for the master account.            |
| MASTER_PASSWORD     |          The password used for the master account.           |

**Disclaimer**: All these information are very confidential, never share it.

> If you do not own an SMTP server, you can check [this tutorial](https://support.google.com/a/answer/176600?hl=en) to use the Gmail's one.

#### email_template.js

This file is a function that returns the configuration Object. Actually, the function takes two parameters: the `email address` and the `token`. However, you can change it.

Basically, this is the mail that will be send to the user when it is created, or when he asks for a new password. The mail is sent using the `nodemailer` node module.

> For more information, you can check [the official nodemailer documentation](https://www.npmjs.com/package/nodemailer).

| Key     |                  Description                   |
| ------- | :--------------------------------------------: |
| from    |    The email address that sends the email.     |
| to      | The email address that will receive the email. |
| subject |           The subject of the email.            |
| html    | The message (formatted in HTML) of the email.  |

### The database

This API uses a MySQL database. On your local machine, you can install XAMPP to host your own one.

First, you need to create a database named with the value of `DB_NAME`. In PhpMyAdmin, you can now import the `init_db.sql` file or copy and execute the commands one by one.

Then, execute the `init_db.js` script to initialize user table with your information (`DB_USER`, `DB_PASSWORD` and `DB_EMAIL`).

```bash
node init_db.js
```

## Usage

Execute the `index.js` script.

```bash
node index.js
```

The API is now usable.

### API documentation

You can find the API documentation [here](https://documenter.getpostman.com/view/11748374/TVRoZ6jR).

## Issues

If you encounter any issue, please check that you have correctly done these steps:

- Install the modules
- Create your own configuration files
- Setup the PHP & MySQL server

If you still have a problem, you are free to open an issue in the corresponding tab.