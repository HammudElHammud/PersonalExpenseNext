# Project Goals

- **Add Income and Expenses**: Users should be able to add income and expense entries, with the ability to assign a description, amount, and date to each entry.
- **Budget Limits and Alerts**: Users can set budget limits for each expense category. The application will notify users when they reach 80% of the set limit for each category.
- **Reporting and Analysis**: Users can view monthly and yearly reports of their income and expenses in visual formats (e.g., pie chart, bar chart).
- **Expense Categories and Related Expenses**: Users can categorize their income and expenses to keep the budget more organized.
- **Responsive Design**: The application should be compatible with mobile, tablet, and desktop devices.




# Prerequisites




Ensure you have `npm` and node installed on your local machine.

To check if `npm` is installed, run:

```
npm -v
```

To check if `node` is installed, run:

```
node -v
```

If these commands are not recognized, you can install Node.js and npm
from [Node.js Downloads](https://nodejs.org/en/download/package-manager).

Linux Installation
For Linux users, install Node.js and npm using the following commands:

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v # to check Node.js version
npm -v # to check npm version

```

For more detailed instructions, refer to
this [DigitalOcean tutorial.](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

# Getting Started

1- Clone the repository:

```
git clone "url of the repository"
cd "file's name"

```

2- Install dependencies:

```
npm install --force

```

3- Run the application:

```
next start

or

next dev // for when need change anythings will view

```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. The page will reload when
you make changes and you
may see lint errors in the console.