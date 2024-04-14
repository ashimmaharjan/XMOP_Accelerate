# XMOPS Accelerate

XMOPS Accelerate stands as a transformative solution, revolutionizing the operational landscape for the XMOPS team by centralizing control and expediting tasks ranging from WordPress deployments to IAM role updates. By seamlessly integrating cutting-edge automation technologies with robust authentication mechanisms like Amazon Cognito, it not only ensures efficient infrastructure deployment but also fortifies security protocols. Through its user-friendly front-end interface, it empowers team members to navigate deployment options effortlessly, while its automated infrastructure provisioning, facilitated by Terraform scripts and AWS service integration, guarantees reliability and consistency. With anticipated outcomes including efficiency gains, enhanced transparency through meticulous logging and monitoring, and inherent scalability, XMOPS Accelerate emerges as a beacon of innovation, reshaping the paradigm of infrastructure deployment and management.

## Technologies/Packages Used:

- **Tailwind CSS:** Utilized for styling the user interface components.
- **Framer Motion:** Employed for creating interactive animations within the application.
- **Lottie React:** Used for integrating Lottie animations into the project.
- **Next.js:** Leveraged as the framework for building the front-end application.
- **React:** Utilized as the JavaScript library for building user interface components.
- **ESLint:** Employed for static code analysis to identify and fix problematic patterns or code.
- **PostCSS:** Used for transforming CSS with JavaScript, including autoprefixing and other transformations.
- **File Saver:** Utilized for saving files on the client-side.
- **React Icons:** Employed for easily adding icons to React applications.

## Prerequisites to Run Front End:

1. **Node.js and npm:** Ensure that Node.js and npm are installed on the user's PC. You can download and install them from the official [Node.js Downloads](https://nodejs.org/en/download/).
2. **Project Dependencies:** Once Node.js and npm are installed, the user can navigate to the project directory using a terminal or command prompt and run the following command to install project dependencies listed in the `package.json` file:
    ```
    npm install
    ```
    This command will read the `package.json` file and install all the dependencies listed under the `"dependencies"` section.

## Walkthrough:

As represented in the project directory structure, all the pages and components have been placed inside the `app` folder. Only the animation JSON files have been placed under the `animations` folder at the root directory. Inside the `app` folder, there is a main layout which accepts the pages to be rendered as children and the initial page rendered is defined at `page.jsx`. Additionally, a loading component has also been placed here which is then used to display while the pages are in loading state. Furthermore, respective children pages have been created in directories representing the name based on their functions. We have relied on JSX file extension for all of the pages within this project and for styling we are using Tailwind CSS.

### Auth Directory:

As the name suggests, this directory consists of pages handling authentication processes which includes:
- Signup
- Login
- Verify Account

Each page has been created inside their corresponding directory names for code structuring. For user authentication, we are relying on AWS Cognito Service.

### Dashboard Directory:

This directory houses all the pages that are part of the system, and they are:
- Dashboard
- Deployments
- Settings

A parent layout page has been created which will then render the respective page based on the user navigation. Here, the pages for deployments and settings have been created inside their corresponding directories.

### Components Directory:

Based on the name itself, all the reusable react components have been created here and been imported and used where necessary. It consists of the following components:
- Forms
- Modals
- Input Fields
- Loaders
- Navigation Drawer / Mobile Naviagtion
- Divider
