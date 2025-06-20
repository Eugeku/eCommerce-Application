# eCommerce-Application

Welcome to our **eCommerce application**!
This platform offering convenience and a seamless shopping experience that’s hard to replicate in physical stores 🚀.

---

## 🌟 Features

- Browse a wide range of products 📚👗👟
- View detailed product descriptions 🔍
- Add items to the basket 🛒 and proceed to checkout 💳
- User registration and login 📝🔐
- Product search, categorization, and sorting for convenience
- Responsive design for screens ≥ 390px 📲

---

## 🗂️ Key Pages

- Login and Registration Pages 🖥️🔐📝
- Main Page 🏠
- Catalog Product Page 📋
- Detailed Product Page 🔎
- User Profile Page 👤
- Basket Page 🛒
- About Us Page 🙋‍♂️🙋‍♀️🙋‍♀️

---

## 🧠 Tech Stack

- Single Page Application (SPA) without using of frameworks
- Use TypeScript
- Vite for bundling
- Backend is powered by **[Commercetools](https://commercetools.com/)**
- Additional tools: ESLint, Stylelint, Prettier, Husky, Vitest

---

## 🧰 Available Scripts & Usage

To support consistent development workflows, the project includes a variety of helpful scripts. These scripts are defined in `package.json` and are used to run, test, lint, format, and prepare code for production.

#### Main Scripts:

- `npm run start`
  Runs code formatting and then starts the Vite development server.
- `npm run build`
  Bundles the application for production using Vite. Outputs the files to the deploy directory.

#### Project Setup:

- `npm run prepare`
  Installs Husky Git hooks. Should be used once after the first cloning.

#### Code Styling:

- `npm run format`
  Runs Prettier and ESLint to format all code files according to the project's code style rules.
- `npm run pret`
  Runs Prettier to format files using Prettier.
- `npm run check`
  Runs Prettier to ensure files are already formatted.
- `npm run lint`
  Runs ESLint across the codebase to catch code quality and stylistic issues.
- `npm run lint-staged`
  Runs ESLint applied only to staged files.
- `npm run stylelint`
  Runs Stylelint on all `.css` and `.scss` files.
- `npm run stylelint:fix`
  Runs Stylelint to fix problems in `.css` and `.scss` files.

#### Testing:

- `npm run test`
  Runs unit tests using Vitest. Ensures individual components and functions behave as expected.
- `npm run test:watch`
  Runs tests in watch mode (reruns on file changes).
- `npm run test:report`
  Runs tests and generates a coverage report.

## 🚀 Install and Run the Application

- clone the repository
- install the dependencies with `npm install`
- install Husky Git hooks once after the first cloning `npm run prepare`
- start the local server using `npm run start`

## Demo

You can try the demo here.

Instructions:

Register: First, create an account by registering.  
Login: Use your registered account to log in.
