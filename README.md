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